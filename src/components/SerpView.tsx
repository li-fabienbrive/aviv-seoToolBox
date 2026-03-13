import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { HeadInfo } from './HeadInfo';
import { BreadcrumbEditor, BreadcrumbItem } from './BreadcrumbEditor';
import { UrlManager, UrlEntry } from './UrlManager';
import { LinkBox, LinkBoxItem } from './LinkBox';
import { TrendingUp, Search } from 'lucide-react';

interface Query {
  id: string;
  keyword: string;
  position: number;
  volume: number;
  ctr: number;
  trend: 'up' | 'down' | 'stable';
}

interface SerpViewProps {
  brand: Brand;
}

export const SerpView: React.FC<SerpViewProps> = ({ brand }) => {
  const [headInfo, setHeadInfo] = useState({
    title: 'Best Services in [City] - Professional Solutions',
    metaDescription: 'Discover our professional services for [city]. Expert team, competitive prices, quick turnaround.',
    canonicalUrl: 'https://example.com/services'
  });

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Services', url: '/services' },
  ]);

  const [urls, setUrls] = useState<UrlEntry[]>([
    { id: '1', url: '/services', status: 'active', indexationStatus: 'indexed' },
    { id: '2', url: '/services/premium', status: 'active', indexationStatus: 'indexed' },
  ]);

  const [internalLinks, setInternalLinks] = useState<LinkBoxItem[]>([
    { id: '1', title: 'Service Details', url: '/services/details', position: 1 },
    { id: '2', title: 'Pricing Plans', url: '/pricing', position: 2 },
    { id: '3', title: 'Customer Reviews', url: '/reviews', position: 3 },
    { id: '4', title: 'Contact Us', url: '/contact', position: 4 },
  ]);

  const [topQueries, setTopQueries] = useState<Query[]>([
    { id: '1', keyword: 'best services', position: 3, volume: 2400, ctr: 8.5, trend: 'up' },
    { id: '2', keyword: 'professional solutions', position: 5, volume: 1800, ctr: 6.2, trend: 'up' },
    { id: '3', keyword: 'services near me', position: 2, volume: 3200, ctr: 12.1, trend: 'stable' },
    { id: '4', keyword: 'affordable services', position: 7, volume: 1200, ctr: 4.3, trend: 'down' },
    { id: '5', keyword: 'expert help', position: 4, volume: 890, ctr: 5.8, trend: 'up' },
  ]);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SERP Management</h1>
        <p className="text-gray-600">Complete SERP optimization with meta tags, breadcrumbs, content, and query tracking</p>
      </div>

      <div className="space-y-6">
        <HeadInfo
          data={headInfo}
          onSave={setHeadInfo}
        />

        <BreadcrumbEditor
          items={breadcrumbs}
          onUpdate={setBreadcrumbs}
          editable={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LinkBox
            title="Internal Links"
            links={internalLinks}
            onUpdate={setInternalLinks}
            editable={true}
          />

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Content</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700">H1</label>
                <p className="text-sm text-gray-900 mt-1">Best Services in [City] - Professional Solutions</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Content Length</label>
                <p className="text-sm text-gray-900 mt-1">2,450 words</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Images Optimized</label>
                <p className="text-sm text-gray-900 mt-1">12/14 (85%)</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Internal Links</label>
                <p className="text-sm text-gray-900 mt-1">{internalLinks.length} links</p>
              </div>
            </div>
          </div>
        </div>

        <UrlManager
          urls={urls}
          onUpdate={setUrls}
        />

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Top Search Queries
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Keyword</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Position</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Volume</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">CTR</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topQueries.map((query) => (
                  <tr key={query.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{query.keyword}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        query.position <= 3 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        #{query.position}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{query.volume.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{query.ctr}%</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`flex items-center space-x-1 ${
                        query.trend === 'up' ? 'text-green-600' : query.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp className="h-4 w-4" style={{
                          transform: query.trend === 'down' ? 'rotate(180deg)' : 'rotate(0deg)'
                        }} />
                        <span>{query.trend}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
