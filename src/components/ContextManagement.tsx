import React, { useMemo, useState } from 'react';
import { Brand } from '../data/brands';
import { mergeContextData, MergedContext, parseSearchQueries, SearchQuery } from '../data/csvParser';
import { ContextList } from './ContextList';
import { ContextDetailPage } from './ContextDetailPage';

import slContextCsv from '../data/sl/SerpContext.csv?raw';
import slTextCsv from '../data/sl/SerpTextConfig.csv?raw';
import slSearchQueriesCsv from '../data/sl/SerpSearchQueries.csv?raw';
import liContextCsv from '../data/li/SerpContext.csv?raw';
import liTextCsv from '../data/li/SerpTextConfig.csv?raw';
import liSearchQueriesCsv from '../data/li/SerpSearchQueries.csv?raw';
import iwtContextCsv from '../data/iwt/SerpContext.csv?raw';
import iwtTextCsv from '../data/iwt/SerpTextConfig.csv?raw';
import iwtSearchQueriesCsv from '../data/iwt/SerpSearchQueries.csv?raw';

const csvByBrand: Record<string, { context: string; text: string; searchQueries: string }> = {
  sl: { context: slContextCsv, text: slTextCsv, searchQueries: slSearchQueriesCsv },
  li: { context: liContextCsv, text: liTextCsv, searchQueries: liSearchQueriesCsv },
  iwt: { context: iwtContextCsv, text: iwtTextCsv, searchQueries: iwtSearchQueriesCsv },
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

  const searchQueriesMap = useMemo<Map<string, SearchQuery>>(() => {
    const csv = csvByBrand[brand.id];
    if (!csv) return new Map();
    return parseSearchQueries(csv.searchQueries);
  }, [brand.id]);

  const [selectedContext, setSelectedContext] = useState<MergedContext | null>(null);

  if (selectedContext) {
    return (
      <ContextDetailPage
        brand={brand}
        context={selectedContext}
        searchQuery={searchQueriesMap.get(selectedContext.id)}
        onBack={() => setSelectedContext(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ContextList
        brand={brand}
        contexts={contexts}
        searchQueries={searchQueriesMap}
        onSelectContext={setSelectedContext}
      />
    </div>
  );
};