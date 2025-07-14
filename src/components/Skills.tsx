import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Next.js', level: 80 }
      ]
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Express.js', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 80 },
        { name: 'REST APIs', level: 90 }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Figma', level: 85 },
        { name: 'Webpack', level: 75 },
        { name: 'Jest', level: 80 }
      ]
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
    'Express.js', 'Next.js', 'Tailwind CSS', 'Docker', 'AWS', 'Git',
    'Jest', 'Figma', 'Webpack', 'REST APIs', 'GraphQL', 'Redux'
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through years of experience and continuous learning.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={category.title}
              className={`glass hover-lift shadow-card ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Tags */}
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold text-center mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <Badge 
                key={tech}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium glass hover-lift cursor-default"
                style={{ animationDelay: `${0.9 + index * 0.05}s` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;