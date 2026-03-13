import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBrandMenu } from './components/TopBrandMenu';
import { Dashboard } from './components/Dashboard';
import { ContextManagement } from './components/ContextManagement';
import { Statistics } from './components/Statistics';
import { HomePageView } from './components/HomePageView';
import { CDPView } from './components/CDPView';
import { XmlSitemapsView } from './components/XmlSitemapsView';
import { SerpView } from './components/SerpView';
import { HtmlSitemapsView } from './components/HtmlSitemapsView';
import { brands } from './data/brands';

export type Page = 'dashboard' | 'homepage' | 'serp' | 'cdp' | 'sitemaps' | 'html-sitemaps' | 'contexts' | 'statistics' | 'context-stats';

function App() {
  const [currentBrand, setCurrentBrand] = useState(brands[0]);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedContextId, setSelectedContextId] = useState<number | null>(null);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard brand={currentBrand} />;
      case 'homepage':
        return <HomePageView brand={currentBrand} />;
      case 'cdp':
        return <CDPView brand={currentBrand} />;
      case 'sitemaps':
        return <XmlSitemapsView brand={currentBrand} />;
      case 'html-sitemaps':
        return <HtmlSitemapsView brand={currentBrand} />;
      case 'serp':
        return <SerpView brand={currentBrand} />;
      case 'contexts':
        return <ContextManagement
          brand={currentBrand}
          onViewStats={(contextId) => {
            setSelectedContextId(contextId);
            setCurrentPage('context-stats');
          }}
        />;
      case 'statistics':
        return <Statistics brand={currentBrand} type="global" />;
      case 'context-stats':
        return <Statistics
          brand={currentBrand}
          type="context"
          contextId={selectedContextId}
        />;
      default:
        return <Dashboard brand={currentBrand} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentBrand={currentBrand}
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page !== 'context-stats') {
            setSelectedContextId(null);
          }
        }}
      />
      <TopBrandMenu 
        brands={brands}
        currentBrand={currentBrand}
        setCurrentBrand={setCurrentBrand}
      />
      <main className="flex-1 ml-64 mt-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;