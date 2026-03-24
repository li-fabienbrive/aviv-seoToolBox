import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Brand } from '../data/brands';
import { MergedContext, SearchQuery, levelNames, ContextUrlMapping } from '../data/csvParser';
import { useTranslation } from '../i18n/translations';
import { getCharacteristics, resolvePrimaryLegacyVariant } from '../utils/helpers';

interface ContextListProps {
  brand: Brand;
  contexts: MergedContext[];
  contextUrlMappings: Map<string, ContextUrlMapping>;
  searchQueries: Map<string, SearchQuery>;
  onSelectContext: (ctx: MergedContext) => void;
  selectedTags: string[];
  onSelectedTagsChange: (tags: string[]) => void;
  savedScrollPosition: number;
}

const levelNamesLocal = levelNames;

const listTagPrefixes: Record<string, string> = {
  Features: 'feature:',
  BuildStates: 'buildState:',
  LocationsIncluded: 'locationIncl:',
  LocationsExcluded: 'locationExcl:',
  ProjectTypes: 'project:',
  HiddenProjectTypes: 'hiddenProject:',
};

const singleTagPrefixes: Record<string, string> = {
  ClassifiedBusiness: 'business:',
  RoomsMin: 'roomsMin:',
  RoomsMax: 'roomsMax:',
  BedroomsMin: 'bedroomsMin:',
  BedroomsMax: 'bedroomsMax:',
  PriceMin: 'priceMin:',
  PriceMax: 'priceMax:',
  YearConstructionMin: 'yearConstructionMin:',
  YearConstructionMax: 'yearConstructionMax:',
  CertificateOfEligibility: 'certificate:',
  IsSaleGoodwill: 'saleGoodwill:',
  Furnished: 'furnished:',
  EnergyCertificate: 'energy:',
  PagingOrder: 'pagingOrder:',
};

function getTagsForCharacteristic(key: string, value: string): string[] {
  if (listTagPrefixes[key]) {
    return value.split(',').map(v => `${listTagPrefixes[key]}${v.trim()}`);
  }
  if (singleTagPrefixes[key]) {
    return [`${singleTagPrefixes[key]}${value}`];
  }
  return [];
}

