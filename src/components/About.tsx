import { useState, useRef, useEffect } from 'react';
import { Code, Palette, Lightbulb, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices.',
      color: 'text-blue-500'
    },
    {
      icon: Palette,
      title: 'Beautiful Design',
      description: 'Creating visually appealing interfaces with attention to detail and user experience.',
      color: 'text-purple-500'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Turning complex challenges into simple, elegant solutions.',
      color: 'text-yellow-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and cross-platform compatibility.',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with 3+ years of experience creating 
            digital solutions that make a difference. I love combining technology with 
            creativity to build applications that are both functional and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="glass hover-lift border-border/20"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-card/50 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column - Personal Info */}
          <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Card className="glass shadow-card hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gradient">My Journey</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Started my journey in web development 3 years ago, and since then 
                    I've been constantly learning and improving my skills. What began 
                    as curiosity has become a genuine passion for creating digital experiences.
                  </p>
                  <p>
                    I specialize in React, TypeScript, and modern web technologies, 
                    always staying up-to-date with the latest trends and best practices 
                    in the industry.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or sharing knowledge with 
                    the developer community.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Experience</h4>
                    <p className="text-2xl font-bold">3+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Projects</h4>
                    <p className="text-2xl font-bold">25+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;