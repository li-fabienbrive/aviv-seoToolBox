'use client';

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBrandMenu } from './components/TopBrandMenu';
import { ContextManagement } from './components/ContextManagement';
import { brands } from './data/brands';

function App() {
  const [currentBrand, setCurrentBrand] = useState(brands[0]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentBrand={currentBrand} />
      <TopBrandMenu 
        brands={brands}
        currentBrand={currentBrand}
        setCurrentBrand={setCurrentBrand}
      />
      <main className="flex-1 ml-64 mt-16">
        <ContextManagement brand={currentBrand} />
      </main>
    </div>
  );
}

export default App;