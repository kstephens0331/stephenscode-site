import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, MapPin, ArrowUp, ArrowDown, BarChart3, PieChart, Calendar } from 'lucide-react';

const MarketTrendsPage: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');

  const marketStats = [
    {
      label: 'Median Home Price',
      value: '$825,000',
      change: '+8.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Average Days on Market',
      value: '18 days',
      change: '-12%',
      trend: 'up',
      icon: Clock,
    },
    {
      label: 'Homes Sold',
      value: '324',
      change: '+15%',
      trend: 'up',
      icon: Home,
    },
    {
      label: 'Inventory Level',
      value: '2.1 months',
      change: '-5%',
      trend: 'down',
      icon: TrendingDown,
    },
  ];

  const neighborhoods = [
    {
      name: 'Downtown District',
      medianPrice: 1250000,
      priceChange: '+12.3%',
      avgDays: 12,
      totalSales: 87,
      inventory: 'Low',
      trend: 'hot',
    },
    {
      name: 'Coastal Heights',
      medianPrice: 2100000,
      priceChange: '+9.8%',
      avgDays: 15,
      totalSales: 45,
      inventory: 'Very Low',
      trend: 'hot',
    },
    {
      name: 'Suburban Valley',
      medianPrice: 685000,
      priceChange: '+6.5%',
      avgDays: 22,
      totalSales: 124,
      inventory: 'Moderate',
      trend: 'stable',
    },
    {
      name: 'Heritage Hills',
      medianPrice: 1580000,
      priceChange: '+11.2%',
      avgDays: 18,
      totalSales: 52,
      inventory: 'Low',
      trend: 'hot',
    },
    {
      name: 'Mountain Ridge',
      medianPrice: 945000,
      priceChange: '+4.2%',
      avgDays: 28,
      totalSales: 38,
      inventory: 'Moderate',
      trend: 'stable',
    },
    {
      name: 'Arts District',
      medianPrice: 725000,
      priceChange: '+7.8%',
      avgDays: 20,
      totalSales: 68,
      inventory: 'Moderate',
      trend: 'stable',
    },
  ];

  const priceRanges = [
    { range: 'Under $500K', percentage: 15, sales: 48 },
    { range: '$500K - $750K', percentage: 25, sales: 81 },
    { range: '$750K - $1M', percentage: 22, sales: 71 },
    { range: '$1M - $1.5M', percentage: 18, sales: 58 },
    { range: '$1.5M - $2M', percentage: 12, sales: 39 },
    { range: 'Over $2M', percentage: 8, sales: 27 },
  ];

  const monthlyTrends = [
    { month: 'Jan', sales: 245, avgPrice: 785000 },
    { month: 'Feb', sales: 268, avgPrice: 795000 },
    { month: 'Mar', sales: 312, avgPrice: 805000 },
    { month: 'Apr', sales: 341, avgPrice: 812000 },
    { month: 'May', sales: 389, avgPrice: 820000 },
    { month: 'Jun', sales: 425, avgPrice: 828000 },
    { month: 'Jul', sales: 398, avgPrice: 832000 },
    { month: 'Aug', sales: 372, avgPrice: 838000 },
    { month: 'Sep', sales: 356, avgPrice: 845000 },
    { month: 'Oct', sales: 334, avgPrice: 850000 },
    { month: 'Nov', sales: 298, avgPrice: 855000 },
    { month: 'Dec', sales: 275, avgPrice: 862000 },
  ];

  const insights = [
    {
      title: 'Strong Seller\'s Market',
      description: 'Low inventory and high demand continue to favor sellers, with homes selling 12% faster than last year.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Rising Home Values',
      description: 'Median home prices have increased 8.5% year-over-year, outpacing inflation and historical averages.',
      icon: ArrowUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Competitive Bidding',
      description: '67% of homes are receiving multiple offers, with winning bids averaging 3.2% above asking price.',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Luxury Market Growth',
      description: 'Properties over $2M are seeing increased activity, with a 15% increase in luxury home sales.',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Trends & Analysis</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Stay informed with the latest real estate market data, trends, and insights.
            Make confident decisions with comprehensive market intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Market Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Icon className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div
                    className={`flex items-center px-2 py-1 rounded-full text-sm font-semibold ${
                      isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#000814] mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Market Insights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-8">Key Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${insight.bgColor} mr-4`}>
                      <Icon className={`w-6 h-6 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#000814] mb-2">{insight.title}</h3>
                      <p className="text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Sales Trends */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#000814]">Monthly Sales Trends</h2>
              <p className="text-gray-600">Year-over-year comparison</p>
            </div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            >
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="24months">Last 24 Months</option>
            </select>
          </div>

          {/* Simple Bar Chart Visualization */}
          <div className="space-y-4">
            {monthlyTrends.map((data, index) => {
              const maxSales = Math.max(...monthlyTrends.map((m) => m.sales));
              const barWidth = (data.sales / maxSales) * 100;
              return (
                <div key={index} className="flex items-center">
                  <div className="w-12 text-sm font-semibold text-gray-700">{data.month}</div>
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#000814] to-[#001d3d] h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      >
                        <span className="text-white text-sm font-semibold">{data.sales}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-semibold text-gray-700 w-24 text-right">
                      ${(data.avgPrice / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neighborhood Analysis */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#000814]">Neighborhood Analysis</h2>
              <p className="text-gray-600">Compare market performance by area</p>
            </div>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            >
              <option value="all">All Neighborhoods</option>
              <option value="downtown">Downtown</option>
              <option value="coastal">Coastal</option>
              <option value="suburban">Suburban</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#ffc300] mr-2" />
                    <h3 className="text-lg font-bold text-[#000814]">{neighborhood.name}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      neighborhood.trend === 'hot'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {neighborhood.trend === 'hot' ? 'Hot Market' : 'Stable'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Median Price</span>
                    <span className="font-bold text-[#000814]">
                      ${(neighborhood.medianPrice / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price Change</span>
                    <span className="font-bold text-green-600 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {neighborhood.priceChange}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Days on Market</span>
                    <span className="font-bold text-[#000814]">{neighborhood.avgDays} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Sales</span>
                    <span className="font-bold text-[#000814]">{neighborhood.totalSales}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-gray-600">Inventory</span>
                    <span
                      className={`font-bold ${
                        neighborhood.inventory === 'Very Low' || neighborhood.inventory === 'Low'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {neighborhood.inventory}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#000814] mb-2">Sales by Price Range</h2>
          <p className="text-gray-600 mb-8">Distribution of home sales across price segments</p>

          <div className="space-y-4">
            {priceRanges.map((range, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#000814]">{range.range}</span>
                  <span className="text-gray-600">
                    {range.sales} sales ({range.percentage}%)
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#ffc300] to-[#ffb700] h-full flex items-center justify-center text-sm font-semibold text-[#000814] transition-all duration-500"
                    style={{ width: `${range.percentage * 4}%` }}
                  >
                    {range.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 text-[#ffc300] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Want More Detailed Market Analysis?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Schedule a consultation with one of our market experts for personalized insights and recommendations.
          </p>
          <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
            Schedule Market Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsPage;
