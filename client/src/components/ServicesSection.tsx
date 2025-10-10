import { TrendingUp, GraduationCap, Building } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: TrendingUp,
      title: "Mid-Career Strategic Guidance",
      description:
        "For professionals seeking to pivot or advance into leadership roles. Navigate career transitions with expert insights from decades of industry experience.",
    },
    {
      icon: GraduationCap,
      title: "Academic & Research Mentorship",
      description:
        "Comprehensive guidance for Ph.D. candidates and senior researchers. From research methodology to publication strategy and academic career development.",
    },
    {
      icon: Building,
      title: "Corporate & Institutional Advisory",
      description:
        "High-level consulting for colleges and corporations on technical education quality, curriculum development, and institutional excellence.",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="text-services-headline"
          >
            Executive & Academic Guidance
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-services-subheadline">
            Tailored consulting services for professionals and institutions
            seeking excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all"
              data-testid={`card-service-${index}`}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid={`text-service-desc-${index}`}>
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
