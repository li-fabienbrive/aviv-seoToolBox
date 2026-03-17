import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Brand } from '../data/brands';
import { mergeContextData, MergedContext, parseSearchQueries, SearchQuery, parseLinkBoxClusters, LinkBoxCluster } from '../data/csvParser';
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
import slLinkBoxCsv from '../data/sl/SeoLinkBoxClusters.csv?raw';
import liLinkBoxCsv from '../data/li/SeoLinkBoxClusters.csv?raw';
import iwtLinkBoxCsv from '../data/iwt/SeoLinkBoxClusters.csv?raw';

const csvByBrand: Record<string, { context: string; text: string; searchQueries: string; linkBox: string }> = {
  sl: { context: slContextCsv, text: slTextCsv, searchQueries: slSearchQueriesCsv, linkBox: slLinkBoxCsv },
  li: { context: liContextCsv, text: liTextCsv, searchQueries: liSearchQueriesCsv, linkBox: liLinkBoxCsv },
  iwt: { context: iwtContextCsv, text: iwtTextCsv, searchQueries: iwtSearchQueriesCsv, linkBox: iwtLinkBoxCsv },
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

  const linkBoxClusters = useMemo<LinkBoxCluster[]>(() => {
    const csv = csvByBrand[brand.id];
    if (!csv) return [];
    return parseLinkBoxClusters(csv.linkBox);
  }, [brand.id]);

  const contextMap = useMemo<Map<string, MergedContext>>(() => {
    return new Map(contexts.map(c => [c.id, c]));
  }, [contexts]);

  const [selectedContext, setSelectedContext] = useState<MergedContext | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const scrollPositionRef = useRef(0);

  const selectContext = useCallback((ctx: MergedContext) => {
    // Save scroll position before navigating
    const scrollContainer = document.querySelector('[data-context-list-scroll]');
    if (scrollContainer) {
      scrollPositionRef.current = scrollContainer.scrollTop;
    }
    setSelectedContext(ctx);
    history.pushState({ contextDetail: true }, '');
  }, []);

  const goBack = useCallback(() => {
    setSelectedContext(null);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const onPopState = () => {
      if (selectedContext) {
        setSelectedContext(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [selectedContext]);

  if (selectedContext) {
    return (
      <ContextDetailPage
        brand={brand}
        context={selectedContext}
        searchQuery={searchQueriesMap.get(selectedContext.id)}
        linkBoxClusters={linkBoxClusters}
        contextMap={contextMap}
        searchQueriesMap={searchQueriesMap}
        onBack={() => { history.back(); }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ContextList
        brand={brand}
        contexts={contexts}
        searchQueries={searchQueriesMap}
        onSelectContext={selectContext}
        selectedTags={selectedTags}
        onSelectedTagsChange={setSelectedTags}
        savedScrollPosition={scrollPositionRef.current}
      />
    </div>
  );
};