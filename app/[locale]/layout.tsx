import type { Metadata } from 'next';
import { Inter, Outfit, Cairo } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // Fetch messages for the locale to use in metadata
  const messages: any = (await import(`../../messages/${locale}.json`)).default;
  const meta = messages.Index.metadata;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nodqra.ma';
  
  return {
    title: {
      template: `%s | ${messages.Index.title}`,
      default: meta.title,
    },
    description: meta.description,
    keywords: ['Morocco', 'Adulting', 'Career', 'Administration', 'Life Skills', 'Youth', 'Guides', 'Practical'],
    authors: [{ name: 'NodQra Team' }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'ar-MA': '/ar',
        'fr-MA': '/fr',
        'en-US': '/en',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: baseUrl,
      siteName: messages.Index.title,
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!['ar', 'fr', 'en'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className={`${inter.variable} ${outfit.variable} ${cairo.variable}`}>
      <body className="bg-[#FDFCFB] text-slate-900 antialiased font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
