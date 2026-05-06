import { BarChart3, FileText, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';

const features = [
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description: 'Real-time visibility into business performance, cash flow, and financial health with interactive charts and KPIs.',
    color: 'bg-harvest-gold-200/15 text-harvest-gold-600',
  },
  {
    icon: FileText,
    title: 'Transaction Processing',
    description: 'Automated transaction classification, reconciliation, and double-entry bookkeeping with audit trails.',
    color: 'bg-deep-space-100/50 text-deep-space-600',
  },
  {
    icon: Users,
    title: 'Payroll Management',
    description: 'Complete payroll processing with tax calculations, compliance reporting, and employee management.',
    color: 'bg-oxblood-50/50 text-oxblood-500',
  },
  {
    icon: Shield,
    title: 'Audit & Compliance',
    description: 'Built-in compliance controls, audit trails, and regulatory reporting for peace of mind.',
    color: 'bg-ember-50/50 text-ember-500',
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-deep-space-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-harvest-gold-200/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-oxblood-600/3 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Key Features"
            title="Everything You Need for Financial Operations"
            description="FIN combines powerful automation with professional-grade financial controls in one comprehensive platform."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <AnimatedSection
              key={title}
              animation="fade-in-up"
              delay={`animate-delay-${(index + 1) * 100}`}
            >
              <Link
                to="/demo"
                className="block p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-warm-sand-100 mb-3">{title}</h3>
                <p className="text-warm-sand-400 leading-relaxed mb-4">{description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-harvest-gold-200 group-hover:gap-2.5 transition-all">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
