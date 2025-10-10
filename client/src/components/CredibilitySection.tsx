import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Award, Search, Flag } from "lucide-react";

export default function CredibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const institutions = [
    {
      name: "The World Bank",
      icon: Building2,
      color: "from-blue-600 to-cyan-600",
    },
    {
      name: "Government of India",
      icon: Flag,
      color: "from-orange-600 to-amber-600",
    },
    {
      name: "Google",
      icon: Search,
      color: "from-red-600 to-blue-600",
    },
    {
      name: "ResearchGate",
      icon: Award,
      color: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background border-y">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-10 sm:mb-12"
          data-testid="text-credibility-headline"
        >
          Trusted by Global Institutions
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {institutions.map((institution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-card/30 backdrop-blur-sm border border-card-border rounded-xl hover-elevate transition-all hover:shadow-lg"
              data-testid={`card-institution-${index}`}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${institution.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <institution.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-center text-foreground">
                {institution.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
