import React from 'react';
import { Home, Search, FileText, Settings, Map, BarChart3, Database, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { Brand } from '../data/brands';
import { Page } from '../App';

interface SidebarProps {
  currentBrand: Brand;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentBrand,
  currentPage,
  setCurrentPage
}) => {
  const [serpExpanded, setSerpExpanded] = React.useState(currentPage === 'serp' || currentPage === 'contexts' || currentPage === 'statistics');

  const pages = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: BarChart3 },
    { id: 'homepage' as Page, name: 'HomePage', icon: Home },
    { id: 'cdp' as Page, name: 'CDP', icon: FileText },
    { id: 'sitemaps' as Page, name: 'XML Sitemaps', icon: Map },
    { id: 'html-sitemaps' as Page, name: 'HTML Sitemaps', icon: Globe },
  ];

  const serpSubPages = [
    { id: 'contexts' as Page, name: 'Context Management', icon: Database },
    { id: 'statistics' as Page, name: 'Statistics', icon: BarChart3 },
  ];

  const handleSerpClick = () => {
    if (currentPage !== 'serp') {
      setCurrentPage('serp');
    }
    setSerpExpanded(!serpExpanded);
  };

  React.useEffect(() => {
    if (currentPage === 'contexts' || currentPage === 'statistics') {
      setSerpExpanded(true);
    }
  }, [currentPage]);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">AVIV SEO Toolbox</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-1">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            
            return (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? `${currentBrand.colors.secondary} ${currentBrand.colors.accent}`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {page.name}
              </button>
            );
          })}

          {/* SERP with dropdown */}
          <button
            onClick={handleSerpClick}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentPage === 'serp'
                ? `${currentBrand.colors.secondary} ${currentBrand.colors.accent}`
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Search className="mr-3 h-5 w-5" />
              SERP
            </div>
            {serpExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* SERP Sub-menu */}
          <div className={`overflow-hidden transition-all duration-200 ${serpExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {serpSubPages.map((subPage) => {
                const SubIcon = subPage.icon;
                const isActive = currentPage === subPage.id;
                
                return (
                  <button
                    key={subPage.id}
                    onClick={() => setCurrentPage(subPage.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? `${currentBrand.colors.secondary} ${currentBrand.colors.accent}`
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <SubIcon className="mr-3 h-4 w-4" />
                    {subPage.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};