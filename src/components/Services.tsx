import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Home, Brush } from 'lucide-react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
const plasteringImage = '/Professional_plastering_work_8ee8c1fa.png';
const flooringImage = '/Premium_flooring_installation_a82f9b83.png';
const paintingImage = '/Professional_painting_service_9fa77f17.png';

export default function Services() {
  const { t } = useTranslation();
  const { fadeInUp, staggerAnimation } = useScrollAnimations();
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
      icon: Brush,
      title: t('services.painting.title'),
      description: t('services.painting.description'),
      image: paintingImage,
      color: 'from-orange-500 to-orange-600'
    },
     {
      icon: Home,
      title: t('services.flooring.title'),
      description: t('services.flooring.description'),
      image: flooringImage,
      color: 'from-green-500 to-green-600'
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      fadeInUp(titleRef.current, { duration: 1 });
    }

    if (cardsRef.current?.children) {
      staggerAnimation(Array.from(cardsRef.current.children) as HTMLElement[], {
        y: 80,
        stagger: 0.2,
        duration: 0.8
      });
    }
  }, [fadeInUp, staggerAnimation]);

  const handleServiceClick = (serviceTitle: string) => {
    console.log(`${serviceTitle} service clicked`);
    // todo: remove mock functionality - Add service details modal or navigation
  };

  return (
    <section id="services" ref={sectionRef} className="py-16 lg:py-24 bg-muted/30">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            {t('services.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden transition-all duration-300 border-0 group hover-elevate bg-card/50 backdrop-blur-sm"
              data-testid={`card-service-${index}`}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon Overlay */}
                <div className="absolute p-3 rounded-full top-4 right-4 bg-white/20 backdrop-blur-sm">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold transition-colors duration-300 text-foreground group-hover:text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="mb-6 leading-relaxed text-muted-foreground">
                  {service.description}
                </CardDescription>
                
                <Button 
                  variant="ghost" 
                  className="justify-center w-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
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