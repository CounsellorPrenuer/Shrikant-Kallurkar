import { TrendingUp, GraduationCap, Building, Sparkles, Briefcase } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCms } from "@/hooks/useCms";
import { imageUrl } from "@/lib/sanity";

const iconPool = [TrendingUp, GraduationCap, Building, Sparkles];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useCms();
  const services = data?.services ?? [];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="text-services-headline">
            Executive & Academic Guidance
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-services-subheadline">
            Tailored consulting services for professionals and institutions seeking excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconPool[index % iconPool.length];
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full hover-elevate transition-all hover:shadow-xl border-card-border bg-card/50 backdrop-blur-sm overflow-hidden" data-testid={`card-service-${index}`}>
                  {service.image ? (
                    <img
                      src={imageUrl(service.image, 600)}
                      alt={service.image.alt || service.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-primary/50" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
