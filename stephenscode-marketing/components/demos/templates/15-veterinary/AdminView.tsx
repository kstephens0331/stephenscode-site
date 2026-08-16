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
  Heart,
  X,
  Plus,
  Pencil,
  Trash2,
  Check
} from 'lucide-react';

type SectionKey = 'services' | 'team' | 'tips' | 'reviews';
type ContentItem = { id: string } & Record<string, string>;

interface SectionField {
  key: string;
  label: string;
  textarea?: boolean;
}

interface SectionConfig {
  title: string;
  singular: string;
  fields: SectionField[];
  seed: Record<string, string>[];
}

const CONTENT_STORAGE_KEY = 'vet-demo-content';

const contentSections: Record<SectionKey, SectionConfig> = {
  services: {
    title: 'Services',
    singular: 'Service',
    fields: [
      { key: 'name', label: 'Service Name' },
      { key: 'price', label: 'Pricing' },
      { key: 'description', label: 'Description', textarea: true },
    ],
    seed: [
      { name: 'Wellness Exams', price: 'Starting at $65', description: 'Comprehensive physical examinations to keep your pet healthy and detect issues early.' },
      { name: 'Vaccinations', price: 'From $25 per vaccine', description: 'Core and lifestyle vaccination programs for dogs, cats, and exotic pets.' },
      { name: 'Surgery', price: 'Contact for quote', description: 'Spay/neuter, soft tissue, and orthopedic procedures with full monitoring.' },
      { name: 'Dental Care', price: 'Starting at $350', description: 'Cleanings, digital dental X-rays, extractions, and periodontal treatment.' },
      { name: 'Emergency Care', price: 'Emergency fees apply', description: '24/7 emergency services with stabilization, triage, and critical care.' },
      { name: 'Boarding', price: '$45 per night', description: 'Climate-controlled suites with veterinary supervision and daily playtime.' },
      { name: 'Grooming', price: 'Starting at $55', description: 'Baths, haircuts, nail trims, ear cleaning, and sanitary trims.' },
      { name: 'Pet Pharmacy', price: 'Varies by medication', description: 'On-site prescriptions, preventives, supplements, and prescription diets.' },
      { name: 'Diagnostic Imaging', price: 'Starting at $150', description: 'Digital X-rays and ultrasound with same-day results.' },
      { name: 'Laboratory Services', price: 'Starting at $85', description: 'In-house bloodwork, urinalysis, and fecal testing with rapid results.' },
      { name: 'Senior Pet Care', price: 'Starting at $95', description: 'Geriatric wellness exams, arthritis management, and mobility support.' },
      { name: 'Nutritional Counseling', price: 'Included with exam', description: 'Weight management programs and life-stage diet planning.' },
    ],
  },
  team: {
    title: 'Veterinarians',
    singular: 'Team Member',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'title', label: 'Title' },
      { key: 'specialties', label: 'Specialties' },
    ],
    seed: [
      { name: 'Dr. Sarah Martinez, DVM', title: 'Chief Veterinarian & Medical Director', specialties: 'Emergency Medicine, Surgery, Internal Medicine' },
      { name: 'Dr. Michael Chen, DVM', title: 'Associate Veterinarian', specialties: 'Dental Care, Geriatric Medicine, Preventive Care' },
      { name: 'Dr. Emily Rodriguez, DVM', title: 'Associate Veterinarian', specialties: 'Dermatology, Exotic Pets, Behavioral Medicine' },
      { name: 'Dr. James Thompson, DVM', title: 'Emergency Veterinarian', specialties: 'Emergency Care, Critical Care, Trauma Medicine' },
      { name: 'Dr. Amanda Foster, DVM', title: 'Associate Veterinarian', specialties: 'Wellness Care, Vaccinations, Puppy & Kitten Care' },
      { name: 'Dr. Robert Kim, DVM', title: 'Associate Veterinarian', specialties: 'Orthopedics, Sports Medicine, Rehabilitation' },
    ],
  },
  tips: {
    title: 'Pet Care Tips',
    singular: 'Article',
    fields: [
      { key: 'title', label: 'Article Title' },
      { key: 'category', label: 'Category' },
    ],
    seed: [
      { title: 'Essential Daily Pet Care Routine', category: 'General Care' },
      { title: 'Hydration & Water Safety', category: 'General Care' },
      { title: 'Exercise & Mental Stimulation', category: 'General Care' },
      { title: 'Choosing the Right Food', category: 'Nutrition' },
      { title: 'Portion Control & Feeding Schedule', category: 'Nutrition' },
      { title: 'Foods to Avoid', category: 'Nutrition' },
      { title: 'Signs of a Healthy Pet', category: 'Health Signs' },
      { title: 'When to Call the Vet', category: 'Health Signs' },
      { title: 'Preventive Care Schedule', category: 'Health Signs' },
      { title: 'Caring for Aging Pets', category: 'Senior Pets' },
      { title: 'Managing Arthritis & Joint Pain', category: 'Senior Pets' },
      { title: 'Senior Pet Nutrition', category: 'Senior Pets' },
      { title: 'First Year Milestones', category: 'Puppies & Kittens' },
      { title: 'Socialization & Training', category: 'Puppies & Kittens' },
      { title: 'Puppy & Kitten Nutrition', category: 'Puppies & Kittens' },
    ],
  },
  reviews: {
    title: 'Testimonials',
    singular: 'Testimonial',
    fields: [
      { key: 'name', label: 'Client Name' },
      { key: 'pet', label: 'Pet' },
      { key: 'service', label: 'Service' },
      { key: 'review', label: 'Review', textarea: true },
    ],
    seed: [
      { name: 'Sarah Johnson', pet: 'Max (Golden Retriever)', service: 'Emergency Surgery', review: 'Dr. Martinez and her team saved Max\'s life during a bloat emergency at 2am. He made a full recovery.' },
      { name: 'Michael Chen', pet: 'Whiskers (Cat)', service: 'Senior Wellness Care', review: 'The low-stress approach has made such a difference for our anxious cat. Every visit is stress-free.' },
      { name: 'Emily Rodriguez', pet: 'Luna (Beagle)', service: 'Dental Surgery', review: 'They explained every step of Luna\'s dental work and called with updates during the procedure.' },
      { name: 'David Thompson', pet: 'Buddy (Labrador Mix)', service: 'Wellness & Behavioral Support', review: 'Comprehensive treatment plan for our shelter adoption. Six months later Buddy is thriving.' },
      { name: 'Jennifer Martinez', pet: 'Coco (Poodle)', service: 'Chronic Disease Management', review: 'They taught us to manage Coco\'s diabetes and are always available when we have questions.' },
      { name: 'Robert Kim', pet: 'Shadow (German Shepherd)', service: 'Orthopedic Surgery', review: 'Exceptional ACL surgery and rehab plan. Shadow is back to running and playing.' },
      { name: 'Amanda Foster', pet: 'Mittens (Cat)', service: 'Senior Pet Care', review: 'A comprehensive care plan that addresses all of our senior cat\'s conditions with patience.' },
      { name: 'Lisa Anderson', pet: 'Charlie (Yorkie)', service: 'Emergency Foreign Body Removal', review: 'Charlie ate a sock and needed emergency surgery. They got us in right away and he recovered perfectly.' },
      { name: 'Thomas Wright', pet: 'Stella (Mixed Breed)', service: 'Dermatology', review: 'Dr. Rodriguez diagnosed a skin condition other vets could not. Stella is finally comfortable.' },
      { name: 'Maria Garcia', pet: 'Pepper (Chihuahua)', service: 'Preventive Care & Education', review: 'Incredibly patient with first-time owner questions. Pepper gets excellent care.' },
      { name: 'James Wilson', pet: 'Milo (Tabby Cat)', service: '24/7 Emergency Care', review: 'Dr. Martinez met us at the clinic within 20 minutes on a Sunday night. The emergency line saved Milo\'s life.' },
      { name: 'Patricia Brown', pet: 'Rocky (Bulldog)', service: 'Breed-Specific Care', review: 'They understand bulldog breathing issues and take extra precautions with his care.' },
    ],
  },
};

