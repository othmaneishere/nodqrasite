import { Metadata } from 'next';
import GuideClient from './GuideClient';
import { categories } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  
  let guide = null;
  let category = null;
  
  for (const cat of categories) {
    const found = cat.guides.find(g => g.id === id);
    if (found) {
      guide = found;
      category = cat;
      break;
    }
  }

  if (!guide || !category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: `Categories.${category.id}.guides` });
  
  return {
    title: t(guide.id),
    description: t(`${guide.id}-desc`),
    openGraph: {
      title: `${t(guide.id)} | NodQra`,
      description: t(`${guide.id}-desc`),
      type: 'article',
    }
  };
}

export default function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  return <GuideClient params={params} />;
}
