// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

import Home from './pages/Home';
import Packages from './pages/Packages';
import Demos from './pages/Demos';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDemo from './pages/AdminDemo';
import CustomerDemo from './pages/CustomerDemo';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import HealthcareDemo from "./pages/demos/HealthcareDemo";
import EventDemo from "./pages/demos/EventDemo";
import SecurityDemo from "./pages/demos/SecurityDemo";
import ConstructionDemo from "./pages/demos/ConstructionDemo";
import AdminPortalDemo from "./pages/demos/AdminPortalDemo";
import CustomerPortalDemo from "./pages/demos/CustomerPortalDemo";
import EcommerceDemo from "./pages/demos/EcommerceDemo";
import Cart from "./pages/Cart";


export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-demo" element={<AdminDemo />} />
            <Route path="/customer-demo" element={<CustomerDemo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/demos/healthcare" element={<HealthcareDemo />} />
            <Route path="/demos/event" element={<EventDemo />} />
            <Route path="/demos/security" element={<SecurityDemo />} />
            <Route path="/demos/construction" element={<ConstructionDemo />} />
            <Route path="/demos/ecommerce" element={<EcommerceDemo />} />
            <Route path="/demos/admin-portal" element={<AdminPortalDemo />} />
            <Route path="/demos/customer-portal" element={<CustomerPortalDemo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
