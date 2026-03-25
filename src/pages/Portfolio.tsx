import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  FileText,
  ExternalLink,
  Eye,
  Lock,
  Globe,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const finFeatures = [
  { icon: BarChart3, title: 'Transaction Processing', text: '7,156+ transactions parsed, classified, and processed with automated double-entry journal generation and full ACID compliance.' },
  { icon: Shield, title: 'Enterprise Security', text: 'JWT authentication, role-based access control, encryption-at-rest, HTTPS/TLS transport, and comprehensive security hardening.' },
  { icon: Zap, title: 'Payroll & Tax Automation', text: 'Automated payroll processing with EMP201/SDL reporting, SARS compliance, and reduced manual processing time by 50%.' },
  { icon: FileText, title: 'Financial Reporting', text: '24 REST controllers powering dashboards, financial statements, reconciliation reports, and compliance documentation.' },
];

const finMetrics = [
  { value: '194', label: 'Java source files' },
  { value: '25+', label: 'Business services' },
  { value: '30+', label: 'Database tables' },
  { value: '118+', label: 'Unit tests' },
];

const techStack = ['Spring Boot 3', 'Java 17', 'React 19', 'TypeScript', 'PostgreSQL 17', 'Docker', 'AWS'];

const deliveredSites = [
  {
    title: 'HEOSA Africa',
    url: 'https://heosa.africa',
    description: 'African Health Excellence Organisation -- public-facing website with CMS and content management.',
  },
  {
    title: 'Dr. Tracy Mmako',
    url: 'https://drmmako.co.za',
    description: 'Neurologist practice site at Riverside Medical Center -- professional medical presence.',
  },
  {
    title: 'ExecuHire',
    url: 'https://www.execuhire.co.za',
    description: 'Luxury vehicle rental platform with booking system and fleet showcase.',
  },
  {
    title: 'Leolilly Care',
    url: 'https://leolilly.org',
    description: 'Non-profit caregiving and support services -- donation integration and service pages.',
  },
  {
    title: 'The Dermatology Diary',
    url: 'https://thedermatologydiary.com',
    description: 'Medical content platform -- 1.17K impressions, 63 clicks, 5.4% CTR within 3 months.',
  },
  {
    title: 'MP Business Hub',
    url: '#',
    description: 'Supporting local businesses in Mpumalanga -- directory and resource platform.',
  },
];

export default function Portfolio() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-oxblood-600/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4 animate-fade-in">
              Projects Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              Our work speaks
              <br />
              <span className="text-harvest-gold-200">for itself</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              A curated collection of applications we've designed, built, and
              deployed. Each project represents a real solution to a real problem.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-harvest-gold-200 text-deep-space-800">
                Featured
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
                Live
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mt-6">
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl overflow-hidden bg-deep-space-800 p-1 shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="FIN Financial Management System dashboard"
                    className="rounded-xl w-full object-cover aspect-[16/10]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-space-800/60 to-transparent rounded-xl" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-deep-space-800/90 text-warm-sand-200 border border-white/10 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-deep-space-800 mb-4">
                  FIN Financial Management System
                </h2>
                <p className="text-deep-space-500 leading-relaxed mb-6">
                  A production financial management backend built on Spring Boot 3 and
                  Java 17, deployed on AWS EC2/RDS with Docker. Processes 7,156+ transactions
                  with double-entry journals, payroll automation, and EMP/SDL reporting.
                  Frontend dashboard built with React 19 and TypeScript.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {finMetrics.map(({ value, label }) => (
                    <div key={label} className="p-4 rounded-xl bg-white border border-warm-sand-300/30">
                      <div className="text-lg font-bold text-deep-space-800">{value}</div>
                      <div className="text-xs text-deep-space-400 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/app/" variant="primary" size="md">
                    <Lock className="w-4 h-4" />
                    Sign In to FIN
                  </Button>
                  <Button to="/contact" variant="outline" size="md">
                    <Eye className="w-4 h-4" />
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <AnimatedSection>
            <SectionHeading
              label="Deep Dive"
              title="Inside FIN"
              description="A closer look at the capabilities powering a production financial management platform with 194 Java source files and 30+ database tables."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finFeatures.map(({ icon: Icon, title, text }, index) => (
              <AnimatedSection
                key={title}
                animation="fade-in-up"
                delay={`animate-delay-${(index + 1) * 100}`}
              >
                <div className="p-8 rounded-2xl bg-warm-sand-50 border border-warm-sand-300/30 hover:border-harvest-gold-200/40 hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-deep-space-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-harvest-gold-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-deep-space-800 mb-3">{title}</h3>
                  <p className="text-deep-space-500 leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-space-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-harvest-gold-200/3 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <AnimatedSection>
            <SectionHeading
              label="Case Study"
              title="The FIN Story"
              description="How accounting discipline and production engineering came together to build an enterprise financial management system."
              light
            />
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    phase: 'Challenge',
                    icon: Layers,
                    content:
                      'Manual financial workflows -- transaction classification, journal entries, payroll calculations, and tax reporting -- were consuming hours of effort with high risk of human error.',
                  },
                  {
                    phase: 'Solution',
                    icon: CheckCircle2,
                    content:
                      'Built FIN as a Spring Boot 3 / Java 17 backend with 25+ business services, Flyway-managed PostgreSQL migrations, HikariCP connection pooling, and a React 19 dashboard. Deployed on AWS EC2/RDS with Docker Compose and automated daily backups.',
                  },
                  {
                    phase: 'Result',
                    icon: BarChart3,
                    content:
                      'Processed 7,156+ transactions with automated classification and double-entry journal generation. Reduced manual processing by 50% through ingestion pipeline automation. 118+ unit tests ensure reliability across deployments.',
                  },
                ].map(({ phase, icon: Icon, content }) => (
                  <div key={phase} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-harvest-gold-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-harvest-gold-200 mb-2">{phase}</h3>
                      <p className="text-warm-sand-400 leading-relaxed">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <AnimatedSection>
            <SectionHeading
              label="Delivered"
              title="Client Websites & Systems"
              description="Production websites and backend systems delivered across healthcare, automotive, non-profit, and business services."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveredSites.map(({ title, url, description }, index) => (
              <AnimatedSection
                key={title}
                animation="fade-in-up"
                delay={`animate-delay-${(index + 1) * 100}`}
              >
                <a
                  href={url}
                  target={url !== '#' ? '_blank' : undefined}
                  rel={url !== '#' ? 'noopener noreferrer' : undefined}
                  className="block rounded-2xl bg-white border border-warm-sand-300/30 overflow-hidden hover:border-harvest-gold-200/40 hover:shadow-md transition-all duration-300 h-full group"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-deep-space-800 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-harvest-gold-200" />
                      </div>
                      {url !== '#' && (
                        <ArrowUpRight className="w-4 h-4 text-deep-space-300 group-hover:text-harvest-gold-500 transition-colors flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-deep-space-800 mb-2 group-hover:text-harvest-gold-600 transition-colors">{title}</h3>
                    <p className="text-sm text-deep-space-500 leading-relaxed flex-1">{description}</p>
                    <div className="mt-4 pt-4 border-t border-warm-sand-300/30">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
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
              Interested in FIN or Our Services?
            </h2>
            <p className="text-warm-sand-400 max-w-lg mx-auto mb-8">
              Whether you want to see FIN in action or discuss a custom project, we're ready to talk.
            </p>
            <Button to="/contact" variant="primary" size="lg">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
