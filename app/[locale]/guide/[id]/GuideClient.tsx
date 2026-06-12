'use client';
export const dynamic = 'force-dynamic';

import { use } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ChevronRight, Share2, Printer, Bookmark, Clock, User, Info, Lightbulb, ArrowRight, FileText, ListRestart, ExternalLink, Briefcase } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories, Guide, Category } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mistral } from '@mistralai/mistralai';
import { useState } from 'react';

export default function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations();
  const locale = useLocale();

  let guide: Guide | null = null;
  let category: Category | null = null;
  
  for (const cat of categories) {
    const found = cat.guides.find(g => g.id === id);
    if (found) {
      guide = found;
      category = cat;
      break;
    }
  }

  if (!guide || !category) {
    notFound();
  }

  const catT = useTranslations(`Categories.${category.id}`);
  const guideT = useTranslations(`Categories.${category.id}.guides`);

  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getSmartSummary = async () => {
    if (isAnalyzing || !guide) return;
    setIsAnalyzing(true);
    try {
      const client = new Mistral({ apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY });
      const guideContent = guideT.raw(`${guide.id}-content`);
      
      const response = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
          {
            role: "user",
            content: `Provide a very brief (2-3 sentences) smart summary or key takeaway for the following guide content. 
            
            IMPORTANT: Provide the response in the following language: ${locale === 'ar' ? 'Arabic' : locale === 'fr' ? 'French' : 'English'}.

            GUIDE CONTENT: \n\n ${guideContent}`
          }
        ]
      });

      if (response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
        setAiResponse(response.choices[0].message.content as string);
      }
    } catch (error) {
      console.error('AI Summary failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const Icon = guide.icon;

  return (
    <main className="min-h-screen bg-brand-50 selection:bg-brand-950 selection:text-white">
      <Navbar />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <article className="pt-12 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm font-bold text-brand-500/80 mb-8"
          >
            <Link href="/" className="hover:text-brand-950 transition-colors">{t('Common.home')}</Link>
            <ChevronRight className="w-4 h-4 opacity-30 rtl:rotate-180" />
            <Link href={`/category/${category.slug}`} className="hover:text-brand-950 transition-colors uppercase tracking-wider text-[10px] bg-white px-2 py-1 rounded-md border border-brand-100 shadow-sm">{catT('title')}</Link>
            <ChevronRight className="w-4 h-4 opacity-30 rtl:rotate-180" />
            <span className="text-brand-950 truncate max-w-[200px]">{guideT(guide.id)}</span>
          </motion.nav>

          <header className="mb-12 relative">
            <div className="absolute -left-20 top-0 hidden xl:block">
              <Link 
                href={`/category/${category.slug}`}
                className="w-12 h-12 rounded-full border border-brand-200 flex items-center justify-center text-brand-400 hover:text-brand-950 hover:bg-white transition-all shadow-sm group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex p-4 rounded-2xl ${category.color} mb-6 shadow-md relative overflow-hidden`}
            >
              <Icon className="w-8 h-8 relative z-10" />
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-display font-bold text-brand-950 mb-6 leading-[1.05] tracking-tighter text-balance"
            >
              {guideT(guide.id)}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-8 text-sm text-brand-500/80 font-bold pb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-200/50 flex items-center justify-center text-brand-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-brand-950 font-black">{t('Index.why.team')}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Verified Admin</div>
                </div>
              </div>

              <div className="h-8 w-px bg-brand-200 hidden md:block" />

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-400" />
                <span>{t('Common.minRead', { minutes: 5 })}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-[10px] uppercase tracking-tighter">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
              {t('Common.guidePage.updatedRecently')}
              </div>
              </motion.div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-start">
                {/* Main Content */}
                <div className="space-y-12">
              <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 md:p-12 rounded-[2.5rem] border border-brand-200/50 shadow-2xl shadow-brand-200/40 relative overflow-hidden"
              >
              <div className="absolute top-0 right-0 p-8 origin-center rotate-12 opacity-5 pointer-events-none">
                <Icon className="w-48 h-48" />
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 text-brand-400 mb-2 text-xs">
                  <Info className="w-4 h-4" />
                  <span className="uppercase tracking-[0.2em] font-black">{t('Common.guidePage.overview')}</span>
                </div>
                <p className="text-xl md:text-2xl font-display font-medium text-brand-900 border-l-4 border-brand-950 pl-8 leading-tight italic">
                  &quot;{guideT(`${guide.id}-desc`)}&quot;
                </p>
              </div>

              <div className="markdown-body">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-4xl font-display font-bold mt-16 mb-8 text-brand-950 tracking-tight">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-display font-bold mt-14 mb-6 text-brand-800 tracking-tight flex items-center gap-4">
                      <span className="w-8 h-1 bg-brand-950 rounded-full" /> {children}
                    </h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-display font-bold mt-10 mb-4 text-brand-950 tracking-tight">{children}</h3>,
                    p: ({ children }) => <p className="text-lg leading-relaxed text-brand-800/80 mb-8 font-medium">{children}</p>,
                    ul: ({ children }) => <ul className="space-y-4 mb-10 pl-6 list-none">{children}</ul>,
                    li: ({ children }) => <li className="flex items-start gap-4 text-lg text-brand-800/80 font-medium before:content-[''] before:mt-2.5 before:w-2 before:h-2 before:rounded-full before:bg-brand-400 before:flex-shrink-0">{children}</li>,
                    strong: ({ children }) => <strong className="text-brand-950 font-black">{children}</strong>,
                    a: ({ children, href }) => <a href={href} className="text-brand-600 underline decoration-2 underline-offset-4 font-bold hover:text-brand-950 transition-colors uppercase tracking-wide text-sm">{children}</a>,
                    blockquote: ({ children }) => <blockquote className="bg-brand-50 p-8 border-l-8 border-brand-950 rounded-r-3xl italic text-2xl font-serif text-brand-800 my-10">{children}</blockquote>
                  }}
                >
                  {guideT.raw(`${guide.id}-content`)}
                </ReactMarkdown>
              </div>

              {id === 'cv-writing' && (
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-brand-950 to-brand-800 text-white relative overflow-hidden shadow-2xl"
                >
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-md text-center md:text-left rtl:md:text-right">
                      <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">{t('CVMaker.title')}</h3>
                      <p className="text-brand-300 text-base font-medium leading-relaxed">{t('CVMaker.description')}</p>
                    </div>
                    <Link 
                      href="/cv-builder"
                      className="px-8 py-4 rounded-xl bg-white text-brand-950 font-black hover:bg-brand-100 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                      {t('CVMaker.cta')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                  <FileText className="absolute -right-10 -top-10 w-64 h-64 text-white/5 rotate-12" />
                </motion.section>
              )}

              {(id === 'job-application' || category?.id === 'work') && (
                <section className="mt-12 p-8 rounded-[2.5rem] bg-white border-2 border-brand-100 shadow-xl overflow-hidden relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('Common.guidePage.jobOffersTitle')}</h3>
                      <p className="text-brand-500 text-sm font-medium">{t('Common.guidePage.jobOffersSub')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-brand-50 hover:bg-brand-100 transition-all group cursor-pointer border border-brand-100">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-950 text-lg">{t('Common.guidePage.publicSector')}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-brand-200 px-2 py-1 rounded text-brand-700">Public</span>
                      </div>
                      <p className="text-xs text-brand-600 mb-4 font-medium">{t('Common.guidePage.publicSectorDesc')}</p>
                      <a 
                        href="https://alwadifa-maroc.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-950 font-black text-xs hover:underline"
                      >
                        {t('Common.guidePage.viewOnAlwadifa')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="p-5 rounded-2xl bg-brand-50 hover:bg-brand-100 transition-all group cursor-pointer border border-brand-100">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-950 text-lg">{t('Common.guidePage.privateSector')}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 px-2 py-1 rounded text-blue-700">Privé</span>
                      </div>
                      <p className="text-xs text-brand-600 mb-4 font-medium">{t('Common.guidePage.privateSectorDesc')}</p>
                      <a 
                        href="https://alwadifa-maroc.com/category/15.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-950 font-black text-xs hover:underline"
                      >
                        {t('Common.guidePage.viewOnAlwadifa')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <a 
                      href="https://alwadifa-maroc.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-950 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-lg text-sm"
                    >
                      {t('Common.guidePage.allOffresAlwadifa')} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </section>
              )}
              </motion.div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href={`/category/${category.slug}`}
              className="p-10 rounded-[2.5rem] bg-white border border-brand-200/50 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-3 text-brand-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform rtl:rotate-180" /> {t('Common.backToHome')}
              </div>
              <div className="text-3xl font-display font-bold text-brand-950 group-hover:text-brand-600 transition-colors tracking-tight">{catT('title')}</div>
              <div className="absolute right-0 bottom-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Icon className="w-24 h-24" />
              </div>
            </Link>
            <Link 
              href="/"
              className="p-10 rounded-[2.5rem] bg-brand-950 text-white hover:shadow-2xl transition-all group text-right rtl:text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-end rtl:justify-start gap-3 text-brand-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                {t('Common.exploreOther')} <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform rtl:rotate-180" />
              </div>
              <div className="text-3xl font-display font-bold text-white group-hover:text-brand-400 transition-colors tracking-tight">{t('Navbar.categories')}</div>
              <div className="absolute left-0 bottom-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                <Users className="w-24 h-24" />
              </div>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
