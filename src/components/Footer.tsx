import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card/20 border-t border-border/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-4">Alex Portfolio</h3>
            <p className="text-muted-foreground mb-4">
              Crafting digital experiences with passion and precision.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary hover-lift rounded-full p-2"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 block"
                  >
                    {link.label}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>alex@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="mt-4 hover-lift"
            >
              Back to Top
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> using React & TypeScript
            </p>
            <p>&copy; {currentYear} Alex Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;