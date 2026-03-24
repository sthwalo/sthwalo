import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'Full-Stack Development',
  'Cloud & DevOps',
  'Security & Compliance',
  'Financial Systems',
];

export default function Footer() {
  return (
    <footer className="bg-deep-space-800 text-warm-sand-300">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-5">
              <img
                src="/STHWALO.png"
                alt="Sthwalo Holdings"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-warm-sand-400 mb-6 max-w-xs">
              Building foundations with code. We craft intelligent software solutions
              that transform how businesses operate.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/inyoni/' },
                { icon: Github, href: 'https://github.com/sthwalo' },
                { icon: Twitter, href: 'https://x.com/nyoniimma' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-harvest-gold-200 hover:text-deep-space-800 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-sand-100 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-harvest-gold-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-sand-100 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm hover:text-harvest-gold-200 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-sand-100 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Ready to start your next project? We'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-harvest-gold-200 hover:text-harvest-gold-100 transition-colors group"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-sand-500">
            &copy; {new Date().getFullYear()} Sthwalo Holdings. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-warm-sand-500 hover:text-warm-sand-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-warm-sand-500 hover:text-warm-sand-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
