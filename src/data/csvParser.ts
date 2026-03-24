function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseCSV<T>(raw: string): T[] {
  const lines = raw.split('\n').filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? '';
    });
    return obj as T;
  });
}

function parseSemicolonCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ';' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseSemicolonCSV<T>(raw: string): T[] {
  const lines = raw.split('\n').filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = parseSemicolonCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseSemicolonCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? '';
    });
    return obj as T;
  });
}

export interface SerpContextRow {
  ID: string;
  Alias: string;
  DistributionType: string;
  EstateType: string;
  EstateSubType: string;
  NumberOfRooms: string;
  NumberOfBedrooms: string;
  Price: string;
  Feature: string;
  OpenedLevels: string;
}

export interface SerpSearchQueryRow {
  ID: string;
  DistributionTypes: string;
  EstateTypes: string;
  EstateSubTypes: string;
  ClassifiedBusiness: string;
  NumberOfRoomsMin: string;
  NumberOfRoomsMax: string;
  NumberOfBedroomsMin: string;
  NumberOfBedroomsMax: string;
  PriceMin: string;
  PriceMax: string;
  YearOfConstructionMin: string;
  YearOfConstructionMax: string;
  CertificateOfEligibilityNeeded: string;
  IsSaleGoodwill: string;
  FeaturesIncluded: string;
  BuildStates: string;
  LocationsInBuildingIncluded: string;
  LocationsInBuildingExcluded: string;
  Furnished: string;
  ProjectTypes: string;
  HiddenProjectTypes: string;
  EnergyCertificateClass: string;
  PagingOrder: string;
}

export interface SearchQuery {
  id: string;
  distributionTypes: string;
  estateTypes: string;
  estateSubTypes: string;
  classifiedBusiness: string;
  numberOfRoomsMin: string;
  numberOfRoomsMax: string;
  numberOfBedroomsMin: string;
  numberOfBedroomsMax: string;
  priceMin: string;
  priceMax: string;
  yearOfConstructionMin: string;
  yearOfConstructionMax: string;
  certificateOfEligibilityNeeded: string;
  isSaleGoodwill: string;
  featuresIncluded: string;
  buildStates: string;
  locationsInBuildingIncluded: string;
  locationsInBuildingExcluded: string;
  furnished: string;
  projectTypes: string;
  hiddenProjectTypes: string;
  energyCertificateClass: string;
  pagingOrder: string;
}

export interface SerpWlUrlRow {
  ContextId: string;
  WlUrlPath: string;
  ExampleUrl: string;
}

export interface SerpLegacyUrlRow {
  ContextId: string;
  GeoLevels: string;
  GeoLevel?: string;
  LegacyUrlPattern: string;
  ExampleUrl: string;
}

export interface SerpLegacyUrlExampleRow {
  ContextId: string;
  Alias: string;
  GeoLevel: string;
  LocationAvivGeoId: string;
  LocationName: string;
  LocationSlug: string;
  ExampleUrl: string;
  GeoLevels?: string;
  WhiteLabelUrl?: string;
}

export interface SerpWlUrlExampleRow {
  ContextId: string;
  Alias: string;
  GeoLevel: string;
  LocationAvivGeoId: string;
  LocationName: string;
  WhiteLabelUrl: string;
  GeoLevels?: string;
}

export interface ContextGeoUrlExample {
  geoLevel: string;
  locationAvivGeoId: string;
  locationName: string;
  locationSlug: string;
  legacyUrlExample: string;
  wlUrlExample: string;
}

export interface LegacyUrlVariant {
  geoLevels: string;
  legacyUrlPattern: string;
  legacyExampleUrl: string;
  wlExampleUrl: string;
  exampleGeoLevel: string;
  locationAvivGeoId: string;
  locationName: string;
  locationSlug: string;
}

export interface ContextUrlMapping {
  contextId: string;
  wlUrlPath: string;
  wlExampleUrl: string;
  legacyVariants: LegacyUrlVariant[];
  geoExamples: ContextGeoUrlExample[];
  mappingStatus: 'MAPPED' | 'WL_ONLY';
}

