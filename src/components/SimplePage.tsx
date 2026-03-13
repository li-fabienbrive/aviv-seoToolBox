import React from 'react';
import { Brand } from '../data/brands';

interface SimplePageProps {
  brand: Brand;
  title: string;
  description: string;
}

export const SimplePage: React.FC<SimplePageProps> = ({ brand, title, description }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Content coming soon</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${brand.colors.secondary} ${brand.colors.accent}`}>
            In Development
          </div>
        </div>
      </div>
    </div>
  );
};
