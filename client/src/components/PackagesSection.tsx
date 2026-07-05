import { useState, useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useCms } from "@/hooks/useCms";
import { formatCurrency } from "@/lib/currency";
import type { StandardPlan } from "@/lib/sanity";
import CustomPlans from "@/components/CustomPlans";

type Category = "8-10" | "10-12" | "college" | "working";

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

interface PackagesSectionProps {
  onBuyClick: (plan: SelectedPlan, category: string) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: "8-10", label: "8-10 STUDENTS" },
  { id: "10-12", label: "10-12 STUDENTS" },
  { id: "college", label: "COLLEGE STUDENTS" },
  { id: "working", label: "WORKING PROFESSIONALS" },
];

const categoryLabels: Record<Category, string> = {
  "8-10": "8-10 Students",
  "10-12": "10-12 Students",
  college: "College Students",
  working: "Working Professionals",
};

export default function PackagesSection({ onBuyClick }: PackagesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category>("8-10");
  const { data } = useCms();
  const plans = data?.standardPlans ?? [];
  const customPlans = data?.customPlans ?? [];

  const currentPackages = plans.filter((plan) => plan.subgroup === activeCategory);
  const isPremium = (plan: StandardPlan) => plan.planId.endsWith("2") || plan.planId.endsWith("4") || plan.planId.endsWith("6");

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="text-packages-headline">
            Choose Your Path
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-packages-subheadline">
            Select your category and find the perfect package for your career journey
          </p>
        </motion.div>

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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {currentPackages.map((pkg, index) => {
              const premium = isPremium(pkg);
              return (
                <motion.div
                  key={pkg.planId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`group relative h-full hover-elevate transition-all hover:shadow-2xl ${
                      premium ? "border-primary shadow-xl scale-105 sm:scale-110" : "border-card-border"
                    } bg-card/50 backdrop-blur-sm`}
                    data-testid={`card-package-${index}`}
                  >
                    {premium && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Premium
                      </div>
                    )}
                    <CardHeader className="pt-8 sm:pt-10">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2" data-testid={`text-package-name-${index}`}>
                        {pkg.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent" data-testid={`text-package-price-${index}`}>
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3" data-testid={`text-package-feature-${index}-${featureIndex}`}>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary/10">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm sm:text-base text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() =>
                          onBuyClick(
                            {
                              planId: pkg.planId,
                              title: pkg.title,
                              category: categoryLabels[activeCategory],
                              price: pkg.price,
                            },
                            categoryLabels[activeCategory],
                          )
                        }
                        className="w-full group-hover:scale-105 transition-transform"
                        variant={premium ? "default" : "outline"}
                        data-testid={`button-engage-${index}`}
                      >
                        BUY NOW
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <CustomPlans
          plans={customPlans}
          onBuyClick={(plan) =>
            onBuyClick(
              {
                planId: plan.planId,
                title: plan.title,
                category: "Custom Mentorship",
                price: plan.price,
              },
              "Custom Mentorship",
            )
          }
        />
      </div>
    </section>
  );
}
