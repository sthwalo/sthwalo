import { useState, type FormEvent } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Linkedin,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

const serviceOptions = [
  'Custom Development',
  'Cloud Solutions',
  'AI Integration',
  'Legacy Modernization',
  'FIN Demo Request',
  'General Inquiry',
];

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

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
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              Let's start a
              <br />
              <span className="text-harvest-gold-200">conversation</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              Have a project in mind, want to see FIN in action, or just want to
              talk software? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-8 md:p-10 border border-warm-sand-300/30 shadow-sm">
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-deep-space-800 mb-3">
                        Message Sent
                      </h3>
                      <p className="text-deep-space-500 max-w-md mx-auto mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-sm font-medium text-harvest-gold-500 hover:text-harvest-gold-600 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-deep-space-700 mb-2"
                          >
                            Full Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-warm-sand-300/50 bg-warm-sand-50/50 text-deep-space-800 placeholder-deep-space-300 focus:outline-none focus:ring-2 focus:ring-harvest-gold-200 focus:border-transparent transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-deep-space-700 mb-2"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-warm-sand-300/50 bg-warm-sand-50/50 text-deep-space-800 placeholder-deep-space-300 focus:outline-none focus:ring-2 focus:ring-harvest-gold-200 focus:border-transparent transition-all"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-deep-space-700 mb-2"
                          >
                            Company
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={form.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-warm-sand-300/50 bg-warm-sand-50/50 text-deep-space-800 placeholder-deep-space-300 focus:outline-none focus:ring-2 focus:ring-harvest-gold-200 focus:border-transparent transition-all"
                            placeholder="Your company"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium text-deep-space-700 mb-2"
                          >
                            Service Interest
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-warm-sand-300/50 bg-warm-sand-50/50 text-deep-space-800 focus:outline-none focus:ring-2 focus:ring-harvest-gold-200 focus:border-transparent transition-all"
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-deep-space-700 mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-warm-sand-300/50 bg-warm-sand-50/50 text-deep-space-800 placeholder-deep-space-300 focus:outline-none focus:ring-2 focus:ring-harvest-gold-200 focus:border-transparent transition-all resize-none"
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                          Something went wrong. Please try again or email us directly.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-harvest-gold-200 text-deep-space-800 hover:bg-harvest-gold-300 shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection animation="slide-in-right">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-deep-space-800 mb-4">
                      Reach Out Directly
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="mailto:hello@sthwalo.com"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-sand-300/30 hover:border-harvest-gold-200/40 hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-harvest-gold-200/15 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-harvest-gold-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-deep-space-800">Email Us</div>
                          <div className="text-xs text-deep-space-400">hello@sthwalo.com</div>
                        </div>
                      </a>

                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-sand-300/30">
                        <div className="w-10 h-10 rounded-lg bg-harvest-gold-200/15 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-harvest-gold-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-deep-space-800">Location</div>
                          <div className="text-xs text-deep-space-400">Johannesburg, South Africa</div>
                        </div>
                      </div>

                      <a
                        href="https://www.linkedin.com/in/inyoni/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-sand-300/30 hover:border-harvest-gold-200/40 hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-harvest-gold-200/15 flex items-center justify-center">
                          <Linkedin className="w-5 h-5 text-harvest-gold-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-deep-space-800">LinkedIn</div>
                          <div className="text-xs text-deep-space-400">Connect with Immaculate</div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-deep-space-300 group-hover:text-harvest-gold-500 transition-colors" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-deep-space-800">
                    <h3 className="text-lg font-semibold text-warm-sand-100 mb-3">
                      Looking for FIN Access?
                    </h3>
                    <p className="text-sm text-warm-sand-400 leading-relaxed mb-4">
                      Existing FIN users can sign in directly. New users can
                      request a demo through the form.
                    </p>
                    <div className="flex gap-3">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-warm-sand-300 border border-white/10">
                        SSO Enabled
                      </span>
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-warm-sand-300 border border-white/10">
                        Demo Available
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-warm-sand-300/30">
                    <h3 className="text-sm font-semibold text-deep-space-800 mb-2">
                      Response Time
                    </h3>
                    <p className="text-sm text-deep-space-500">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
