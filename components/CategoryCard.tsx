'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/data';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = category.icon;
  const t = useTranslations(`Categories.${category.id}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group"
    >
      <Link href={`/category/${category.slug}`}>
        <div className={`relative h-full p-8 rounded-[2.5rem] border ${category.color} card-shadow transition-all duration-700 group-hover:card-shadow-hover overflow-hidden bg-white/40 backdrop-blur-sm`}>
          <div className="relative z-10">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="mb-6 inline-flex p-4 rounded-2xl bg-white shadow-sm transition-all duration-500"
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            
            <h3 className="text-xl font-display font-bold mb-2 text-brand-950 tracking-tight">{t('title')}</h3>
            <p className="text-brand-800/70 mb-6 leading-relaxed text-base font-medium">
              {t('description')}
            </p>
            
            <div className="space-y-3 mb-8">
              {category.guides.slice(0, 3).map((guide) => (
                <div key={guide.id} className="flex items-center gap-2 text-xs font-bold text-brand-900/60 group-hover:text-brand-950 transition-colors">
                  <div className="w-1 h-1 rounded-full bg-brand-400 group-hover:scale-150 transition-transform" />
                  {t(`guides.${guide.id}`)}
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 group-hover:gap-3 transition-all duration-300">
              {t('explore')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>

          {/* Decorative background element */}
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="absolute -right-12 -bottom-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none"
          >
            <Icon className="w-64 h-64" />
          </motion.div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
