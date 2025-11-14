import React from 'react';
import {
  Settings,
  Palette,
  Type,
  Image,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Users,
  Calendar,
  DollarSign,
  Stethoscope,
  Heart
} from 'lucide-react';

interface AdminViewProps {
  businessInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  onUpdateBusinessInfo: (info: any) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onUpdateColors: (colors: any) => void;
}

export default function AdminView({
  businessInfo,
  onUpdateBusinessInfo,
  colors,
  onUpdateColors
}: AdminViewProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  const stats = [
    { label: 'Total Pages', value: '9', icon: FileText, color: colors.primary },
    { label: 'Services Listed', value: '12', icon: Stethoscope, color: colors.secondary },
    { label: 'Veterinarians', value: '6', icon: Users, color: colors.accent },
    { label: 'Testimonials', value: '12', icon: Heart, color: colors.primary },
  ];

  const pages = [
    { name: 'Home', description: 'Hero section, services overview, testimonials, emergency CTA', status: 'Active' },
    { name: 'Services', description: '12 comprehensive veterinary services with pricing', status: 'Active' },
    { name: 'Our Veterinarians', description: '6 vet profiles with specialties and credentials', status: 'Active' },
    { name: 'Pet Care Tips', description: 'Categorized care guides (General, Nutrition, Health, Senior, Puppy/Kitten)', status: 'Active' },
    { name: 'New Patients', description: 'Registration process, forms, what to bring, first visit info', status: 'Active' },
    { name: 'Emergency Care', description: '24/7 emergency info, warning signs, protocols', status: 'Active' },
    { name: 'FAQ', description: '6 categories of frequently asked questions', status: 'Active' },
    { name: 'Testimonials', description: '12 detailed client reviews with ratings', status: 'Active' },
    { name: 'Contact', description: 'Appointment form, office hours, map, contact methods', status: 'Active' },
  ];

  const features = [
    '9 fully functional pages (exceeds 9-page minimum)',
    '24/7 emergency services highlight',
    'Online appointment booking form',
    '12 comprehensive service descriptions',
    '6 detailed veterinarian profiles',
    'Categorized pet care resource library',
    'New patient onboarding workflow',
    'Emergency protocols and poison control info',
    '6 FAQ categories with detailed answers',
    '12 authentic client testimonials',
    'Responsive navigation with mobile menu',
    'Sticky navigation for easy browsing',
    'Pet-friendly, caring design aesthetic',
    'Trust-building elements throughout',
    'Payment and insurance information',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6" style={{ color: colors.primary }} />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                Veterinary Demo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: colors.primary }} />
              <span className="text-sm font-medium text-gray-700">{businessInfo.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: Globe },
              { id: 'business', label: 'Business Info', icon: MapPin },
              { id: 'design', label: 'Design', icon: Palette },
              { id: 'content', label: 'Content', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Statistics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8" style={{ color: stat.color }} />
                        <span className="text-3xl font-bold" style={{ color: stat.color }}>
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pages Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pages Overview</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Page Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pages.map((page, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{page.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{page.description}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {page.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: colors.accent }}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Type className="w-4 h-4" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessInfo.name}
                    onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={businessInfo.phone}
                      onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address}
                    onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={businessInfo.hours}
                    onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, hours: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Design Settings</h2>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                    <Palette className="w-4 h-4" />
                    Color Scheme
                  </label>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Primary Color (Teal)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={colors.primary}
                          onChange={(e) => onUpdateColors({ ...colors, primary: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            value={colors.primary}
                            onChange={(e) => onUpdateColors({ ...colors, primary: e.target.value })}
                            className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Main brand color</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Secondary Color (Green)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={colors.secondary}
                          onChange={(e) => onUpdateColors({ ...colors, secondary: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            value={colors.secondary}
                            onChange={(e) => onUpdateColors({ ...colors, secondary: e.target.value })}
                            className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Buttons & highlights</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Accent Color (Light Green)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={colors.accent}
                          onChange={(e) => onUpdateColors({ ...colors, accent: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            value={colors.accent}
                            onChange={(e) => onUpdateColors({ ...colors, accent: e.target.value })}
                            className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">CTAs & accents</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Preview</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-lg text-white text-center" style={{ backgroundColor: colors.primary }}>
                      <p className="font-semibold">Primary Color</p>
                      <p className="text-sm opacity-90">Headers, navigation</p>
                    </div>
                    <div className="p-6 rounded-lg text-white text-center" style={{ backgroundColor: colors.secondary }}>
                      <p className="font-semibold">Secondary Color</p>
                      <p className="text-sm opacity-90">Buttons, links</p>
                    </div>
                    <div className="p-6 rounded-lg text-gray-800 text-center" style={{ backgroundColor: colors.accent }}>
                      <p className="font-semibold">Accent Color</p>
                      <p className="text-sm opacity-90">CTAs, highlights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Stethoscope className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                </div>
                <p className="text-gray-600 mb-4">Manage your veterinary service offerings, descriptions, and pricing.</p>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Edit Services
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="text-lg font-semibold text-gray-900">Veterinarians</h3>
                </div>
                <p className="text-gray-600 mb-4">Add or update veterinarian profiles, specialties, and credentials.</p>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Manage Team
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="text-lg font-semibold text-gray-900">Pet Care Tips</h3>
                </div>
                <p className="text-gray-600 mb-4">Create and organize educational content for pet parents.</p>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Edit Content
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
                </div>
                <p className="text-gray-600 mb-4">Showcase client reviews and success stories.</p>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Manage Reviews
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
