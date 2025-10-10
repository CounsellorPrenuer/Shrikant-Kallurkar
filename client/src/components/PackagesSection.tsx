import { useState, useRef } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

interface PackagesSectionProps {
  onEngageClick: (packageName: string) => void;
}

type Category = "8-9" | "10-12" | "college" | "professional";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planName: string;
  price: string;
  features: Feature[];
  isPremium?: boolean;
}

export default function PackagesSection({ onEngageClick }: PackagesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category>("8-9");

  const categories = [
    { id: "8-9" as Category, label: "8-9 STUDENTS" },
    { id: "10-12" as Category, label: "10-12 STUDENTS" },
    { id: "college" as Category, label: "COLLEGE GRADUATES" },
    { id: "professional" as Category, label: "WORKING PROFESSIONALS" },
  ];

  const packagesData: Record<Category, Package[]> = {
    "8-9": [
      {
        planName: "Discover",
        price: "₹5,500",
        features: [
          { text: "Psychometric assessment to measure your interests", included: true },
          { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV building during internship/graduation", included: false },
        ],
      },
      {
        planName: "Discover plus+",
        price: "₹15,000",
        features: [
          { text: "Psychometric assessments to measure your interests, personality and abilities", included: true },
          { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV building during internship/graduation", included: true },
        ],
        isPremium: true,
      },
    ],
    "10-12": [
      {
        planName: "Achieve Online",
        price: "₹5,999",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews during internship/graduation", included: false },
        ],
      },
      {
        planName: "Achieve Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "4 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews during internship/graduation", included: true },
        ],
        isPremium: true,
      },
    ],
    college: [
      {
        planName: "Ascend Online",
        price: "₹6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      {
        planName: "Ascend Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "3 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        isPremium: true,
      },
    ],
    professional: [
      {
        planName: "Ascend Online",
        price: "₹6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      {
        planName: "Ascend Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "2 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        isPremium: true,
      },
    ],
  };

  const currentPackages = packagesData[activeCategory];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-packages-headline"
          >
            Choose Your Path
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-packages-subheadline">
            Select your category and find the perfect package for your career journey
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card/50 text-foreground hover-elevate active-elevate-2 border border-card-border"
                }`}
                data-testid={`tab-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Packages */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {currentPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`group relative h-full hover-elevate transition-all hover:shadow-2xl ${
                    pkg.isPremium ? "border-primary shadow-xl scale-105 sm:scale-110" : "border-card-border"
                  } bg-card/50 backdrop-blur-sm`}
                  data-testid={`card-package-${index}`}
                >
                  {pkg.isPremium && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Premium
                    </div>
                  )}
                  <CardHeader className="pt-8 sm:pt-10">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2" data-testid={`text-package-name-${index}`}>
                      {pkg.planName}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent" data-testid={`text-package-price-${index}`}>
                        {pkg.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                          data-testid={`text-package-feature-${index}-${featureIndex}`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.included ? "bg-primary/10" : "bg-destructive/10"
                          }`}>
                            {feature.included ? (
                              <Check className="w-3 h-3 text-primary" />
                            ) : (
                              <X className="w-3 h-3 text-destructive" />
                            )}
                          </div>
                          <span className={`text-sm sm:text-base ${
                            feature.included ? "text-foreground" : "text-muted-foreground line-through"
                          }`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => onEngageClick(`${pkg.planName} - ${pkg.price}`)}
                      className="w-full group-hover:scale-105 transition-transform"
                      variant={pkg.isPremium ? "default" : "outline"}
                      data-testid={`button-engage-${index}`}
                    >
                      BUY NOW
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
