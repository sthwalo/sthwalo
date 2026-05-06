import { ArrowRight, Upload, Zap, FileText } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  {
    icon: Upload,
    title: 'Import Transactions',
    description: 'Bring financial activity into the system through bank statements, transaction records, and business data.',
  },
  {
    icon: Zap,
    title: 'Automate Classification',
    description: 'FIN helps organize transactions, update accounting workflows, and reduce manual processing.',
  },
  {
    icon: FileText,
    title: 'Generate Reports',
    description: 'Create trial balances, financial statements, payroll summaries, and operational reports from one platform.',
  },
];

export default function HowFinWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            label="How FIN Works"
            title="From Transactions to Reports in Minutes"
            description="See how FIN transforms raw financial data into organized, compliant business insights."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <AnimatedSection
              key={step.title}
              animation="fade-in-up"
              delay={`animate-delay-${(index + 1) * 100}`}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-harvest-gold-200/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-harvest-gold-600" />
                </div>
                <h3 className="text-xl font-bold text-deep-space-800 mb-4">{step.title}</h3>
                <p className="text-deep-space-600 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-harvest-gold-400 mx-auto mt-6 hidden md:block" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <p className="text-lg text-deep-space-600 mb-8">
            Ready to see FIN in action?
          </p>
          <a
            href="https://sthwalo.com/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-harvest-gold-200 text-deep-space-800 font-semibold rounded-lg hover:bg-harvest-gold-300 transition-colors"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}