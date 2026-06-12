'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function AboutClient() {
  const t = useTranslations('About');
  
  return (
    <main className="min-h-screen bg-brand-50">
      <Navbar />
      
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-display font-bold text-brand-950 mb-12 tracking-tighter"
        >
          {t('title')}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg text-brand-800/80 mb-16"
        >
          <p>{t('story')}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-brand-950 text-white p-10 rounded-[2.5rem] shadow-2xl"
        >
          <h2 className="text-3xl font-display font-bold mb-6 text-brand-100">{t('devTitle')}</h2>
          <p className="text-brand-200 leading-relaxed text-lg">{t('devStory')}</p>
        </motion.div>
      </section>
      
      <Footer />
    </main>
  );
}
