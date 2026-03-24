import { ContextUrlMapping, LegacyUrlVariant, MergedContext, SearchQuery, levelNames } from '../data/csvParser';

/**
 * Convert text to URL slug format
 */
export function slugify(text: string): string {
  return text.toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

/**
 * Build WL (White Label) URL pattern and example
 */
export function buildWLUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  const template = `/recherche/${dist}/${estate}/{geo}`;
  const example = `/recherche/${dist}/${estate}/ile-de-france/ad04fr5`;
  return { template, example };
}

/**
 * Build Legacy URL pattern and example
 */
export function buildLegacyUrl(ctx: MergedContext): { template: string; example: string } {
  const dist = slugify(ctx.distributionType);
  const estate = slugify(ctx.estateType);
  const template = `/immobilier/${dist}/bien-${estate}/{geo}`;
  const example = `/immobilier/${dist}/bien-${estate}/ile-de-france.htm`;
  return { template, example };
}

function normalizeGeoLevelName(level: string): string {
  return level.trim().toLowerCase().replace(/[^a-z]/g, '');
}

function getContextGeoWeights(ctx: MergedContext): Map<string, number> {
  const geoWeightByName: Record<string, number> = {
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

  const weights = new Map<string, number>();
  for (const levelCode of ctx.openedLevels) {
    const levelLabel = levelNames[levelCode] ?? levelCode;
    const normalized = normalizeGeoLevelName(levelLabel);
    if (normalized === 'boroughnbh1') {
      weights.set('borough', geoWeightByName.borough);
      continue;
    }
    if (geoWeightByName[normalized]) {
      weights.set(normalized, geoWeightByName[normalized]);
    }
  }
  return weights;
}

function scoreLegacyVariant(variant: LegacyUrlVariant, geoWeights: Map<string, number>): number {
  if (!variant.geoLevels) return -1;
  const rawLevels = variant.geoLevels.split('|').map(l => normalizeGeoLevelName(l)).filter(Boolean);
  if (rawLevels.length === 0) return -1;

  let score = 0;
  for (const geoLevel of rawLevels) {
    const weight = geoWeights.get(geoLevel);
    if (!weight) {
      return -1;
    }
    score += weight;
  }

  return score;
}

export function resolvePrimaryLegacyVariant(ctx: MergedContext, mapping?: ContextUrlMapping): LegacyUrlVariant | undefined {
  if (!mapping || mapping.legacyVariants.length === 0) return undefined;
  if (mapping.legacyVariants.length === 1) return mapping.legacyVariants[0];

  const geoWeights = getContextGeoWeights(ctx);
  let bestVariant = mapping.legacyVariants[0];
  let bestScore = scoreLegacyVariant(bestVariant, geoWeights);

  for (let i = 1; i < mapping.legacyVariants.length; i++) {
    const candidate = mapping.legacyVariants[i];
    const score = scoreLegacyVariant(candidate, geoWeights);
    if (score > bestScore) {
      bestVariant = candidate;
      bestScore = score;
    }
  }

  return bestVariant;
}

/**
 * Extract characteristics from a search query
 */
export function getCharacteristics(sq: SearchQuery | undefined): { key: string; value: string }[] {
  if (!sq) return [];
  const chars: { key: string; value: string }[] = [];
  // Exclude: distributionTypes, estateTypes, estateSubTypes (shown in criteria column)
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
