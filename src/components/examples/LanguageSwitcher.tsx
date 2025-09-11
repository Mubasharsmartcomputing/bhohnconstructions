import LanguageSwitcher from '../LanguageSwitcher';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';

export default function LanguageSwitcherExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="p-4">
          <LanguageSwitcher />
        </div>
      </Suspense>
    </I18nextProvider>
  );
}