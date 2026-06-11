import { ArrowRight, BarChart3, Shield, Zap, FileText } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const features = [
  {
    icon: BarChart3,
    title: 'Transaction Classification',
    description: 'Import supported statements, review classifications, reuse mapping rules, and inspect resulting double-entry journals.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'HttpOnly cookie authentication, company-scoped access, explicit permissions, and audit-supporting records.',
  },
  {
    icon: Zap,
    title: 'Payroll Automation',
    description: 'Process payroll and prepare EMP201, EMP501, and IRP5-style outputs for review and manual external submission.',
  },
  {
    icon: FileText,
    title: 'Financial Reporting',
    description: 'Generate ledger-backed financial, management, VAT, payroll, and audit-trail outputs for responsible review.',
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
            description="A production-deployed financial operations platform with controlled workflows from source records to reviewable, ledger-backed reports."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection animation="slide-in-left">
            <div className="relative rounded-2xl overflow-hidden bg-deep-space-800 p-1">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Financial dashboard interface"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {['Spring Boot', 'Java 17', 'React 19', 'PostgreSQL 17', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-deep-space-800/90 text-warm-sand-200 border border-white/10 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right">
            <div className="space-y-6">
              {features.map(({ icon: Icon, title, description }) => (
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
