import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield, FileText, TrendingUp, Calendar, MessageSquare, Settings, LogOut, DollarSign, Download, AlertCircle } from 'lucide-react';

interface ClientPortalPageProps {
  onNavigate: (page: string) => void;
}

export default function ClientPortalPage({ onNavigate }: ClientPortalPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - just set to logged in
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-300px)] bg-gray-50 py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#14213d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-[#fca311]" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-[#14213d] mb-2">Client Portal Login</h1>
              <p className="text-gray-600">Access your secure financial dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#fca311] border-gray-300 rounded focus:ring-[#fca311]" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#fca311] hover:text-[#e59400] font-semibold">
                  Forgot password?
                </a>
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
                Don't have portal access?{' '}
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#fca311] hover:text-[#e59400] font-semibold"
                >
                  Contact us
                </button>
              </p>
            </div>
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

  // Logged-in Dashboard View
  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#14213d] mb-1">Welcome back, John!</h1>
              <p className="text-gray-600">Here's your financial overview</p>
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
            <p className="text-xl font-bold text-[#14213d] mb-1">Nov 20, 2024</p>
            <p className="text-sm text-gray-600">Q4 Review</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Recent Documents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#14213d]">Recent Documents</h2>
                <button className="text-[#fca311] font-semibold hover:text-[#e59400]">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: '2024 Q3 Investment Statement', date: 'Nov 1, 2024', size: '2.3 MB' },
                  { name: '2023 Tax Return - Form 1040', date: 'Oct 15, 2024', size: '1.8 MB' },
                  { name: 'Estate Planning Document Updates', date: 'Sep 28, 2024', size: '3.1 MB' },
                  { name: 'Portfolio Rebalancing Report', date: 'Sep 15, 2024', size: '1.2 MB' },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#14213d] rounded-lg flex items-center justify-center">
                        <FileText className="text-[#fca311]" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#14213d]">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="text-[#fca311] hover:text-[#e59400]">
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
                <button className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Message Advisor
                </button>
                <button className="w-full bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors flex items-center justify-center gap-2">
                  <Calendar size={18} />
                  Schedule Meeting
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
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
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                  <Settings size={18} />
                  Account Settings
                </button>
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                  <Shield size={18} />
                  Security & Privacy
                </button>
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                  <FileText size={18} />
                  Document Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
