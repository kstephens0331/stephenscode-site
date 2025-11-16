import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <footer className="bg-white text-gray-800 pt-20 pb-10 px-6 border-t" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-orange-600 mb-4">Customer Support</h3>
          <p className="flex items-center gap-2 mb-3">
            <FaPhoneAlt className="text-orange-500" /> (800) 555-9988
          </p>
          <p className="flex items-center gap-2 mb-3">
            <FaEnvelope className="text-orange-500" /> support@ecom-demo.com
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            789 Commerce Blvd, Marketville, NY 10001
          </p>
        </div>

        <div>
          <iframe
            title="Map Location"
            src="https://maps.google.com/maps?q=retail%20store&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            className="rounded-lg shadow"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ecom Demo Store. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactSection;
