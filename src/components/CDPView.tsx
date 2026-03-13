import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { HeadInfo } from './HeadInfo';
import { BreadcrumbEditor, BreadcrumbItem } from './BreadcrumbEditor';
import { UrlManager, UrlEntry } from './UrlManager';
import { LinkBox, LinkBoxItem } from './LinkBox';

interface CDPViewProps {
  brand: Brand;
}

export const CDPView: React.FC<CDPViewProps> = ({ brand }) => {
  const [headInfo, setHeadInfo] = useState({
    title: 'Category - Best Products',
    metaDescription: 'Browse our premium category products with detailed descriptions and customer reviews.',
    canonicalUrl: 'https://example.com/category/products'
  });

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Products', url: '/products' },
    { id: '3', label: 'Category', url: '/products/category' },
  ]);

  const [urls, setUrls] = useState<UrlEntry[]>([
    { id: '1', url: '/products/category', status: 'active', indexationStatus: 'indexed' },
    { id: '2', url: '/products/category?sort=price', status: 'active', indexationStatus: 'indexed' },
    { id: '3', url: '/products/category?page=2', status: 'active', indexationStatus: 'indexed' },
    { id: '4', url: '/products/category-old', status: 'redirected', indexationStatus: 'not-indexed' },
  ]);

  const [links, setLinks] = useState<LinkBoxItem[]>([
    { id: '1', title: 'Premium Product A', url: '/products/a', position: 1 },
    { id: '2', title: 'Premium Product B', url: '/products/b', position: 2 },
    { id: '3', title: 'Best Seller', url: '/products/bestseller', position: 3 },
  ]);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Description Page (CDP)</h1>
        <p className="text-gray-600">Comprehensive management of category pages including breadcrumbs, meta tags, and internal linking</p>
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
            title="Featured Products"
            links={links}
            onUpdate={setLinks}
            editable={true}
          />

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Markup</h3>
            <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
              <p className="text-sm text-blue-900 mb-2">ProductCollection Schema</p>
              <div className="text-xs font-mono text-blue-800 bg-white rounded p-2 overflow-auto max-h-48">
                {`@type: "CollectionPage"\nitemListElement: 12\naggregateRating: 4.5`}
              </div>
            </div>
          </div>
        </div>

        <UrlManager
          urls={urls}
          onUpdate={setUrls}
        />

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Guidelines</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <span className="text-green-700 text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Use descriptive headings</p>
                <p className="text-xs text-gray-600">H1 should contain main category keyword</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <span className="text-green-700 text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Optimize for filters</p>
                <p className="text-xs text-gray-600">Use canonical tags for filtered variants</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <span className="text-green-700 text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Enable pagination</p>
                <p className="text-xs text-gray-600">Use rel=next and rel=prev tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
