import { Linkedin, Facebook, Mail, MapPin, Phone } from "lucide-react";
import logo from "@assets/logo_1760082720574.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dr-shrikant-kallurkar-006a4335",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:shrkntkallurkar5@gmail.com",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-muted/80 via-muted/50 to-background border-t overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Level Up Pune"
              className="h-14 w-auto mb-6"
              data-testid="img-footer-logo"
            />
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Empowering students and professionals with 45 years of academic excellence 
              and world-class mentorship from Dr. Shrikant Kallurkar.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:+91" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm group inline-flex items-center gap-2"
                    data-testid={`link-footer-${link.id}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-lg">Connect With Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-xl bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                  data-testid={`link-footer-social-${index}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Follow us for updates, insights, and success stories.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {new Date().getFullYear()} Level Up Pune. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80" data-testid="text-partnership">
              In partnership with Mentoria for enhanced career guidance services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
