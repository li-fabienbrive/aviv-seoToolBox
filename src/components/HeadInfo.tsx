import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

interface HeadInfoData {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
}

interface HeadInfoProps {
  data: HeadInfoData;
  onSave?: (data: HeadInfoData) => void;
}

export const HeadInfo: React.FC<HeadInfoProps> = ({ data: initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState(initialData);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(data);
  };

  const handleSave = () => {
    setData(formData);
    setIsEditing(false);
    onSave?.(formData);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Meta Information</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/60</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={2}
              maxLength={160}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
            <input
              type="text"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Meta Information</h3>
        <button
          onClick={handleEdit}
          className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          <Edit2 className="h-4 w-4" />
          <span>Edit</span>
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-600 uppercase">Title</p>
          <p className="text-sm text-gray-900 font-medium mt-1">{data.title}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600 uppercase">Meta Description</p>
          <p className="text-sm text-gray-700 mt-1">{data.metaDescription}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600 uppercase">Canonical URL</p>
          <p className="text-sm text-blue-600 mt-1 break-all">{data.canonicalUrl}</p>
        </div>
      </div>
    </div>
  );
};
