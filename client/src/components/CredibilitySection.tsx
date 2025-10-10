import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import worldBankLogo from "@assets/world bank_1760085660501.png";

export default function CredibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const institutions = [
    {
      name: "The World Bank",
      logo: worldBankLogo,
    },
    {
      name: "Government of India",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "ResearchGate",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg",
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
              className="group flex items-center justify-center p-4 sm:p-6 bg-card/30 backdrop-blur-sm border border-card-border rounded-xl hover-elevate transition-all hover:shadow-lg"
              data-testid={`card-institution-${index}`}
            >
              <img
                src={institution.logo}
                alt={institution.name}
                className="h-12 sm:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                data-testid={`img-institution-${index}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
