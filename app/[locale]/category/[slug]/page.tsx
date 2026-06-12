import { Metadata } from 'next';
import CategoryClient from './CategoryClient';
import { categories } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: `Categories.${category.id}` });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: `${t('title')} | NodQra`,
      description: t('description'),
      type: 'article',
    }
  };
}

export default function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  return <CategoryClient params={params} />;
}
