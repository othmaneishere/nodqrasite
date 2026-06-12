'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Trash2, 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Globe, 
  FileText,
  ChevronRight,
  Eye,
  PenTool,
  Check,
  Sparkles,
  Search,
  ListRestart
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Mistral } from '@mistralai/mistralai';

interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  description: string;
}

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string;
  languages: string;
}

export default function CVBuilderClient({ locale }: { locale: string }) {
  const t = useTranslations();
  const cvRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [messages, setMessages] = useState<{role: 'assistant' | 'user', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const steps = [
    { key: 'fullName', question: 'What is your full name?' },
    { key: 'jobTitle', question: 'What is your target job title?' },
    { key: 'summary', question: 'Could you give me a brief summary of your professional experience and strengths?' },
    { key: 'experience', question: 'Tell me about your most recent work experience: Company, role, and key achievements.' },
    { key: 'education', question: 'What about your education? School, degree, and graduation date.' },
    { key: 'skills', question: 'What are your top skills for this job?' },
    { key: 'languages', question: 'Which languages do you speak and at what level?' }
  ];

  const handleSendMessage = async (userAnswer: string) => {
    const newUserMessage = { role: 'user' as const, content: userAnswer };
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Update data object based on current step
    const currentKey = steps[activeStep].key;
    if (currentKey === 'fullName' || currentKey === 'jobTitle' || currentKey === 'summary') {
      setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [currentKey]: userAnswer } }));
    }
    
    // Simple logic to move to next step or finish
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
      setMessages(prev => [...prev, { role: 'assistant', content: steps[activeStep + 1].question }]);
    } else {
      setIsTyping(false);
      // Finalize and show preview
      setActiveTab('preview');
    }
    setIsTyping(false);
  };

  return (
    <main className="min-h-screen bg-brand-50 selection:bg-brand-950 selection:text-white">
      <Navbar />

      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-950 tracking-tighter">
              {t('CVMaker.title')}
            </h1>
          </div>

          {activeTab === 'form' ? (
            <div className="bg-white p-8 rounded-[2.5rem] border border-brand-200 shadow-xl">
              <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`p-4 rounded-2xl ${m.role === 'assistant' ? 'bg-brand-50' : 'bg-brand-950 text-white ml-auto max-w-[80%]'}`}>
                    {m.content}
                  </div>
                ))}
                {isTyping && <div className="p-4 bg-brand-50 rounded-2xl">...</div>}
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const answer = formData.get('answer') as string;
                if (answer) {
                  handleSendMessage(answer);
                  e.currentTarget.reset();
                }
              }}>
                <input name="answer" className="w-full p-4 rounded-xl border border-brand-200" placeholder="Type your answer..." />
              </form>
            </div>
          ) : (
            <div ref={cvRef} className="bg-white p-16 rounded-xl border border-brand-200">
              <h1 className="text-3xl font-bold">{data.personalInfo.fullName}</h1>
              <p>{data.personalInfo.jobTitle}</p>
              <div className="mt-8">
                <h2 className="text-xl font-bold">Professional Summary</h2>
                <p>{data.personalInfo.summary}</p>
              </div>
              {/* ... (rest of the PDF preview rendering) */}
              <button onClick={downloadPDF} className="mt-8 px-6 py-3 bg-brand-950 text-white rounded-xl">
                {t('CVMaker.download')}
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );

            <div className={`lg:col-span-7 space-y-8 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
              
              {/* Personal Info */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-200/50 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('CVMaker.personalInfo')}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.fullName')}</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={data.personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                      placeholder="e.g. Kamal Alami"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.jobTitle')}</label>
                    <input 
                      type="text" 
                      name="jobTitle"
                      value={data.personalInfo.jobTitle}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                      placeholder="e.g. Sales Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.email')}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={data.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                      placeholder="kamal@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.phone')}</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={data.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                      placeholder="+212 6..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.location')}</label>
                    <input 
                      type="text" 
                      name="location"
                      value={data.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                      placeholder="Casablanca, Morocco"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.summary')}</label>
                    <textarea 
                      name="summary"
                      value={data.personalInfo.summary}
                      onChange={handlePersonalInfoChange}
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950 resize-none" 
                      placeholder="A short intro about your background and goals..."
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-200/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('CVMaker.experience')}</h2>
                  </div>
                  <button 
                    onClick={addExperience}
                    className="p-2.5 rounded-lg bg-brand-50 text-brand-950 hover:bg-brand-950 hover:text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <motion.div 
                      key={exp.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-6 first:pt-0 border-t border-brand-100 first:border-0 relative"
                    >
                      {data.experience.length > 1 && (
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="absolute right-0 top-6 first:top-0 p-1.5 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.company')}</label>
                          <input 
                            type="text" 
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.role')}</label>
                          <input 
                            type="text" 
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.date')}</label>
                          <input 
                            type="text" 
                            value={exp.date}
                            onChange={(e) => handleExperienceChange(exp.id, 'date', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                            placeholder="e.g. 2022 - Present"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.descInput')}</label>
                          <textarea 
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                            rows={4}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950 resize-none" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Assistant Section */}
              <div className="bg-brand-950 p-6 md:p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-800 text-brand-300 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold tracking-tight">{t('CVMaker.aiAssistant.title')}</h2>
                      <p className="text-brand-300 text-sm">{t('CVMaker.aiAssistant.description')}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.aiAssistant.jobDescLabel')}</label>
                      <textarea 
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-brand-900 border border-brand-800 focus:border-brand-400 transition-all outline-none font-medium text-white resize-none placeholder:text-brand-700 text-sm" 
                        placeholder={t('CVMaker.aiAssistant.jobDescPlaceholder')}
                      />
                    </div>

                    <button 
                      onClick={analyzeWithAI}
                      disabled={isAnalyzing || !jobDescription}
                      className="w-full py-4 rounded-2xl bg-white text-brand-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-brand-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-950/30 border-t-brand-950 rounded-full animate-spin" />
                          {t('CVMaker.aiAssistant.analyzing')}
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" /> {t('CVMaker.aiAssistant.analyze')}
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {aiInsights && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-6 border-t border-brand-800 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-brand-400 flex items-center gap-2">
                              <Check className="w-4 h-4" /> {t('CVMaker.aiAssistant.improvements')}
                            </h3>
                            <ul className="space-y-2">
                              {aiInsights.improvements.map((item, i) => (
                                <li key={i} className="text-sm text-brand-100 flex gap-2">
                                  <span className="text-brand-600">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-brand-400 flex items-center gap-2">
                              <Search className="w-4 h-4" /> {t('CVMaker.aiAssistant.keywords')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {aiInsights.keywords.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 bg-brand-900 border border-brand-800 rounded-lg text-xs font-bold text-brand-300">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-200/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('CVMaker.education')}</h2>
                  </div>
                  <button 
                    onClick={addEducation}
                    className="p-2.5 rounded-lg bg-brand-50 text-brand-950 hover:bg-brand-950 hover:text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <motion.div 
                      key={edu.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-6 first:pt-0 border-t border-brand-100 first:border-0 relative"
                    >
                      {data.education.length > 1 && (
                        <button 
                          onClick={() => removeEducation(edu.id)}
                          className="absolute right-0 top-6 first:top-0 p-1.5 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.school')}</label>
                          <input 
                            type="text" 
                            value={edu.school}
                            onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.degree')}</label>
                          <input 
                            type="text" 
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-1">{t('CVMaker.date')}</label>
                          <input 
                            type="text" 
                            value={edu.date}
                            onChange={(e) => handleEducationChange(edu.id, 'date', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills & Languages */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-200/50 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('CVMaker.skills')}</h2>
                    </div>
                    <textarea 
                      value={data.skills}
                      onChange={(e) => setData(prev => ({ ...prev, skills: e.target.value }))}
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950 resize-none" 
                      placeholder={t('CVMaker.skillsPlaceholder')}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-brand-950 tracking-tight">{t('CVMaker.languages')}</h2>
                    </div>
                    <textarea 
                      value={data.languages}
                      onChange={(e) => setData(prev => ({ ...prev, languages: e.target.value }))}
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:border-brand-950 focus:bg-white transition-all outline-none font-medium text-brand-950 resize-none" 
                      placeholder={t('CVMaker.languagesPlaceholder')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-12 mb-20 lg:hidden">
                 <button 
                   onClick={() => setActiveTab('preview')}
                   className="w-full max-w-sm py-5 rounded-[2.5rem] bg-brand-950 text-white font-black text-lg shadow-2xl flex items-center justify-center gap-3"
                 >
                   {t('CVMaker.preview')} <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                 </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className={`lg:col-span-5 sticky top-24 ${activeTab === 'form' ? 'hidden lg:block' : 'block'}`}>
              <div className="space-y-6">
                <button 
                  onClick={downloadPDF}
                  disabled={isGenerating}
                  className="w-full py-5 rounded-[2rem] bg-brand-950 text-white font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-brand-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-widest"
                >
                  {isGenerating ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" /> {t('CVMaker.download')}
                    </>
                  )}
                </button>

                <div className="bg-white rounded-[1.5rem] shadow-2xl border border-brand-200/50 overflow-hidden scale-100 lg:scale-100 origin-top">
                  <div className="p-4 bg-brand-50 border-b border-brand-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-amber-400" />
                       <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black text-brand-300 uppercase tracking-widest">A4 Professional Template</span>
                  </div>
                  
                  {/* The actual component to capture */}
                  <div 
                    ref={cvRef} 
                    className={`bg-white p-12 w-full aspect-[210/297] text-brand-950 origin-top overflow-y-auto ${locale === 'ar' ? 'rtl font-noto' : 'ltr'}`}
                    style={{ fontSize: '10px' }}
                  >
                    <header className="mb-8 border-b-2 border-brand-900 pb-6 flex justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tight">{data.personalInfo.fullName || 'Kamal Alami'}</h1>
                        <p className="text-lg font-medium text-brand-600 mt-1 uppercase tracking-wider">{data.personalInfo.jobTitle || 'Votre Titre'}</p>
                      </div>
                      <div className="text-right rtl:text-left space-y-1 text-xs">
                        <p>{data.personalInfo.email || 'email@example.com'}</p>
                        <p>{data.personalInfo.phone || '+212 600 000 000'}</p>
                        <p>{data.personalInfo.location || 'Ville, Maroc'}</p>
                      </div>
                    </header>

                    {data.personalInfo.summary && (
                      <section className="mb-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-brand-900 border-b border-brand-200 pb-1">Profile</h3>
                        <p className="leading-relaxed text-brand-800/80">{data.personalInfo.summary}</p>
                      </section>
                    )}

                    <section className="mb-8">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-brand-900 border-b border-brand-200 pb-1">Expérience Professionnelle</h3>
                      <div className="space-y-6">
                        {data.experience.map(exp => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="text-sm font-bold">{exp.role || 'Rôle'}</h4>
                              <span className="text-[9px] font-black italic text-brand-400">{exp.date || 'Date'}</span>
                            </div>
                            <p className="font-bold text-brand-600 mb-2 uppercase tracking-wide text-[9px]">{exp.company || 'Entreprise'}</p>
                            <p className="leading-relaxed text-brand-800/80 whitespace-pre-wrap">{exp.description || 'Description de vos tâches et réalisations...'}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="mb-8">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-brand-900 border-b border-brand-200 pb-1">Éducation</h3>
                      <div className="space-y-4">
                        {data.education.map(edu => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-sm font-bold">{edu.degree || 'Diplôme'}</h4>
                              <span className="text-[9px] font-black italic text-brand-400">{edu.date || 'Date'}</span>
                            </div>
                            <p className="text-brand-600 font-medium">{edu.school || 'École / Université'}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-8">
                      <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-brand-900 border-b border-brand-200 pb-1">Compétences</h3>
                        <p className="leading-relaxed text-brand-800/80 whitespace-pre-wrap">{data.skills || 'Liste de compétences...'}</p>
                      </section>
                      <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-brand-900 border-b border-brand-200 pb-1">Langues</h3>
                        <p className="leading-relaxed text-brand-800/80 whitespace-pre-wrap">{data.languages || 'Langue 1 (Niveau)...'}</p>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
