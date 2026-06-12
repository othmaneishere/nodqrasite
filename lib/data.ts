import { Briefcase, FileText, Brain, GraduationCap, CheckCircle2, ArrowRight, BookOpen, Landmark, CreditCard, FileSignature, Plane, Sparkles, Target, Zap, Globe, Laptop, Users, Shield, Coins, Heart, Smartphone, MessageCircle } from 'lucide-react';

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: any;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: any;
  color: string;
  guides: Guide[];
}

export const categories: Category[] = [
  {
    id: 'work',
    title: 'Work & Career',
    slug: 'work-career',
    description: '',
    icon: Briefcase,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    guides: [
      {
        id: 'cv-writing',
        title: '',
        description: '',
        icon: FileText,
        content: ''
      },
      {
        id: 'job-application',
        title: '',
        description: '',
        icon: Target,
        content: ''
      },
      {
        id: 'interview-basics',
        title: '',
        description: '',
        icon: BookOpen,
        content: ''
      },
      {
        id: 'anapec-programs',
        title: '',
        description: '',
        icon: CheckCircle2,
        content: ''
      },
      {
        id: 'internship-search',
        title: '',
        description: '',
        icon: Users,
        content: ''
      },
      {
        id: 'workplace-soft-skills',
        title: '',
        description: '',
        icon: Sparkles,
        content: ''
      }
    ]
  },
  {
    id: 'admin',
    title: 'Administration',
    slug: 'administration',
    description: '',
    icon: FileSignature,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    guides: [
      {
        id: 'idarti-guide',
        title: '',
        description: '',
        icon: Globe,
        content: ''
      },
      {
        id: 'cnss-guide',
        title: '',
        description: '',
        icon: Shield,
        content: ''
      },
      {
        id: 'auto-entrepreneur',
        title: '',
        description: '',
        icon: Briefcase,
        content: ''
      },
      {
        id: 'legalizing-documents',
        title: '',
        description: '',
        icon: FileText,
        content: ''
      },
      {
        id: 'driving-license',
        title: '',
        description: '',
        icon: Smartphone,
        content: ''
      }
    ]
  },
  {
    id: 'finance',
    title: 'Money & Finance',
    slug: 'money-finance',
    description: '',
    icon: Coins,
    color: 'bg-green-50 text-green-700 border-green-200',
    guides: [
      {
        id: 'payslip-taxes',
        title: '',
        description: '',
        icon: FileText,
        content: ''
      },
      {
        id: 'budgeting-basics',
        title: '',
        description: '',
        icon: Target,
        content: ''
      },
      {
        id: 'code-18',
        title: '',
        description: '',
        icon: CreditCard,
        content: ''
      }
    ]
  },
  {
    id: 'study',
    title: 'Study & Skills',
    slug: 'study-skills',
    description: '',
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    guides: [
      {
        id: 'minhaty-scholarships',
        title: '',
        description: '',
        icon: Landmark,
        content: ''
      },
      {
        id: 'study-efficiently',
        title: '',
        description: '',
        icon: BookOpen,
        content: ''
      },
      {
        id: 'student-life',
        title: '',
        description: '',
        icon: Users,
        content: ''
      }
    ]
  },
  {
    id: 'digital',
    title: 'Digital Life',
    slug: 'digital-life',
    description: '',
    icon: Smartphone,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    guides: [
      {
        id: 'online-safety',
        title: '',
        description: '',
        icon: Shield,
        content: ''
      },
      {
        id: 'linkedin-branding',
        title: '',
        description: '',
        icon: BookOpen,
        content: ''
      }
    ]
  },
  {
    id: 'emotions',
    title: 'Mindset & Growth',
    slug: 'mindset-growth',
    description: '',
    icon: Brain,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    guides: [
      {
        id: 'resilience',
        title: '',
        description: '',
        icon: Sparkles,
        content: ''
      },
      {
        id: 'goal-setting',
        title: '',
        description: '',
        icon: Zap,
        content: ''
      }
    ]
  },
  {
    id: 'relationships',
    title: 'Relationships',
    slug: 'relationships',
    description: '',
    icon: Users,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    guides: [
      {
        id: 'parent-communication',
        title: '',
        description: '',
        icon: MessageCircle,
        content: ''
      },
      {
        id: 'conflict-resolution',
        title: '',
        description: '',
        icon: Heart,
        content: ''
      }
    ]
  }
];

