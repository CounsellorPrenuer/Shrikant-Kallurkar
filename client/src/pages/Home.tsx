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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleBookConsultation = () => {
    setShowConsultationDialog(true);
  };

  const handleEngageClick = (packageName: string) => {
    setSelectedPackage(packageName);
    setShowConsultationDialog(true);
  };

  const handleProceedToPayment = () => {
    // TODO: Implement Razorpay integration
    console.log("Proceeding to payment for:", selectedPackage || "General Consultation");
    
    toast({
      title: "Payment Integration Pending",
      description: "Razorpay integration will be added in the next phase.",
    });
    
    setShowConsultationDialog(false);
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

      {/* Consultation Dialog */}
      <Dialog open={showConsultationDialog} onOpenChange={setShowConsultationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Your Consultation</DialogTitle>
            <DialogDescription>
              {selectedPackage
                ? `You've selected: ${selectedPackage}`
                : "Schedule a consultation with Dr. Shrikant Kallurkar"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              To proceed with booking, please click the button below. You'll be
              directed to our secure payment gateway.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">
                What happens next:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Complete secure payment via Razorpay</li>
                <li>Receive confirmation email</li>
                <li>Schedule your session</li>
              </ul>
            </div>
            <Button
              onClick={handleProceedToPayment}
              className="w-full"
              data-testid="button-proceed-payment"
            >
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