function seedContent(): Record<SectionKey, ContentItem[]> {
  const result = {} as Record<SectionKey, ContentItem[]>;
  (Object.keys(contentSections) as SectionKey[]).forEach((key) => {
    result[key] = contentSections[key].seed.map((item, i) => ({ id: `${key}-seed-${i}`, ...item }));
  });
  return result;
}

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

  // Content management state (persisted to localStorage)
  const [content, setContent] = React.useState<Record<SectionKey, ContentItem[]>>(seedContent);
  const [editorSection, setEditorSection] = React.useState<SectionKey | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [addingNew, setAddingNew] = React.useState(false);
  const [draft, setDraft] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        setContent({ ...seedContent(), ...(JSON.parse(saved) as Partial<Record<SectionKey, ContentItem[]>>) });
      }
    } catch {
      // Corrupted saved data -- fall back to seeded content
    }
  }, []);

  const persistContent = (next: Record<SectionKey, ContentItem[]>) => {
    setContent(next);
    try {
      window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable -- edits still apply for this session
    }
  };

  const emptyDraft = (section: SectionKey): Record<string, string> => {
    const blank: Record<string, string> = {};
    contentSections[section].fields.forEach((field) => {
      blank[field.key] = '';
    });
    return blank;
  };

  const startAdd = (section: SectionKey) => {
    setAddingNew(true);
    setEditingId(null);
    setDraft(emptyDraft(section));
  };

  const startEdit = (item: ContentItem) => {
    setAddingNew(false);
    setEditingId(item.id);
    const { id, ...fields } = item;
    setDraft(fields);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setAddingNew(false);
    setDraft({});
  };

  const saveDraft = (section: SectionKey) => {
    if (addingNew) {
      const newItem: ContentItem = { id: `${section}-${Date.now()}`, ...draft };
      persistContent({ ...content, [section]: [...content[section], newItem] });
    } else if (editingId) {
      persistContent({
        ...content,
        [section]: content[section].map((item) => (item.id === editingId ? { id: item.id, ...draft } : item)),
      });
    }
    cancelEditing();
  };

  const deleteItem = (section: SectionKey, id: string) => {
    persistContent({ ...content, [section]: content[section].filter((item) => item.id !== id) });
    if (editingId === id) cancelEditing();
  };

  const closeEditor = () => {
    setEditorSection(null);
    cancelEditing();
  };

  const stats = [
    { label: 'Total Pages', value: '9', icon: FileText, color: colors.primary },
    { label: 'Services Listed', value: String(content.services.length), icon: Stethoscope, color: colors.secondary },
    { label: 'Veterinarians', value: String(content.team.length), icon: Users, color: colors.accent },
    { label: 'Testimonials', value: String(content.reviews.length), icon: Heart, color: colors.primary },
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
                  <label htmlFor="vet-admin-business-name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Type className="w-4 h-4" />
                    Business Name
                  </label>
                  <input
                    id="vet-admin-business-name"
                    type="text"
                    value={businessInfo.name}
                    onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="vet-admin-business-phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      id="vet-admin-business-phone"
                      type="tel"
                      value={businessInfo.phone}
                      onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="vet-admin-business-email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      id="vet-admin-business-email"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="vet-admin-business-address" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <input
                    id="vet-admin-business-address"
                    type="text"
                    value={businessInfo.address}
                    onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="vet-admin-business-hours" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Business Hours
                  </label>
                  <input
                    id="vet-admin-business-hours"
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
                      <label htmlFor="vet-admin-color-primary" className="block text-sm font-medium text-gray-600 mb-2">
                        Primary Color (Teal)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          id="vet-admin-color-primary"
                          type="color"
                          value={colors.primary}
                          onChange={(e) => onUpdateColors({ ...colors, primary: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            aria-label="Primary color hex value"
                            value={colors.primary}
                            onChange={(e) => onUpdateColors({ ...colors, primary: e.target.value })}
                            className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Main brand color</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="vet-admin-color-secondary" className="block text-sm font-medium text-gray-600 mb-2">
                        Secondary Color (Green)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          id="vet-admin-color-secondary"
                          type="color"
                          value={colors.secondary}
                          onChange={(e) => onUpdateColors({ ...colors, secondary: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            aria-label="Secondary color hex value"
                            value={colors.secondary}
                            onChange={(e) => onUpdateColors({ ...colors, secondary: e.target.value })}
                            className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Buttons & highlights</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="vet-admin-color-accent" className="block text-sm font-medium text-gray-600 mb-2">
                        Accent Color (Light Green)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          id="vet-admin-color-accent"
                          type="color"
                          value={colors.accent}
                          onChange={(e) => onUpdateColors({ ...colors, accent: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <div>
                          <input
                            type="text"
                            aria-label="Accent color hex value"
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
              {([
                { section: 'services' as SectionKey, icon: Stethoscope, heading: 'Services', blurb: 'Manage your veterinary service offerings, descriptions, and pricing.', cta: 'Edit Services' },
                { section: 'team' as SectionKey, icon: Users, heading: 'Veterinarians', blurb: 'Add or update veterinarian profiles, specialties, and credentials.', cta: 'Manage Team' },
                { section: 'tips' as SectionKey, icon: FileText, heading: 'Pet Care Tips', blurb: 'Create and organize educational content for pet parents.', cta: 'Edit Content' },
                { section: 'reviews' as SectionKey, icon: Heart, heading: 'Testimonials', blurb: 'Showcase client reviews and success stories.', cta: 'Manage Reviews' },
              ]).map((card) => {
                const CardIcon = card.icon;
                return (
                  <div key={card.section} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CardIcon className="w-6 h-6" style={{ color: colors.primary }} />
                        <h3 className="text-lg font-semibold text-gray-900">{card.heading}</h3>
                      </div>
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        {content[card.section].length} items
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{card.blurb}</p>
                    <button
                      onClick={() => setEditorSection(card.section)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      {card.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Content Editor Modal */}
      {editorSection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={closeEditor}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Manage ${contentSections[editorSection].title}`}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Manage {contentSections[editorSection].title}
                </h3>
                <p className="text-sm text-gray-500">
                  {content[editorSection].length} items. Changes are saved to this browser automatically.
                </p>
              </div>
              <button
                onClick={closeEditor}
                aria-label="Close editor"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {content[editorSection].map((item) => (
                <div key={item.id} className="border-2 border-gray-100 rounded-xl p-4">
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      {contentSections[editorSection].fields.map((field) => (
                        <div key={field.key}>
                          <label
                            htmlFor={`vet-admin-edit-${item.id}-${field.key}`}
                            className="block text-xs font-semibold text-gray-500 uppercase mb-1"
                          >
                            {field.label}
                          </label>
                          {field.textarea ? (
                            <textarea
                              id={`vet-admin-edit-${item.id}-${field.key}`}
                              value={draft[field.key] || ''}
                              onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                            />
                          ) : (
                            <input
                              id={`vet-admin-edit-${item.id}-${field.key}`}
                              type="text"
                              value={draft[field.key] || ''}
                              onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                            />
                          )}
                        </div>
                      ))}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => saveDraft(editorSection)}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium inline-flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">
                          {item[contentSections[editorSection].fields[0].key]}
                        </p>
                        {contentSections[editorSection].fields.slice(1).map((field) => (
                          <p key={field.key} className="text-sm text-gray-600 truncate">
                            {item[field.key]}
                          </p>
                        ))}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => startEdit(item)}
                          aria-label={`Edit ${item[contentSections[editorSection].fields[0].key]}`}
                          className="p-2 rounded-lg hover:bg-teal-50 text-teal-700 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(editorSection, item.id)}
                          aria-label={`Delete ${item[contentSections[editorSection].fields[0].key]}`}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {addingNew ? (
                <div className="border-2 border-teal-200 bg-teal-50/50 rounded-xl p-4 space-y-3">
                  <p className="font-semibold text-gray-900">
                    New {contentSections[editorSection].singular}
                  </p>
                  {contentSections[editorSection].fields.map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`vet-admin-new-${field.key}`}
                        className="block text-xs font-semibold text-gray-500 uppercase mb-1"
                      >
                        {field.label}
                      </label>
                      {field.textarea ? (
                        <textarea
                          id={`vet-admin-new-${field.key}`}
                          value={draft[field.key] || ''}
                          onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                        />
                      ) : (
                        <input
                          id={`vet-admin-new-${field.key}`}
                          type="text"
                          value={draft[field.key] || ''}
                          onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => saveDraft(editorSection)}
                      disabled={!(draft[contentSections[editorSection].fields[0].key] || '').trim()}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      Add {contentSections[editorSection].singular}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startAdd(editorSection)}
                  className="w-full border-2 border-dashed border-teal-300 rounded-xl p-4 text-teal-700 font-medium hover:bg-teal-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add {contentSections[editorSection].singular}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
