import { GraduationCap, Users, TrendingUp } from "lucide-react";

export default function AboutSection() {
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                {/* TODO: Replace this placeholder URL with the actual profile picture */}
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop"
                  alt="Dr. Shrikant Kallurkar"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="order-1 md:order-2">
            <h2
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6"
              data-testid="text-about-headline"
            >
              About Dr. Shrikant Kallurkar
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
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
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-accent/30 rounded-lg hover-elevate transition-all"
                  data-testid={`card-achievement-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1" data-testid={`text-achievement-title-${index}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-achievement-desc-${index}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
