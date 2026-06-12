'use client';

import { motion, useScroll } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, Star, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/lib/data';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Index');
  
  return (
    <main ref={containerRef} className="min-h-screen bg-brand-50 selection:bg-brand-950 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-brand-700 text-xs font-bold mb-8 border border-brand-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('hero.badge')}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl md:text-6xl font-display font-bold text-brand-950 mb-6 leading-[1.1] tracking-tighter text-balance"
              dangerouslySetInnerHTML={{ __html: t.raw('hero.title') }}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-800/70 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                href="#categories"
                className="w-full sm:w-auto bg-brand-950 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-950/20 flex items-center justify-center gap-2 group"
              >
                {t('hero.cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
              <Link 
                href="#about"
                className="w-full sm:w-auto bg-white/60 backdrop-blur-md text-brand-950 border border-brand-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-100 transition-all"
              >
                {t('hero.learnMore')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background blobs - Simplified */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-brand-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[40rem] h-[40rem] bg-brand-300 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-950 mb-6 tracking-tighter" dangerouslySetInnerHTML={{ __html: t.raw('categories.title') }} />
            <p className="text-lg text-brand-800/60 font-medium leading-relaxed">
              {t('categories.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-brand-200/50 card-shadow hover:card-shadow-hover transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-brand-700" />
                  </div>
                  <h4 className="text-base font-bold text-brand-950 mb-1">{t('why.community')}</h4>
                  <p className="text-brand-800/60 text-xs leading-relaxed">{t('why.communityDesc')}</p>
                </div>
                <div className="bg-brand-950 p-6 rounded-2xl shadow-xl text-white">
                  <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-400" />
                  </div>
                  <h4 className="text-base font-bold mb-1">{t('why.verified')}</h4>
                  <p className="text-brand-300 text-xs leading-relaxed">{t('why.verifiedDesc')}</p>
                </div>
                <div className="bg-brand-600 p-6 rounded-2xl shadow-xl text-white">
                  <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-brand-100" />
                  </div>
                  <h4 className="text-base font-bold mb-1">{t('why.practical')}</h4>
                  <p className="text-brand-100 text-xs leading-relaxed">{t('why.practicalDesc')}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-brand-200/50 card-shadow hover:card-shadow-hover transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-brand-700" />
                  </div>
                  <h4 className="text-base font-bold text-brand-950 mb-1">{t('why.topRated')}</h4>
                  <p className="text-brand-800/60 text-xs leading-relaxed">{t('why.topRatedDesc')}</p>
                </div>
              </div>
            </motion.div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-950 mb-8 leading-[1.1] tracking-tighter" dangerouslySetInnerHTML={{ __html: t.raw('why.title') }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="build-plan" className="py-24 bg-brand-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-950 mb-6 tracking-tighter leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.raw('cta.title') }} />
            <p className="text-lg text-brand-800/70 mb-10 font-medium max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <Link 
              href="#categories"
              className="inline-flex items-center gap-3 bg-brand-950 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-950/30 group"
            >
              {t('cta.button')} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="flex flex-wrap gap-20 p-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <BookOpen key={i} className="w-20 h-20" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
