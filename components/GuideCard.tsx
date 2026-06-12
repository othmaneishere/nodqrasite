'use client';

import { motion } from 'motion/react';
import { ArrowRight, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Guide } from '@/lib/data';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface GuideCardProps {
  guide: Guide;
  categoryId: string;
}

export default function GuideCard({ guide, categoryId }: GuideCardProps) {
  const Icon = guide.icon;
  const t = useTranslations();

  return (
    <Link href={`/guide/${guide.id}`} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative h-full flex flex-col p-6 md:p-8 rounded-[2.5rem] bg-white border border-brand-200/50 shadow-xl hover:shadow-2xl hover:border-brand-600/30 transition-all duration-500 overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
 
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-950 group-hover:text-white transition-all duration-700 shadow-inner"
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-[10px] font-black text-brand-400 uppercase tracking-widest border border-brand-100 shadow-sm">
                <Clock className="w-3 h-3" /> {t('Common.minRead', { minutes: 5 })}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl md:text-2xl font-display font-bold text-brand-950 mb-3 group-hover:text-brand-600 transition-colors leading-[1.1] tracking-tighter">
              {t(`Categories.${categoryId}.guides.${guide.id}`)}
            </h4>
            <p className="text-brand-800/60 text-base leading-relaxed font-medium line-clamp-2 mb-6">
              {t(`Categories.${categoryId}.guides.${guide.id}-desc`)}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-brand-100 mt-auto">
            <div className="flex items-center gap-2 text-brand-950 font-black text-xs group-hover:gap-4 transition-all uppercase tracking-wider">
              {t('Common.readGuide')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2 rtl:rotate-180" />
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-950 group-hover:text-white transition-all shadow-sm">
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>
        </div>
        
        {/* Decorative Background Icon */}
        <Icon className="absolute -right-16 -bottom-16 w-64 h-64 text-brand-50 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-1000 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
