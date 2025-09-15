import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères')
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { fadeInUp, fadeInLeft, fadeInRight, staggerAnimation } = useScrollAnimations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    }
  });

  const services = [
    { value: 'plastering', label: t('services.plastering.title') },
    { value: 'flooring', label: t('services.flooring.title') },
    { value: 'painting', label: t('services.painting.title') },
    { value: 'multiple', label: 'Plusieurs services' },
    { value: 'other', label: 'Autre' }
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Appelez-nous',
      value: '+33 1 42 65 78 90',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      label: 'Envoyez-nous un email',
      value: 'info@bhohnconstruction.com',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      label: 'Notre adresse',
      value: 'Avenue des Champs-Élysées 75, 75008 Paris, France',
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      label: 'Horaires d\'ouverture',
      value: 'Lun-Ven: 8h-18h, Sam: 9h-17h',
      color: 'text-purple-600'
    }
  ];

  useEffect(() => {
    if (titleRef.current) {
      fadeInUp(titleRef.current, { duration: 1 });
    }

    if (formRef.current) {
      fadeInLeft(formRef.current, { duration: 1 });
    }

    if (infoRef.current) {
      fadeInRight(infoRef.current, { duration: 1 });
    }

    if (contactCardsRef.current?.children) {
      staggerAnimation(Array.from(contactCardsRef.current.children) as HTMLElement[], {
        stagger: 0.1,
        duration: 0.6
      });
    }
  }, [fadeInUp, fadeInLeft, fadeInRight, staggerAnimation]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    
    // todo: remove mock functionality - Integrate with real backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message envoyé!",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <Card ref={formRef} className="bg-card/50 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Demande de Devis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.name')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Votre nom complet" 
                              {...field} 
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.phone')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="06 12 34 56 78" 
                              {...field} 
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="votre@email.fr" 
                            {...field} 
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.service')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem 
                                key={service.value} 
                                value={service.value}
                              >
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre projet en détail..."
                            className="min-h-[120px]"
                            {...field} 
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div ref={contactCardsRef} className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate transition-all duration-300 bg-card/50 backdrop-blur-sm border-0"
                  data-testid={`card-contact-${index}`}
                >
                  <CardContent className="p-0 flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-muted/50 ${info.color}`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.label}</h3>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* France Map */}
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2906143723!2d2.3016005156743896!3d48.87037007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8d%3A0x40b82c3688c9460!2sChamps-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                width="100%" 
                height="300" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Notre localisation"
              ></iframe>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}