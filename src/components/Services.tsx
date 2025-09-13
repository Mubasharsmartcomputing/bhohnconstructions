import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Home, Brush } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import plasteringImage from '/Professional_plastering_work_8ee8c1fa.png?url';
import flooringImage from '/Premium_flooring_installation_a82f9b83.png?url';
import paintingImage from '/Professional_painting_service_9fa77f17.png?url';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Palette,
      title: t('services.plastering.title'),
      description: t('services.plastering.description'),
      image: plasteringImage,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Home,
      title: t('services.flooring.title'),
      description: t('services.flooring.description'),
      image: flooringImage,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Brush,
      title: t('services.painting.title'),
      description: t('services.painting.description'),
      image: paintingImage,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate service cards with stagger
    if (cardsRef.current?.children) {
      gsap.fromTo(cardsRef.current.children, 
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleServiceClick = (serviceTitle: string) => {
    console.log(`${serviceTitle} service clicked`);
    // todo: remove mock functionality - Add service details modal or navigation
  };

  return (
    <section id="services" ref={sectionRef} className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover-elevate transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              data-testid={`card-service-${index}`}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </CardDescription>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  onClick={() => handleServiceClick(service.title)}
                  data-testid={`button-service-${index}`}
                >
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}