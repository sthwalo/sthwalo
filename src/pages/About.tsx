import {
  Target,
  Heart,
  Lightbulb,
  Shield,
  ArrowUpRight,
  BookOpen,
  Rocket,
  Award,
  Building2,
  GraduationCap,
  Code,
} from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const values = [
  {
    icon: Target,
    title: 'Finance-First Engineering',
    description: 'We apply accounting and control principles to software and operations -- building platforms that are audit-ready from day one.',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    description:
      'Every system we build is purposeful. Quality is not a checklist item -- it is the foundation of reliable, maintainable software.',
  },
  {
    icon: Lightbulb,
    title: 'Relentless Curiosity',
    description:
      'From bookkeeping to backend architecture, every skill was self-directed. We never stop learning and never stop building.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Pragmatic security controls, SIEM integration, and governance are embedded from the start -- not bolted on later.',
  },
];

const milestones = [
  { year: '2011', title: 'Financial Foundations', description: 'Started as a bookkeeper at Jelous Down Financial, managing 15+ client portfolios and processing 1,000+ monthly transactions.' },
  { year: '2013', title: 'Professional Development', description: 'Enrolled at the South African Accounting Academy for bookkeeping, tax, and compliance certifications.' },
  { year: '2016', title: 'Tax Practice', description: 'Launched independent accounting practice -- managing SARS e-filing, payroll, and financial reporting for 10+ organisations.' },
  { year: '2021', title: 'Sthwalo Holdings Founded', description: 'Registered Sthwalo Holdings with CIPC, transitioning from finance into full-stack software engineering.' },
  { year: '2023', title: 'Production Engineering', description: 'Began delivering production websites and backend systems in Java, Laravel, and React/TypeScript. Built FIN financial management platform.' },
  { year: '2025', title: 'Cybersecurity & Scale', description: 'Completed Google Cybersecurity Specialization. Continued scaling production systems on AWS with Docker and security hardening.' },
];

export default function About() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-oxblood-600/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4 animate-fade-in">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              From finance ledgers
              <br />
              <span className="text-harvest-gold-200">to production code.</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              Sthwalo Holdings blends a decade of accounting discipline with
              hands-on software engineering. We build systems the way we audit
              books -- with precision, control, and zero tolerance for errors.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative">
                <img
                  src="/Immaculate Low.png"
                  alt="Immaculate Nyoni"
                  className="rounded-2xl w-full object-cover aspect-[4/5] shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-deep-space-800 rounded-xl p-5 shadow-xl">
                  <div className="text-2xl font-bold text-harvest-gold-200">10+ Years</div>
                  <div className="text-sm text-warm-sand-400">Finance, Engineering & Security</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-300 mb-3">
                The Founder
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-space-800 leading-tight mb-6">
                Immaculate Nyoni
              </h2>
              <div className="space-y-4 text-deep-space-600 leading-relaxed">
                <p>
                  A systems entrepreneur and tech leader who applies accounting and
                  control principles to software and operations. With 10+ years across
                  product, IT, and finance, Immaculate builds reliable platforms and
                  controlled processes that enable scalable, compliant growth.
                </p>
                <p>
                  His journey started in financial record management -- processing
                  1,000+ monthly transactions, managing SARS compliance for 10+
                  organisations, and achieving zero-error audit records. That discipline
                  now drives every system he builds.
                </p>
                <p>
                  Attended IU for Computer Science, then resumed self-directed learning
                  through hands-on projects and certifications. Today he delivers
                  production systems in Java, React, PHP, and PostgreSQL -- deployed
                  on AWS with Docker and enterprise-grade security.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Java', 'Spring Boot', 'React', 'TypeScript', 'PHP', 'PostgreSQL', 'Docker', 'AWS', 'SIEM'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-xs font-medium rounded-full bg-warm-sand-200/60 text-deep-space-700 border border-warm-sand-300/30">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="https://www.linkedin.com/in/inyoni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-deep-space-800 hover:text-harvest-gold-600 transition-colors group"
                >
                  Connect with Immaculate on LinkedIn
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <AnimatedSection>
            <SectionHeading
              label="Our Values"
              title="What Guides Us"
              description="These core principles shape every decision we make and every solution we build."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }, index) => (
              <AnimatedSection
                key={title}
                animation="fade-in-up"
                delay={`animate-delay-${(index + 1) * 100}`}
              >
                <div className="p-8 rounded-2xl border border-warm-sand-300/30 hover:border-harvest-gold-200/40 hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-harvest-gold-200/15 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-harvest-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-deep-space-800 mb-3">{title}</h3>
                  <p className="text-deep-space-500 leading-relaxed">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <AnimatedSection>
            <SectionHeading
              label="Our Journey"
              title="Milestones Along the Way"
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-warm-sand-300" />
              <div className="space-y-10">
                {milestones.map(({ year, title, description }, index) => {
                  const icons = [BookOpen, GraduationCap, Building2, Rocket, Code, Award];
                  const Icon = icons[index];
                  return (
                    <AnimatedSection
                      key={index}
                      animation="fade-in-up"
                      delay={`animate-delay-${(index + 1) * 100}`}
                    >
                      <div className="flex gap-6">
                        <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-deep-space-800 flex items-center justify-center z-10">
                          <Icon className="w-5 h-5 text-harvest-gold-200" />
                        </div>
                        <div className="pt-1">
                          <span className="text-sm font-semibold text-harvest-gold-500">{year}</span>
                          <h3 className="text-lg font-bold text-deep-space-800 mt-1">{title}</h3>
                          <p className="text-deep-space-500 mt-1">{description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-deep-space-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-60 h-60 rounded-full bg-harvest-gold-200/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-warm-sand-100 mb-4">
              Want to Work Together?
            </h2>
            <p className="text-warm-sand-400 max-w-lg mx-auto mb-8">
              We're always looking for the next meaningful challenge. Let's build something great.
            </p>
            <Button to="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
