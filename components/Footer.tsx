'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className="bg-brand-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <span className="text-3xl font-display font-black tracking-tighter">
                NodQra<span className="text-brand-500">.ma</span>
              </span>
            </Link>
            <p className="text-brand-400 text-lg leading-relaxed mb-10 max-w-sm">
              {t('description')}
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8">{t('resources')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('work'), href: '/category/work-career' },
                { name: t('admin'), href: '/category/administration' },
                { name: t('study'), href: '/category/study-skills' },
                { name: 'Finance', href: '/category/money-finance' },
                { name: 'Digital', href: '/category/digital-life' },
                { name: 'Family', href: '/category/relationships-family' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-brand-300 hover:text-white transition-colors flex items-center justify-between group">
                    {link.name} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all rtl:rotate-270" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8">{t('company')}</h4>
            <ul className="space-y-4">
              {[t('about'), t('mission'), t('contact'), t('join')].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-brand-300 hover:text-white transition-colors flex items-center justify-between group">
                    {link} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all rtl:rotate-270" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-[2rem] bg-brand-900/50 border border-brand-800">
              <h4 className="text-xl font-bold mb-6">{t('stayUpdated')}</h4>
              <p className="text-brand-400 text-sm mb-6">{t('newsletterDesc')}</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={t('emailPlaceholder')} 
                  className="flex-1 bg-brand-950 border border-brand-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 transition-colors font-bold text-sm">
                  {t('joinButton')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-brand-500 text-sm font-medium">
            © {currentYear} NodQra Morocco. {t('rights')}
          </div>
          <div className="flex gap-8 text-sm font-bold text-brand-400">
            <Link href="#" className="hover:text-white transition-colors">{t('privacy')}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t('terms')}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t('cookies')}</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

