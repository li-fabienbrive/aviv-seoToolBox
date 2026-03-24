import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MergedContext, SearchQuery, LinkBoxCluster, ContextUrlMapping } from '../data/csvParser';
import { getCharacteristics } from '../utils/helpers';

interface ContextDetailPageProps {
  context: MergedContext;
  urlMapping?: ContextUrlMapping;
  searchQuery?: SearchQuery;
  linkBoxClusters: LinkBoxCluster[];
  contextMap: Map<string, MergedContext>;
  searchQueriesMap: Map<string, SearchQuery>;
  onBack: () => void;
}

export const ContextDetailPage: React.FC<ContextDetailPageProps> = ({ context: ctx, urlMapping, searchQuery: sq, linkBoxClusters, contextMap, searchQueriesMap, onBack }) => {
  const legacyVariants = urlMapping?.legacyVariants ?? [];
  const geoExamples = urlMapping?.geoExamples ?? [];
  const geoLevelOrder: Record<string, number> = {
    country: 1,
    macroregion: 2,
    region: 3,
    microregion: 4,
    province: 5,
    municipality: 6,
    borough: 7,
    neighborhood: 8,
    microneighborhood: 9,
    bloc: 10,
  };
  const sortedGeoExamples = [...geoExamples].sort((a, b) => {
    const normA = a.geoLevel.toLowerCase().replace(/[^a-z]/g, '');
    const normB = b.geoLevel.toLowerCase().replace(/[^a-z]/g, '');
    const rankA = geoLevelOrder[normA] ?? 999;
    const rankB = geoLevelOrder[normB] ?? 999;
    if (rankA !== rankB) return rankA - rankB;
    return a.locationName.localeCompare(b.locationName);
  });

  const normalizeGeoLevel = (value: string) => value.toLowerCase().replace(/[^a-z]/g, '');
  const getLegacyPatternForGeoLevel = (geoLevel: string): string => {
    const normalizedGeo = normalizeGeoLevel(geoLevel);
    if (!normalizedGeo) return '';
    const exact = legacyVariants.find(v => normalizeGeoLevel(v.geoLevels) === normalizedGeo);
    if (exact?.legacyUrlPattern) return exact.legacyUrlPattern;
    const contains = legacyVariants.find(v =>
      v.geoLevels.split('|').some(level => normalizeGeoLevel(level) === normalizedGeo),
    );
    return contains?.legacyUrlPattern || '';
  };

  const matchingClusters = linkBoxClusters
    .filter(c => c.currentContextIds.includes(ctx.id))
    .sort((a, b) => a.order - b.order);

  const seoFields: { label: string; value: string }[] = [
    { label: 'Title', value: ctx.title },
    { label: 'Title (count singular)', value: ctx.titleWithCountSingular },
    { label: 'Title (count plural)', value: ctx.titleWithCountPlural },
    { label: 'Header (singular)', value: ctx.headerSingular },
    { label: 'Header (plural)', value: ctx.headerPlural },
    { label: 'MetaDesc (singular)', value: ctx.metaDescSingular },
    { label: 'MetaDesc (plural)', value: ctx.metaDescPlural },
    { label: 'Link Text', value: ctx.linkText },
    { label: 'Breadcrumb Link Text', value: ctx.breadcrumbLinkText },
    { label: 'Linkbox Link Text', value: ctx.linkboxLinkText },
    { label: 'Top Linkbox Link Text', value: ctx.topLinkboxLinkText },
  ];

  const searchQueryFields: { label: string; value: string }[] = sq ? [
    { label: 'DistributionTypes', value: sq.distributionTypes },
    { label: 'EstateTypes', value: sq.estateTypes },
    { label: 'EstateSubTypes', value: sq.estateSubTypes },
    { label: 'ClassifiedBusiness', value: sq.classifiedBusiness },
    { label: 'NumberOfRoomsMin', value: sq.numberOfRoomsMin },
    { label: 'NumberOfRoomsMax', value: sq.numberOfRoomsMax },
    { label: 'NumberOfBedroomsMin', value: sq.numberOfBedroomsMin },
    { label: 'NumberOfBedroomsMax', value: sq.numberOfBedroomsMax },
    { label: 'PriceMin', value: sq.priceMin },
    { label: 'PriceMax', value: sq.priceMax },
    { label: 'YearOfConstructionMin', value: sq.yearOfConstructionMin },
    { label: 'YearOfConstructionMax', value: sq.yearOfConstructionMax },
    { label: 'CertificateOfEligibilityNeeded', value: sq.certificateOfEligibilityNeeded },
    { label: 'IsSaleGoodwill', value: sq.isSaleGoodwill },
    { label: 'FeaturesIncluded', value: sq.featuresIncluded },
    { label: 'BuildStates', value: sq.buildStates },
    { label: 'LocationsInBuildingIncluded', value: sq.locationsInBuildingIncluded },
    { label: 'LocationsInBuildingExcluded', value: sq.locationsInBuildingExcluded },
    { label: 'Furnished', value: sq.furnished },
    { label: 'ProjectTypes', value: sq.projectTypes },
    { label: 'HiddenProjectTypes', value: sq.hiddenProjectTypes },
    { label: 'EnergyCertificateClass', value: sq.energyCertificateClass },
    { label: 'PagingOrder', value: sq.pagingOrder },
  ].filter(f => f.value) : [];

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Top bar */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-8 py-4 z-30 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{ctx.alias}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Context ID: {ctx.id}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">

        {/* Section: Criteria & Keyfacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Search Criteria & Keyfacts</h2>
          </div>
          <div className="px-6 py-5">
            {/* Alias */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wide mb-1.5">Alias</p>
              <p className="text-sm font-semibold text-gray-800">{ctx.alias}</p>
            </div>

            {/* SearchQuery fields */}
            {searchQueryFields.length > 0 ? (
              <div className="space-y-3">
                {searchQueryFields.map((field, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="shrink-0 w-52 text-[11px] font-bold uppercase text-gray-400 tracking-wide pt-0.5">{field.label}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {field.value.includes(',') ? (
                        field.value.split(',').map((v, j) => (
                          <span key={j} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200/60">
                            {v.trim().replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200/60">
                          {field.value.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No associated SearchQuery</p>
            )}
          </div>
        </div>

        {/* Section: SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">SEO Content</h2>
          </div>
          <div className="px-6 py-5">
            {/* Text fields */}
            <div className="space-y-4">
              {seoFields.map((field, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-44 text-[11px] font-bold uppercase text-gray-400 tracking-wide pt-0.5">{field.label}</span>
                  <p className="text-sm text-gray-800 leading-relaxed flex-1 min-w-0">
                    {field.value || <span className="text-gray-300">—</span>}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wide mb-2">Geo Level Examples</p>
              {sortedGeoExamples.length === 0 ? (
                <p className="text-sm text-gray-400">No geo-level examples available</p>
              ) : (
                <div className="rounded-lg border border-gray-200/80 overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80">
                        <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-200/60">Geo Level</th>
                        <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-200/60">Location</th>
                        <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-200/60">WL Example</th>
                        <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-200/60">Legacy Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedGeoExamples.map((example, idx) => (
                        <tr key={`${example.geoLevel}-${example.locationAvivGeoId}-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                          <td className="px-3 py-2 border-b border-gray-100 align-top">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
                              {example.geoLevel || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-3 py-2 border-b border-gray-100 align-top">
                            <p className="text-[11px] text-gray-700 font-medium">{example.locationName || 'Unknown location'}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{example.locationAvivGeoId || 'n/a'}</p>
                          </td>
                          <td className="px-3 py-2 border-b border-gray-100 align-top">
                            {example.wlUrlExample ? (
                              <a
                                href={example.wlUrlExample}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-indigo-600 hover:underline break-all font-mono leading-snug"
                              >
                                {example.wlUrlExample}
                              </a>
                            ) : (
                              <span className="text-[11px] text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-3 py-2 border-b border-gray-100 align-top">
                            {getLegacyPatternForGeoLevel(example.geoLevel) ? (
                              <code className="text-[11px] text-gray-700 bg-gray-100 px-2 py-1 rounded-md block break-all font-mono leading-snug mb-1.5">
                                {getLegacyPatternForGeoLevel(example.geoLevel)}
                              </code>
                            ) : (
                              <span className="text-[11px] text-gray-300 block mb-1.5">No legacy pattern</span>
                            )}
                            {example.legacyUrlExample ? (
                              <a
                                href={example.legacyUrlExample}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-indigo-600 hover:underline break-all font-mono leading-snug"
                              >
                                {example.legacyUrlExample}
                              </a>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                                No legacy example for this geo level
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section: LinkBox Clusters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">LinkBox Clusters</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200/60">
              {matchingClusters.length} cluster{matchingClusters.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="px-6 py-5">
            {matchingClusters.length === 0 ? (
              <p className="text-sm text-gray-400">No LinkBox clusters for this context</p>
            ) : (
              <div className="space-y-6">
                {matchingClusters.map((cluster, i) => (
                  <div key={i} className="rounded-lg border border-gray-200/80 overflow-hidden">
                    {/* Cluster header: headline first, then badges */}
                    <div className="px-4 py-3 bg-gray-50/80 flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{cluster.headline}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        cluster.componentType === 'TopLinkBox'
                          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60'
                          : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/60'
                      }`}>
                        {cluster.componentType}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
                        {cluster.clusterCode}
                      </span>
                    </div>
                    {/* Targeted contexts table */}
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50/60">
                          <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-2 border-b border-gray-200/60">Alias</th>
                          <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-2 border-b border-gray-200/60">Search Criteria</th>
                          <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-2 border-b border-gray-200/60">Keyfacts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cluster.targetedContextIds.map((tid, j) => {
                          const targetCtx = contextMap.get(tid);
                          const targetSq = searchQueriesMap.get(tid);
                          const distTypes = targetSq?.distributionTypes ? targetSq.distributionTypes.split(',').map(v => v.trim()) : [];
                          const estateTypes = targetSq?.estateTypes ? targetSq.estateTypes.split(',').map(v => v.trim()) : [];
                          const estateSubTypes = targetSq?.estateSubTypes ? targetSq.estateSubTypes.split(',').map(v => v.trim()) : [];
                          const chars = getCharacteristics(targetSq);
                          const isSelf = tid === ctx.id;
                          return (
                            <tr key={j} className={isSelf ? 'bg-blue-50/40' : j % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                              <td className="px-4 py-2.5 border-b border-gray-100 align-middle whitespace-nowrap">
                                <span className={`text-[13px] font-semibold ${isSelf ? 'text-blue-700' : 'text-gray-900'}`}>
                                  {targetCtx?.alias || tid}
                                </span>
                                {isSelf && <span className="ml-1.5 text-[10px] font-bold uppercase text-blue-500">(current)</span>}
                              </td>
                              <td className="px-4 py-2.5 border-b border-gray-100 align-middle">
                                <div className="flex flex-wrap items-center gap-1">
                                  {distTypes.map((dt, k) => (
                                    <span key={`dist-${k}`} className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                      dt === 'Buy' || dt.startsWith('Buy') ? 'bg-emerald-100 text-emerald-700' :
                                      dt === 'Rent' ? 'bg-sky-100 text-sky-700' :
                                      'bg-violet-100 text-violet-700'
                                    }`}>{dt.replace(/_/g, ' ')}</span>
                                  ))}
                                  {estateTypes.map((et, k) => (
                                    <span key={`estate-${k}`} className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-700">
                                      {et.replace(/_/g, ' ')}
                                    </span>
                                  ))}
                                  {estateSubTypes.map((st, k) => (
                                    <span key={`sub-${k}`} className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-rose-100 text-rose-700">
                                      {st.replace(/_/g, ' ')}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-2.5 border-b border-gray-100 align-middle">
                                <div className="flex flex-wrap gap-1.5">
                                  {chars.length > 0 ? chars.map((c, k) => (
                                    <span key={k} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 ring-1 ring-slate-200/60">
                                      <span className="text-slate-400 mr-1">{c.key}:</span>{c.value}
                                    </span>
                                  )) : (
                                    <span className="text-[10px] text-gray-300">—</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section: Indexation / Opened Levels */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Indexation — Opened Levels</h2>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              ctx.indexation === 'auto'
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
                : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                ctx.indexation === 'auto' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}></span>
              {ctx.indexation}
            </span>
          </div>
          <div className="px-6 py-5">
            {ctx.openedLevelsDetailed.length === 0 ? (
              <p className="text-sm text-gray-400">No opened levels</p>
            ) : (
              <div className="space-y-2">
                {ctx.openedLevelsDetailed.map((level, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-gray-50/80 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
                        {level.code}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{level.name}</span>
                    </div>
                    {level.forcedUntil ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        forced until {level.forcedUntil}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        not forced
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
