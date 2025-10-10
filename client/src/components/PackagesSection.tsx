import { Check } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PackagesSectionProps {
  onEngageClick: (packageName: string) => void;
}

export default function PackagesSection({ onEngageClick }: PackagesSectionProps) {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="text-packages-headline"
          >
            Engage My Expertise
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-packages-subheadline">
            Choose the engagement model that best fits your professional goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`hover-elevate transition-all ${
                pkg.featured ? "border-primary shadow-lg" : ""
              }`}
              data-testid={`card-package-${index}`}
            >
              {pkg.featured && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2" data-testid={`text-package-name-${index}`}>
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold text-primary" data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-muted-foreground" data-testid={`text-package-desc-${index}`}>
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
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => onEngageClick(pkg.name)}
                  className="w-full"
                  variant={pkg.featured ? "default" : "outline"}
                  data-testid={`button-engage-${index}`}
                >
                  Engage Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
