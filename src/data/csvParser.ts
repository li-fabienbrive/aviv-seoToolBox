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
  TitleWithCountPlural: string;
  HeaderPlural: string;
  MetaDescPlural: string;
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
  titleWithCountPlural: string;
  headerPlural: string;
  metaDescPlural: string;
  indexation: string;
}

const indexations = ['auto', 'forced', 'temporary'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
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
      titleWithCountPlural: text?.TitleWithCountPlural ?? '',
      headerPlural: text?.HeaderPlural ?? '',
      metaDescPlural: text?.MetaDescPlural ?? '',
      indexation: indexations[Math.floor(seededRandom(parseInt(ctx.ID, 10)) * 3)],
    };
  });
}
