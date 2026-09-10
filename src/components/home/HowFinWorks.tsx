import { ArrowRight, Upload, Zap, FileText } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  {
    icon: Upload,
    title: 'Bring the records in',
    description: 'Import bank statements, transaction records and business documents. The source file is retained, not just the numbers read off it.',
  },
  {
    icon: Zap,
    title: 'Confirm, don’t capture',
    description: 'FIN proposes the classification and you confirm or correct it. Rules you set once handle the descriptions that repeat every month.',
  },
  {
    icon: FileText,
    title: 'Report with the backup attached',
    description: 'Trial balances, financial statements, payroll summaries and management packs for any period — each figure still linked to the entries and documents behind it.',
  },
];

export default function HowFinWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            label="How FIN Works"
            title="From source records to sign-off"
            description="Three steps, and the evidence travels with the transaction the whole way. That is the part that saves the review time."
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
            Want to see it against your own books?
          </p>
          <a
            href="https://sthwalo.com/fin"
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
