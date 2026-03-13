import React, { useState } from 'react';
import { Brand } from '../data/brands';
import { Context, generateContextList } from '../data/contexts';
import { ContextList } from './ContextList';
import { ContextDetail } from './ContextDetail';

interface ContextManagementProps {
  brand: Brand;
}

export const ContextManagement: React.FC<ContextManagementProps> = ({ brand }) => {
  const [contexts] = useState<Context[]>(generateContextList());
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);

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
      />
    </div>
  );
};