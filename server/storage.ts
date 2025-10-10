import { 
  type User, type InsertUser,
  type Lead, type InsertLead,
  type Payment, type InsertPayment,
  type Booking, type InsertBooking,
  type Download, type InsertDownload
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadsByStatus(status: string): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  
  createPayment(payment: InsertPayment): Promise<Payment>;
  getAllPayments(): Promise<Payment[]>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  updatePaymentSuccess(orderId: string, paymentId: string, signature: string): Promise<Payment | undefined>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  
  createDownload(download: InsertDownload): Promise<Download>;
  getAllDownloads(): Promise<Download[]>;
  
  getStats(): Promise<{
    bookings: number;
    contacts: number;
    payments: number;
    downloads: number;
    pending: number;
    contacted: number;
    completed: number;
    totalRecords: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private payments: Map<string, Payment>;
  private bookings: Map<string, Booking>;
  private downloads: Map<string, Download>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.payments = new Map();
    this.bookings = new Map();
    this.downloads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date(),
      status: insertLead.status || "pending",
      message: insertLead.message || null,
      phone: insertLead.phone || null,
      packageName: insertLead.packageName || null
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getLeadsByStatus(status: string): Promise<Lead[]> {
    return Array.from(this.leads.values())
      .filter(lead => lead.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (lead) {
      const updated = { ...lead, status };
      this.leads.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = { 
      ...insertPayment, 
      id, 
      createdAt: new Date(),
      paidAt: null,
      status: insertPayment.status || "created",
      currency: insertPayment.currency || "INR",
      razorpayPaymentId: insertPayment.razorpayPaymentId || null,
      razorpaySignature: insertPayment.razorpaySignature || null
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      payment => payment.razorpayOrderId === orderId
    );
  }

  async updatePaymentSuccess(orderId: string, paymentId: string, signature: string): Promise<Payment | undefined> {
    const payment = await this.getPaymentByOrderId(orderId);
    if (payment) {
      const updated: Payment = { 
        ...payment, 
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: "paid",
        paidAt: new Date()
      };
      this.payments.set(payment.id, updated);
      return updated;
    }
    return undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: insertBooking.status || "confirmed"
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const id = randomUUID();
    const download: Download = { 
      ...insertDownload, 
      id, 
      downloadedAt: new Date(),
      downloadedBy: insertDownload.downloadedBy || null
    };
    this.downloads.set(id, download);
    return download;
  }

  async getAllDownloads(): Promise<Download[]> {
    return Array.from(this.downloads.values()).sort(
      (a, b) => b.downloadedAt.getTime() - a.downloadedAt.getTime()
    );
  }

  async getStats() {
    const allLeads = await this.getAllLeads();
    return {
      bookings: this.bookings.size,
      contacts: allLeads.filter(l => l.source === "contact_form").length,
      payments: Array.from(this.payments.values()).filter(p => p.status === "paid").length,
      downloads: this.downloads.size,
      pending: allLeads.filter(l => l.status === "pending").length,
      contacted: allLeads.filter(l => l.status === "contacted").length,
      completed: allLeads.filter(l => l.status === "completed").length,
      totalRecords: this.bookings.size + this.leads.size + this.payments.size + this.downloads.size,
    };
  }
}

export const storage = new MemStorage();
