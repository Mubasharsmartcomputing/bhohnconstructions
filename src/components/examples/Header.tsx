import Header from '../Header';
import { ThemeProvider } from '../ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { Suspense } from 'react';

export default function HeaderExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="min-h-screen bg-background">
            <Header />
            <div className="pt-20 p-8">
              <h2 className="text-2xl font-bold">Header Component</h2>
              <p className="text-muted-foreground mt-2">Scroll down to see the header background change</p>
              <div className="h-screen bg-gradient-to-b from-muted/20 to-background"></div>
            </div>
          </div>
        </Suspense>
      </ThemeProvider>
    </I18nextProvider>
  );
}