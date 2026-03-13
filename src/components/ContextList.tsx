import React from 'react';
import { Brand } from '../data/brands';
import { MergedContext } from '../data/csvParser';
import { useTranslation } from '../i18n/translations';

interface ContextListProps {
  brand: Brand;
  contexts: MergedContext[];
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

function getCharacteristics(ctx: MergedContext): { key: string; value: string }[] {
  const chars: { key: string; value: string }[] = [];
  if (ctx.numberOfRooms) chars.push({ key: 'rooms', value: ctx.numberOfRooms });
  if (ctx.numberOfBedrooms) chars.push({ key: 'bedrooms', value: ctx.numberOfBedrooms });
  if (ctx.price) chars.push({ key: 'price', value: ctx.price });
  if (ctx.feature) chars.push({ key: 'feature', value: ctx.feature });
  return chars;
}

export const ContextList: React.FC<ContextListProps> = ({ brand, contexts }) => {
  const t = useTranslation(brand.locale);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${brand.colors.primary}`}></div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.contextManagement.title} - {brand.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{contexts.length} contexts</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {contexts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <p className="text-gray-600 font-medium">No contexts found</p>
          </div>
        ) : (
          <div className="p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="pb-3 pr-4">Critères de recherche</th>
                  <th className="pb-3 pr-4">Contenu SEO</th>
                  <th className="pb-3 pr-4">WL Url</th>
                  <th className="pb-3 pr-4">Legacy Url</th>
                  <th className="pb-3 pr-4">Opened Levels</th>
                  <th className="pb-3 pr-4">Indexation</th>
                  <th className="pb-3">Caractéristiques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contexts.map(ctx => {
                  const wl = buildWLUrl(ctx);
                  const legacy = buildLegacyUrl(ctx);
                  const chars = getCharacteristics(ctx);

                  return (
                    <tr key={ctx.id} className="hover:bg-gray-50 transition-colors align-top">
                      {/* Critères de recherche */}
                      <td className="py-3 pr-4 min-w-[180px]">
                        <p className="font-semibold text-gray-900">{ctx.alias}</p>
                        <p className="text-gray-600 text-xs mt-1">{ctx.distributionType}</p>
                        <p className="text-gray-500 text-xs">
                          {ctx.estateType}{ctx.estateSubType ? ` · ${ctx.estateSubType}` : ''}
                        </p>
                      </td>

                      {/* Contenu SEO */}
                      <td className="py-3 pr-4 min-w-[280px]">
                        <p className="text-gray-900 text-xs">
                          <span className="font-medium text-gray-500">Title:</span> {ctx.titleWithCountPlural}
                        </p>
                        <p className="text-gray-900 text-xs mt-1">
                          <span className="font-medium text-gray-500">H1:</span> {ctx.headerPlural}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          <span className="font-medium">Meta:</span> {ctx.metaDescPlural}
                        </p>
                      </td>

                      {/* WL Url */}
                      <td className="py-3 pr-4 min-w-[200px]">
                        <code className="text-xs text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded block break-all">{wl.template}</code>
                        <code className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded block break-all mt-1">{wl.example}</code>
                      </td>

                      {/* Legacy Url */}
                      <td className="py-3 pr-4 min-w-[220px]">
                        <code className="text-xs text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded block break-all">{legacy.template}</code>
                        <code className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded block break-all mt-1">{legacy.example}</code>
                      </td>

                      {/* Opened Levels */}
                      <td className="py-3 pr-4 min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {ctx.openedLevels.map((level, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {level}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Indexation */}
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          ctx.indexation === 'auto' ? 'bg-green-100 text-green-800' :
                          ctx.indexation === 'forced' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {ctx.indexation}
                        </span>
                      </td>

                      {/* Caractéristiques */}
                      <td className="py-3">
                        {chars.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {chars.map((c, i) => (
                              <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {c.key}: {c.value}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
