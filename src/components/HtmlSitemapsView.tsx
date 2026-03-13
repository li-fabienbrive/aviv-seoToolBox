import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { LinkBox, LinkBoxItem } from './LinkBox';
import { Send, Plus, Trash2 } from 'lucide-react';

interface LinkBoxConfiguration {
  id: string;
  name: string;
  links: LinkBoxItem[];
}

interface HtmlSitemapsViewProps {
  brand: Brand;
}

export const HtmlSitemapsView: React.FC<HtmlSitemapsViewProps> = ({ brand }) => {
  const [configs, setConfigs] = useState<LinkBoxConfiguration[]>([
    {
      id: '1',
      name: 'Featured Categories',
      links: [
        { id: '1', title: 'Electronics', url: '/categories/electronics', position: 1 },
        { id: '2', title: 'Furniture', url: '/categories/furniture', position: 2 },
        { id: '3', title: 'Fashion', url: '/categories/fashion', position: 3 },
        { id: '4', title: 'Home & Garden', url: '/categories/home-garden', position: 4 },
      ]
    },
    {
      id: '2',
      name: 'Top Products',
      links: [
        { id: '1', title: 'Best Sellers', url: '/bestsellers', position: 1 },
        { id: '2', title: 'New Arrivals', url: '/new-arrivals', position: 2 },
        { id: '3', title: 'Special Deals', url: '/deals', position: 3 },
      ]
    }
  ]);

  const [newConfigName, setNewConfigName] = useState('');
  const [showAddConfig, setShowAddConfig] = useState(false);

  const handleAddConfig = () => {
    if (newConfigName.trim()) {
      const newConfig: LinkBoxConfiguration = {
        id: Date.now().toString(),
        name: newConfigName,
        links: []
      };
      setConfigs([...configs, newConfig]);
      setNewConfigName('');
      setShowAddConfig(false);
    }
  };

  const handleDeleteConfig = (id: string) => {
    setConfigs(configs.filter(c => c.id !== id));
  };

  const handleUpdateLinks = (id: string, links: LinkBoxItem[]) => {
    setConfigs(configs.map(c => c.id === id ? { ...c, links } : c));
  };

  const stats = [
    { label: 'Link Boxes', value: configs.length },
    { label: 'Total Links', value: configs.reduce((sum, c) => sum + c.links.length, 0) },
    { label: 'Internal Mailing', value: `${(configs.reduce((sum, c) => sum + c.links.length, 0) * 5)} connections` },
    { label: 'Network Strength', value: 'Strong' },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HTML Sitemaps Management</h1>
        <p className="text-gray-600">Create and manage link boxes to improve internal site mailing and user navigation</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">LinkBox Configurations</h2>
          {!showAddConfig && (
            <button
              onClick={() => setShowAddConfig(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              New LinkBox
            </button>
          )}
        </div>

        {showAddConfig && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 flex space-x-2">
            <input
              type="text"
              value={newConfigName}
              onChange={(e) => setNewConfigName(e.target.value)}
              placeholder="LinkBox name"
              className="flex-1 px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddConfig}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowAddConfig(false);
                setNewConfigName('');
              }}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="space-y-6">
          {configs.map((config) => (
            <div key={config.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
                <button
                  onClick={() => handleDeleteConfig(config.id)}
                  className="p-2 hover:bg-red-100 text-red-600 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <LinkBox
                title={`Links in "${config.name}"`}
                links={config.links}
                onUpdate={(links) => handleUpdateLinks(config.id, links)}
                editable={true}
              />

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium w-full justify-center">
                  <Send className="h-4 w-4" />
                  <span>Deploy to Site</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mailing Strategy</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Network Effect</p>
            <p className="text-sm text-blue-800">Create multiple link boxes to improve page depth and cross-linking. Each box contributes to your internal link structure.</p>
          </div>
          <div className="bg-green-50 rounded-md p-4 border border-green-200">
            <p className="text-sm font-medium text-green-900 mb-2">Distribution</p>
            <p className="text-sm text-green-800">Link boxes can be placed on multiple pages to distribute authority and improve crawlability of important sections.</p>
          </div>
          <div className="bg-purple-50 rounded-md p-4 border border-purple-200">
            <p className="text-sm font-medium text-purple-900 mb-2">User Experience</p>
            <p className="text-sm text-purple-800">Well-organized link boxes provide better navigation and reduce bounce rates while serving SEO purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
