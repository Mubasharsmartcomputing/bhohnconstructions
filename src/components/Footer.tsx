import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
// cSpell:ignore bhohn
const logoImg = '/bhohn.png';

export default function Footer() {
  const { t } = useTranslation();
  const { staggerAnimation } = useScrollAnimations();
  const footerRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
    // todo: remove mock functionality - Add real social media links
  };

  useEffect(() => {
    if (footerRef.current?.children) {
      staggerAnimation(Array.from(footerRef.current.children) as HTMLElement[], {
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        start: "top 90%"
      });
    }
  }, [staggerAnimation]);

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div ref={footerRef} className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={logoImg} 
              alt="Bhohn Construction" 
              className="h-12 w-auto dark:hidden"
            />
            <p className="text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover-elevate"
                  onClick={() => handleSocialClick(social.label)}
                  data-testid={`button-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                  data-testid={`footer-link-${item.href.replace('#', '')}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              {t('footer.links.services')}
            </h4>
            <nav className="flex flex-col space-y-3">
              <span className="text-muted-foreground">Plâtrerie</span>
              <span className="text-muted-foreground">Revêtements de Sol</span>
              <span className="text-muted-foreground">Peinture</span>
              <span className="text-muted-foreground">Rénovation</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+33 1 42 65 78 90</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">info@bhohnconstruction.com</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm">Avenue des Champs-Élysées 75<br />75008 Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Bhohn Construction. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button 
              className="hover:text-primary transition-colors duration-200"
              onClick={() => console.log('Privacy policy clicked')}
              data-testid="link-privacy"
            >
              Politique de Confidentialité
            </button>
            <button 
              className="hover:text-primary transition-colors duration-200"
              onClick={() => console.log('Terms clicked')}
              data-testid="link-terms"
            >
              {t('footer.links.legal')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}