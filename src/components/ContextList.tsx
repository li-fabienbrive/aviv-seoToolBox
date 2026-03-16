import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Brand } from '../data/brands';
import { MergedContext, SearchQuery, levelNames } from '../data/csvParser';
import { useTranslation } from '../i18n/translations';

interface ContextListProps {
  brand: Brand;
  contexts: MergedContext[];
  searchQueries: Map<string, SearchQuery>;
  onSelectContext: (ctx: MergedContext) => void;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

function buildWLUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  const template = `/recherche/${dist}/${estate}/{geo}`;
  const example = `/recherche/${dist}/${estate}/ile-de-france/ad04fr5`;
  return { template, example };
}

function buildLegacyUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  const template = `/immobilier/${dist}/bien-${estate}/{geo}`;
  const example = `/immobilier/${dist}/bien-${estate}/ile-de-france.htm`;
  return { template, example };
}

const levelNamesLocal = levelNames;

function getCharacteristics(sq: SearchQuery | undefined): { key: string; value: string }[] {
  if (!sq) return [];
  const chars: { key: string; value: string }[] = [];
  // Exclude: distributionTypes, estateTypes, estateSubTypes (shown in critères column)
  if (sq.classifiedBusiness) chars.push({ key: 'ClassifiedBusiness', value: sq.classifiedBusiness });
  if (sq.numberOfRoomsMin) chars.push({ key: 'RoomsMin', value: sq.numberOfRoomsMin });
  if (sq.numberOfRoomsMax) chars.push({ key: 'RoomsMax', value: sq.numberOfRoomsMax });
  if (sq.numberOfBedroomsMin) chars.push({ key: 'BedroomsMin', value: sq.numberOfBedroomsMin });
  if (sq.numberOfBedroomsMax) chars.push({ key: 'BedroomsMax', value: sq.numberOfBedroomsMax });
  if (sq.priceMin) chars.push({ key: 'PriceMin', value: sq.priceMin });
  if (sq.priceMax) chars.push({ key: 'PriceMax', value: sq.priceMax });
  if (sq.yearOfConstructionMin) chars.push({ key: 'YearConstructionMin', value: sq.yearOfConstructionMin });
  if (sq.yearOfConstructionMax) chars.push({ key: 'YearConstructionMax', value: sq.yearOfConstructionMax });
  if (sq.certificateOfEligibilityNeeded) chars.push({ key: 'CertificateOfEligibility', value: sq.certificateOfEligibilityNeeded });
  if (sq.isSaleGoodwill) chars.push({ key: 'IsSaleGoodwill', value: sq.isSaleGoodwill });
  if (sq.featuresIncluded) chars.push({ key: 'Features', value: sq.featuresIncluded });
  if (sq.buildStates) chars.push({ key: 'BuildStates', value: sq.buildStates });
  if (sq.locationsInBuildingIncluded) chars.push({ key: 'LocationsIncluded', value: sq.locationsInBuildingIncluded });
  if (sq.locationsInBuildingExcluded) chars.push({ key: 'LocationsExcluded', value: sq.locationsInBuildingExcluded });
  if (sq.furnished) chars.push({ key: 'Furnished', value: sq.furnished });
  if (sq.projectTypes) chars.push({ key: 'ProjectTypes', value: sq.projectTypes });
  if (sq.hiddenProjectTypes) chars.push({ key: 'HiddenProjectTypes', value: sq.hiddenProjectTypes });
  if (sq.energyCertificateClass) chars.push({ key: 'EnergyCertificate', value: sq.energyCertificateClass });
  if (sq.pagingOrder) chars.push({ key: 'PagingOrder', value: sq.pagingOrder });
  return chars;
}

