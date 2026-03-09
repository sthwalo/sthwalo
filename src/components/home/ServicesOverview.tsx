import { Code, Cloud, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'Production systems in Java/Spring Boot, React/TypeScript, and PHP/Laravel with CI-driven testing and deployments.',
    color: 'bg-harvest-gold-200/15 text-harvest-gold-600',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'AWS EC2, RDS, Docker Compose orchestration with automated backups, health monitoring, and infrastructure as code.',
    color: 'bg-deep-space-100/50 text-deep-space-600',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description:
      'SIEM-driven threat detection, sysctl/AppArmor hardening, encryption-at-rest, and authentication matrix design.',
    color: 'bg-oxblood-50/50 text-oxblood-500',
  },
  {
    icon: BarChart3,
    title: 'Financial Systems',
    description:
      'Purpose-built fintech platforms with double-entry accounting, payroll automation, and regulatory reporting.',
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
            label="What We Do"
            title="Services Built for Impact"
            description="We offer a focused set of services designed to deliver real, measurable results for your business."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, description, color }, index) => (
            <AnimatedSection
              key={title}
              animation="fade-in-up"
              delay={`animate-delay-${(index + 1) * 100}`}
            >
              <Link
                to="/services"
                className="block p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-warm-sand-100 mb-3">{title}</h3>
                <p className="text-warm-sand-400 leading-relaxed mb-4">{description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-harvest-gold-200 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
