import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";
import { insertLeadSchema, insertPaymentSchema, insertBookingSchema } from "@shared/schema";
import { utils, write } from "xlsx";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Initialize Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
  });

  // Create Lead (from contact form or package inquiry)
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update lead status
  app.patch("/api/leads/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await storage.updateLeadStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create Razorpay Order
  app.post("/api/payments/create-order", async (req, res) => {
    try {
      const { amount, customerName, customerEmail, customerPhone, packageName } = req.body;

      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: "Razorpay credentials not configured" });
      }

      const options = {
        amount: amount * 100, // amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      // Save payment record
      const payment = await storage.createPayment({
        razorpayOrderId: order.id,
        amount: amount,
        currency: "INR",
        status: "created",
        customerName,
        customerEmail,
        customerPhone,
        packageName,
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error: any) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Verify Razorpay Payment
  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: "Razorpay secret not configured" });
      }

      // Verify signature
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }

      // Update payment status
      const payment = await storage.updatePaymentSuccess(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      // Create booking
      const booking = await storage.createBooking({
        paymentId: payment.id,
        customerName: payment.customerName,
        customerEmail: payment.customerEmail,
        customerPhone: payment.customerPhone,
        packageName: payment.packageName,
        status: "confirmed",
      });

      res.json({ success: true, booking });
    } catch (error: any) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get all payments
  app.get("/api/payments", async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all downloads
  app.get("/api/downloads", async (req, res) => {
    try {
      const downloads = await storage.getAllDownloads();
      res.json(downloads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get admin stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Export data to Excel
  app.get("/api/admin/export/:type", async (req, res) => {
    try {
      const { type } = req.params;
      let data: any[] = [];
      let filename = "";

      switch (type) {
        case "bookings":
          data = await storage.getAllBookings();
          filename = "bookings.xlsx";
          break;
        case "leads":
          data = await storage.getAllLeads();
          filename = "contact_submissions.xlsx";
          break;
        case "payments":
          data = await storage.getAllPayments();
          filename = "payments.xlsx";
          break;
        case "downloads":
          data = await storage.getAllDownloads();
          filename = "downloads.xlsx";
          break;
        case "all":
          const bookings = await storage.getAllBookings();
          const leads = await storage.getAllLeads();
          const payments = await storage.getAllPayments();
          const downloads = await storage.getAllDownloads();

          const wb = utils.book_new();
          utils.book_append_sheet(wb, utils.json_to_sheet(bookings), "Bookings");
          utils.book_append_sheet(wb, utils.json_to_sheet(leads), "Leads");
          utils.book_append_sheet(wb, utils.json_to_sheet(payments), "Payments");
          utils.book_append_sheet(wb, utils.json_to_sheet(downloads), "Downloads");

          const buffer = write(wb, { type: "buffer", bookType: "xlsx" });
          res.setHeader("Content-Disposition", "attachment; filename=all_data.xlsx");
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          return res.send(buffer);
        default:
          return res.status(400).json({ error: "Invalid export type" });
      }

      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");

      const buffer = write(wb, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.send(buffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
