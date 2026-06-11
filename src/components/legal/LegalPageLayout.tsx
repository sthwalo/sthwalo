import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SeoMeta from '../ui/SeoMeta';

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  seoDescription: string;
  url: string;
  intro: string;
  sections: LegalSection[];
}

// Shared presentational shell for the /privacy and /terms pages. Mirrors the legal content
// served inside the FIN app (LegalPages.tsx) so the marketing site and dashboard stay consistent.
export default function LegalPageLayout({ title, seoDescription, url, intro, sections }: LegalPageLayoutProps) {
  return (
    <>
      <SeoMeta title={`${title} | Sthwalo Holdings`} description={seoDescription} url={url} />

      <section className="relative pt-32 pb-16 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-oxblood-600/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4 animate-fade-in">
              <ShieldCheck className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-5 animate-fade-in-up">
              {title}
            </h1>
            <p className="text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              {intro}
            </p>
            <p className="text-sm text-warm-sand-500 mt-4 animate-fade-in-up animate-delay-300">
              Effective date: 3 June 2026 &middot; Applies to FIN Financial Management by Sthwalo Holdings (Pty) Ltd.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((section, index) => (
              <AnimatedSection
                key={section.heading}
                animation="fade-in-up"
                delay={`animate-delay-${(Math.min(index, 3) + 1) * 100}`}
              >
                <h2 className="text-xl md:text-2xl font-bold text-deep-space-800 mb-3">{section.heading}</h2>
                <div className="space-y-3 text-deep-space-600 leading-relaxed">{section.body}</div>
              </AnimatedSection>
            ))}

            <div className="mt-12 p-6 rounded-xl bg-white border border-warm-sand-300/40">
              <p className="text-xs uppercase tracking-widest text-harvest-gold-600 font-bold">Legal review</p>
              <p className="text-deep-space-600 mt-2">
                This page is intended to support POPIA, PAIA, consumer and payment-transparency requirements for FIN.
                It should be reviewed by a South African legal practitioner before being treated as final legal advice.
                Privacy and access requests:{' '}
                <a href="mailto:sthwaloe@gmail.com" className="text-harvest-gold-600 hover:text-harvest-gold-700 font-medium">
                  sthwaloe@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
