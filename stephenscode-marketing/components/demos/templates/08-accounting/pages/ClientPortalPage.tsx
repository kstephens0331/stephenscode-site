import React, { useEffect, useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield, FileText, TrendingUp, Calendar, MessageSquare, Settings, LogOut, DollarSign, Download, AlertCircle, X, CheckCircle, Upload, ChevronDown } from 'lucide-react';

interface ClientPortalPageProps {
  onNavigate: (page: string) => void;
}

interface PortalDocument {
  name: string;
  date: string;
  size: string;
}

interface PortalMessage {
  advisor: string;
  subject: string;
  date: string;
}

interface PortalMeeting {
  date: string;
  type: string;
}

interface PortalPrefs {
  emailNotifications: boolean;
  monthlyStatements: boolean;
  twoFactor: boolean;
  loginAlerts: boolean;
  paperless: boolean;
  autoArchive: boolean;
}

const STORAGE_KEYS = {
  documents: 'demo_accounting_portal_documents',
  messages: 'demo_accounting_portal_messages',
  meeting: 'demo_accounting_portal_meeting',
  prefs: 'demo_accounting_portal_prefs',
};

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable; portal state simply won't persist
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateInput(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(Math.round(bytes / 1024), 1)} KB`;
}

const INITIAL_DOCUMENTS: PortalDocument[] = [
  { name: '2024 Q3 Investment Statement', date: 'Nov 1, 2024', size: '2.3 MB' },
  { name: '2023 Tax Return (Form 1040)', date: 'Oct 15, 2024', size: '1.8 MB' },
  { name: 'Estate Planning Document Updates', date: 'Sep 28, 2024', size: '3.1 MB' },
  { name: 'Portfolio Rebalancing Report', date: 'Sep 15, 2024', size: '1.2 MB' },
  { name: '2024 Q2 Investment Statement', date: 'Aug 1, 2024', size: '2.2 MB' },
  { name: 'Mid-Year Tax Projection', date: 'Jul 12, 2024', size: '0.9 MB' },
  { name: '2024 Q1 Investment Statement', date: 'May 1, 2024', size: '2.1 MB' },
  { name: 'Annual Financial Plan Review', date: 'Feb 20, 2024', size: '4.2 MB' },
];

const ADVISORS = ['David Chen, CFP', 'Linda Martinez, CPA', 'Robert Thompson, CPA, CFP'];

const TIME_SLOTS = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

const MEETING_TYPES = ['Portfolio Review', 'Tax Planning', 'Q4 Review', 'Estate Planning', 'General Check-in'];

/* ---------- Reusable Toggle ---------- */

function ToggleRow({ id, label, description, checked, onChange }: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-semibold text-[#14213d] text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#fca311]' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${checked ? 'left-6' : 'left-0.5'}`}
        />
      </button>
    </div>
  );
}

/* ---------- Modals ---------- */