export const ContextList: React.FC<ContextListProps> = ({ brand, contexts, searchQueries, onSelectContext }) => {
  const t = useTranslation(brand.locale);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Build all available tags from search queries
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    contexts.forEach(ctx => {
      const sq = searchQueries.get(ctx.id);
      if (sq) {
        if (sq.distributionTypes) sq.distributionTypes.split(',').forEach(v => tags.add(v.trim()));
        if (sq.estateTypes) tags.add(sq.estateTypes.replace(/_/g, ' '));
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
      }
    });
    return Array.from(tags).sort();
  }, [contexts, searchQueries]);

  // Filter suggestions based on query, exclude already selected
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTags
      .filter(tag => tag.toLowerCase().includes(q) && !selectedTags.includes(tag))
      .slice(0, 8);
  }, [query, allTags, selectedTags]);

  // Filter contexts by selected tags
  const filteredContexts = useMemo(() => {
    if (selectedTags.length === 0) return contexts;
    return contexts.filter(ctx => {
      const sq = searchQueries.get(ctx.id);
      if (!sq) return false;
      return selectedTags.every(tag => {
        const distTypes = sq.distributionTypes ? sq.distributionTypes.split(',').map(v => v.trim()) : [];
        if (distTypes.includes(tag)) return true;
        if (sq.estateTypes && sq.estateTypes.replace(/_/g, ' ') === tag) return true;
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
        return false;
      });
    });
  }, [contexts, selectedTags, searchQueries]);

  const addTag = (tag: string) => {
    setSelectedTags(prev => [...prev, tag]);
    setQuery('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

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
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{filteredContexts.length} / {contexts.length} contextes</p>
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
              onClick={() => setSelectedTags([])}
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
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {filteredContexts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">📋</span>
            </div>
            <p className="text-gray-500 font-medium text-sm">Aucun contexte trouvé</p>
          </div>
        ) : (
          <div className="px-6 py-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Critères de recherche</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Caractéristiques</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Contenu SEO</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">WL Url</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Legacy Url</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-r border-gray-300/60">Opened Levels</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3.5 border-b-2 border-gray-300/60">Indexation</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContexts.map((ctx, idx) => {
                    const sq = searchQueries.get(ctx.id);
                    const wl = buildWLUrl(ctx);
                    const legacy = buildLegacyUrl(ctx);
                    const chars = getCharacteristics(sq);
                    const isEven = idx % 2 === 0;

                    // Get distribution types from SearchQuery
                    const distTypes = sq?.distributionTypes ? sq.distributionTypes.split(',').map(v => v.trim()) : [];
                    const sqEstateTypes = sq?.estateTypes || '';
                    const sqEstateSubTypes = sq?.estateSubTypes ? sq.estateSubTypes.split(',').map(v => v.trim()) : [];

                    return (
                      <tr key={ctx.id} onClick={() => onSelectContext(ctx)} className={`group transition-colors duration-150 cursor-pointer hover:bg-indigo-50/50 h-24 ${isEven ? 'bg-white' : 'bg-gray-50/30'}`}>
                        {/* Critères de recherche */}
                        <td className="px-5 py-3 min-w-[200px] border-b border-r border-gray-200 align-middle">
                          <p className="font-semibold text-gray-900 text-[13px] leading-tight">{ctx.alias}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {distTypes.map((dt, i) => (
                              <span key={`dist-${i}`} className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                dt === 'Buy' || dt.startsWith('Buy') ? 'bg-emerald-100 text-emerald-700' :
                                dt === 'Rent' ? 'bg-sky-100 text-sky-700' :
                                'bg-violet-100 text-violet-700'
                              }`}>
                                {dt.replace(/_/g, ' ')}
                              </span>
                            ))}
                            {sqEstateTypes && (
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-700">
                                {sqEstateTypes.replace(/_/g, ' ')}
                              </span>
                            )}
                            {sqEstateSubTypes.map((st, i) => (
                              <span key={`sub-${i}`} className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-rose-100 text-rose-700">
                                {st.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Caractéristiques */}
                        <td className="px-5 py-3 border-b border-r border-gray-200 align-middle">
                          {chars.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {chars.map((c, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 ring-1 ring-slate-200/60">
                                  <span className="text-slate-400 mr-1">{c.key}:</span>{c.value}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>

                        {/* Contenu SEO */}
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
                            <code className="text-[11px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md block break-all font-mono leading-snug">{wl.template}</code>
                            <code className="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md block break-all font-mono leading-snug">{wl.example}</code>
                          </div>
                        </td>

                        {/* Legacy Url */}
                        <td className="px-5 py-3 min-w-[240px] border-b border-r border-gray-200 align-middle">
                          <div className="space-y-1.5">
                            <code className="text-[11px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md block break-all font-mono leading-snug">{legacy.template}</code>
                            <code className="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md block break-all font-mono leading-snug">{legacy.example}</code>
                          </div>
                        </td>

                        {/* Opened Levels */}
                        <td className="px-5 py-3 min-w-[160px] border-b border-r border-gray-200 align-middle">
                          <div className="flex flex-wrap gap-1">
                            {ctx.openedLevels.map((level, i) => (
                              <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
                                {levelNamesLocal[level] ?? level}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Indexation */}
                        <td className="px-5 py-3 border-b border-gray-200 align-middle">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            ctx.indexation === 'auto'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
                              : ctx.indexation === 'forced'
                              ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60'
                              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              ctx.indexation === 'auto' ? 'bg-emerald-500' :
                              ctx.indexation === 'forced' ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`}></span>
                            {ctx.indexation}
                          </span>
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
