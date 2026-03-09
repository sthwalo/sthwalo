import { Globe, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const deliveredProjects = [
  { name: 'HEOSA Africa', url: 'https://heosa.africa', description: 'Health Excellence Organisation of Southern Africa' },
  { name: 'Dr. Mmako Practice', url: 'https://drmmako.co.za', description: 'Neurologist practice at Riverside Medical Center' },
  { name: 'ExecuHire', url: 'https://www.execuhire.co.za', description: 'Luxury vehicle rental platform' },
  { name: 'Leolilly Care', url: 'https://leolilly.org', description: 'Caregiving and support services' },
  { name: 'The Dermatology Diary', url: 'https://thedermatologydiary.com', description: '1.17K impressions, 5.4% CTR in 3 months' },
];

export default function TrustSignals() {
  return (
    <section className="section-padding bg-warm-sand-50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            label="Delivered"
            title="Live in Production"
            description="A selection of websites and backend systems we've launched and maintain for clients across industries."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {deliveredProjects.map((project, index) => (
            <AnimatedSection
              key={index}
              animation="fade-in-up"
              delay={`animate-delay-${(index + 1) * 100}`}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-warm-sand-300/30 hover:border-harvest-gold-200/40 hover:shadow-md transition-all duration-300 group h-full"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-deep-space-800 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-harvest-gold-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-deep-space-800 group-hover:text-harvest-gold-600 transition-colors">
                      {project.name}
                    </h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-deep-space-300 group-hover:text-harvest-gold-500 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm text-deep-space-500 mt-1">{project.description}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="rounded-2xl bg-deep-space-800 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-harvest-gold-200/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-oxblood-600/5 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-warm-sand-100 mb-4">
                Ready to Build Something Great?
              </h3>
              <p className="text-warm-sand-400 max-w-lg mx-auto mb-8 leading-relaxed">
                Whether you have a clear vision or just the seed of an idea, we're here
                to help bring it to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/contact" variant="primary" size="lg">
                  Start a Conversation
                </Button>
                <Button to="/portfolio" variant="outline" size="lg" className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
