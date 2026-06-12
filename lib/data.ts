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
        id: 'cnss-guide',
        title: '',
        description: '',
        icon: CheckCircle2,
        content: ''
      },
      {
        id: 'bank-account',
        title: '',
        description: '',
        icon: CreditCard,
        content: ''
      },
      {
        id: 'read-contract',
        title: '',
        description: '',
        icon: FileSignature,
        content: ''
      },
      {
        id: 'visa-basics',
        title: '',
        description: '',
        icon: Plane,
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
        id: 'tgr-guide',
        title: '',
        description: '',
        icon: Landmark,
        content: ''
      }
    ]
  },
  {
    id: 'emotions',
    title: 'Life & Emotions',
    slug: 'life-emotions',
    description: '',
    icon: Brain,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    guides: [
      {
        id: 'stress-management',
        title: '',
        description: '',
        icon: Sparkles,
        content: ''
      },
      {
        id: 'discipline',
        title: '',
        description: '',
        icon: Zap,
        content: ''
      },
      {
        id: 'self-confidence',
        title: '',
        description: '',
        icon: Heart,
        content: ''
      },
      {
        id: 'mental-health-awareness',
        title: '',
        description: '',
        icon: Brain,
        content: ''
      }
    ]
  },
  {
    id: 'relationships',
    title: 'Relationships & Family',
    slug: 'relationships-family',
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
        id: 'peer-pressure',
        title: '',
        description: '',
        icon: Heart,
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
        id: 'social-media-balance',
        title: '',
        description: '',
        icon: Zap,
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
        id: 'saving-pocket-money',
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
        id: 'study-efficiently',
        title: '',
        description: '',
        icon: BookOpen,
        content: ''
      },
      {
        id: 'digital-skills',
        title: '',
        description: '',
        icon: Laptop,
        content: ''
      }
    ]
  }
];

