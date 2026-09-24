import { ArrowRight, ExternalLink, GitBranch, Layers, ShieldCheck, TestTube2 } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { trackCTAClick } from '../../utils/analytics';

/**
 * FIN as the flagship case study — what building it demonstrates, not what it does for users.
 *
 * The user-facing pitch lives on aosfin.com now. What belongs here is the engineering: the scale
 * of the schema, the isolation model, the test discipline. Each figure is checkable in the
 * repository, which is the whole reason it is worth printing. A recruiter who probes one soft
 * number discounts every number beside it, so there are none here that cannot be counted.
 */
const proofPoints = [
  {
    icon: Layers,
    title: 'Multi-tenant from the schema up',
    description:
      'Every table, query and report is company-scoped, with Spring Security RBAC above and PostgreSQL row-level security beneath it as a backstop rather than a promise.',
  },
  {
    icon: GitBranch,
    title: '200 versioned migrations',
    description:
      'The schema is Flyway-managed end to end on PostgreSQL 17 — no hand-applied changes, and every environment reaches the same state by the same path.',
  },
  {
    icon: TestTube2,
    title: 'Over 2,000 automated tests',
    description:
      'JUnit 5 and Mockito across 355 backend classes against throwaway PostgreSQL Testcontainers, plus 248 Vitest tests on the frontend. Checkstyle, PMD and SpotBugs gate the build.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest about its boundary',
    description:
      'FIN prepares SARS and CIPC returns internally; it holds no eFiling, SARS or bank-feed connection, and says so on its own landing page. The accounting core is jurisdiction-neutral — the completed statutory layer is South African.',
  },
];

export default function FeaturedWork() {
  return (
    <section className="section-padding bg-warm-sand-50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            label="Flagship case study"
            title="FIN — a financial platform, designed and shipped solo"
            description="Java 17 and Spring Boot 3.5 behind React 19, on PostgreSQL 17, deployed to AWS in af-south-1 behind Cloudflare. Double-entry ledger, document pipeline with OCR fallback, payroll, VAT, inventory, point of sale and statutory reporting — in production, not a prototype."
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
                {['Java 17', 'Spring Boot 3.5', 'React 19', 'PostgreSQL 17', 'AWS', 'Docker', 'nginx'].map((tech) => (
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

              <div className="pt-4 flex flex-wrap gap-3">
                <Button
                  href="https://aosfin.com"
                  variant="primary"
                  onClick={() => trackCTAClick('fin_live', 'featured-work')}
                >
                  View FIN live
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button to="/portfolio" variant="secondary">
                  Read the case study
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