export function parseSearchQueries(raw: string): Map<string, SearchQuery> {
  const rows = parseSemicolonCSV<SerpSearchQueryRow>(raw);
  const map = new Map<string, SearchQuery>();
  for (const row of rows) {
    map.set(row.ID, {
      id: row.ID,
      distributionTypes: row.DistributionTypes,
      estateTypes: row.EstateTypes,
      estateSubTypes: row.EstateSubTypes,
      classifiedBusiness: row.ClassifiedBusiness,
      numberOfRoomsMin: row.NumberOfRoomsMin,
      numberOfRoomsMax: row.NumberOfRoomsMax,
      numberOfBedroomsMin: row.NumberOfBedroomsMin,
      numberOfBedroomsMax: row.NumberOfBedroomsMax,
      priceMin: row.PriceMin,
      priceMax: row.PriceMax,
      yearOfConstructionMin: row.YearOfConstructionMin,
      yearOfConstructionMax: row.YearOfConstructionMax,
      certificateOfEligibilityNeeded: row.CertificateOfEligibilityNeeded,
      isSaleGoodwill: row.IsSaleGoodwill,
      featuresIncluded: row.FeaturesIncluded,
      buildStates: row.BuildStates,
      locationsInBuildingIncluded: row.LocationsInBuildingIncluded,
      locationsInBuildingExcluded: row.LocationsInBuildingExcluded,
      furnished: row.Furnished,
      projectTypes: row.ProjectTypes,
      hiddenProjectTypes: row.HiddenProjectTypes,
      energyCertificateClass: row.EnergyCertificateClass,
      pagingOrder: row.PagingOrder,
    });
  }
  return map;
}

export interface SerpTextConfigRow {
  ID: string;
  Title: string;
  TitleWithCountSingular: string;
  TitleWithCountPlural: string;
  HeaderSingular: string;
  HeaderPlural: string;
  MetaDescSingular: string;
  MetaDescPlural: string;
  LinkText: string;
  BreadcrumbLinkText: string;
  LinkboxLinkText: string;
  TopLinkboxLinkText: string;
}

export interface OpenedLevel {
  code: string;
  name: string;
  forcedUntil: string | null;
}

export interface MergedContext {
  id: string;
  alias: string;
  distributionType: string;
  estateType: string;
  estateSubType: string;
  numberOfRooms: string;
  numberOfBedrooms: string;
  price: string;
  feature: string;
  openedLevels: string[];
  openedLevelsDetailed: OpenedLevel[];
  // All text config fields
  title: string;
  titleWithCountSingular: string;
  titleWithCountPlural: string;
  headerSingular: string;
  headerPlural: string;
  metaDescSingular: string;
  metaDescPlural: string;
  linkText: string;
  breadcrumbLinkText: string;
  linkboxLinkText: string;
  topLinkboxLinkText: string;
  indexation: string;
}

function hasForcedLevels(openedLevels: string): boolean {
  if (!openedLevels) return false;
  return openedLevels.split('|').some(l => l.includes(':'));
}

export const levelNames: Record<string, string> = {
  '200': 'Country',
  '300': 'MacroRegion',
  '400': 'Region',
  '500': 'MicroRegion',
  '600': 'Province',
  '800': 'Municipality',
  '900': 'Borough/NBH1',
  '1000': 'Neighborhood',
  '1100': 'MicroNeighborhood',
  '1200': 'Bloc',
};

function parseOpenedLevels(raw: string): OpenedLevel[] {
  if (!raw) return [];
  return raw.split('|').map(entry => {
    const [code, date] = entry.split(':');
    return {
      code: code.trim(),
      name: levelNames[code.trim()] ?? code.trim(),
      forcedUntil: date?.trim() || null,
    };
  });
}

export interface LinkBoxClusterRow {
  order: string;
  component_type: string;
  cluster_code: string;
  headline: string;
  current_context_ids: string;
  targeted_context_ids: string;
}

export interface LinkBoxCluster {
  order: number;
  componentType: string;
  clusterCode: string;
  headline: string;
  currentContextIds: string[];
  targetedContextIds: string[];
}

function normalizeGeoLevel(level: string): string {
  return level.trim().toLowerCase().replace(/[^a-z]/g, '');
}

function getGeoSelector(geoLevel?: string, geoLevels?: string): string {
  return geoLevels?.trim() || geoLevel?.trim() || '';
}

function normalizeLegacyGeoLevel(level: string): string {
  const normalized = normalizeGeoLevel(level);
  if (normalized === 'boroughnbh' || normalized === 'boroughnbh1') return 'borough';
  return normalized;
}

function getGeoLevelPreferences(geoLevels: string): string[] {
  const specificityOrder = [
    'microneighborhood',
    'neighborhood',
    'borough',
    'municipality',
    'province',
    'region',
    'microregion',
    'macroregion',
    'country',
    'bloc',
  ];

  const normalizedSet = new Set<string>();
  geoLevels.split('|').forEach(level => {
    const normalized = normalizeLegacyGeoLevel(level);
    if (!normalized) return;
    if (normalized === 'microneighborhood') {
      normalizedSet.add('microneighborhood');
      normalizedSet.add('neighborhood');
      return;
    }
    normalizedSet.add(normalized);
  });

  return specificityOrder.filter(level => normalizedSet.has(level));
}

