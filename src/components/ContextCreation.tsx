import React, { useState } from 'react';
import { X, MapPin, Home, Euro, Bed, Bath, Calendar, Layers, CheckSquare } from 'lucide-react';
import { Brand } from '../data/brands';
import { useTranslation } from '../i18n/translations';

interface ContextCreationProps {
  brand: Brand;
  isOpen: boolean;
  onClose: () => void;
  onSave: (context: any) => void;
}

export const ContextCreation: React.FC<ContextCreationProps> = ({ brand, isOpen, onClose, onSave }) => {
  const t = useTranslation(brand.locale);

  const [formData, setFormData] = useState({
    // Geolocation
    geoLevels: {
      country: false,
      region: false,
      province: false,
      city: false,
      neighborhood1: false,
      neighborhood2: false,
      neighborhood3: false
    },
    geoValues: {
      country: 'France',
      region: 'Île-de-France',
      province: 'Paris',
      city: 'Paris',
      neighborhood1: '15th district',
      neighborhood2: 'Grenelle',
      neighborhood3: 'Front de Seine'
    },
    
    // Transaction types
    distributionType: [] as string[],
    
    // Property types
    propertyTypes: [] as string[],
    subPropertyTypes: [] as string[],
    
    // Project types
    projectTypes: [] as string[],
    
    // Numeric criteria
    priceMin: '',
    priceMax: '',
    numberOfRoomsMin: '',
    numberOfRoomsMax: '',
    spaceMin: '',
    spaceMax: '',
    numberOfBedRoomsMin: '',
    numberOfBedRoomsMax: '',
    plotSpaceMin: '',
    plotSpaceMax: '',
    yearOfConstructionMin: '',
    yearOfConstructionMax: '',
    floorNumberMin: '',
    floorNumberMax: '',
    
    // Keyfacts
    featuresIncluded: [] as string[],
    
    // LinkBox Configuration
    linkBoxConfig: {
      topRegions: false,
      topProvinces: false,
      topMunicipalities: false,
      topBoroughs: false,
      topNeighborhoods: false,
      provincesNearby: false,
      municipalitiesNearby: false,
      boroughsNearby: false,
      neighborhoodsNearby: false,
      estateType: false,
      estateSubType: false,
      nbRooms: false,
      nbBedrooms: false,
      seaside: false,
      withGarden: false,
      toRenovate: false
    },
    
    // Indexation
    indexation: 'auto',
    
    // SEO
    h1: '',
    metaTitle: '',
    metaDescription: '',
    urlPattern: ''
  });

  const distributionTypes = ['BUY', 'RENT', 'BUY+RENT'];
  const propertyTypes = [
    { value: 'apartment', label: t.contextCreation.apartment, subTypes: ['duplex', 'loft', 'studio', 'penthouse'] },
    { value: 'house', label: t.contextCreation.house, subTypes: ['villa', 'chateau', 'manoire', 'bungalow'] },
    { value: 'office', label: t.contextCreation.office, subTypes: ['atelier', 'coworking', 'open-space'] },
    { value: 'parking', label: t.contextCreation.parking, subTypes: ['garage', 'box', 'place'] },
    { value: 'plot', label: t.contextCreation.plot, subTypes: ['constructible', 'agricole', 'forestier'] }
  ];
  const projectTypes = ['NEW BUILD', 'INVESTMENT', 'TEMPORARY LIVING', 'STOCK', 'SHARED FLATS', 'CONSTRUCTION PROJECTS'];
  const features = [
    'BALCONY_TERRACE', 'BUILT-IN-KITCHEN', 'BATHROOM_WINDOW', 'VACANT', 
    'PETS_FRIENDLY', 'REDUCE_MOBILITY', 'PARKING_GARAGE', 'GARDEN', 
    'CELLAR', 'BATHTUB', 'ELEVATOR', 'COMMISSION_FREE', 'SWIMMINGPOOL'
  ];

  const handleCheckboxChange = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? (prev[category as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        : [...(prev[category as keyof typeof prev] as string[]), value]
    }));
  };

  const handleGeoLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      geoLevels: {
        ...prev.geoLevels,
        [level]: !prev.geoLevels[level as keyof typeof prev.geoLevels]
      }
    }));
  };

  const handleLinkBoxChange = (key: string) => {
    setFormData(prev => ({
      ...prev,
      linkBoxConfig: {
        ...prev.linkBoxConfig,
        [key]: !prev.linkBoxConfig[key as keyof typeof prev.linkBoxConfig]
      }
    }));
  };

  const handleSave = () => {
    const newContext = {
      id: Date.now(),
      title: formData.metaTitle || 'New context',
      h1: formData.h1,
      metaDesc: formData.metaDescription,
      url: formData.urlPattern,
      linkbox: Object.keys(formData.linkBoxConfig).filter(key => formData.linkBoxConfig[key as keyof typeof formData.linkBoxConfig]).join(', '),
      criteria: {
        location: Object.entries(formData.geoValues)
          .filter(([key]) => formData.geoLevels[key as keyof typeof formData.geoLevels])
          .map(([, value]) => value)
          .join(' > '),
        type: [...formData.propertyTypes, ...formData.subPropertyTypes].join(', '),
        priceRange: `${formData.priceMin || '0'} - ${formData.priceMax || '∞'} €`,
        bedrooms: `${formData.numberOfBedRoomsMin || '0'} - ${formData.numberOfBedRoomsMax || '∞'}`,
        bathrooms: '1-2'
      },
      indexation: formData.indexation,
      features: formData.featuresIncluded
    };
    
    onSave(newContext);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{t.contextCreation.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Geolocation */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              {t.contextCreation.geolocation}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(formData.geoLevels).map(([level, checked]) => (
                <label key={level} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleGeoLevelChange(level)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium capitalize">{level.replace(/([A-Z])/g, ' $1')}</span>
                  {checked && (
                    <input
                      type="text"
                      value={formData.geoValues[level as keyof typeof formData.geoValues]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        geoValues: { ...prev.geoValues, [level]: e.target.value }
                      }))}
                      className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Transaction types */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.contextCreation.transactionType}</h4>
            <div className="flex space-x-4">
              {distributionTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.distributionType.includes(type)}
                    onChange={() => handleCheckboxChange('distributionType', type)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Property types */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5" />
              {t.contextCreation.propertyTypes}
            </h4>
            <div className="space-y-4">
              {propertyTypes.map(propertyType => (
                <div key={propertyType.value} className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center space-x-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.propertyTypes.includes(propertyType.value)}
                      onChange={() => handleCheckboxChange('propertyTypes', propertyType.value)}
                      className="rounded border-gray-300"
                    />
                    <span className="font-medium">{propertyType.label}</span>
                  </label>
                  <div className="ml-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {propertyType.subTypes.map(subType => (
                      <label key={subType} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.subPropertyTypes.includes(subType)}
                          onChange={() => handleCheckboxChange('subPropertyTypes', subType)}
                          className="rounded border-gray-300 text-xs"
                        />
                        <span className="text-sm text-gray-600">{subType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project types */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.contextCreation.projectTypes}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {projectTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.projectTypes.includes(type)}
                    onChange={() => handleCheckboxChange('projectTypes', type)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Numeric criteria */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Euro className="mr-2 h-5 w-5" />
              {t.contextCreation.numericCriteria}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.minPrice}</label>
                <input
                  type="number"
                  value={formData.priceMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="€"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.maxPrice}</label>
                <input
                  type="number"
                  value={formData.priceMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="€"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.minRooms}</label>
                <input
                  type="number"
                  value={formData.numberOfRoomsMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfRoomsMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.maxRooms}</label>
                <input
                  type="number"
                  value={formData.numberOfRoomsMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfRoomsMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.minArea}</label>
                <input
                  type="number"
                  value={formData.spaceMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, spaceMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.maxArea}</label>
                <input
                  type="number"
                  value={formData.spaceMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, spaceMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.minBedrooms}</label>
                <input
                  type="number"
                  value={formData.numberOfBedRoomsMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfBedRoomsMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contextCreation.maxBedrooms}</label>
                <input
                  type="number"
                  value={formData.numberOfBedRoomsMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfBedRoomsMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          {/* Keyfacts */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              {t.contextCreation.includedFeatures}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {features.map(feature => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featuresIncluded.includes(feature)}
                    onChange={() => handleCheckboxChange('featuresIncluded', feature)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{feature.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* LinkBox Configuration */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.contextCreation.linkBoxConfig}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(formData.linkBoxConfig).map(([key, checked]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleLinkBoxChange(key)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Indexation */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.contextCreation.indexing}</h4>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="indexation"
                  value="auto"
                  checked={formData.indexation === 'auto'}
                  onChange={(e) => setFormData(prev => ({ ...prev, indexation: e.target.value }))}
                  className="border-gray-300"
                />
                <span className="text-sm">{t.contextCreation.auto}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="indexation"
                  value="forced"
                  checked={formData.indexation === 'forced'}
                  onChange={(e) => setFormData(prev => ({ ...prev, indexation: e.target.value }))}
                  className="border-gray-300"
                />
                <span className="text-sm">{t.contextCreation.forced}</span>
              </label>

            </div>
          </div>

          {/* SEO */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.contextCreation.seoConfig}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contextCreation.h1}</label>
                <input
                  type="text"
                  value={formData.h1}
                  onChange={(e) => setFormData(prev => ({ ...prev, h1: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Page H1 title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contextCreation.metaTitle}</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contextCreation.metaDescription}</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Meta description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contextCreation.urlPattern}</label>
                <input
                  type="text"
                  value={formData.urlPattern}
                  onChange={(e) => setFormData(prev => ({ ...prev, urlPattern: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
                  placeholder="/apartments/{city}/{district}"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t.contextCreation.cancel}
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-md text-white ${brand.colors.primary} hover:opacity-90`}
          >
            {t.contextCreation.createContext}
          </button>
        </div>
      </div>
    </div>
  );
};