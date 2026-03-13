import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { Context, generateContextList } from '../data/contexts';
import { ContextCreation } from './ContextCreation';
import { ContextList } from './ContextList';
import { ContextDetail } from './ContextDetail';

interface ContextManagementProps {
  brand: Brand;
  onViewStats: (contextId: number) => void;
}

export const ContextManagement: React.FC<ContextManagementProps> = ({ brand, onViewStats }) => {
  const [contexts, setContexts] = useState<Context[]>(generateContextList());
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const handleSaveNewContext = (newContext: Context) => {
    setContexts(prev => [...prev, newContext]);
  };

  if (selectedContext) {
    return (
      <ContextDetail
        brand={brand}
        context={selectedContext}
        onBack={() => setSelectedContext(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ContextList
        brand={brand}
        contexts={contexts}
        onSelectContext={setSelectedContext}
        onCreateNew={() => setIsCreationModalOpen(true)}
      />

      <ContextCreation
        brand={brand}
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSave={handleSaveNewContext}
      />
    </div>
  );
};