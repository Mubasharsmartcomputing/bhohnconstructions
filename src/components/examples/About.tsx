import About from '../About';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { Suspense } from 'react';

export default function AboutExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-background">
          <About />
        </div>
      </Suspense>
    </I18nextProvider>
  );
}