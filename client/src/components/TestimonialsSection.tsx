import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Dr. Kallurkar's guidance was instrumental in helping me navigate my Ph.D. research. His expertise and patience made all the difference in my academic journey.",
      author: "Dr. Priya Sharma",
      role: "Ph.D. Scholar, IIT Mumbai",
    },
    {
      quote:
        "The strategic career session gave me clarity on my next steps. Dr. Kallurkar's insights helped me successfully transition into a senior leadership role.",
      author: "Rajesh Mehta",
      role: "Senior Manager, Technology",
    },
    {
      quote:
        "Working with Dr. Kallurkar on our institutional quality improvement was transformative. His World Bank experience brought invaluable perspectives.",
      author: "Prof. Anita Desai",
      role: "Dean, Engineering College",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="text-testimonials-headline"
          >
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-testimonials-subheadline">
            Trusted by professionals and academics worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 italic" data-testid={`text-testimonial-quote-${index}`}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
