import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2, Plus } from 'lucide-react';

export interface LinkBoxItem {
  id: string;
  title: string;
  url: string;
  position: number;
}

interface LinkBoxProps {
  title: string;
  links: LinkBoxItem[];
  onUpdate?: (links: LinkBoxItem[]) => void;
  editable?: boolean;
}

export const LinkBox: React.FC<LinkBoxProps> = ({
  title,
  links,
  onUpdate,
  editable = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingLinks, setEditingLinks] = useState(links);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const link: LinkBoxItem = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url,
        position: editingLinks.length + 1
      };
      setEditingLinks([...editingLinks, link]);
      setNewLink({ title: '', url: '' });
    }
  };

  const handleRemoveLink = (id: string) => {
    setEditingLinks(editingLinks.filter(l => l.id !== id));
  };

  const handleSave = () => {
    onUpdate?.(editingLinks);
    setIsEditing(false);
  };

  if (isEditing && editable) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <button
            onClick={handleSave}
            className="px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium"
          >
            Save
          </button>
        </div>
        <div className="space-y-3 mb-4">
          {editingLinks.map((link) => (
            <div key={link.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{link.title}</p>
                <p className="text-xs text-gray-600">{link.url}</p>
              </div>
              <button
                onClick={() => handleRemoveLink(link.id)}
                className="p-1 hover:bg-red-100 text-red-600 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Add new link</p>
          <input
            type="text"
            placeholder="Link title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddLink}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium w-full justify-center"
          >
            <Plus className="h-4 w-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {editable && (
          <button
            onClick={() => {
              setIsEditing(true);
              setEditingLinks(links);
            }}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {links.length === 0 ? (
          <p className="text-sm text-gray-500">No links configured</p>
        ) : (
          links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{link.title}</p>
                <p className="text-xs text-gray-600">{link.url}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 ml-2" />
            </a>
          ))
        )}
      </div>
    </div>
  );
};
