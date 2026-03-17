import React from 'react';
import { Link2, Navigation, Info, FileText, Hash, Globe } from 'lucide-react';
import { Brand } from '../data/brands';
import { Page } from '../App';
import { 
  HeadInfoComponent, 
  BreadcrumbComponent, 
  SeoLinkBoxComponent, 
  H1Component, 
  ContentComponent,
  UrlResolverComponent,
  HtmlSitemapsComponent
} from './SeoComponents';

interface BrandPagesProps {
  brand: Brand;
  page: Page;
}

export const BrandPages: React.FC<BrandPagesProps> = ({ brand, page }) => {
  const pageComponents = {
    homepage: {
      title: 'Homepage',
      components: () => (
        <>
          <HeadInfoComponent brand={brand} page="homepage" />
          <BreadcrumbComponent brand={brand} />
          <SeoLinkBoxComponent brand={brand} type="homepage" />
          <UrlResolverComponent brand={brand} />
        </>
      )
    },
    serp: {
      title: 'SERP (Search Engine Results Page)',
      components: () => (
        <>
          <HeadInfoComponent brand={brand} page="serp" />
          <H1Component brand={brand} />
          <BreadcrumbComponent brand={brand} />
          <SeoLinkBoxComponent brand={brand} type="serp" />
          <ContentComponent brand={brand} />
          <UrlResolverComponent brand={brand} />
        </>
      )
    },
    cdp: {
      title: 'CDP (Category Detail Page)',
      components: () => (
        <>
          <HeadInfoComponent brand={brand} page="cdp" />
          <BreadcrumbComponent brand={brand} />
          <UrlResolverComponent brand={brand} />
        </>
      )
    },
    pp: {
      title: 'PP (Product Page)',
      components: () => (
        <>
          <HeadInfoComponent brand={brand} page="pp" />
          <BreadcrumbComponent brand={brand} />
          <SeoLinkBoxComponent brand={brand} type="pp" />
          <UrlResolverComponent brand={brand} />
        </>
      )
    },
    ipp: {
      title: 'IPP (Intermediary Personal Page)',
      components: () => (
        <>
          <HeadInfoComponent brand={brand} page="ipp" />
          <BreadcrumbComponent brand={brand} />
          <SeoLinkBoxComponent brand={brand} type="ipp" />
          <UrlResolverComponent brand={brand} />
        </>
      )
    },
    sitemaps: {
      title: 'Sitemaps',
      components: () => (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className={`px-4 py-3 ${brand.colors.secondary} border-b border-gray-200`}>
            <div className="flex items-center space-x-3">
              <FileText className={`h-5 w-5 ${brand.colors.accent}`} />
              <span className={`font-medium ${brand.colors.accent}`}>Sitemaps XML</span>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[
                { name: 'sitemap-serp-paris.xml', urls: '2,847', lastUpdate: '2024-01-15' },
                { name: 'sitemap-serp-idf.xml', urls: '1,234', lastUpdate: '2024-01-15' },
                { name: 'sitemap-serp-lyon.xml', urls: '892', lastUpdate: '2024-01-14' },
                { name: 'sitemap-serp-marseille.xml', urls: '654', lastUpdate: '2024-01-14' },
              ].map((sitemap, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{sitemap.name}</div>
                    <div className="text-sm text-gray-600">{sitemap.urls} URLs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Updated</div>
                    <div className="text-xs text-gray-500">{sitemap.lastUpdate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    'html-sitemaps': {
      title: 'HTML Sitemaps',
      components: () => (
        <HtmlSitemapsComponent brand={brand} />
      )
    }
  };

  const currentPageContent = pageComponents[page as keyof typeof pageComponents];

  if (!currentPageContent) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-4 h-4 rounded-full ${brand.colors.primary}`}></div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentPageContent.title} - {brand.name}
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Brand:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${brand.colors.secondary} ${brand.colors.accent}`}>
            {brand.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentPageContent.components()}
      </div>

      {page === 'serp' && (
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className={`text-xl font-semibold mb-4 ${brand.colors.accent}`}>
            Advanced SERP Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Context Management</h4>
              <p className="text-sm text-gray-600 mb-4">
                Manage search contexts with specific criteria and performance metrics.
              </p>
              <button className={`px-4 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90 transition-opacity`}>
                Access Contexts
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Statistics</h4>
              <p className="text-sm text-gray-600 mb-4">
                Analyze performance with detailed charts on clicks and impressions.
              </p>
              <button className={`px-4 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90 transition-opacity`}>
                View Stats
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Configuration</h3>
        <p className="text-gray-600 mb-4">
          This page allows you to configure all SEO elements specific to the {brand.name} brand.
          Each component can be customized according to your SEO strategy needs.
        </p>
        <div className="flex space-x-3">
          <button className={`px-4 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90 transition-opacity`}>
            Configure
          </button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};