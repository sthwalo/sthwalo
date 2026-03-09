import {
  Code,
  Cloud,
  Shield,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  GitBranch,
  Workflow,
  Server,
} from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'Production-grade systems built in Java/Spring Boot, React/TypeScript, and PHP/Laravel. We deliver 7+ production websites and backend systems with CI-driven testing, 118+ unit tests, and reliable deployments.',
    features: [
      'Spring Boot 3 / Java 17 backend services',
      'React 19 + TypeScript frontends with Vite',
      'PHP/Laravel with Sanctum authentication',
      'PostgreSQL database architecture and Flyway migrations',
      'RESTful API design with 24+ controllers',
    ],
    technologies: [
      { icon: Cpu, name: 'Java' },
      { icon: GitBranch, name: 'React' },
      { icon: Database, name: 'PostgreSQL' },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Scalable infrastructure on AWS with Docker Compose orchestration, automated backup/restore systems, and cost-optimized deployments. We run production backends on EC2/RDS with cPanel-hosted frontends to minimize costs.',
    features: [
      'AWS EC2 and RDS deployment and management',
      'Docker Compose orchestration',
      'Automated daily backups with point-in-time recovery',
      'Cron job scheduling and health monitoring',
      'Cost optimization strategies across hosting providers',
    ],
    technologies: [
      { icon: Server, name: 'AWS' },
      { icon: Workflow, name: 'Docker' },
      { icon: Lock, name: 'Backups' },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description:
      'Pragmatic security controls that lower risk without slowing down development. From SIEM-driven threat detection to operational hardening, we embed security into every layer of your stack.',
    features: [
      'Authentication design (JWT, Sanctum, session patterns)',
      'Encryption-at-rest and transport (HTTPS/TLS)',
      'SIEM tools for threat detection and incident response',
      'sysctl/AppArmor hardening and firewall configuration',
      'Security audit documentation and authentication matrices',
    ],
    technologies: [
      { icon: Lock, name: 'Encryption' },
      { icon: Cpu, name: 'SIEM' },
      { icon: Workflow, name: 'Hardening' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Financial Systems & Automation',
    description:
      'Purpose-built fintech platforms grounded in 10+ years of accounting experience. We automate ingestion pipelines, implement double-entry bookkeeping, and build payroll systems with regulatory compliance baked in.',
    features: [
      'Transaction classification and double-entry journal generation',
      'Payroll automation with EMP201/SDL reporting',
      'SARS e-filing integration and tax compliance',
      'Financial statement generation and KPI dashboards',
      'Automated reconciliation and ingestion pipelines',
    ],
    technologies: [
      { icon: BarChart3, name: 'Finance' },
      { icon: Database, name: 'ACID' },
      { icon: Workflow, name: 'Automation' },
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We listen. Understanding your goals, constraints, and users is where great software begins.',
  },
  {
    step: '02',
    title: 'Architecture',
    description: 'We plan the system design, data models, and technology choices before writing a single line of code.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Iterative development with regular demos. You see progress every step of the way.',
  },
  {
    step: '04',
    title: 'Delivery',
    description: 'Thorough testing, deployment, and handoff. We ensure a smooth launch and continued support.',
  },
];

export default function Services() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-ember-400/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4 animate-fade-in">
              Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              Engineering meets
              <br />
              <span className="text-harvest-gold-200">financial discipline</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              Services grounded in 10+ years of accounting precision, delivered
              through modern full-stack engineering and enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="space-y-20">
            {services.map(({ icon: Icon, title, description, features, technologies }, index) => (
              <AnimatedSection key={title} animation="fade-in-up">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                    index % 2 === 1 ? 'lg:direction-rtl' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-14 h-14 rounded-xl bg-deep-space-800 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-harvest-gold-200" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-deep-space-800 mb-4">
                      {title}
                    </h2>
                    <p className="text-deep-space-500 leading-relaxed mb-8">{description}</p>

                    <div className="flex gap-4 mb-6">
                      {technologies.map(({ icon: TechIcon, name }) => (
                        <div
                          key={name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warm-sand-200/50 border border-warm-sand-300/30"
                        >
                          <TechIcon className="w-4 h-4 text-deep-space-600" />
                          <span className="text-xs font-medium text-deep-space-700">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`bg-white rounded-2xl p-8 border border-warm-sand-300/30 shadow-sm ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-deep-space-400 mb-5">
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {features.map((feature) => (
                        <li key={feature} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-5 h-5 text-harvest-gold-400 flex-shrink-0 mt-0.5" />
                          <span className="text-deep-space-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-space-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-harvest-gold-200/3 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <AnimatedSection>
            <SectionHeading
              label="How We Work"
              title="Our Process"
              description="A proven approach that keeps things transparent, collaborative, and on track."
              light
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(({ step, title, description }, index) => (
              <AnimatedSection
                key={step}
                animation="fade-in-up"
                delay={`animate-delay-${(index + 1) * 100}`}
              >
                <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 h-full">
                  <span className="text-4xl font-bold text-harvest-gold-200/20">{step}</span>
                  <h3 className="text-lg font-semibold text-warm-sand-100 mt-3 mb-2">{title}</h3>
                  <p className="text-sm text-warm-sand-400 leading-relaxed">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-sand-50">
        <div className="section-container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-space-800 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-deep-space-500 max-w-lg mx-auto mb-8">
              Let's discuss how we can help you achieve your goals with the right technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/contact" variant="secondary" size="lg">
                Request a Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button to="/portfolio" variant="outline" size="lg">
                See Our Work
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
