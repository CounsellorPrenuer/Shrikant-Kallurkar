import { GraduationCap, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      icon: Users,
      title: "Guided 23 Ph.D. Candidates",
      description: "Successfully mentored doctoral researchers to completion",
    },
    {
      icon: GraduationCap,
      title: "Mentor for Govt. of India TEQIP",
      description: "Technical Education Quality Improvement Programme",
    },
    {
      icon: TrendingUp,
      title: "Top 14% Global Researcher",
      description: "According to ResearchGate rankings",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-2xl">
                {/* TODO: Replace this placeholder URL with the actual profile picture */}
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop"
                  alt="Dr. Shrikant Kallurkar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-testid="img-profile"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
              data-testid="text-about-headline"
            >
              About Dr. Shrikant Kallurkar
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              <p data-testid="text-about-bio-1">
                With over 45 years of distinguished experience in academia and
                research, Dr. Shrikant Kallurkar has established himself as a
                leading voice in technical education and professional development.
              </p>
              <p data-testid="text-about-bio-2">
                As a mentor and auditor for The World Bank and a recognized global
                scientist by Google, Dr. Kallurkar brings unparalleled expertise
                in guiding mid-career professionals, academics, and researchers
                toward their next breakthrough.
              </p>
              <p data-testid="text-about-bio-3">
                His work with the Government of India's TEQIP programme and his
                guidance of 23 Ph.D. candidates demonstrates his commitment to
                nurturing the next generation of leaders and innovators.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group flex gap-4 p-4 sm:p-5 bg-card/50 backdrop-blur-sm border border-card-border rounded-xl hover-elevate transition-all hover:shadow-md"
                  data-testid={`card-achievement-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <achievement.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1" data-testid={`text-achievement-title-${index}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-achievement-desc-${index}`}>
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
