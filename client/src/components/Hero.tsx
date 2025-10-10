import { Award, Briefcase, Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const stats = [
    {
      icon: Award,
      value: "45 Years",
      label: "of Experience",
    },
    {
      icon: Building2,
      value: "Mentor & Auditor",
      label: "for The World Bank",
    },
    {
      icon: Briefcase,
      value: "Recognized Global Scientist",
      label: "by Google",
    },
  ];

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">World-Class Expertise</span>
          </motion.div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            data-testid="text-hero-headline"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              45 Years of Academic &
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              Research Excellence
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subheadline"
          >
            Strategic career guidance for mid-career professionals, academics,
            and researchers from a World Bank mentor and Google-recognized
            scientist.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group bg-card/50 backdrop-blur-sm border border-card-border rounded-xl p-6 sm:p-8 text-center hover-elevate transition-all hover:shadow-lg hover:scale-105"
              data-testid={`card-stat-${index}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
