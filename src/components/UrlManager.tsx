import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export interface UrlEntry {
  id: string;
  url: string;
  status: 'active' | 'archived' | 'redirected';
  indexationStatus?: 'indexed' | 'not-indexed' | 'pending';
}

interface UrlManagerProps {
  urls: UrlEntry[];
  onUpdate?: (urls: UrlEntry[]) => void;
}

export const UrlManager: React.FC<UrlManagerProps> = ({ urls: initialUrls, onUpdate }) => {
  const [urls, setUrls] = useState(initialUrls);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState('');

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      const entry: UrlEntry = {
        id: Date.now().toString(),
        url: newUrl,
        status: 'active',
        indexationStatus: 'pending'
      };
      const updated = [...urls, entry];
      setUrls(updated);
      setNewUrl('');
      setIsAdding(false);
      onUpdate?.(updated);
    }
  };

  const handleRemoveUrl = (id: string) => {
    const updated = urls.filter(u => u.id !== id);
    setUrls(updated);
    onUpdate?.(updated);
  };

  const handleEditUrl = (id: string, newUrlValue: string) => {
    const updated = urls.map(u => u.id === id ? { ...u, url: newUrlValue } : u);
    setUrls(updated);
    setEditingId(null);
    onUpdate?.(updated);
  };

  const handleStatusChange = (id: string, status: UrlEntry['status']) => {
    const updated = urls.map(u => u.id === id ? { ...u, status } : u);
    setUrls(updated);
    onUpdate?.(updated);
  };

  const getStatusColor = (status: UrlEntry['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'redirected':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIndexationColor = (status?: UrlEntry['indexationStatus']) => {
    switch (status) {
      case 'indexed':
        return 'bg-blue-100 text-blue-800';
      case 'not-indexed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">URL Management</h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm"
          >
            <Plus className="h-4 w-4" />
            Add URL
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md flex space-x-2">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUrl}
            className="px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium"
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="space-y-2">
        {urls.length === 0 ? (
          <p className="text-sm text-gray-500">No URLs configured</p>
        ) : (
          urls.map((url) => (
            <div key={url.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md group hover:bg-gray-100 transition-colors">
              {editingId === url.id ? (
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={editingUrl}
                    onChange={(e) => setEditingUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleEditUrl(url.id, editingUrl)}
                    className="px-2 py-1 rounded text-green-600 hover:bg-green-100"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 rounded text-red-600 hover:bg-red-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 break-all font-mono">{url.url}</p>
                    <div className="flex space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(url.status)}`}>
                        {url.status}
                      </span>
                      {url.indexationStatus && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getIndexationColor(url.indexationStatus)}`}>
                          {url.indexationStatus}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingId(url.id);
                        setEditingUrl(url.url);
                      }}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveUrl(url.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
