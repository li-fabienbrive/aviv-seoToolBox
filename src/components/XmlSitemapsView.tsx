import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { LinkBox, LinkBoxItem } from './LinkBox';
import { FileText, Download, RefreshCw, Eye } from 'lucide-react';

interface SitemapEntry {
  id: string;
  name: string;
  url: string;
  pages: number;
  lastUpdate: string;
  status: 'active' | 'pending';
}

interface XmlSitemapsViewProps {
  brand: Brand;
}

export const XmlSitemapsView: React.FC<XmlSitemapsViewProps> = ({ brand }) => {
  const [sitemaps] = useState<SitemapEntry[]>([
    { id: '1', name: 'Products Sitemap', url: '/sitemap-products.xml', pages: 2847, lastUpdate: '2 hours ago', status: 'active' },
    { id: '2', name: 'Categories Sitemap', url: '/sitemap-categories.xml', pages: 156, lastUpdate: '4 hours ago', status: 'active' },
    { id: '3', name: 'Blog Sitemap', url: '/sitemap-blog.xml', pages: 423, lastUpdate: '1 day ago', status: 'active' },
    { id: '4', name: 'Pages Sitemap', url: '/sitemap-pages.xml', pages: 23, lastUpdate: '3 days ago', status: 'active' },
  ]);

  const [selectedSitemap, setSelectedSitemap] = useState<SitemapEntry | null>(sitemaps[0]);
  const [selectedLinks, setSelectedLinks] = useState<LinkBoxItem[]>([
    { id: '1', title: 'Product A - Premium Edition', url: '/products/a-premium', position: 1 },
    { id: '2', title: 'Product B - Standard', url: '/products/b-standard', position: 2 },
    { id: '3', title: 'Product C - Budget', url: '/products/c-budget', position: 3 },
    { id: '4', title: 'Product D - Professional', url: '/products/d-pro', position: 4 },
    { id: '5', title: 'Product E - Enterprise', url: '/products/e-enterprise', position: 5 },
  ]);

  const stats = [
    { label: 'Total URLs', value: sitemaps.reduce((sum, s) => sum + s.pages, 0).toLocaleString() },
    { label: 'Sitemaps', value: sitemaps.length },
    { label: 'Indexed', value: '2,819' },
    { label: 'Crawl Rate', value: '98.5%' },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">XML Sitemaps Management</h1>
        <p className="text-gray-600">Monitor and manage all XML sitemaps in your index</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sitemaps</h3>
            <div className="space-y-2">
              {sitemaps.map((sitemap) => (
                <button
                  key={sitemap.id}
                  onClick={() => {
                    setSelectedSitemap(sitemap);
                    setSelectedLinks([
                      { id: `${sitemap.id}-1`, title: `Item from ${sitemap.name}`, url: sitemap.url, position: 1 },
                      { id: `${sitemap.id}-2`, title: `Another item from ${sitemap.name}`, url: sitemap.url, position: 2 },
                    ]);
                  }}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedSitemap?.id === sitemap.id
                      ? `${brand.colors.secondary} ${brand.colors.accent}`
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{sitemap.name}</p>
                      <p className="text-xs text-gray-600">{sitemap.pages} URLs</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedSitemap && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedSitemap.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Last updated: {selectedSitemap.lastUpdate}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <p className="text-xs text-gray-600 font-medium mb-2">URL:</p>
                <p className="text-xs text-blue-600 font-mono break-all">{selectedSitemap.url}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-md p-4">
                  <p className="text-xs text-green-700 font-medium">Status</p>
                  <p className="text-sm font-bold text-green-900 mt-1">Active</p>
                </div>
                <div className="bg-blue-50 rounded-md p-4">
                  <p className="text-xs text-blue-700 font-medium">Total Pages</p>
                  <p className="text-sm font-bold text-blue-900 mt-1">{selectedSitemap.pages.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <LinkBox
        title="Sample URLs from Sitemap"
        links={selectedLinks}
      />

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sitemap Index Configuration</h3>
        <div className="bg-gray-50 rounded-md p-4 font-mono text-xs text-gray-700 overflow-auto max-h-64">
          <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
    <lastmod>2024-02-11</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-categories.xml</loc>
    <lastmod>2024-02-11</lastmod>
  </sitemap>
</sitemapindex>`}</pre>
        </div>
      </div>
    </div>
  );
};
