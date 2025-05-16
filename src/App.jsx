// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Demos from './pages/Demos';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDemo from './pages/AdminDemo';
import CustomerDemo from './pages/CustomerDemo';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-demo" element={<AdminDemo />} />
        <Route path="/customer-demo" element={<CustomerDemo />} />
      </Routes>
    </>
  );
}