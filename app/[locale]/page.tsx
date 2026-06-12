import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });
  
  return {
    title: t('title'),
    description: t('hero.description'),
    openGraph: {
      title: `${t('title')} | Master Adulting in Morocco`,
      description: t('hero.description'),
    }
  };
}

export default function Page() {
  return <HomeClient />;
}