function pickGeoExampleForLegacy(
  geoExamples: ContextGeoUrlExample[],
  legacyGeoSelector: string,
): ContextGeoUrlExample | undefined {
  if (geoExamples.length === 0) return undefined;

  const byGeo = new Map<string, ContextGeoUrlExample[]>();
  for (const geoExample of geoExamples) {
    const normalizedGeo = normalizeGeoLevel(geoExample.geoLevel);
    const existing = byGeo.get(normalizedGeo) ?? [];
    existing.push(geoExample);
    byGeo.set(normalizedGeo, existing);
  }

  const preferred = getGeoLevelPreferences(legacyGeoSelector);
  for (const geoLevel of preferred) {
    const match = byGeo.get(geoLevel)?.[0];
    if (match) return match;
  }

  return geoExamples[0];
}

export function parseContextUrlMappings(
  wlCsv: string,
  legacyCsv: string,
  legacyUrlExamplesCsv: string,
  wlUrlExamplesCsv: string,
): Map<string, ContextUrlMapping> {
  const wlRows = parseCSV<SerpWlUrlRow>(wlCsv);
  const legacyRows = parseCSV<SerpLegacyUrlRow>(legacyCsv);
  const legacyUrlExampleRows = parseCSV<SerpLegacyUrlExampleRow>(legacyUrlExamplesCsv);
  const wlUrlExampleRows = parseCSV<SerpWlUrlExampleRow>(wlUrlExamplesCsv);

  const legacyByContext = new Map<string, LegacyUrlVariant[]>();
  for (const row of legacyRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;
    const legacyGeoSelector = getGeoSelector(row.GeoLevel, row.GeoLevels);

    const existing = legacyByContext.get(contextId) ?? [];
    existing.push({
      geoLevels: legacyGeoSelector,
      legacyUrlPattern: row.LegacyUrlPattern?.trim() ?? '',
      legacyExampleUrl: row.ExampleUrl?.trim() ?? '',
      wlExampleUrl: '',
      exampleGeoLevel: '',
      locationAvivGeoId: '',
      locationName: '',
      locationSlug: '',
    });
    legacyByContext.set(contextId, existing);
  }

  const wlExamplesByContextAndGeo = new Map<string, Map<string, SerpWlUrlExampleRow[]>>();
  for (const row of wlUrlExampleRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;
    const geoSelector = getGeoSelector(row.GeoLevel, row.GeoLevels);
    const normalizedGeo = normalizeGeoLevel(geoSelector);
    if (!normalizedGeo) continue;

    const byGeo = wlExamplesByContextAndGeo.get(contextId) ?? new Map<string, SerpWlUrlExampleRow[]>();
    const rows = byGeo.get(normalizedGeo) ?? [];
    rows.push(row);
    byGeo.set(normalizedGeo, rows);
    wlExamplesByContextAndGeo.set(contextId, byGeo);
  }

  const geoExamplesByContext = new Map<string, ContextGeoUrlExample[]>();
  for (const row of legacyUrlExampleRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;
    const geoSelector = getGeoSelector(row.GeoLevel, row.GeoLevels);
    const normalizedGeo = normalizeGeoLevel(geoSelector);
    const wlRow = wlExamplesByContextAndGeo.get(contextId)?.get(normalizedGeo)?.[0];

    const existing = geoExamplesByContext.get(contextId) ?? [];
    existing.push({
      geoLevel: geoSelector,
      locationAvivGeoId: row.LocationAvivGeoId?.trim() ?? '',
      locationName: row.LocationName?.trim() ?? '',
      locationSlug: row.LocationSlug?.trim() ?? '',
      legacyUrlExample: row.ExampleUrl?.trim() ?? '',
      wlUrlExample: wlRow?.WhiteLabelUrl?.trim() || row.WhiteLabelUrl?.trim() || '',
    });
    geoExamplesByContext.set(contextId, existing);
  }

  for (const row of wlUrlExampleRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;
    const geoSelector = getGeoSelector(row.GeoLevel, row.GeoLevels);
    const normalizedGeo = normalizeGeoLevel(geoSelector);
    if (!normalizedGeo) continue;

    const existing = geoExamplesByContext.get(contextId) ?? [];
    const hasSameGeo = existing.some(example => normalizeGeoLevel(example.geoLevel) === normalizedGeo);
    if (hasSameGeo) {
      if (!geoExamplesByContext.has(contextId)) {
        geoExamplesByContext.set(contextId, existing);
      }
      continue;
    }

    existing.push({
      geoLevel: geoSelector,
      locationAvivGeoId: row.LocationAvivGeoId?.trim() ?? '',
      locationName: row.LocationName?.trim() ?? '',
      locationSlug: '',
      legacyUrlExample: '',
      wlUrlExample: row.WhiteLabelUrl?.trim() ?? '',
    });
    geoExamplesByContext.set(contextId, existing);
  }

  const mapping = new Map<string, ContextUrlMapping>();
  const wlRowByContext = new Map<string, SerpWlUrlRow>();
  for (const row of wlRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;
    wlRowByContext.set(contextId, row);
  }

  for (const row of wlRows) {
    const contextId = row.ContextId?.trim();
    if (!contextId) continue;

    let geoExamples = geoExamplesByContext.get(contextId) ?? [];
    if (geoExamples.length === 0) {
      const wlRow = wlRowByContext.get(contextId);
      const legacyFallbackRows = (legacyByContext.get(contextId) ?? []).map(variant => ({
        geoLevel: variant.geoLevels || 'Unknown',
        locationAvivGeoId: '',
        locationName: '',
        locationSlug: '',
        legacyUrlExample: variant.legacyExampleUrl || '',
        wlUrlExample: wlRow?.ExampleUrl?.trim() || '',
      }));
      if (legacyFallbackRows.length > 0) {
        geoExamples = legacyFallbackRows;
      }
    }

    const legacyVariants = (legacyByContext.get(contextId) ?? []).map(variant => {
      const selectedExample = pickGeoExampleForLegacy(geoExamples, variant.geoLevels);
      return {
        ...variant,
        legacyExampleUrl: selectedExample?.legacyUrlExample || variant.legacyExampleUrl,
        wlExampleUrl: selectedExample?.wlUrlExample || '',
        exampleGeoLevel: selectedExample?.geoLevel || '',
        locationAvivGeoId: selectedExample?.locationAvivGeoId || '',
        locationName: selectedExample?.locationName || '',
        locationSlug: selectedExample?.locationSlug || '',
      };
    });

    const wlFallbackFromWlCsv = row.ExampleUrl?.trim() ?? '';
    const wlExampleFromGeo =
      geoExamples.find(example => example.wlUrlExample)?.wlUrlExample ||
      legacyVariants.find(variant => variant.wlExampleUrl)?.wlExampleUrl ||
      '';

    mapping.set(contextId, {
      contextId,
      wlUrlPath: row.WlUrlPath?.trim() ?? '',
      wlExampleUrl: wlExampleFromGeo || wlFallbackFromWlCsv,
      legacyVariants,
      geoExamples,
      mappingStatus: legacyVariants.length > 0 ? 'MAPPED' : 'WL_ONLY',
    });
  }

  return mapping;
}

