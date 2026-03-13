import React from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer, Globe } from 'lucide-react';
import { Brand } from '../data/brands';
import { useTranslation } from '../i18n/translations';

interface StatisticsProps {
  brand: Brand;
  type: 'global' | 'context';
  contextId?: number | null;
}

export const Statistics: React.FC<StatisticsProps> = ({ brand, type, contextId }) => {
  const t = useTranslation(brand.locale);
  const isContextStats = type === 'context';

  const metrics = [
    {
      title: t.statistics.indexedUrls,
      value: isContextStats ? '47' : '1,234',
      change: isContextStats ? '+5' : '+12%',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      title: t.statistics.impressions,
      value: isContextStats ? '8.2K' : '45.6K',
      change: isContextStats ? '+18%' : '+8%',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: t.statistics.clicks,
      value: isContextStats ? '524' : '2,890',
      change: isContextStats ? '+22%' : '+15%',
      icon: MousePointer,
      color: 'text-purple-600'
    },
    {
      title: t.statistics.averageCtr,
      value: isContextStats ? '6.4%' : '6.3%',
      change: isContextStats ? '+0.9%' : '+0.8%',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
  ];

  const chartData = [
    { 
      month: 'Jan', 
      impressions: isContextStats ? 6200 : 35000, 
      clics: isContextStats ? 380 : 2100, 
      urls: isContextStats ? 42 : 1150 
    },
    { 
      month: 'Feb', 
      impressions: isContextStats ? 6800 : 38000, 
      clics: isContextStats ? 420 : 2300, 
      urls: isContextStats ? 44 : 1180 
    },
    { 
      month: 'Mar', 
      impressions: isContextStats ? 7500 : 42000, 
      clics: isContextStats ? 485 : 2650, 
      urls: isContextStats ? 46 : 1200 
    },
    { 
      month: 'Apr', 
      impressions: isContextStats ? 8200 : 45600, 
      clics: isContextStats ? 524 : 2890, 
      urls: isContextStats ? 47 : 1234 
    },
  ];

  const contextInfo = {
    1: { title: '3-room apartments Paris 15th', criteria: 'Paris 15th • Apartment • 300k-500k €' },
    2: { title: 'Houses with garden Boulogne', criteria: 'Boulogne-Billancourt • House • 800k-1.2M €' },
    3: { title: 'Student studios Lyon center', criteria: 'Lyon Center • Studio • 150k-250k €' }
  };
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-4 h-4 rounded-full ${brand.colors.primary}`}></div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isContextStats ? t.statistics.contextTitle : t.statistics.globalTitle} - {brand.name}
          </h1>
        </div>
        {isContextStats && contextId && contextInfo[contextId as keyof typeof contextInfo] && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {contextInfo[contextId as keyof typeof contextInfo].title}
            </h2>
            <p className="text-sm text-gray-600">
              {contextInfo[contextId as keyof typeof contextInfo].criteria}
            </p>
          </div>
        )}
        <p className="text-gray-600">
          {isContextStats ? t.statistics.contextSubtitle : t.statistics.subtitle}
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${metric.color}`} />
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            {t.statistics.monthlyTrends}
          </h3>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${(data.impressions / (isContextStats ? 10000 : 50000)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${(data.clics / (isContextStats ? 600 : 3000)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600">{data.impressions.toLocaleString()}</div>
                  <div className="text-xs text-green-600">{data.clics.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              {t.statistics.impressions}
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              {t.statistics.clicks}
            </div>
          </div>
        </div>

        {/* Top Performing URLs or Contexts */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {isContextStats ? t.statistics.topUrls : t.statistics.topContexts}
          </h3>
          <div className="space-y-4">
            {isContextStats ? (
              <>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">/apartments/paris-15th/3-rooms</div>
                    <div className="text-sm text-gray-600">Main landing page</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">2,450 impressions</div>
                    <div className="text-xs text-green-600">CTR: 7.8%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">/apartments/paris-15th/3-rooms/grenelle</div>
                    <div className="text-sm text-gray-600">Neighborhood specific</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">1,890 impressions</div>
                    <div className="text-xs text-green-600">CTR: 6.9%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">/apartments/paris-15th/3-rooms/vaugirard</div>
                    <div className="text-sm text-gray-600">Neighborhood specific</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">1,650 impressions</div>
                    <div className="text-xs text-green-600">CTR: 6.2%</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Apartments Paris 15th</div>
                    <div className="text-sm text-gray-600">3 rooms, 300-500k €</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">8,450 impressions</div>
                    <div className="text-xs text-green-600">CTR: 7.2%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Houses Boulogne</div>
                    <div className="text-sm text-gray-600">With garden, 800k-1.2M €</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">6,230 impressions</div>
                    <div className="text-xs text-green-600">CTR: 6.8%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Studios Lyon</div>
                    <div className="text-sm text-gray-600">Students, city center</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">4,890 impressions</div>
                    <div className="text-xs text-green-600">CTR: 5.9%</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.statistics.performanceAnalysis}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className={`text-3xl font-bold mb-2 ${brand.colors.accent}`}>
              {isContextStats ? '94%' : '85%'}
            </div>
            <div className="text-sm text-gray-600">{t.statistics.indexationRate}</div>
            <div className="text-xs text-gray-500 mt-1">{t.statistics.indexationRateDesc}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {isContextStats ? '+28%' : '+24%'}
            </div>
            <div className="text-sm text-gray-600">{t.statistics.trafficGrowth}</div>
            <div className="text-xs text-gray-500 mt-1">{t.statistics.trafficGrowthDesc}</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {isContextStats ? '3.8' : '4.2'}
            </div>
            <div className="text-sm text-gray-600">{t.statistics.averagePosition}</div>
            <div className="text-xs text-gray-500 mt-1">{t.statistics.averagePositionDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};