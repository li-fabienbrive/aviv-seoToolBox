import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Brand } from '../data/brands';
import {
  mergeContextData,
  MergedContext,
  parseSearchQueries,
  SearchQuery,
  parseLinkBoxClusters,
  LinkBoxCluster,
  parseContextUrlMappings,
  ContextUrlMapping,
} from '../data/csvParser';
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
import slWlUrlsCsv from '../data/sl/SerpWlUrls.csv?raw';
import liWlUrlsCsv from '../data/li/SerpWlUrls.csv?raw';
import iwtWlUrlsCsv from '../data/iwt/SerpWlUrls.csv?raw';
import slLegacyUrlsCsv from '../data/sl/SerpLegacyUrls.csv?raw';
import liLegacyUrlsCsv from '../data/li/SerpLegacyUrls.csv?raw';
import iwtLegacyUrlsCsv from '../data/iwt/SerpLegacyUrls.csv?raw';
import slLegacyUrlExamplesCsv from '../data/sl/SerpLegacyUrlExamples.csv?raw';
import liLegacyUrlExamplesCsv from '../data/li/SerpLegacyUrlExamples.csv?raw';
import iwtLegacyUrlExamplesCsv from '../data/iwt/SerpLegacyUrlExamples.csv?raw';
import slWlUrlExamplesCsv from '../data/sl/SerpWlUrlExamples.csv?raw';
import liWlUrlExamplesCsv from '../data/li/SerpWlUrlExamples.csv?raw';
import iwtWlUrlExamplesCsv from '../data/iwt/SerpWlUrlExamples.csv?raw';

const csvByBrand: Record<string, {
  context: string;
  text: string;
  searchQueries: string;
  linkBox: string;
  wlUrls: string;
  legacyUrls: string;
  legacyUrlExamples: string;
  wlUrlExamples: string;
}> = {
  sl: {
    context: slContextCsv,
    text: slTextCsv,
    searchQueries: slSearchQueriesCsv,
    linkBox: slLinkBoxCsv,
    wlUrls: slWlUrlsCsv,
    legacyUrls: slLegacyUrlsCsv,
    legacyUrlExamples: slLegacyUrlExamplesCsv,
    wlUrlExamples: slWlUrlExamplesCsv,
  },
  li: {
    context: liContextCsv,
    text: liTextCsv,
    searchQueries: liSearchQueriesCsv,
    linkBox: liLinkBoxCsv,
    wlUrls: liWlUrlsCsv,
    legacyUrls: liLegacyUrlsCsv,
    legacyUrlExamples: liLegacyUrlExamplesCsv,
    wlUrlExamples: liWlUrlExamplesCsv,
  },
  iwt: {
    context: iwtContextCsv,
    text: iwtTextCsv,
    searchQueries: iwtSearchQueriesCsv,
    linkBox: iwtLinkBoxCsv,
    wlUrls: iwtWlUrlsCsv,
    legacyUrls: iwtLegacyUrlsCsv,
    legacyUrlExamples: iwtLegacyUrlExamplesCsv,
    wlUrlExamples: iwtWlUrlExamplesCsv,
  },
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

  const contextUrlMappings = useMemo<Map<string, ContextUrlMapping>>(() => {
    const csv = csvByBrand[brand.id];
    if (!csv) return new Map();
    return parseContextUrlMappings(csv.wlUrls, csv.legacyUrls, csv.legacyUrlExamples, csv.wlUrlExamples);
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
        context={selectedContext}
        urlMapping={contextUrlMappings.get(selectedContext.id)}
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
        contextUrlMappings={contextUrlMappings}
        searchQueries={searchQueriesMap}
        onSelectContext={selectContext}
        selectedTags={selectedTags}
        onSelectedTagsChange={setSelectedTags}
        savedScrollPosition={scrollPositionRef.current}
      />
    </div>
  );
};
