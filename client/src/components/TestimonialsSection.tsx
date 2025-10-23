import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote:
        "A truly transformative experience. Dr. Kallurkar’s innovative approach using the Bhagwad Geeta had a profound impact on my life, providing invaluable clarity and resilience.",
      author: "Dr. Gaurav Shivaji Wagh",
      role: "Cyber Security Engineer",
    },
    {
      quote:
        "Srikant Sir makes complex Vedic wisdom incredibly practical. His guidance was instrumental in significantly improving my self-confidence and stress management skills.",
      author: "Ashish Jain",
      role: "Delivery Manager, IT Services",
    },
    {
      quote:
        "His mentorship was pivotal. He helped me confront the fears that were holding me back and gave me the courage to pursue a dream I had long since buried.",
      author: "Dr. Shweta",
      role: "HOD Electronics, Renowned Engineering College",
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-testimonials-headline"
          >
            What Clients Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-testimonials-subheadline">
            Trusted by professionals and academics worldwide
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="group h-full hover-elevate transition-all hover:shadow-xl bg-card/50 backdrop-blur-sm border-card-border"
                data-testid={`card-testimonial-${index}`}
              >
                <CardContent className="pt-6 h-full flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <Quote className="w-10 h-10 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-foreground mb-6 italic leading-relaxed flex-grow" data-testid={`text-testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground" data-testid={`text-testimonial-author-${index}`}>
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
