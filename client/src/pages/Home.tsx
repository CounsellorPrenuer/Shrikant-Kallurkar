import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredibilitySection from "@/components/CredibilitySection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import UserDetailsDialog from "@/components/UserDetailsDialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const { toast } = useToast();
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; amount: number }>({ name: "", amount: 0 });

  const handleBookConsultation = () => {
    setSelectedPackage({ name: "General Consultation", amount: 5000 });
    setShowUserDetailsDialog(true);
  };

  const handleEngageClick = (packageInfo: string) => {
    // Parse package info: "Package Name - ₹Amount"
    const parts = packageInfo.split(" - ₹");
    const name = parts[0];
    const amount = parseInt(parts[1].replace(/,/g, ""));
    
    setSelectedPackage({ name, amount });
    setShowUserDetailsDialog(true);
  };

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      amount: number;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      packageName: string;
    }): Promise<{ orderId: string; amount: number; currency: string; keyId: string }> => {
      const response = await apiRequest("/api/payments/create-order", "POST", data);
      return response;
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }): Promise<{ success: boolean; booking: any }> => {
      const response = await apiRequest("/api/payments/verify", "POST", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details.",
      });
    },
    onError: () => {
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support if amount was deducted.",
        variant: "destructive",
      });
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      source: string;
      packageName?: string;
    }) => {
      const response = await apiRequest("/api/leads", "POST", data);
      return response;
    },
  });

  const handleProceedToPayment = async (userDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      // Create lead first
      await createLeadMutation.mutateAsync({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        source: "package_inquiry",
        packageName: selectedPackage.name,
      });

      // Create Razorpay order
      const orderData = await createOrderMutation.mutateAsync({
        amount: selectedPackage.amount,
        customerName: userDetails.name,
        customerEmail: userDetails.email,
        customerPhone: userDetails.phone,
        packageName: selectedPackage.name,
      });

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Configure Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Level Up Pune",
        description: selectedPackage.name,
        order_id: orderData.orderId,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: "#800000",
        },
        handler: async function (response: any) {
          // Verify payment on backend
          await verifyPaymentMutation.mutateAsync({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setShowUserDetailsDialog(false);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookConsultation={handleBookConsultation} />
      <Hero />
      <CredibilitySection />
      <AboutSection />
      <ServicesSection />
      <PackagesSection onEngageClick={handleEngageClick} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {/* User Details Dialog */}
      <UserDetailsDialog
        open={showUserDetailsDialog}
        onOpenChange={setShowUserDetailsDialog}
        packageName={selectedPackage.name}
        amount={selectedPackage.amount}
        onProceed={handleProceedToPayment}
      />
    </div>
  );
}
