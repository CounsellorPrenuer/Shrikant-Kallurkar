export default function CredibilitySection() {
  const institutions = [
    {
      name: "The World Bank",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/8d/World_Bank_logo.svg",
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
          data-testid="text-credibility-headline"
        >
          Trusted by Global Institutions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {institutions.map((institution, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-lg hover-elevate transition-all"
              data-testid={`card-institution-${index}`}
            >
              <img
                src={institution.logo}
                alt={institution.name}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                data-testid={`img-institution-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