export const ContextList: React.FC<ContextListProps> = ({
  brand,
  contexts,
  contextUrlMappings,
  searchQueries,
  onSelectContext,
  selectedTags,
  onSelectedTagsChange,
  savedScrollPosition,
}) => {
  const t = useTranslation(brand.locale);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollRef.current && savedScrollPosition > 0) {
      scrollRef.current.scrollTop = savedScrollPosition;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Build all available tags from search queries
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    contexts.forEach(ctx => {
      if (ctx.alias) tags.add(`Alias:${ctx.alias}`);
      ctx.openedLevels.forEach(level => tags.add(`Level:${levelNamesLocal[level] ?? level}`));
      if (ctx.indexation) tags.add(`Indexation:${ctx.indexation}`);
      const sq = searchQueries.get(ctx.id);
      if (sq) {
        if (sq.distributionTypes) sq.distributionTypes.split(',').forEach(v => tags.add(v.trim()));
        if (sq.estateTypes) sq.estateTypes.split(',').forEach(v => tags.add(v.trim().replace(/_/g, ' ')));
        if (sq.estateSubTypes) sq.estateSubTypes.split(',').forEach(v => tags.add(v.trim().replace(/_/g, ' ')));
        if (sq.classifiedBusiness) tags.add(`business:${sq.classifiedBusiness}`);
        if (sq.featuresIncluded) sq.featuresIncluded.split(',').forEach(v => tags.add(`feature:${v.trim()}`));
        if (sq.numberOfRoomsMin) tags.add(`roomsMin:${sq.numberOfRoomsMin}`);
        if (sq.numberOfRoomsMax) tags.add(`roomsMax:${sq.numberOfRoomsMax}`);
        if (sq.numberOfBedroomsMin) tags.add(`bedroomsMin:${sq.numberOfBedroomsMin}`);
        if (sq.numberOfBedroomsMax) tags.add(`bedroomsMax:${sq.numberOfBedroomsMax}`);
        if (sq.priceMin) tags.add(`priceMin:${sq.priceMin}`);
        if (sq.priceMax) tags.add(`priceMax:${sq.priceMax}`);
        if (sq.projectTypes) sq.projectTypes.split(',').forEach(v => tags.add(`project:${v.trim()}`));
        if (sq.hiddenProjectTypes) sq.hiddenProjectTypes.split(',').forEach(v => tags.add(`hiddenProject:${v.trim()}`));
        if (sq.yearOfConstructionMin) tags.add(`yearConstructionMin:${sq.yearOfConstructionMin}`);
        if (sq.yearOfConstructionMax) tags.add(`yearConstructionMax:${sq.yearOfConstructionMax}`);
        if (sq.certificateOfEligibilityNeeded) tags.add(`certificate:${sq.certificateOfEligibilityNeeded}`);
        if (sq.isSaleGoodwill) tags.add(`saleGoodwill:${sq.isSaleGoodwill}`);
        if (sq.buildStates) sq.buildStates.split(',').forEach(v => tags.add(`buildState:${v.trim()}`));
        if (sq.locationsInBuildingIncluded) sq.locationsInBuildingIncluded.split(',').forEach(v => tags.add(`locationIncl:${v.trim()}`));
        if (sq.locationsInBuildingExcluded) sq.locationsInBuildingExcluded.split(',').forEach(v => tags.add(`locationExcl:${v.trim()}`));
        if (sq.furnished) tags.add(`furnished:${sq.furnished}`);
        if (sq.energyCertificateClass) tags.add(`energy:${sq.energyCertificateClass}`);
        if (sq.pagingOrder) tags.add(`pagingOrder:${sq.pagingOrder}`);
      }
    });
    return Array.from(tags).sort();
  }, [contexts, searchQueries]);

  // Build all unique URL templates (WL + Legacy) for URL-based suggestions
  const allUrls = useMemo(() => {
    const urls = new Set<string>();
    contexts.forEach(ctx => {
      const mapping = contextUrlMappings.get(ctx.id);
      if (!mapping) return;
      if (mapping.wlUrlPath) urls.add(`WL:${mapping.wlUrlPath}`);
      mapping.legacyVariants.forEach(variant => {
        if (variant.legacyUrlPattern) {
          urls.add(`Legacy:${variant.legacyUrlPattern}`);
        }
      });
    });
    return Array.from(urls).sort();
  }, [contexts, contextUrlMappings]);

  const urlMappingStats = useMemo(() => {
    let mapped = 0;
    let wlOnly = 0;
    let multiGeo = 0;

    contexts.forEach(ctx => {
      const mapping = contextUrlMappings.get(ctx.id);
      if (!mapping) return;

      if (mapping.mappingStatus === 'MAPPED') mapped += 1;
      if (mapping.mappingStatus === 'WL_ONLY') wlOnly += 1;
      if (mapping.legacyVariants.length > 1) multiGeo += 1;
    });

    return { mapped, wlOnly, multiGeo };
  }, [contexts, contextUrlMappings]);

  // Filter suggestions based on query, exclude already selected
  // When query contains '/', suggest URLs instead of tags
  // Regular tags are shown before Alias tags
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    if (query.includes('/')) {
      return allUrls
        .filter(url => url.toLowerCase().includes(q) && !selectedTags.includes(url))
        .slice(0, 8);
    }
    const matching = allTags.filter(tag => tag.toLowerCase().includes(q) && !selectedTags.includes(tag));
    const regular = matching.filter(tag => !tag.startsWith('Alias:'));
    const aliases = matching.filter(tag => tag.startsWith('Alias:'));
    return [...regular, ...aliases];
  }, [query, allTags, allUrls, selectedTags]);

  // Filter contexts by selected tags
  const filteredContexts = useMemo(() => {
    if (selectedTags.length === 0) return contexts;
    return contexts.filter(ctx => {
      const sq = searchQueries.get(ctx.id);
      return selectedTags.every(tag => {
        if (tag.startsWith('Alias:') && ctx.alias === tag.substring(6)) return true;
        const mapping = contextUrlMappings.get(ctx.id);
        if (tag.startsWith('WL:') && mapping?.wlUrlPath === tag.substring(3)) return true;
        if (tag.startsWith('Legacy:') && mapping?.legacyVariants.some(v => v.legacyUrlPattern === tag.substring(7))) return true;
        if (tag.startsWith('Level:')) {
          const levelName = tag.substring(6);
          if (ctx.openedLevels.some(l => (levelNamesLocal[l] ?? l) === levelName)) return true;
        }
        if (tag.startsWith('Indexation:') && ctx.indexation === tag.substring(11)) return true;
        if (!sq) return false;
        const distTypes = sq.distributionTypes ? sq.distributionTypes.split(',').map(v => v.trim()) : [];
        if (distTypes.includes(tag)) return true;
        const estTypes = sq.estateTypes ? sq.estateTypes.split(',').map(v => v.trim().replace(/_/g, ' ')) : [];
        if (estTypes.includes(tag)) return true;
        const subTypes = sq.estateSubTypes ? sq.estateSubTypes.split(',').map(v => v.trim().replace(/_/g, ' ')) : [];
        if (subTypes.includes(tag)) return true;
        if (tag.startsWith('business:') && sq.classifiedBusiness === tag.split(':')[1]) return true;
        if (tag.startsWith('feature:')) {
          const feats = sq.featuresIncluded ? sq.featuresIncluded.split(',').map(v => v.trim()) : [];
          if (feats.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('roomsMin:') && sq.numberOfRoomsMin === tag.split(':')[1]) return true;
        if (tag.startsWith('roomsMax:') && sq.numberOfRoomsMax === tag.split(':')[1]) return true;
        if (tag.startsWith('bedroomsMin:') && sq.numberOfBedroomsMin === tag.split(':')[1]) return true;
        if (tag.startsWith('bedroomsMax:') && sq.numberOfBedroomsMax === tag.split(':')[1]) return true;
        if (tag.startsWith('priceMin:') && sq.priceMin === tag.split(':')[1]) return true;
        if (tag.startsWith('priceMax:') && sq.priceMax === tag.split(':')[1]) return true;
        if (tag.startsWith('project:')) {
          const projs = sq.projectTypes ? sq.projectTypes.split(',').map(v => v.trim()) : [];
          if (projs.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('hiddenProject:')) {
          const hProjs = sq.hiddenProjectTypes ? sq.hiddenProjectTypes.split(',').map(v => v.trim()) : [];
          if (hProjs.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('yearConstructionMin:') && sq.yearOfConstructionMin === tag.split(':')[1]) return true;
        if (tag.startsWith('yearConstructionMax:') && sq.yearOfConstructionMax === tag.split(':')[1]) return true;
        if (tag.startsWith('certificate:') && sq.certificateOfEligibilityNeeded === tag.split(':')[1]) return true;
        if (tag.startsWith('saleGoodwill:') && sq.isSaleGoodwill === tag.split(':')[1]) return true;
        if (tag.startsWith('buildState:')) {
          const states = sq.buildStates ? sq.buildStates.split(',').map(v => v.trim()) : [];
          if (states.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('locationIncl:')) {
          const locs = sq.locationsInBuildingIncluded ? sq.locationsInBuildingIncluded.split(',').map(v => v.trim()) : [];
          if (locs.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('locationExcl:')) {
          const locs = sq.locationsInBuildingExcluded ? sq.locationsInBuildingExcluded.split(',').map(v => v.trim()) : [];
          if (locs.includes(tag.split(':')[1])) return true;
        }
        if (tag.startsWith('furnished:') && sq.furnished === tag.split(':')[1]) return true;
        if (tag.startsWith('energy:') && sq.energyCertificateClass === tag.split(':')[1]) return true;
        if (tag.startsWith('pagingOrder:') && sq.pagingOrder === tag.split(':')[1]) return true;
        return false;
      });
    });
  }, [contexts, contextUrlMappings, selectedTags, searchQueries]);

  const addTag = (tag: string) => {
    onSelectedTagsChange([...selectedTags, tag]);
    setQuery('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const addTags = (tags: string[]) => {
    const newTags = tags.filter(t => !selectedTags.includes(t));
    if (newTags.length > 0) onSelectedTagsChange([...selectedTags, ...newTags]);
  };

  const removeTag = (tag: string) => {
    onSelectedTagsChange(selectedTags.filter(t => t !== tag));
  };

  const linkClassName = 'text-[11px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md block break-all font-mono leading-snug hover:underline';

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-8 py-5 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${brand.colors.primary} ring-4 ring-opacity-20 ${brand.colors.secondary}`}></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.contextManagement.title} — {brand.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{filteredContexts.length} / {contexts.length} contexts</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60">
                  mapped: {urlMappingStats.mapped}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                  WL-only: {urlMappingStats.wlOnly}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
                  multi-geo legacy: {urlMappingStats.multiGeo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200/60"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-0.5 hover:text-indigo-900 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => onSelectedTagsChange([])}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Search input with suggestions */}
        <div className="relative" ref={dropdownRef}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => { if (query.trim()) setShowDropdown(true); }}
            placeholder="Filter by tag... (e.g. Buy, Apartment, rooms:3, feature:Balcony)"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all placeholder:text-gray-400"
          />
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-56 overflow-y-auto">
              {suggestions.map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span className="text-gray-800">{tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div ref={scrollRef} data-context-list-scroll className="flex-1 overflow-x-auto overflow-y-auto" style={{ overflow: 'clip visible' }}>
        {filteredContexts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">📋</span>
            </div>
            <p className="text-gray-500 font-medium text-sm">No context found</p>
          </div>
        ) : (
          <div className="px-6 py-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Search Criteria</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Keyfacts</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">SEO Content</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">WL Url</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Legacy Url</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Opened Levels</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-gray-300/60">Indexation</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContexts.map((ctx, idx) => {
                    const sq = searchQueries.get(ctx.id);
                    const mapping = contextUrlMappings.get(ctx.id);
                    const chars = getCharacteristics(sq);
                    const isEven = idx % 2 === 0;
                    const primaryLegacy = resolvePrimaryLegacyVariant(ctx, mapping);

                    // Get distribution types from SearchQuery
                    const distTypes = sq?.distributionTypes ? sq.distributionTypes.split(',').map(v => v.trim()) : [];
                    const sqEstateTypes = sq?.estateTypes ? sq.estateTypes.split(',').map(v => v.trim()) : [];
                    const sqEstateSubTypes = sq?.estateSubTypes ? sq.estateSubTypes.split(',').map(v => v.trim()) : [];

                    return (
                      <tr key={ctx.id} onClick={() => onSelectContext(ctx)} className={`group transition-colors duration-150 cursor-pointer hover:bg-indigo-50/50 h-24 ${isEven ? 'bg-white' : 'bg-gray-50/30'}`}>
                        {/* Search Criteria */}
                        <td className="px-5 py-3 min-w-[200px] border-b border-r border-gray-200 align-middle">
                          <p className="font-semibold text-gray-900 text-[13px] leading-tight">{ctx.alias}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {distTypes.map((dt, i) => {
                              const tag = dt;
                              const active = selectedTags.includes(tag);
                              return (
                                <span key={`dist-${i}`} className={`relative inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide cursor-pointer group/tip ${
                                  dt === 'Buy' || dt.startsWith('Buy') ? 'bg-emerald-100 text-emerald-700' :
                                  dt === 'Rent' ? 'bg-sky-100 text-sky-700' :
                                  'bg-violet-100 text-violet-700'
                                } ${active ? 'ring-2 ring-indigo-400' : 'hover:ring-2 hover:ring-indigo-300'}`}
                                  onClick={(e) => { e.stopPropagation(); if (!active) addTags([tag]); }}
                                >
                                  {dt.replace(/_/g, ' ')}
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                    {active ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                  </span>
                                </span>
                              );
                            })}
                            {sqEstateTypes.map((et, i) => {
                              const tag = et.replace(/_/g, ' ');
                              const active = selectedTags.includes(tag);
                              return (
                                <span key={`estate-${i}`} className={`relative inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-700 cursor-pointer group/tip ${active ? 'ring-2 ring-indigo-400' : 'hover:ring-2 hover:ring-indigo-300'}`}
                                  onClick={(e) => { e.stopPropagation(); if (!active) addTags([tag]); }}
                                >
                                  {et.replace(/_/g, ' ')}
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                    {active ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                  </span>
                                </span>
                              );
                            })}
                            {sqEstateSubTypes.map((st, i) => {
                              const tag = st.replace(/_/g, ' ');
                              const active = selectedTags.includes(tag);
                              return (
                                <span key={`sub-${i}`} className={`relative inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-rose-100 text-rose-700 cursor-pointer group/tip ${active ? 'ring-2 ring-indigo-400' : 'hover:ring-2 hover:ring-indigo-300'}`}
                                  onClick={(e) => { e.stopPropagation(); if (!active) addTags([tag]); }}
                                >
                                  {st.replace(/_/g, ' ')}
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                    {active ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* Keyfacts */}
                        <td className="px-5 py-3 border-b border-r border-gray-200 align-middle">
                          {chars.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {chars.map((c, i) => {
                                const tags = getTagsForCharacteristic(c.key, c.value);
                                const allActive = tags.length > 0 && tags.every(t => selectedTags.includes(t));
                                return (
                                  <span key={i}
                                    className={`relative inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold cursor-pointer group/kf transition-all ${
                                      allActive
                                        ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400 shadow-sm'
                                        : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60 hover:ring-2 hover:ring-indigo-300'
                                    }`}
                                    onClick={(e) => { e.stopPropagation(); if (tags.length > 0 && !allActive) addTags(tags); }}
                                  >
                                    <span className="text-slate-400 mr-1">{c.key}:</span>{c.value}
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/kf:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                      {allActive ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                    </span>
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>

                        {/* SEO Content */}
                        <td className="px-5 py-3 min-w-[300px] border-b border-r border-gray-200 align-middle">
                          <div className="space-y-1.5">
                            <p className="text-xs leading-relaxed">
                              <span className="inline-block w-11 text-[10px] font-bold uppercase text-gray-400 tracking-wide">Title</span>
                              <span className="text-gray-800">{ctx.titleWithCountPlural}</span>
                            </p>
                            <p className="text-xs leading-relaxed">
                              <span className="inline-block w-11 text-[10px] font-bold uppercase text-gray-400 tracking-wide">H1</span>
                              <span className="text-gray-800">{ctx.headerPlural}</span>
                            </p>
                            <p className="text-xs leading-relaxed line-clamp-2">
                              <span className="inline-block w-11 text-[10px] font-bold uppercase text-gray-400 tracking-wide">Meta</span>
                              <span className="text-gray-500">{ctx.metaDescPlural}</span>
                            </p>
                          </div>
                        </td>

                        {/* WL Url */}
                        <td className="px-5 py-3 min-w-[220px] border-b border-r border-gray-200 align-middle">
                          <div className="space-y-1.5">
                            <code className="text-[11px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md block break-all font-mono leading-snug">
                              {mapping?.wlUrlPath || '—'}
                            </code>
                            {mapping?.wlExampleUrl ? (
                              <a
                                href={mapping.wlExampleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClassName}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {mapping.wlExampleUrl}
                              </a>
                            ) : (
                              <code className={linkClassName}>—</code>
                            )}
                          </div>
                        </td>

                        {/* Legacy Url */}
                        <td className="px-5 py-3 min-w-[240px] border-b border-r border-gray-200 align-middle">
                          <div className="space-y-1.5">
                            <code className="text-[11px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md block break-all font-mono leading-snug">
                              {primaryLegacy?.legacyUrlPattern || '—'}
                            </code>
                            {primaryLegacy?.legacyExampleUrl ? (
                              <a
                                href={primaryLegacy.legacyExampleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClassName}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {primaryLegacy.legacyExampleUrl}
                              </a>
                            ) : (
                              <code className={linkClassName}>—</code>
                            )}
                            {mapping && mapping.legacyVariants.length > 1 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                                {mapping.legacyVariants.length} geo variants
                              </span>
                            )}
                            {mapping?.mappingStatus === 'WL_ONLY' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 ring-1 ring-rose-200/60">
                                WL only (no legacy)
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Opened Levels */}
                        <td className="px-5 py-3 min-w-[160px] border-b border-r border-gray-200 align-middle">
                          <div className="flex flex-wrap gap-1">
                            {ctx.openedLevels.map((level, i) => {
                              const levelTag = `Level:${levelNamesLocal[level] ?? level}`;
                              const isActive = selectedTags.includes(levelTag);
                              return (
                                <span
                                  key={i}
                                  className={`relative inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold cursor-pointer group/lv transition-all ${
                                    isActive
                                      ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400 shadow-sm'
                                      : 'bg-violet-50 text-violet-700 ring-1 ring-violet-200/60 hover:ring-2 hover:ring-indigo-300'
                                  }`}
                                  onClick={(e) => { e.stopPropagation(); if (!isActive) addTag(levelTag); }}
                                >
                                  {levelNamesLocal[level] ?? level}
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/lv:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                    {isActive ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* Indexation */}
                        <td className="px-5 py-3 border-b border-gray-200 align-middle">
                          {(() => {
                            const idxTag = `Indexation:${ctx.indexation}`;
                            const idxActive = selectedTags.includes(idxTag);
                            return (
                              <span
                                className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer group/ix ${
                                  ctx.indexation === 'auto'
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
                                    : ctx.indexation === 'forced'
                                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60'
                                    : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60'
                                } ${idxActive ? 'ring-2 ring-indigo-400' : 'hover:ring-2 hover:ring-indigo-300'}`}
                                onClick={(e) => { e.stopPropagation(); if (!idxActive) addTag(idxTag); }}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  ctx.indexation === 'auto' ? 'bg-emerald-500' :
                                  ctx.indexation === 'forced' ? 'bg-blue-500' :
                                  'bg-amber-500'
                                }`}></span>
                                {ctx.indexation}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/ix:opacity-100 transition-opacity pointer-events-none z-[9999] flex items-center gap-1">
                                  {idxActive ? '✓ Filtered' : <><Filter className="w-3 h-3" /> Add filter</>}
                                </span>
                              </span>
                            );
                          })()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
