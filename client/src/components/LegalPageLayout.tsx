import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <article className="mx-auto max-w-2xl">
      <a
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-harmony-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to harmonium
      </a>

      <header className="mb-8">
        <h1 className="font-display text-2xl text-white sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-stone-400">{subtitle}</p>}
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-stone-300 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_p]:text-stone-400 [&_ul]:space-y-1">
        {children}
      </div>
    </article>
  );
}
