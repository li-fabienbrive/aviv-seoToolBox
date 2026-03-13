import React from 'react';
import { Search, Home, FileText, Map, BarChart3, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Brand } from '../data/brands';
import { useTranslation } from '../i18n/translations';

interface DashboardProps {
  brand: Brand;
}

export const Dashboard: React.FC<DashboardProps> = ({ brand }) => {
  const t = useTranslation(brand.locale);

  const stats = [
    { title: t.dashboard.managedPages, value: '2,847', icon: FileText, color: 'text-blue-600' },
    { title: t.dashboard.activeContexts, value: '156', icon: Search, color: 'text-green-600' },
    { title: t.dashboard.brands, value: '5', icon: Home, color: 'text-purple-600' },
    { title: t.dashboard.sitemaps, value: '23', icon: Map, color: 'text-orange-600' },
  ];

  const indexationStats = [
    { title: t.dashboard.newlyIndexed, value: '342', change: '+15%', icon: TrendingUp, color: 'text-green-600' },
    { title: t.dashboard.deindexed, value: '28', change: '-8%', icon: TrendingDown, color: 'text-red-600' },
    { title: t.dashboard.totalIndexed, value: '2,819', change: '+12%', icon: Search, color: 'text-blue-600' },
    { title: t.dashboard.indexationRate, value: '98.9%', change: '+0.3%', icon: BarChart3, color: 'text-purple-600' },
  ];

  const recentActivities = [
    { action: t.dashboard.contextCreated, page: 'SERP - Apartments Paris', time: '2 min ago', brand: 'SL' },
    { action: t.dashboard.linkBoxUpdated, page: 'SERP - Houses Lyon', time: '15 min ago', brand: 'LI' },
    { action: t.dashboard.headInfoModified, page: 'Context - Studio Berlin', time: '1h ago', brand: 'IWT' },
    { action: t.dashboard.sitemapGenerated, page: 'SERP - Properties Munich', time: '3h ago', brand: 'IMN' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.dashboard.welcome}
        </h1>
        <p className="text-gray-600">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Indexation Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.dashboard.weeklyIndexation}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indexationStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            {t.dashboard.quickActions}
          </h3>
          <div className="space-y-3">
            <button className={`w-full text-left p-3 rounded-md ${brand.colors.secondary} hover:opacity-80 transition-colors`}>
              <div className={`font-medium ${brand.colors.accent}`}>{t.dashboard.createContext}</div>
              <div className={`text-sm ${brand.colors.accent} opacity-75`}>{t.dashboard.createContextDesc}</div>
            </button>
            <button className="w-full text-left p-3 rounded-md bg-green-50 hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-900">{t.dashboard.generateSitemap}</div>
              <div className="text-sm text-green-700">{t.dashboard.generateSitemapDesc}</div>
            </button>
            <button className="w-full text-left p-3 rounded-md bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-900">{t.dashboard.analyzePerformance}</div>
              <div className="text-sm text-purple-700">{t.dashboard.analyzePerformanceDesc}</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-gray-500" />
            {t.dashboard.recentActivity}
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{activity.action}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {activity.brand}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{activity.page}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-gradient-to-r ${brand.colors.primary} rounded-lg p-6 text-white`}>
          <h3 className="text-lg font-semibold mb-2">{t.dashboard.seoPages}</h3>
          <p className="text-white opacity-80 mb-4">
            {t.dashboard.seoPagesDesc}
          </p>
          <div className="text-2xl font-bold">6 {t.dashboard.types}</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t.dashboard.multiBrand}</h3>
          <p className="text-green-100 mb-4">
            {t.dashboard.multiBrandDesc}
          </p>
          <div className="text-2xl font-bold">5 {t.dashboard.brands}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t.dashboard.serpContexts}</h3>
          <p className="text-purple-100 mb-4">
            {t.dashboard.serpContextsDesc}
          </p>
          <div className="text-2xl font-bold">{t.dashboard.advanced}</div>
        </div>
      </div>
    </div>
  );
};