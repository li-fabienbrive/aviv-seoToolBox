import React from 'react';
import { Brand } from '../data/brands';

interface TopBrandMenuProps {
  brands: Brand[];
  currentBrand: Brand;
  setCurrentBrand: (brand: Brand) => void;
}

export const TopBrandMenu: React.FC<TopBrandMenuProps> = ({
  brands,
  currentBrand,
  setCurrentBrand
}) => {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-center space-x-6">
          <h2 className="text-lg font-semibold text-gray-900">Select a brand</h2>
          <div className="flex items-center space-x-3">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setCurrentBrand(brand)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentBrand.id === brand.id
                    ? `${brand.colors.primary} text-white shadow-md transform scale-105`
                    : `${brand.colors.secondary} ${brand.colors.accent} hover:opacity-80 hover:shadow-sm`
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${currentBrand.colors.primary}`}></div>
          <span className="text-sm text-gray-600">Active brand: </span>
          <span className={`text-sm font-medium ${currentBrand.colors.accent}`}>
            {currentBrand.name}
          </span>
        </div>
      </div>
    </div>
  );
};