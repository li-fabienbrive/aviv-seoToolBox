'use client';

import type React from 'react';
import { Database } from 'lucide-react';
import { Brand } from '../data/brands';

interface SidebarProps {
  currentBrand: Brand;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentBrand }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">AVIV SEO Toolbox</h1>
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentBrand.colors.secondary} ${currentBrand.colors.accent}`}
          >
            <Database className="mr-3 h-5 w-5" />
            Context Management
          </button>
        </div>
      </nav>
    </div>
  );
};