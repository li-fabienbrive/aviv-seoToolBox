import React, { useMemo, useState } from 'react';
import { Brand } from '../data/brands';
import { mergeContextData, MergedContext } from '../data/csvParser';
import { ContextList } from './ContextList';
import { ContextDetailPage } from './ContextDetailPage';

import slContextCsv from '../data/sl/SerpContext.csv?raw';
import slTextCsv from '../data/sl/SerpTextConfig.csv?raw';
import liContextCsv from '../data/li/SerpContext.csv?raw';
import liTextCsv from '../data/li/SerpTextConfig.csv?raw';
import iwtContextCsv from '../data/iwt/SerpContext.csv?raw';
import iwtTextCsv from '../data/iwt/SerpTextConfig.csv?raw';

const csvByBrand: Record<string, { context: string; text: string }> = {
  sl: { context: slContextCsv, text: slTextCsv },
  li: { context: liContextCsv, text: liTextCsv },
  iwt: { context: iwtContextCsv, text: iwtTextCsv },
};

interface ContextManagementProps {
  brand: Brand;
}

export const ContextManagement: React.FC<ContextManagementProps> = ({ brand }) => {
  const contexts = useMemo<MergedContext[]>(() => {
    const csv = csvByBrand[brand.id];
    if (!csv) return [];
    return mergeContextData(csv.context, csv.text);
  }, [brand.id]);

  const [selectedContext, setSelectedContext] = useState<MergedContext | null>(null);

  if (selectedContext) {
    return (
      <ContextDetailPage
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