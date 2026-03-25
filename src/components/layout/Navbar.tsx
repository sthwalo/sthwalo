import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? 'bg-deep-space-800/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center group">
          <img
            src="/STHWALO.png"
            alt="Sthwalo Holdings"
            className="h-10 w-auto group-hover:scale-105 transition-transform"
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-harvest-gold-200 bg-white/10'
                    : showSolid
                    ? 'text-warm-sand-300 hover:text-warm-sand-100 hover:bg-white/5'
                    : 'text-warm-sand-200 hover:text-warm-sand-100 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button href="/app/" variant="primary" size="sm">
            Access FIN
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-warm-sand-200 hover:bg-white/10 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-deep-space-800/98 backdrop-blur-lg border-t border-white/5 animate-fade-in-down">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-harvest-gold-200 bg-white/10'
                      : 'text-warm-sand-300 hover:text-warm-sand-100 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Button href="/app/" variant="primary" size="md" className="w-full">
                Access FIN
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
