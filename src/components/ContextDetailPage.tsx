import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Brand } from '../data/brands';
import { MergedContext, SearchQuery } from '../data/csvParser';

interface ContextDetailPageProps {
  brand: Brand;
  context: MergedContext;
  searchQuery?: SearchQuery;
  onBack: () => void;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

function buildWLUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  return {
    template: `/recherche/${dist}/${estate}/{geo}`,
    example: `/recherche/${dist}/${estate}/ile-de-france/ad04fr5`,
  };
}

function buildLegacyUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  return {
    template: `/immobilier/${dist}/bien-${estate}/{geo}`,
    example: `/immobilier/${dist}/bien-${estate}/ile-de-france.htm`,
  };
}

export const ContextDetailPage: React.FC<ContextDetailPageProps> = ({ brand: _brand, context: ctx, searchQuery: sq, onBack }) => {
  const wl = buildWLUrl(ctx);
  const legacy = buildLegacyUrl(ctx);

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
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-8 py-4 z-10 flex items-center gap-4">
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

            {/* URLs */}
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wide mb-2">WL URL</p>
                <code className="text-[11px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md block break-all font-mono leading-snug">{wl.template}</code>
                <code className="text-[11px] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md block break-all font-mono leading-snug mt-1.5">{wl.example}</code>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wide mb-2">Legacy URL</p>
                <code className="text-[11px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md block break-all font-mono leading-snug">{legacy.template}</code>
                <code className="text-[11px] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md block break-all font-mono leading-snug mt-1.5">{legacy.example}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Indexation / Opened Levels */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Indexation — Opened Levels</h2>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              ctx.indexation === 'auto'
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
                : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                ctx.indexation === 'auto' ? 'bg-emerald-500' : 'bg-amber-500'
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
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
