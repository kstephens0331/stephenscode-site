import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <footer className="bg-white text-gray-800 pt-20 pb-10 px-6 border-t" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-orange-600 mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-3">
            <FaPhoneAlt className="text-orange-500" /> (555) 987-6543
          </p>
          <p className="flex items-center gap-2 mb-3">
            <FaEnvelope className="text-orange-500" /> contact@demo-construction.com
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            1234 Industrial Ave, Cityville, ST 12345
          </p>
        </div>

        <div>
          <iframe
            title="Map Location"
            src="https://maps.google.com/maps?q=construction%20company&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            className="rounded-lg shadow"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Demo Construction Co. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactSection;
