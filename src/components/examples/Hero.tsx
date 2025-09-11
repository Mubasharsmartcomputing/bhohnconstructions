import Hero from '../Hero';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { Suspense } from 'react';

export default function HeroExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
    </I18nextProvider>
  );
}