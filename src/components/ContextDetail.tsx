import React from 'react';
import { ArrowLeft, MapPin, Home, Euro, Bed, Bath, Copy, ExternalLink, Zap } from 'lucide-react';
import { Brand } from '../data/brands';
import { Context } from '../data/contexts';
import { useTranslation } from '../i18n/translations';

interface ContextDetailProps {
  brand: Brand;
  context: Context;
  onBack: () => void;
}

export const ContextDetail: React.FC<ContextDetailProps> = ({ brand, context, onBack }) => {
  const t = useTranslation(brand.locale);

  const themeEmojis: Record<string, string> = {
    luxury: '✨',
    affordable: '💰',
    investment: '📈',
    family: '👨‍👩‍👧‍👦',
    urban: '🏙️',
    suburban: '🏘️',
    commercial: '🏢'
  };

  const themeBadgeColors: Record<string, { bg: string; text: string }> = {
    luxury: { bg: 'bg-amber-100', text: 'text-amber-800' },
    affordable: { bg: 'bg-green-100', text: 'text-green-800' },
    investment: { bg: 'bg-blue-100', text: 'text-blue-800' },
    family: { bg: 'bg-pink-100', text: 'text-pink-800' },
    urban: { bg: 'bg-slate-100', text: 'text-slate-800' },
    suburban: { bg: 'bg-orange-100', text: 'text-orange-800' },
    commercial: { bg: 'bg-gray-100', text: 'text-gray-800' }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{context.title}</h1>
          <p className="text-sm text-gray-600 mt-1">Context ID: {context.id}</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Theme Badge */}
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${themeBadgeColors[context.theme].bg} ${themeBadgeColors[context.theme].text}`}>
            {themeEmojis[context.theme]} {context.theme.charAt(0).toUpperCase() + context.theme.slice(1)}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            context.indexation === 'auto' ? 'bg-green-100 text-green-800' :
            context.indexation === 'forced' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {context.indexation}
          </span>
        </div>

        {/* Search Criteria */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Search Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">{context.criteria.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Property Type</p>
              <p className="font-semibold text-gray-900">{context.criteria.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price Range</p>
              <p className="font-semibold text-gray-900">{context.criteria.priceRange}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bedrooms</p>
              <p className="font-semibold text-gray-900">{context.criteria.bedrooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bathrooms</p>
              <p className="font-semibold text-gray-900">{context.criteria.bathrooms}</p>
            </div>
          </div>
        </section>

        {/* Geographic Levels */}
        <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Geographic Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Country</p>
              <p className="font-semibold text-gray-900">{context.geoLevels.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Region</p>
              <p className="font-semibold text-gray-900">{context.geoLevels.region}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Province</p>
              <p className="font-semibold text-gray-900">{context.geoLevels.province}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">City</p>
              <p className="font-semibold text-gray-900">{context.geoLevels.city}</p>
            </div>
          </div>
        </section>

        {/* Numeric Criteria */}
        <section className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Euro className="mr-2 h-5 w-5" />
            Numeric Criteria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Price Min</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.priceMin.toLocaleString()} €</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price Max</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.priceMax.toLocaleString()} €</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Area Min</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.areaMin} m²</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Area Max</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.areaMax} m²</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bedrooms Min</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.bedroomsMin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bedrooms Max</p>
              <p className="font-semibold text-gray-900">{context.numericCriteria.bedroomsMax}</p>
            </div>
          </div>
        </section>

        {/* Property Configuration */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Property Configuration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Distribution Type</p>
              <p className="font-semibold text-gray-900">{context.distributionType.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Property Types</p>
              <p className="font-semibold text-gray-900">{context.propertyTypes.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Project Type</p>
              <p className="font-semibold text-gray-900">{context.projectTypes.join(', ')}</p>
            </div>
          </div>
        </section>

        {/* Features */}
        {context.features.length > 0 && (
          <section className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Features ({context.features.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {context.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white border border-amber-300 text-gray-800"
                >
                  {feature.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Content</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">SEO Title</p>
                <button
                  onClick={() => copyToClipboard(context.title)}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-900">{context.title}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">H1 Title</p>
                <button
                  onClick={() => copyToClipboard(context.h1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-900">{context.h1}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Meta Description</p>
                <button
                  onClick={() => copyToClipboard(context.metaDesc)}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-900 whitespace-pre-wrap">{context.metaDesc}</p>
            </div>
          </div>
        </section>

        {/* URL & LinkBox */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">URL & LinkBox</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">URL Pattern</p>
                <button
                  onClick={() => copyToClipboard(context.url)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <code className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-900 block font-mono">{context.url}</code>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">LinkBox Title</p>
              <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-900">{context.linkbox}</p>
            </div>
            {Object.keys(context.linkBoxConfig).length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">LinkBox Config</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(context.linkBoxConfig)
                    .filter(([, value]) => value)
                    .map(([key]) => (
                      <span key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border border-gray-300 text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Metadata */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Created</span>
              <span className="font-medium text-gray-900">{new Date(context.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Context ID</span>
              <span className="font-medium text-gray-900">{context.id}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
