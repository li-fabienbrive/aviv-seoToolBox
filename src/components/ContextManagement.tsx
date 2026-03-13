import React, { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, BarChart3, Search, MapPin, Euro, Bed, Bath, Eye } from 'lucide-react';
import { Brand } from '../data/brands';
import { ContextCreation } from './ContextCreation';
import { useTranslation } from '../i18n/translations';

interface Context {
  id: number;
  title: string;
  h1: string;
  metaDesc: string;
  url: string;
  linkbox: string;
  criteria: {
    location: string;
    type: string;
    priceRange: string;
    bedrooms: string;
    bathrooms: string;
  };
  indexation: string;
  features: string[];
}

interface ContextManagementProps {
  brand: Brand;
  onViewStats: (contextId: number) => void;
}

export const ContextManagement: React.FC<ContextManagementProps> = ({ brand, onViewStats }) => {
  const t = useTranslation(brand.locale);

  const [contexts, setContexts] = useState<Context[]>([
    {
      id: 1,
      title: '3-room apartments Paris 15th',
      h1: 'Find your 3-room apartment in the 15th arrondissement',
      metaDesc: 'Discover our selection of 3-room apartments in the 15th arrondissement of Paris. Attractive prices, virtual tours available.',
      url: '/apartments/paris-15th/3-rooms',
      linkbox: 'Paris Apartments',
      criteria: {
        location: 'Paris 15th',
        type: 'Appartement',
        priceRange: '300k - 500k €',
        bedrooms: '3',
        bathrooms: '1-2'
      },
      indexation: 'auto',
      features: ['BALCONY_TERRACE', 'ELEVATOR']
    },
    {
      id: 2,
      title: 'Houses with garden Boulogne-Billancourt',
      h1: 'Houses with garden in Boulogne-Billancourt',
      metaDesc: 'Find your dream house with garden in Boulogne-Billancourt. Sought-after neighborhoods, schools nearby.',
      url: '/houses/boulogne-billancourt/with-garden',
      linkbox: 'Suburban Houses',
      criteria: {
        location: 'Boulogne-Billancourt',
        type: 'House',
        priceRange: '800k - 1.2M €',
        bedrooms: '4-5',
        bathrooms: '2-3'
      },
      indexation: 'forced',
      features: ['GARDEN', 'PARKING_GARAGE']
    },
    {
      id: 3,
      title: 'Student studios Lyon center',
      h1: 'Studios for students in Lyon center',
      metaDesc: 'Furnished studios for students in the heart of Lyon. Close to universities and transport, fully equipped.',
      url: '/studios/lyon-center/students',
      linkbox: 'Lyon Studios',
      criteria: {
        location: 'Lyon Center',
        type: 'Studio',
        priceRange: '150k - 250k €',
        bedrooms: '1',
        bathrooms: '1'
      },
      indexation: 'temporary',
      features: ['BUILT-IN-KITCHEN', 'PETS_FRIENDLY']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [editingContext, setEditingContext] = useState<Context | null>(null);

  const handleEdit = (context: Context) => {
    setEditingContext(context);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setContexts(contexts.filter(ctx => ctx.id !== id));
  };

  const handleAdd = () => {
    setIsCreationModalOpen(true);
  };

  const handleSaveNewContext = (newContext: Context) => {
    setContexts(prev => [...prev, newContext]);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${brand.colors.primary}`}></div>
            <h1 className="text-3xl font-bold text-gray-900">{t.contextManagement.title} - {brand.name}</h1>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center px-4 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90 transition-opacity`}
          >
            <Plus className="mr-2 h-5 w-5" />
            {t.contextManagement.addContext}
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          {t.contextManagement.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.searchCriteria}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.seoContent}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.linkBox}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.url}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.indexing}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.features}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.contextManagement.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contexts.map((context) => (
                <tr key={context.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${brand.colors.primary} text-white text-sm font-medium`}>
                      {context.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                        {context.criteria.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Search className="mr-1 h-4 w-4 text-gray-400" />
                        {context.criteria.type}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Euro className="mr-1 h-3 w-3" />
                          {context.criteria.priceRange}
                        </span>
                        <span className="flex items-center">
                          <Bed className="mr-1 h-3 w-3" />
                          {context.criteria.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <Bath className="mr-1 h-3 w-3" />
                          {context.criteria.bathrooms}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        <strong>{t.contextManagement.title_label}:</strong> {context.title}
                      </div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        <strong>{t.contextManagement.h1_label}:</strong> {context.h1}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        <strong>{t.contextManagement.meta_label}:</strong> {context.metaDesc}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${brand.colors.secondary} ${brand.colors.accent}`}>
                      {context.linkbox}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {context.url}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      context.indexation === 'auto' ? 'bg-green-100 text-green-800' :
                      context.indexation === 'forced' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {context.indexation}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {context.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          {feature.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {context.features.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                          +{context.features.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onViewStats(context.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <BarChart3 className="h-4 w-4" title="Statistics" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                        <Eye className="h-4 w-4" title="Preview" />
                      </button>
                      <button
                        onClick={() => handleEdit(context)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <Edit className="h-4 w-4" title="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(context.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="h-4 w-4" title="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation Modal */}
      <ContextCreation
        brand={brand}
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSave={handleSaveNewContext}
      />

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingContext ? 'Edit Context' : 'New Context'}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="SEO Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">H1 Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="H1 Title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Meta description"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90`}
              >
                {editingContext ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};