function ModalShell({ title, icon: Icon, onClose, children }: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/60 cursor-default" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#14213d] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center">
              <Icon size={20} className="text-[#14213d]" />
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function MessageAdvisorModal({ onClose, onSend, history }: {
  onClose: () => void;
  onSend: (message: PortalMessage) => void;
  history: PortalMessage[];
}) {
  const [advisor, setAdvisor] = useState(ADVISORS[0]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    onSend({ advisor, subject, date: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` });
    setSent(true);
  };

  return (
    <ModalShell title="Message Your Advisor" icon={MessageSquare} onClose={onClose}>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-white" size={36} />
          </div>
          <h3 className="text-xl font-bold text-[#14213d] mb-2">Message Sent</h3>
          <p className="text-gray-600 mb-6">
            Your message has been delivered to {advisor}. You can expect a reply within 1 business day.
          </p>
          <button onClick={onClose} className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="portal-msg-advisor" className="block text-sm font-semibold text-gray-700 mb-1">Send To</label>
            <select id="portal-msg-advisor" value={advisor} onChange={(e) => setAdvisor(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {ADVISORS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="portal-msg-subject" className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
            <input id="portal-msg-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="e.g. Question about my Q3 statement" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
          </div>
          <div>
            <label htmlFor="portal-msg-body" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea id="portal-msg-body" value={body} onChange={(e) => setBody(e.target.value)} required rows={4} placeholder="Write your message..." className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] resize-none" />
          </div>
          <button type="submit" className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
            Send Secure Message
          </button>
          {history.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Recent messages</p>
              <div className="space-y-2">
                {history.slice(0, 3).map((message, index) => (
                  <div key={index} className="text-sm bg-gray-50 rounded-lg px-3 py-2">
                    <p className="font-semibold text-[#14213d]">{message.subject}</p>
                    <p className="text-xs text-gray-500">To {message.advisor} • {message.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      )}
    </ModalShell>
  );
}

function ScheduleMeetingModal({ onClose, onSchedule }: {
  onClose: () => void;
  onSchedule: (meeting: PortalMeeting) => void;
}) {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState(MEETING_TYPES[0]);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) return;
    onSchedule({ date: formatDateInput(date), type: meetingType });
    setConfirmed(true);
  };

  return (
    <ModalShell title="Schedule a Meeting" icon={Calendar} onClose={onClose}>
      {confirmed ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-white" size={36} />
          </div>
          <h3 className="text-xl font-bold text-[#14213d] mb-2">Meeting Requested</h3>
          <p className="text-gray-600 mb-6">
            Your {meetingType.toLowerCase()} is set for {formatDateInput(date)} at {slot}. A calendar invitation and video link will arrive by email.
          </p>
          <button onClick={onClose} className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="portal-meet-type" className="block text-sm font-semibold text-gray-700 mb-1">Meeting Type</label>
            <select id="portal-meet-type" value={meetingType} onChange={(e) => setMeetingType(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {MEETING_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="portal-meet-date" className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
            <input id="portal-meet-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
          </div>
          <div>
            <p className="block text-sm font-semibold text-gray-700 mb-2">Available Times</p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSlot(time)}
                  className={`px-2 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                    slot === time
                      ? 'bg-[#14213d] text-white border-[#14213d]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#fca311]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={!date || !slot}
            className="w-full bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Meeting Request
          </button>
        </form>
      )}
    </ModalShell>
  );
}

function UploadDocumentModal({ onClose, onUpload }: {
  onClose: () => void;
  onUpload: (doc: PortalDocument) => void;
}) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [category, setCategory] = useState('Tax Documents');
  const [done, setDone] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    const now = new Date();
    onUpload({
      name: `${fileName} (${category})`,
      date: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
      size: fileSize || '0.1 MB',
    });
    setDone(true);
  };

  return (
    <ModalShell title="Upload a Document" icon={Upload} onClose={onClose}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-white" size={36} />
          </div>
          <h3 className="text-xl font-bold text-[#14213d] mb-2">Upload Complete</h3>
          <p className="text-gray-600 mb-6">
            {fileName} has been securely uploaded and now appears in your recent documents. Your advisor has been notified.
          </p>
          <button onClick={onClose} className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="portal-upload-file" className="block text-sm font-semibold text-gray-700 mb-1">Select File</label>
            <input
              id="portal-upload-file"
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#14213d] file:text-white file:font-semibold hover:file:bg-[#1a2a4d] file:cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-3"
            />
            {fileName && (
              <p className="text-xs text-gray-500 mt-2">{fileName} • {fileSize}</p>
            )}
          </div>
          <div>
            <label htmlFor="portal-upload-category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select id="portal-upload-category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {['Tax Documents', 'Investment Records', 'Estate Documents', 'Receipts', 'Other'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            <Shield size={16} className="flex-shrink-0 mt-0.5 text-blue-600" />
            <span>Files are encrypted in transit and at rest. Only you and your advisory team can access them.</span>
          </div>
          <button
            type="submit"
            disabled={!fileName}
            className="w-full bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Securely
          </button>
        </form>
      )}
    </ModalShell>
  );
}

/* ---------- Page ---------- */

