import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { HeadInfo } from './HeadInfo';
import { LinkBox, LinkBoxItem } from './LinkBox';
import { TrendingUp } from 'lucide-react';

interface HomePageViewProps {
  brand: Brand;
}

export const HomePageView: React.FC<HomePageViewProps> = ({ brand }) => {
  const [headInfo, setHeadInfo] = useState({
    title: 'Welcome to Our Platform - Best Services',
    metaDescription: 'Discover our premium services and solutions. Industry-leading technology for your needs.',
    canonicalUrl: 'https://example.com/'
  });

  const [topPages, setTopPages] = useState<LinkBoxItem[]>([
    { id: '1', title: 'Products', url: '/products', position: 1 },
    { id: '2', title: 'Services', url: '/services', position: 2 },
    { id: '3', title: 'Pricing', url: '/pricing', position: 3 },
    { id: '4', title: 'Blog', url: '/blog', position: 4 },
    { id: '5', title: 'Contact', url: '/contact', position: 5 },
  ]);

  const [featuredLinks, setFeaturedLinks] = useState<LinkBoxItem[]>([
    { id: '1', title: 'Latest Guide', url: '/blog/latest-guide', position: 1 },
    { id: '2', title: 'Case Study', url: '/case-studies/success', position: 2 },
    { id: '3', title: 'Webinar', url: '/webinars/upcoming', position: 3 },
  ]);

  const stats = [
    { label: 'Organic Traffic', value: '+34%', change: 'up' },
    { label: 'Top 10 Keywords', value: '156', change: 'up' },
    { label: 'Avg Position', value: '4.2', change: 'up' },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HomePage Optimization</h1>
        <p className="text-gray-600">Manage your homepage meta information and featured content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <HeadInfo
          data={headInfo}
          onSave={setHeadInfo}
        />

        <LinkBox
          title="Top Internal Links"
          links={topPages}
          onUpdate={setTopPages}
          editable={true}
        />

        <LinkBox
          title="Featured Content"
          links={featuredLinks}
          onUpdate={setFeaturedLinks}
          editable={true}
        />

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rich Snippets</h3>
          <div className="bg-gray-50 rounded-md p-4 font-mono text-sm text-gray-700 overflow-auto max-h-64">
            <pre>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "description": "Premium services provider"
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
