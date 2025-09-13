import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Shield, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImg from '/about.png?url';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Award,
      title: t('about.features.quality'),
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Users,
      title: t('about.features.experience'),
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: Shield,
      title: t('about.features.guarantee'),
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: Heart,
      title: t('about.features.service'),
      color: 'bg-rose-500/10 text-rose-600'
    }
  ];

  useEffect(() => {
    // Animate content
    gsap.fromTo(contentRef.current, 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate features with stagger
    if (featuresRef.current?.children) {
      gsap.fromTo(featuresRef.current.children, 
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
                {t('about.title')}
              </h2>
              <p className="text-xl text-primary font-semibold">
                {t('about.subtitle')}
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-4 hover-elevate transition-all duration-300 bg-card/50 border-0"
                  data-testid={`card-feature-${index}`}
                >
                  <CardContent className="p-0 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      {feature.title}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                {t('about.badges.qualified')}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                {t('about.badges.projects')}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                {t('about.badges.personalized')}
              </Badge>
            </div>
          </div>

          {/* About Image */}
          <div className="relative">
            <img 
              src={aboutImg} 
              alt="About Us" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}