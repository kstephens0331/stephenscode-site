import React, { useState } from 'react';
import { X, CheckCircle, Send, User, Mail, Phone } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  service: string;
  formName: string;
  showDateTime?: boolean;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}

const LeadModal: React.FC<LeadModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  service,
  formName,
  showDateTime = false,
  submitLabel = 'Submit Request',
  messageLabel = 'Additional Details',
  messagePlaceholder = 'Tell us a little about what you are looking for...',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const resetAndClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setMessage('');
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Skyline Realty Group',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'skyline-realty-group',
          clientName: name,
          clientPhone: phone,
          clientEmail: email,
          service,
          preferredDate: date,
          preferredTime: time,
          notes: message,
        }),
      });
      if (response.ok) {
        trackEvent('generate_lead', { form_name: formName, demo_slug: 'skyline-realty-group' });
        trackConversion('leadForm');
        setSubmitted(true);
      }
    } catch {
      /* network errors are silently ignored in demo */
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
      onClick={resetAndClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-2xl font-bold text-[#000814]">{title}</h3>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-[#000814] mb-2">Request Received!</h4>
            <p className="text-gray-600 mb-6">
              Thank you, {name.split(' ')[0] || 'friend'}. A member of our team will reach out within 24 hours to confirm the details.
            </p>
            <button
              onClick={resetAndClose}
              className="bg-[#000814] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="realestate-lead-name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="realestate-lead-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="realestate-lead-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="realestate-lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="realestate-lead-phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="realestate-lead-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
              </div>
            </div>

            {showDateTime && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="realestate-lead-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    id="realestate-lead-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="realestate-lead-time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="realestate-lead-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  >
                    <option value="">Any time</option>
                    <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="realestate-lead-message" className="block text-sm font-medium text-gray-700 mb-2">
                {messageLabel}
              </label>
              <textarea
                id="realestate-lead-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={messagePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#ffc300] text-[#000814] px-6 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors flex items-center justify-center disabled:opacity-60"
            >
              <Send className="w-5 h-5 mr-2" />
              {submitting ? 'Sending...' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
