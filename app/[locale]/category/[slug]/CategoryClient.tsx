'use client';
export const dynamic = 'force-dynamic';

import { use, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowLeft, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuideCard from '@/components/GuideCard';
import { categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);
  const t = useTranslations();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!category) {
    notFound();
  }

  const Icon = category.icon;
  const catT = useTranslations(`Categories.${category.id}`);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-50 selection:bg-brand-950 selection:text-white">
      <Navbar />

      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-black text-brand-400 uppercase tracking-[0.2em] mb-8"
          >
            <Link href="/" className="hover:text-brand-950 transition-colors">{t('Common.home')}</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30 rtl:rotate-180" />
            <span className="text-brand-950">{catT('title')}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
              style={{ y: headerY, opacity }}
              className="lg:col-span-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex p-4 rounded-2xl ${category.color} mb-8 shadow-xl relative group overflow-hidden`}
              >
                <Icon className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-3xl md:text-5xl font-display font-bold text-brand-950 mb-6 leading-[0.9] tracking-tighter"
              >
                {catT('title')}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-brand-800/70 max-w-xl leading-tight font-medium"
              >
                {catT('description')}
              </motion.p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="hidden lg:flex lg:col-span-4 justify-end pt-20"
            >
              <div className="relative">
                <div className="text-[12rem] font-black text-brand-950/[0.03] leading-none select-none tracking-tighter rotate-90 origin-bottom-right whitespace-nowrap">
                  EXPLORE {catT('title').split(' ')[0]}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section Header */}
          <div className="mt-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-100 pb-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                <LayoutGrid className="w-3 h-3" /> {t('Common.categoryPage.catalog')}
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-950 tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('Common.categoryPage.title') }} />
            </div>
            <div className="text-right rtl:text-left text-sm font-bold text-brand-500 max-w-xs">
              {t('Common.categoryPage.subtitle')}
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {category.guides.map((guide, idx) => (
              <GuideCard key={guide.id} guide={guide} categoryId={category.id} />
            ))}
          </div>

          {/* Bottom Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-[2.5rem] bg-brand-950 text-white overflow-hidden relative shadow-3xl group"
          >
            <div className="relative z-10 mb-6 md:mb-0 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tighter leading-tight">{t('Common.exploreOther')}</h2>
              <p className="text-brand-300 text-base font-medium leading-relaxed">{t('Common.exploreOtherDesc')}</p>
            </div>
            <Link 
              href="/"
              className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-950 font-black hover:bg-brand-50 hover:-translate-y-1 transition-all shadow-2xl text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2 rtl:rotate-180" /> {t('Common.backToHome').toUpperCase()}
            </Link>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
              <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
              <Icon className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10" />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
