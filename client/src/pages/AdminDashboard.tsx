import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookCheck, 
  Mail, 
  CreditCard, 
  Download, 
  Clock, 
  CheckCircle2, 
  PhoneCall,
  FileText,
  FileSpreadsheet
} from "lucide-react";
import { format } from "date-fns";
import type { Lead, Payment, Booking, Download as DownloadType } from "@shared/schema";

interface Stats {
  bookings: number;
  contacts: number;
  payments: number;
  downloads: number;
  pending: number;
  contacted: number;
  completed: number;
  totalRecords: number;
}

export default function AdminDashboard() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: leads = [] } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: payments = [] } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: downloads = [] } = useQuery<DownloadType[]>({
    queryKey: ["/api/downloads"],
  });

  const handleExport = async (type: string) => {
    try {
      const response = await fetch(`/api/admin/export/${type}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'all' ? 'all_data.xlsx' : `${type}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const statCards = [
    { 
      icon: BookCheck, 
      label: "BOOKINGS", 
      value: stats?.bookings || 0,
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Mail, 
      label: "CONTACTS", 
      value: stats?.contacts || 0,
      color: "from-green-500 to-green-600"
    },
    { 
      icon: CreditCard, 
      label: "PAYMENTS", 
      value: stats?.payments || 0,
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: Download, 
      label: "DOWNLOADS", 
      value: stats?.downloads || 0,
      color: "from-orange-500 to-orange-600"
    },
    { 
      icon: Clock, 
      label: "PENDING", 
      value: stats?.pending || 0,
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: PhoneCall, 
      label: "CONTACTED", 
      value: stats?.contacted || 0,
      color: "from-green-500 to-green-600"
    },
    { 
      icon: CheckCircle2, 
      label: "COMPLETED", 
      value: stats?.completed || 0,
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: FileText, 
      label: "TOTAL RECORDS", 
      value: stats?.totalRecords || 0,
      color: "from-gray-500 to-gray-600"
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive business analytics and management center</p>
          </div>
          <Button 
            onClick={() => handleExport('all')} 
            className="gap-2"
            data-testid="button-export-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export to Excel
          </Button>
        </div>

        {/* Customer Data Tab */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
            <span className="font-semibold">Customer Data</span>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-stat-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground" data-testid={`text-stat-value-${index}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Bookings ({bookings.length})</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('bookings')}
              className="gap-2"
              data-testid="button-export-bookings"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <BookCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="font-semibold text-foreground mb-1">No Bookings Yet</p>
                  <p className="text-sm text-muted-foreground">When customers book packages, they'll appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">Customer</th>
                        <th className="text-left p-4 font-semibold text-sm">Package</th>
                        <th className="text-left p-4 font-semibold text-sm">Contact</th>
                        <th className="text-left p-4 font-semibold text-sm">Date</th>
                        <th className="text-left p-4 font-semibold text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking, index) => (
                        <tr key={booking.id} className="border-t" data-testid={`row-booking-${index}`}>
                          <td className="p-4 text-sm">{booking.customerName}</td>
                          <td className="p-4 text-sm">{booking.packageName}</td>
                          <td className="p-4 text-sm">
                            <div>{booking.customerEmail}</div>
                            <div className="text-muted-foreground">{booking.customerPhone}</div>
                          </td>
                          <td className="p-4 text-sm">{format(new Date(booking.createdAt), 'MMM dd, yyyy')}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Submissions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Contact Form Submissions ({leads.filter(l => l.source === 'contact_form').length})</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('leads')}
              className="gap-2"
              data-testid="button-export-contacts"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              {leads.filter(l => l.source === 'contact_form').length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="font-semibold text-foreground mb-1">No Contact Submissions</p>
                  <p className="text-sm text-muted-foreground">Contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">Name</th>
                        <th className="text-left p-4 font-semibold text-sm">Email</th>
                        <th className="text-left p-4 font-semibold text-sm">Phone</th>
                        <th className="text-left p-4 font-semibold text-sm">Message</th>
                        <th className="text-left p-4 font-semibold text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.filter(l => l.source === 'contact_form').slice(0, 5).map((lead, index) => (
                        <tr key={lead.id} className="border-t" data-testid={`row-contact-${index}`}>
                          <td className="p-4 text-sm">{lead.name}</td>
                          <td className="p-4 text-sm">{lead.email}</td>
                          <td className="p-4 text-sm">{lead.phone || 'N/A'}</td>
                          <td className="p-4 text-sm max-w-xs truncate">{lead.message || 'N/A'}</td>
                          <td className="p-4 text-sm">{format(new Date(lead.createdAt), 'MMM dd, yyyy')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Records */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Payment Records ({payments.filter(p => p.status === 'paid').length})</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('payments')}
              className="gap-2"
              data-testid="button-export-payments"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              {payments.filter(p => p.status === 'paid').length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="font-semibold text-foreground mb-1">No Payments</p>
                  <p className="text-sm text-muted-foreground">Payment records will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">Customer</th>
                        <th className="text-left p-4 font-semibold text-sm">Package</th>
                        <th className="text-left p-4 font-semibold text-sm">Amount</th>
                        <th className="text-left p-4 font-semibold text-sm">Payment ID</th>
                        <th className="text-left p-4 font-semibold text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.filter(p => p.status === 'paid').slice(0, 5).map((payment, index) => (
                        <tr key={payment.id} className="border-t" data-testid={`row-payment-${index}`}>
                          <td className="p-4 text-sm">{payment.customerName}</td>
                          <td className="p-4 text-sm">{payment.packageName}</td>
                          <td className="p-4 text-sm font-semibold">₹{payment.amount.toLocaleString()}</td>
                          <td className="p-4 text-sm font-mono text-xs">{payment.razorpayPaymentId}</td>
                          <td className="p-4 text-sm">{payment.paidAt ? format(new Date(payment.paidAt), 'MMM dd, yyyy') : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resource Downloads */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Resource Downloads ({downloads.length})</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('downloads')}
              className="gap-2"
              data-testid="button-export-downloads"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              {downloads.length === 0 ? (
                <div className="text-center py-12">
                  <Download className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="font-semibold text-foreground mb-1">No Downloads</p>
                  <p className="text-sm text-muted-foreground">Resource download records will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">Resource Name</th>
                        <th className="text-left p-4 font-semibold text-sm">Downloaded By</th>
                        <th className="text-left p-4 font-semibold text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {downloads.slice(0, 5).map((download, index) => (
                        <tr key={download.id} className="border-t" data-testid={`row-download-${index}`}>
                          <td className="p-4 text-sm">{download.resourceName}</td>
                          <td className="p-4 text-sm">{download.downloadedBy || 'Anonymous'}</td>
                          <td className="p-4 text-sm">{format(new Date(download.downloadedAt), 'MMM dd, yyyy')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
