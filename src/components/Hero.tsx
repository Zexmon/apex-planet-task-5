import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    'Full Stack Developer',
    'UI/UX Designer', 
    'Problem Solver',
    'Code Enthusiast'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-gradient">Alex</span>
          </h1>
          
          <div className="text-2xl md:text-4xl font-light mb-8 h-16 flex items-center justify-center">
            <span 
              key={currentTitle}
              className="animate-fade-in text-muted-foreground"
            >
              {titles[currentTitle]}
            </span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Passionate about creating beautiful, functional, and user-centered digital experiences.
            I bring ideas to life through code and design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-soft hover-lift px-8 py-3"
              onClick={() => scrollToNext()}
            >
              View My Work
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:bg-primary/10 hover-lift px-8 py-3"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#contact', label: 'Email' },
            ].map((social, index) => (
              <Button
                key={social.label}
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-primary hover-lift rounded-full p-3"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;