export default function ClientPortalPage({ onNavigate }: ClientPortalPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authView, setAuthView] = useState<'login' | 'reset'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [documents, setDocuments] = useState<PortalDocument[]>(() => loadStored(STORAGE_KEYS.documents, INITIAL_DOCUMENTS));
  const [messages, setMessages] = useState<PortalMessage[]>(() => loadStored(STORAGE_KEYS.messages, [] as PortalMessage[]));
  const [nextMeeting, setNextMeeting] = useState<PortalMeeting>(() => loadStored(STORAGE_KEYS.meeting, { date: 'Nov 20, 2024', type: 'Q4 Review' }));
  const [prefs, setPrefs] = useState<PortalPrefs>(() => loadStored(STORAGE_KEYS.prefs, {
    emailNotifications: true,
    monthlyStatements: true,
    twoFactor: true,
    loginAlerts: false,
    paperless: true,
    autoArchive: false,
  }));

  const [showAllDocs, setShowAllDocs] = useState(false);
  const [activeModal, setActiveModal] = useState<'message' | 'schedule' | 'upload' | null>(null);
  const [openPanel, setOpenPanel] = useState<'settings' | 'security' | 'documents' | null>(null);

  useEffect(() => { saveStored(STORAGE_KEYS.documents, documents); }, [documents]);
  useEffect(() => { saveStored(STORAGE_KEYS.messages, messages); }, [messages]);
  useEffect(() => { saveStored(STORAGE_KEYS.meeting, nextMeeting); }, [nextMeeting]);
  useEffect(() => { saveStored(STORAGE_KEYS.prefs, prefs); }, [prefs]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveModal(null);
    setOpenPanel(null);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  const togglePref = (key: keyof PortalPrefs) => {
    setPrefs((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleDownloadDocument = (doc: PortalDocument) => {
    const filename = `${doc.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`;
    const content = [
      'PEAK FINANCIAL ADVISORS - SECURE CLIENT PORTAL',
      '='.repeat(50),
      '',
      `Document: ${doc.name}`,
      `Published: ${doc.date}`,
      'Prepared for: John Anderson',
      '',
      'This document was retrieved from your secure client portal.',
      'For questions about its contents, message your advisor from the portal',
      'or call (555) 123-4567.',
    ].join('\n');
    downloadTextFile(filename, content);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-300px)] bg-gray-50 py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {authView === 'reset' ? (
              <div>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#14213d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-[#fca311]" size={40} />
                  </div>
                  <h1 className="text-3xl font-bold text-[#14213d] mb-2">Reset Password</h1>
                  <p className="text-gray-600">We&rsquo;ll email you a secure reset link</p>
                </div>

                {resetSent ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-white" size={36} />
                    </div>
                    <h2 className="text-xl font-bold text-[#14213d] mb-2">Check Your Email</h2>
                    <p className="text-gray-600 mb-6">
                      If an account exists for {resetEmail}, a password reset link is on its way. The link expires in 30 minutes.
                    </p>
                    <button
                      onClick={() => {
                        setAuthView('login');
                        setResetSent(false);
                        setResetEmail('');
                      }}
                      className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleResetSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="accounting-portal-reset-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="accounting-portal-reset-email"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                          required
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
                      Send Reset Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthView('login')}
                      className="w-full text-sm text-[#fca311] hover:text-[#e59400] font-semibold"
                    >
                      Back to Sign In
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#14213d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-[#fca311]" size={40} />
                  </div>
                  <h1 className="text-3xl font-bold text-[#14213d] mb-2">Client Portal Login</h1>
                  <p className="text-gray-600">Access your secure financial dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="accounting-portal-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="accounting-portal-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                        required
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="accounting-portal-password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="accounting-portal-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="accounting-portal-remember" className="flex items-center gap-2 cursor-pointer">
                      <input id="accounting-portal-remember" type="checkbox" className="w-4 h-4 text-[#fca311] border-gray-300 rounded focus:ring-[#fca311]" />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthView('reset')}
                      className="text-sm text-[#fca311] hover:text-[#e59400] font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors"
                  >
                    Sign In to Portal
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-1">Secure Access</p>
                      <p className="text-blue-700">Your data is protected with bank-level 256-bit encryption and multi-factor authentication.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don&rsquo;t have portal access?{' '}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-[#fca311] hover:text-[#e59400] font-semibold"
                    >
                      Contact us
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Demo credentials note */}
          <div className="mt-6 bg-[#fca311] text-[#14213d] rounded-lg p-4">
            <p className="font-semibold mb-1">Demo Mode</p>
            <p className="text-sm">Enter any email and password to view the demo dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  const visibleDocuments = showAllDocs ? documents : documents.slice(0, 4);

  // Logged-in Dashboard View
  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#14213d] mb-1">Welcome back, John!</h1>
              <p className="text-gray-600">Here&rsquo;s your financial overview</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="text-[#fca311]" size={32} />
              <span className="text-sm text-gray-300">Total Assets</span>
            </div>
            <p className="text-3xl font-bold mb-1">$1,247,850</p>
            <p className="text-sm text-green-400 flex items-center gap-1">
              <TrendingUp size={14} />
              +8.3% YTD
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#e5e5e5]">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-[#fca311]" size={32} />
              <span className="text-sm text-gray-600">Portfolio Return</span>
            </div>
            <p className="text-3xl font-bold text-[#14213d] mb-1">+12.4%</p>
            <p className="text-sm text-gray-600">Last 12 months</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#e5e5e5]">
            <div className="flex items-center justify-between mb-4">
              <Shield className="text-[#fca311]" size={32} />
              <span className="text-sm text-gray-600">Tax Savings</span>
            </div>
            <p className="text-3xl font-bold text-[#14213d] mb-1">$42,350</p>
            <p className="text-sm text-gray-600">2024 YTD</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#e5e5e5]">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="text-[#fca311]" size={32} />
              <span className="text-sm text-gray-600">Next Meeting</span>
            </div>
            <p className="text-xl font-bold text-[#14213d] mb-1">{nextMeeting.date}</p>
            <p className="text-sm text-gray-600">{nextMeeting.type}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Recent Documents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#14213d]">Recent Documents</h2>
                <button
                  onClick={() => setShowAllDocs(!showAllDocs)}
                  className="text-[#fca311] font-semibold hover:text-[#e59400]"
                >
                  {showAllDocs ? 'Show Less' : `View All (${documents.length})`}
                </button>
              </div>
              <div className="space-y-4">
                {visibleDocuments.map((doc, index) => (
                  <div key={`${doc.name}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#14213d] rounded-lg flex items-center justify-center">
                        <FileText className="text-[#fca311]" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#14213d]">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      aria-label={`Download ${doc.name}`}
                      className="text-[#fca311] hover:text-[#e59400]"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#14213d] mb-6">Portfolio Allocation</h2>
              <div className="space-y-4">
                {[
                  { category: 'Stocks', percentage: 60, amount: '$748,710', color: 'bg-[#14213d]' },
                  { category: 'Bonds', percentage: 25, amount: '$311,963', color: 'bg-[#fca311]' },
                  { category: 'Real Estate', percentage: 10, amount: '$124,785', color: 'bg-gray-400' },
                  { category: 'Cash', percentage: 5, amount: '$62,392', color: 'bg-gray-300' },
                ].map((asset, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[#14213d]">{asset.category}</span>
                      <span className="text-gray-600">{asset.amount} ({asset.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${asset.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${asset.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#14213d] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal('message')}
                  className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Message Advisor
                </button>
                <button
                  onClick={() => setActiveModal('schedule')}
                  className="w-full bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={18} />
                  Schedule Meeting
                </button>
                <button
                  onClick={() => setActiveModal('upload')}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  Upload Document
                </button>
              </div>
            </div>

            {/* Important Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#14213d] mb-4">Alerts & Reminders</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900">Tax Document Ready</p>
                    <p className="text-blue-700">Your Q3 tax estimate is available for review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">Estate Plan Updated</p>
                    <p className="text-green-700">Your documents have been finalized</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#14213d] mb-4">Account</h3>
              <div className="space-y-2">
                <div>
                  <button
                    onClick={() => setOpenPanel(openPanel === 'settings' ? null : 'settings')}
                    className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <Settings size={18} />
                      Account Settings
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${openPanel === 'settings' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPanel === 'settings' && (
                    <div className="px-3 pb-2 divide-y divide-gray-100">
                      <ToggleRow
                        id="portal-pref-email"
                        label="Email Notifications"
                        description="Statements, alerts, and advisor replies"
                        checked={prefs.emailNotifications}
                        onChange={() => togglePref('emailNotifications')}
                      />
                      <ToggleRow
                        id="portal-pref-statements"
                        label="Monthly Statements"
                        description="Receive a summary on the 1st of each month"
                        checked={prefs.monthlyStatements}
                        onChange={() => togglePref('monthlyStatements')}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setOpenPanel(openPanel === 'security' ? null : 'security')}
                    className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <Shield size={18} />
                      Security & Privacy
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${openPanel === 'security' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPanel === 'security' && (
                    <div className="px-3 pb-2 divide-y divide-gray-100">
                      <ToggleRow
                        id="portal-pref-2fa"
                        label="Two-Factor Authentication"
                        description="Require a code at every sign-in"
                        checked={prefs.twoFactor}
                        onChange={() => togglePref('twoFactor')}
                      />
                      <ToggleRow
                        id="portal-pref-login-alerts"
                        label="Login Alerts"
                        description="Email me when a new device signs in"
                        checked={prefs.loginAlerts}
                        onChange={() => togglePref('loginAlerts')}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setOpenPanel(openPanel === 'documents' ? null : 'documents')}
                    className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <FileText size={18} />
                      Document Preferences
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${openPanel === 'documents' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPanel === 'documents' && (
                    <div className="px-3 pb-2 divide-y divide-gray-100">
                      <ToggleRow
                        id="portal-pref-paperless"
                        label="Paperless Delivery"
                        description="Portal-only delivery, no mailed copies"
                        checked={prefs.paperless}
                        onChange={() => togglePref('paperless')}
                      />
                      <ToggleRow
                        id="portal-pref-archive"
                        label="Auto-Archive"
                        description="Move documents older than 2 years to archive"
                        checked={prefs.autoArchive}
                        onChange={() => togglePref('autoArchive')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Modals */}
      {activeModal === 'message' && (
        <MessageAdvisorModal
          onClose={() => setActiveModal(null)}
          onSend={(message) => setMessages((current) => [message, ...current])}
          history={messages}
        />
      )}
      {activeModal === 'schedule' && (
        <ScheduleMeetingModal
          onClose={() => setActiveModal(null)}
          onSchedule={(meeting) => setNextMeeting(meeting)}
        />
      )}
      {activeModal === 'upload' && (
        <UploadDocumentModal
          onClose={() => setActiveModal(null)}
          onUpload={(doc) => setDocuments((current) => [doc, ...current])}
        />
      )}
    </div>
  );
}
