import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400 text-sm pt-10 pb-6 mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Navigation */}
        <div className="space-y-2">
          <div className="font-semibold text-white text-base">Navigate</div>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link to="/" className="hover:text-orange-400 transition">Home</Link>
            <Link to="/about" className="hover:text-orange-400 transition">About</Link>
            <Link to="/packages" className="hover:text-orange-400 transition">Packages</Link>
            <Link to="/demos" className="hover:text-orange-400 transition">Demos</Link>
            <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
          </div>
        </div>

        {/* Tagline or Badge */}
        <div className="space-y-2">
          <div className="text-white font-semibold">Veteran-Owned & Operated</div>
          <div className="text-sm text-gray-500 italic">
            Built with pride. Powered by purpose.
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="font-semibold text-white text-base">Contact</div>
          <a href="mailto:info@stephenscode.dev" className="hover:text-orange-400 transition">
            info@stephenscode.dev
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} StephensCode LLC. All rights reserved.
      </div>
    </footer>
  );
}
