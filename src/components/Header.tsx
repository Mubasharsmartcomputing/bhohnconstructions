import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from './ThemeProvider';
const logoImg = '/bhohn.png';

export default function Header() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' : 'bg-transparent'
    } dark:bg-white dark:text-black`}>
      <div className="w-full px-2 mx-auto sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src={logoImg} 
              alt="Bhohn Construction" 
              className="w-auto h-8 sm:h-10 lg:h-12"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-4 md:flex lg:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-medium transition-colors duration-200 hover:text-primary whitespace-nowrap"
                data-testid={`link-${item.href.replace('#', '')}`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center flex-shrink-0 gap-1 sm:gap-2">
           
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hover-elevate"
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? 
                <Moon className="w-5 h-5" /> : 
                <Sun className="w-5 h-5" />
              }
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover-elevate"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? 
                <X className="w-6 h-6" /> : 
                <Menu className="w-6 h-6" />
              }
            </Button>

             <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Outside the container for full width */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 border-b shadow-lg md:hidden top-full bg-background/95 backdrop-blur-lg">
          <div className="px-2 py-3 mx-auto sm:px-4 sm:py-4 max-w-7xl">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="py-2 font-medium text-left transition-colors duration-200 text-foreground hover:text-primary"
                  data-testid={`mobile-link-${item.href.replace('#', '')}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}