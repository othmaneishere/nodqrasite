'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BookOpen, Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(253, 252, 251, 0)', 'rgba(253, 252, 251, 0.95)']
  );
  
  const borderOpacity = useTransform(
    scrollY,
    [0, 50],
    ['rgba(238, 231, 225, 0)', 'rgba(238, 231, 225, 1)']
  );

  const blurValue = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );
  
  const navHeight = useTransform(
    scrollY,
    [0, 50],
    ['5rem', '4rem']
  );

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' }
  ];

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottomColor: borderOpacity, backdropFilter: blurValue }}
      className="sticky top-0 z-50 border-b transition-all duration-500 ease-in-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ height: navHeight }} className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="bg-brand-950 p-2 rounded-xl shadow-lg shadow-brand-950/20"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-display font-bold text-2xl tracking-tighter text-brand-950">
              NodQra<span className="text-brand-600">.ma</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-bold text-brand-800 hover:text-brand-950 transition-all relative group">
                {t('home')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full" />
              </Link>
              <Link href="/#categories" className="text-sm font-bold text-brand-800 hover:text-brand-950 transition-all relative group">
                {t('categories')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full" />
              </Link>
              <Link href="/about" className="text-sm font-bold text-brand-800 hover:text-brand-950 transition-all relative group">
                {t('about')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full" />
              </Link>
            </div>

            <div className="h-6 w-px bg-brand-200 mx-2" />

            {/* Language Switcher */}
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-brand-400" />
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-all ${
                      locale === lang.code 
                        ? 'bg-brand-950 text-white' 
                        : 'text-brand-500 hover:bg-brand-100'
                    }`}
                  >
                    {lang.code}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/#build-plan" 
              className="bg-brand-950 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-950/10 hover:shadow-brand-950/20 flex items-center gap-2 group"
            >
              {t('join')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-brand-800 hover:bg-brand-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:hidden bg-white border-b border-brand-200 px-4 py-8 flex flex-col gap-6 overflow-hidden"
          >
          <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold text-brand-800 hover:text-brand-950">
            {t('home')}
          </Link>
          <Link href="/#categories" onClick={() => setIsOpen(false)} className="text-xl font-bold text-brand-800 hover:text-brand-950">
            {t('categories')}
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-xl font-bold text-brand-800 hover:text-brand-950">
            {t('about')}
          </Link>
          
          <div className="flex items-center gap-4 py-4 border-y border-brand-100">
            <Globe className="w-5 h-5 text-brand-400" />
            <div className="flex gap-3">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={pathname}
                  locale={lang.code}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all ${
                    locale === lang.code 
                      ? 'bg-brand-950 text-white' 
                      : 'text-brand-500 bg-brand-50'
                  }`}
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>

          <Link 
            href="/#build-plan" 
            onClick={() => setIsOpen(false)}
            className="bg-brand-950 text-white px-6 py-4 rounded-2xl text-center font-bold shadow-lg"
          >
            {t('join')}
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
}
