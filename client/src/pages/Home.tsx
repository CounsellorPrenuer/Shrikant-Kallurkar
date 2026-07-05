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
import BookingModal from "@/components/BookingModal";

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);

  const handleBookConsultation = () => {
    setSelectedPlan({
      planId: "one-to-one-session",
      title: "One-to-One Session with a Career Expert",
      category: "Consultation",
      price: 3500,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookConsultation={handleBookConsultation} />
      <Hero />
      <CredibilitySection />
      <AboutSection />
      <ServicesSection />
      <PackagesSection onBuyClick={(plan) => setSelectedPlan(plan)} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          planId={selectedPlan.planId}
          title={selectedPlan.title}
          category={selectedPlan.category}
          price={selectedPlan.price}
        />
      )}
    </div>
  );
}
