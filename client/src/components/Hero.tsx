import { Award, Briefcase, Building2 } from "lucide-react";

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
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            data-testid="text-hero-headline"
          >
            45 Years of Academic & Research Excellence
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            data-testid="text-hero-subheadline"
          >
            Strategic career guidance for mid-career professionals, academics,
            and researchers from a World Bank mentor and Google-recognized
            scientist.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate transition-all"
              data-testid={`card-stat-${index}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </h3>
              <p className="text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
