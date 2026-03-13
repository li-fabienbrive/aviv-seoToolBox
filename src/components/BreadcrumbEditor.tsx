import React, { useState } from 'react';
import { Edit2, Save, X, Trash2, Plus, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  id: string;
  label: string;
  url: string;
}

interface BreadcrumbEditorProps {
  items: BreadcrumbItem[];
  onUpdate?: (items: BreadcrumbItem[]) => void;
  editable?: boolean;
}

export const BreadcrumbEditor: React.FC<BreadcrumbEditorProps> = ({
  items: initialItems,
  onUpdate,
  editable = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [editItems, setEditItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ label: '', url: '' });

  const handleEdit = () => {
    setIsEditing(true);
    setEditItems(items);
  };

  const handleAddItem = () => {
    if (newItem.label && newItem.url) {
      const item: BreadcrumbItem = {
        id: Date.now().toString(),
        label: newItem.label,
        url: newItem.url
      };
      setEditItems([...editItems, item]);
      setNewItem({ label: '', url: '' });
    }
  };

  const handleRemoveItem = (id: string) => {
    setEditItems(editItems.filter(i => i.id !== id));
  };

  const handleSave = () => {
    setItems(editItems);
    setIsEditing(false);
    onUpdate?.(editItems);
  };

  const handleCancel = () => {
    setEditItems(items);
    setIsEditing(false);
  };

  if (isEditing && editable) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Breadcrumb</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 text-sm"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
        <div className="space-y-3 mb-4">
          {editItems.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <div className="flex-1 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-600">{item.url}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 hover:bg-red-100 text-red-600 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Add breadcrumb item</p>
          <input
            type="text"
            placeholder="Label"
            value={newItem.label}
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="URL"
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddItem}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium w-full justify-center"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Breadcrumb</h3>
        {editable && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No breadcrumbs configured</p>
        ) : (
          items.map((item, index) => (
            <React.Fragment key={item.id}>
              <a
                href={item.url}
                className="text-sm text-blue-600 hover:underline"
              >
                {item.label}
              </a>
              {index < items.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};
