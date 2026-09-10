import { ArrowRight, Building2, ShieldCheck, Landmark, AlertCircle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

// Deliberately NOT another feature list — HowFinWorks covers the process and
// AudienceSplit covers the benefit. This section answers "why trust it".
const proofPoints = [
  {
    icon: Building2,
    title: 'Running in production',
    description: 'Live at sthwalo.com/fin with real company workspaces, not a prototype or a design mockup.',
  },
  {
    icon: ShieldCheck,
    title: 'Isolation enforced at the database',
    description: 'Role-based access and per-company scoping, with PostgreSQL Row-Level Security as a backstop beneath the application.',
  },
  {
    icon: Landmark,
    title: 'Built for South African filing',
    description: 'PAYE, UIF and SDL on SARS tables. VAT201, EMP201, EMP501 and IRP5-style working papers prepared for your review.',
  },
  {
    icon: AlertCircle,
    title: 'Clear about where it stops',
    description: 'FIN prepares and exports — it does not submit to SARS or connect to bank feeds. You review and file. We would rather say so up front.',
  },
];

export default function FeaturedWork() {
  return (
    <section className="section-padding bg-warm-sand-50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            label="Featured Project"
            title="FIN Financial Management System"
            description="A production-deployed financial operations platform, built and maintained in-house by Sthwalo Holdings."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection animation="slide-in-left">
            <div className="rounded-2xl overflow-hidden bg-deep-space-800 p-1">
              <div className="rounded-xl overflow-hidden bg-deep-space-900">
                <img
                  src="/images/pipeline.gif"
                  alt="FIN's core flow — importing a bank statement, classifying the transactions, posting to the ledger, and generating a report"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap gap-2 p-4">
                {['Spring Boot', 'Java 17', 'React 19', 'PostgreSQL 17', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-warm-sand-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right">
            <div className="space-y-6">
              {proofPoints.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-xl hover:bg-warm-sand-200/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-harvest-gold-200/20 flex items-center justify-center group-hover:bg-harvest-gold-200/40 transition-colors">
                    <Icon className="w-5 h-5 text-harvest-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-space-800 mb-1">{title}</h3>
                    <p className="text-sm text-deep-space-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button to="/resources" variant="secondary">
                  Explore FIN Resources
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
