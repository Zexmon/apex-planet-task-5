import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
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

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with modern design, secure payments, and admin dashboard.',
      image: '/api/placeholder/400/250',
      category: 'Full Stack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team functionality.',
      image: '/api/placeholder/400/250',
      category: 'Frontend',
      technologies: ['React', 'TypeScript', 'Socket.io', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts and interactive maps.',
      image: '/api/placeholder/400/250',
      category: 'Frontend',
      technologies: ['React', 'API Integration', 'Charts.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Blog CMS',
      description: 'Content management system with rich text editor and SEO optimization.',
      image: '/api/placeholder/400/250',
      category: 'Full Stack',
      technologies: ['Next.js', 'MongoDB', 'JWT', 'MDX'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      image: '/api/placeholder/400/250',
      category: 'Frontend',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'API Service',
      description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
      image: '/api/placeholder/400/250',
      category: 'Backend',
      technologies: ['Express.js', 'PostgreSQL', 'JWT', 'Swagger'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and personal projects demonstrating various skills and technologies.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap gap-2 p-1 bg-muted/50 rounded-lg glass">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 ${
                  activeFilter === category 
                    ? 'bg-gradient-primary text-primary-foreground shadow-soft' 
                    : 'hover:bg-muted/80'
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`group glass hover-lift shadow-card overflow-hidden ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              } ${project.featured ? 'lg:col-span-2' : ''}`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-secondary rounded-t-lg flex items-center justify-center">
                  <div className="text-6xl opacity-20">🚀</div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Button size="sm" variant="secondary" className="shadow-lg">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="shadow-lg bg-background/20">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="glass">
                    {project.category}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <Button variant="outline" size="lg" className="hover-lift">
            <Github className="mr-2 h-4 w-4" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;