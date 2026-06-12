'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  PenTool, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Globe
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const [data, setData] = useState<CVData>({
    personalInfo: { fullName: '', email: '', phone: '', location: '', jobTitle: '', summary: '' },
    education: [{ id: '1', school: '', degree: '', date: '' }],
    experience: [{ id: '1', company: '', role: '', date: '', description: '' }],
    skills: '',
    languages: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [messages, setMessages] = useState<{role: 'assistant' | 'user', content: string}[]>([
    { role: 'assistant', content: 'Hello! I am your AI CV Assistant. Let\'s build your ATS-optimized CV. To start, what is your full name?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const steps = [
    { key: 'fullName', section: 'personalInfo', question: 'What is your full name?' },
    { key: 'jobTitle', section: 'personalInfo', question: 'What is your target job title?' },
    { key: 'summary', section: 'personalInfo', question: 'Briefly summarize your professional experience and strengths.' },
    { key: 'experience', section: 'experience', question: 'Tell me about your most recent experience: Company, role, and key achievements.' },
    { key: 'education', section: 'education', question: 'What about your education? School, degree, and graduation date.' },
    { key: 'skills', section: 'skills', question: 'What are your top skills for this job?' },
    { key: 'languages', section: 'languages', question: 'Which languages do you speak and at what level?' }
  ];

  const handleSendMessage = async (userAnswer: string) => {
    const newUserMessage = { role: 'user' as const, content: userAnswer };
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Update data object based on current step
    const currentStep = steps[activeStep];
    if (currentStep.section === 'personalInfo') {
      setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [currentStep.key]: userAnswer } }));
    } else if (currentStep.section === 'experience') {
      setData(prev => ({ ...prev, experience: [{ id: '1', company: 'Extracted', role: 'Extracted', date: 'Extracted', description: userAnswer }] }));
    } else if (currentStep.section === 'education') {
      setData(prev => ({ ...prev, education: [{ id: '1', school: 'Extracted', degree: 'Extracted', date: userAnswer }] }));
    } else if (currentStep.key === 'skills') {
      setData(prev => ({ ...prev, skills: userAnswer }));
    } else if (currentStep.key === 'languages') {
      setData(prev => ({ ...prev, languages: userAnswer }));
    }
    
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: steps[activeStep + 1].question }]);
        setIsTyping(false);
      }, 500);
    } else {
      setIsTyping(false);
      setActiveTab('preview');
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Math.random().toString(), school: '', degree: '', date: '' }]
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Math.random().toString(), company: '', role: '', date: '', description: '' }]
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };


  return (
    <main className="min-h-screen bg-brand-50">
      <Navbar />
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold text-brand-950 mb-12">{t('CVMaker.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[2.5rem] border border-brand-200 shadow-xl">
              <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`p-4 rounded-2xl ${m.role === 'assistant' ? 'bg-brand-50' : 'bg-brand-950 text-white ml-auto max-w-[80%]'}`}>
                    {m.content}
                  </div>
                ))}
                {isTyping && <div className="p-4 bg-brand-50 rounded-2xl">...</div>}
              </div>
              {activeTab === 'form' && (
                <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); const answer = formData.get('answer') as string; if (answer) { handleSendMessage(answer); e.currentTarget.reset(); } }}>
                  <input name="answer" className="w-full p-4 rounded-xl border border-brand-200" placeholder="Type your answer..." />
                </form>
              )}
            </div>

            <div ref={cvRef} className="bg-white p-12 rounded-xl border border-brand-200">
              <header className="mb-8 border-b-2 border-brand-900 pb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-tight">{data.personalInfo.fullName || 'Kamal Alami'}</h1>
                  <p className="text-lg font-medium text-brand-600 mt-1 uppercase tracking-wider">{data.personalInfo.jobTitle || 'Your Title'}</p>
                </div>
                <div className="text-right rtl:text-left space-y-1 text-xs">
                  <p>{data.personalInfo.email || 'email@example.com'}</p>
                  <p>{data.personalInfo.phone || '+212 600 000 000'}</p>
                  <p>{data.personalInfo.location || 'City, Morocco'}</p>
                </div>
              </header>

              <div className="mt-8 space-y-8">
                <section>
                  <h2 className="text-lg font-bold border-b border-brand-900 mb-2">Professional Summary</h2>
                  <p className="text-brand-800">{data.personalInfo.summary || 'Summary of your background...'}</p>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold border-b border-brand-900 mb-2">Experience</h2>
                  {data.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                      <h3 className="font-bold">{exp.role || 'Role'} - {exp.company || 'Company'}</h3>
                      <p className="text-sm text-brand-500">{exp.date || 'Date'}</p>
                      <p className="text-sm">{exp.description || 'Description...'}</p>
                    </div>
                  ))}
                </section>
                
                <section>
                  <h2 className="text-lg font-bold border-b border-brand-900 mb-2">Education</h2>
                  {data.education.map(edu => (
                    <div key={edu.id} className="mb-2">
                      <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                      <p className="text-sm">{edu.school || 'School'} - {edu.date || 'Date'}</p>
                    </div>
                  ))}
                </section>
                
                <section>
                  <h2 className="text-lg font-bold border-b border-brand-900 mb-2">Skills & Languages</h2>
                  <p className="text-sm">Skills: {data.skills || 'Skills...'}</p>
                  <p className="text-sm">Languages: {data.languages || 'Languages...'}</p>
                </section>
              </div>

              <button onClick={downloadPDF} className="mt-8 px-6 py-3 bg-brand-950 text-white rounded-xl">
                {t('CVMaker.download')}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}