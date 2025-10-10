import { TrendingUp, GraduationCap, Building } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: TrendingUp,
      title: "Mid-Career Strategic Guidance",
      description:
        "For professionals seeking to pivot or advance into leadership roles. Navigate career transitions with expert insights from decades of industry experience.",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: GraduationCap,
      title: "Academic & Research Mentorship",
      description:
        "Comprehensive guidance for Ph.D. candidates and senior researchers. From research methodology to publication strategy and academic career development.",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Building,
      title: "Corporate & Institutional Advisory",
      description:
        "High-level consulting for colleges and corporations on technical education quality, curriculum development, and institutional excellence.",
      gradient: "from-orange-500/10 to-red-500/10",
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-services-headline"
          >
            Executive & Academic Guidance
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-services-subheadline">
            Tailored consulting services for professionals and institutions
            seeking excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="group h-full hover-elevate transition-all hover:shadow-xl hover:scale-105 border-card-border bg-card/50 backdrop-blur-sm"
                data-testid={`card-service-${index}`}
              >
                <CardHeader>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid={`text-service-desc-${index}`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
