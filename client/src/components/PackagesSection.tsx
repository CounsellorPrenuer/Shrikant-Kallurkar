import { Check, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface PackagesSectionProps {
  onEngageClick: (packageName: string) => void;
}

export default function PackagesSection({ onEngageClick }: PackagesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Strategic Advisory Session",
      price: "₹15,000",
      description: "A 90-minute deep-dive session for professionals or academics",
      features: [
        "One-on-one consultation",
        "Career roadmap assessment",
        "Actionable recommendations",
        "Follow-up email summary",
      ],
    },
    {
      name: "Long-Term Mentorship Program",
      price: "₹75,000",
      description: "A multi-session retainer for ongoing guidance and support",
      features: [
        "6 consultation sessions",
        "Ongoing email support",
        "Research/career strategy",
        "Network introductions",
        "Priority scheduling",
      ],
      featured: true,
    },
  ];

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
            Engage My Expertise
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-packages-subheadline">
            Choose the engagement model that best fits your professional goals
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`group relative h-full hover-elevate transition-all hover:shadow-2xl ${
                  pkg.featured ? "border-primary shadow-xl scale-105 sm:scale-110" : "border-card-border"
                } bg-card/50 backdrop-blur-sm`}
                data-testid={`card-package-${index}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
                <CardHeader className="pt-8 sm:pt-10">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2" data-testid={`text-package-name-${index}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent" data-testid={`text-package-price-${index}`}>
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-package-desc-${index}`}>
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                        data-testid={`text-package-feature-${index}-${featureIndex}`}
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm sm:text-base text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => onEngageClick(pkg.name)}
                    className="w-full group-hover:scale-105 transition-transform"
                    variant={pkg.featured ? "default" : "outline"}
                    data-testid={`button-engage-${index}`}
                  >
                    Engage Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
