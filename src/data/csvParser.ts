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

function hasTemporaryLevels(openedLevels: string): boolean {
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
  '900': 'Borough',
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
      indexation: hasTemporaryLevels(ctx.OpenedLevels) ? 'temporary' : 'auto',
    };
  });
}
