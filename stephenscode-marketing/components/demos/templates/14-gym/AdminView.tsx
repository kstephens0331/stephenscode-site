'use client';

import { FileEdit, Palette, Settings, Eye, ExternalLink, Dumbbell } from 'lucide-react';

interface AdminViewProps {
  basePath: string;
}

export default function AdminView({ basePath }: AdminViewProps) {
  const pages = [
    { name: 'Home', path: '', description: 'Hero section with features and testimonials' },
    { name: 'Classes & Schedule', path: '/classes', description: '8 class types with detailed information' },
    { name: 'Personal Training', path: '/training', description: 'Trainer profiles and training programs' },
    { name: 'Membership Plans', path: '/membership', description: '3-tier pricing with comparison table' },
    { name: 'Schedule', path: '/schedule', description: 'Weekly class timetable with filtering' },
    { name: 'Amenities', path: '/amenities', description: 'Facility features and equipment inventory' },
    { name: 'Success Stories', path: '/success-stories', description: 'Member transformations and testimonials' },
    { name: 'Blog/Fitness Tips', path: '/blog', description: 'Fitness articles and expert advice' },
    { name: 'Join Now', path: '/join', description: 'Membership signup form with trial offer' },
  ];

  const features = [
    'Bold, energetic gym aesthetic',
    'Premium equipment showcase',
    'Class schedule with filtering',
    'Trainer profiles and certifications',
    '3-tier membership pricing',
    'Success transformation stories',
    'Equipment inventory',
    'Spa facilities and amenities',
    'Free trial signup form',
  ];

  const editableSections = [
    {
      section: 'Branding',
      items: ['Gym name and tagline', 'Logo and colors', 'Contact information'],
    },
    {
      section: 'Classes',
      items: ['Class types and descriptions', 'Instructor assignments', 'Schedule times', 'Pricing'],
    },
    {
      section: 'Trainers',
      items: ['Trainer profiles', 'Specialties', 'Certifications', 'Availability'],
    },
    {
      section: 'Membership',
      items: ['Plan names and pricing', 'Features and benefits', 'Trial period terms'],
    },
    {
      section: 'Content',
      items: ['Success stories', 'Blog posts', 'Testimonials', 'FAQs'],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#c1121f] to-[#780000] border-b border-[#780000]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#fdf0d5] p-3 rounded-lg">
                <Dumbbell className="h-8 w-8 text-[#c1121f]" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-zinc-50">Iron Temple Fitness</h1>
                <p className="text-[#fdf0d5] font-medium">Admin Dashboard - Gym Demo</p>
              </div>
            </div>
            <a
              href={basePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-zinc-950 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-900 transition-colors"
            >
              <Eye className="h-5 w-5" />
              <span>View Live Site</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Pages', value: '9', color: 'from-[#c1121f] to-[#780000]' },
            { label: 'Class Types', value: '8', color: 'from-orange-600 to-red-700' },
            { label: 'Trainers', value: '4', color: 'from-purple-600 to-pink-700' },
            { label: 'Membership Plans', value: '3', color: 'from-amber-600 to-orange-700' },
          ].map((stat, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-zinc-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Site Pages */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileEdit className="h-6 w-6 text-[#c1121f]" />
            <h2 className="text-2xl font-black text-zinc-50">Site Pages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page, index) => (
              <a
                key={index}
                href={`${basePath}${page.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-[#c1121f]/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-zinc-50 group-hover:text-[#c1121f] transition-colors">
                    {page.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#c1121f] transition-colors" />
                </div>
                <p className="text-sm text-zinc-400">{page.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Features */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-6 w-6 text-[#c1121f]" />
              <h2 className="text-2xl font-black text-zinc-50">Key Features</h2>
            </div>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-[#c1121f] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editable Sections */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="h-6 w-6 text-[#c1121f]" />
              <h2 className="text-2xl font-black text-zinc-50">Customizable Content</h2>
            </div>
            <div className="space-y-6">
              {editableSections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-bold text-zinc-50 mb-2">{section.section}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#c1121f] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-zinc-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design System */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="h-6 w-6 text-[#c1121f]" />
            <h2 className="text-2xl font-black text-zinc-50">Design System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Colors */}
            <div>
              <h3 className="font-bold text-zinc-50 mb-4">Brand Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#c1121f] border border-zinc-700"></div>
                  <div>
                    <div className="text-sm font-mono text-zinc-300">#c1121f</div>
                    <div className="text-xs text-zinc-500">Primary</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#780000] border border-zinc-700"></div>
                  <div>
                    <div className="text-sm font-mono text-zinc-300">#780000</div>
                    <div className="text-xs text-zinc-500">Secondary</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#fdf0d5] border border-zinc-700"></div>
                  <div>
                    <div className="text-sm font-mono text-zinc-300">#fdf0d5</div>
                    <div className="text-xs text-zinc-500">Accent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="font-bold text-zinc-50 mb-4">Typography</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-black text-zinc-50 mb-1">Black 900</div>
                  <div className="text-xs text-zinc-500">Headings</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-50 mb-1">Bold 700</div>
                  <div className="text-xs text-zinc-500">Subheadings</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-zinc-50 mb-1">Semibold 600</div>
                  <div className="text-xs text-zinc-500">Labels</div>
                </div>
              </div>
            </div>

            {/* Components */}
            <div>
              <h3 className="font-bold text-zinc-50 mb-4">Key Components</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Gradient buttons</li>
                <li>• Class cards</li>
                <li>• Trainer profiles</li>
                <li>• Pricing tables</li>
                <li>• Schedule grid</li>
                <li>• Transformation cards</li>
                <li>• Blog post cards</li>
                <li>• Signup forms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Guidelines */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-black text-zinc-50 mb-6">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-zinc-50 mb-4">Updating Content</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Edit class descriptions and schedules in ClassesPage.tsx and SchedulePage.tsx</li>
                <li>• Update trainer profiles in TrainingPage.tsx</li>
                <li>• Modify pricing plans in MembershipPage.tsx</li>
                <li>• Add success stories in SuccessStoriesPage.tsx</li>
                <li>• Manage blog posts in BlogPage.tsx</li>
                <li>• Customize signup form in JoinPage.tsx</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-50 mb-4">Best Practices</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Keep class descriptions concise and action-oriented</li>
                <li>• Highlight trainer certifications and experience</li>
                <li>• Use compelling success story testimonials</li>
                <li>• Update schedule regularly for accuracy</li>
                <li>• Maintain consistent brand voice throughout</li>
                <li>• Emphasize results and transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
