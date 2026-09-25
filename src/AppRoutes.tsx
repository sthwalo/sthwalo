import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Paia from './pages/Paia';
import Refunds from './pages/Refunds';
import ScrollToTop from './components/ui/ScrollToTop';
import Analytics from './components/ui/Analytics';

/**
 * Everything inside the router.
 *
 * Split out from App so the same tree can be rendered under a BrowserRouter in the browser and a
 * StaticRouter at build time. Without that split, prerendering would need a second copy of the
 * route table — and the copy that drifted would be the one search engines read.
 */
export default function AppRoutes() {
  return (
    <>
      <Analytics />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/paia" element={<Paia />} />
            <Route path="/refunds" element={<Refunds />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