export function parseLinkBoxClusters(raw: string): LinkBoxCluster[] {
  const rows = parseCSV<LinkBoxClusterRow>(raw);
  return rows.map(row => ({
    order: parseInt(row.order, 10),
    componentType: row.component_type,
    clusterCode: row.cluster_code,
    headline: row.headline,
    currentContextIds: row.current_context_ids ? row.current_context_ids.split(';').map(id => id.trim()) : [],
    targetedContextIds: row.targeted_context_ids ? row.targeted_context_ids.split(';').map(id => id.trim()) : [],
  }));
}

export function mergeContextData(contextCsv: string, textConfigCsv: string): MergedContext[] {
  const contexts = parseCSV<SerpContextRow>(contextCsv);
  const textConfigs = parseCSV<SerpTextConfigRow>(textConfigCsv);
  const textMap = new Map(textConfigs.map(t => [t.ID, t]));

  return contexts.map(ctx => {
    const text = textMap.get(ctx.ID);
    const levels = ctx.OpenedLevels
      ? ctx.OpenedLevels.split('|').map(l => l.split(':')[0])
      : [];

    return {
      id: ctx.ID,
      alias: ctx.Alias,
      distributionType: ctx.DistributionType,
      estateType: ctx.EstateType,
      estateSubType: ctx.EstateSubType,
      numberOfRooms: ctx.NumberOfRooms,
      numberOfBedrooms: ctx.NumberOfBedrooms,
      price: ctx.Price,
      feature: ctx.Feature,
      openedLevels: levels,
      openedLevelsDetailed: parseOpenedLevels(ctx.OpenedLevels),
      title: text?.Title ?? '',
      titleWithCountSingular: text?.TitleWithCountSingular ?? '',
      titleWithCountPlural: text?.TitleWithCountPlural ?? '',
      headerSingular: text?.HeaderSingular ?? '',
      headerPlural: text?.HeaderPlural ?? '',
      metaDescSingular: text?.MetaDescSingular ?? '',
      metaDescPlural: text?.MetaDescPlural ?? '',
      linkText: text?.LinkText ?? '',
      breadcrumbLinkText: text?.BreadcrumbLinkText ?? '',
      linkboxLinkText: text?.LinkboxLinkText ?? '',
      topLinkboxLinkText: text?.TopLinkboxLinkText ?? '',
      indexation: hasForcedLevels(ctx.OpenedLevels) ? 'forced' : 'auto',
    };
  });
}
