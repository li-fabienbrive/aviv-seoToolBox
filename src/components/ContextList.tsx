import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, Plus } from 'lucide-react';
import { Brand } from '../data/brands';
import { Context } from '../data/contexts';
import { useTranslation } from '../i18n/translations';

interface ContextListProps {
  brand: Brand;
  contexts: Context[];
  onSelectContext: (context: Context) => void;
  onCreateNew: () => void;
}

export const ContextList: React.FC<ContextListProps> = ({ brand, contexts, onSelectContext, onCreateNew }) => {
  const t = useTranslation(brand.locale);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const themes: Array<'luxury' | 'affordable' | 'investment' | 'family' | 'urban' | 'suburban' | 'commercial'> = [
    'luxury', 'affordable', 'investment', 'family', 'urban', 'suburban', 'commercial'
  ];

  const themeEmojis: Record<string, string> = {
    luxury: '✨',
    affordable: '💰',
    investment: '📈',
    family: '👨‍👩‍👧‍👦',
    urban: '🏙️',
    suburban: '🏘️',
    commercial: '🏢'
  };

  const themeColors: Record<string, string> = {
    luxury: 'bg-amber-50 border-amber-200',
    affordable: 'bg-green-50 border-green-200',
    investment: 'bg-blue-50 border-blue-200',
    family: 'bg-pink-50 border-pink-200',
    urban: 'bg-slate-50 border-slate-200',
    suburban: 'bg-orange-50 border-orange-200',
    commercial: 'bg-gray-50 border-gray-200'
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

  const filteredContexts = useMemo(() => {
    return contexts.filter(context => {
      const matchesSearch = context.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           context.criteria.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           context.criteria.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTheme = selectedThemes.length === 0 || selectedThemes.includes(context.theme);

      return matchesSearch && matchesTheme;
    });
  }, [contexts, searchQuery, selectedThemes]);

  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev =>
      prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${brand.colors.primary}`}></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.contextManagement.title} - {brand.name}</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and organize {filteredContexts.length} contexts</p>
            </div>
          </div>
          <button
            onClick={onCreateNew}
            className={`flex items-center px-4 py-2 rounded-lg text-white ${brand.colors.primary} hover:opacity-90 transition-opacity`}
          >
            <Plus className="mr-2 h-5 w-5" />
            New Context
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, location, or property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Filter className="h-4 w-4" />
              <span>Filter by Theme</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {themes.map(theme => (
                <button
                  key={theme}
                  onClick={() => toggleTheme(theme)}
                  className={`px-4 py-2 rounded-full transition-all text-sm font-medium capitalize ${
                    selectedThemes.includes(theme)
                      ? `${themeBadgeColors[theme].bg} ${themeBadgeColors[theme].text} ring-2 ring-offset-1 ${brand.colors.primary}`
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {themeEmojis[theme]} {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContexts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12" />
            </div>
            <p className="text-gray-600 font-medium">No contexts found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {filteredContexts.map(context => (
              <button
                key={context.id}
                onClick={() => onSelectContext(context)}
                className={`text-left p-4 rounded-lg border-2 transition-all hover:shadow-md hover:border-opacity-100 ${themeColors[context.theme]} border-opacity-50`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${themeBadgeColors[context.theme].bg} ${themeBadgeColors[context.theme].text}`}>
                    {themeEmojis[context.theme]} {context.theme}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>

                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                  {context.title}
                </h3>

                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Location:</span> {context.criteria.location}
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Type:</span> {context.criteria.type}
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Price:</span> {context.criteria.priceRange}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-1">
                    {context.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">
                        {feature.split('_')[0]}
                      </span>
                    ))}
                    {context.features.length > 2 && (
                      <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">
                        +{context.features.length - 2}
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    context.indexation === 'auto' ? 'bg-green-100 text-green-800' :
                    context.indexation === 'forced' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {context.indexation}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
