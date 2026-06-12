'use client';

import { use } from 'react';
import CVBuilderClient from './CVBuilderClient';

export default function CVBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return <CVBuilderClient locale={locale} />;
}
