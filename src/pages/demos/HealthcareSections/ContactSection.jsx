import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <footer className="bg-white text-gray-800 pt-20 pb-10 px-6 border-t" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-teal-600 mb-4">Contact Our Clinic</h3>
          <p className="flex items-center gap-2 mb-3">
            <FaPhoneAlt className="text-teal-500" /> (555) 789-1010
          </p>
          <p className="flex items-center gap-2 mb-3">
            <FaEnvelope className="text-teal-500" /> care@health-demo.com
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-teal-500" />
            456 Wellness Way, Medville, CA 90210
          </p>
        </div>

        <div>
          <iframe
            title="Clinic Map"
            src="https://maps.google.com/maps?q=clinic%20medical%20center&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            className="rounded-lg shadow"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HealthDemo Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactSection;
