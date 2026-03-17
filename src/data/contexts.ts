export interface Context {
  id: number;
  title: string;
  h1: string;
  metaDesc: string;
  url: string;
  linkbox: string;
  criteria: {
    location: string;
    type: string;
    priceRange: string;
    bedrooms: string;
    bathrooms: string;
  };
  indexation: string;
  features: string[];
  theme: 'luxury' | 'affordable' | 'investment' | 'family' | 'urban' | 'suburban' | 'commercial';
  geoLevels: {
    country: string;
    region: string;
    province: string;
    city: string;
  };
  distributionType: string[];
  propertyTypes: string[];
  projectTypes: string[];
  numericCriteria: {
    priceMin: number;
    priceMax: number;
    areaMin: number;
    areaMax: number;
    bedroomsMin: number;
    bedroomsMax: number;
  };
  linkBoxConfig: {
    [key: string]: boolean;
  };
  createdAt: string;
}

function generateContexts(): Context[] {
  const themes: Array<'luxury' | 'affordable' | 'investment' | 'family' | 'urban' | 'suburban' | 'commercial'> = [
    'luxury', 'affordable', 'investment', 'family', 'urban', 'suburban', 'commercial'
  ];

  const locations = [
    { city: 'Paris', region: 'Île-de-France', districts: ['1er', '2e', '3e', '4e', '5e', '6e', '7e', '8e', '9e', '10e', '11e', '12e', '13e', '14e', '15e', '16e', '17e', '18e', '19e', '20e'] },
    { city: 'Lyon', region: 'Auvergne-Rhône-Alpes', districts: ['Presqu\'île', 'Croix-Rousse', 'Guillotière', 'Gerland', 'Confluence'] },
    { city: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', districts: ['Vieux Port', 'Canebière', 'Prado', 'Endoume', 'Castellane'] },
    { city: 'Toulouse', region: 'Occitanie', districts: ['Centre', 'Carmes', 'Capitole', 'Saint-Cyprien', 'Minimes'] },
    { city: 'Nice', region: 'Provence-Alpes-Côte d\'Azur', districts: ['Promenade', 'Vieux Nice', 'Cimiez', 'Carabacel', 'Fabron'] },
  ];

  const propertyTypes = ['Appartement', 'Maison', 'Studio', 'Loft', 'Penthouse', 'Villa', 'Bureau', 'Local Commercial'];
  const features = [
    'BALCONY_TERRACE', 'BUILT-IN-KITCHEN', 'BATHROOM_WINDOW', 'VACANT',
    'PETS_FRIENDLY', 'REDUCE_MOBILITY', 'PARKING_GARAGE', 'GARDEN',
    'CELLAR', 'BATHTUB', 'ELEVATOR', 'COMMISSION_FREE', 'SWIMMINGPOOL'
  ];
  const projectTypes = ['NEW BUILD', 'INVESTMENT', 'TEMPORARY LIVING', 'STOCK', 'SHARED FLATS'];
  const distributionTypes = ['BUY', 'RENT', 'BUY+RENT'];

  const themeConfigs: Record<string, { priceMin: number; priceMax: number; features: string[]; projectTypes: string[] }> = {
    luxury: {
      priceMin: 500000,
      priceMax: 5000000,
      features: ['BALCONY_TERRACE', 'SWIMMINGPOOL', 'PARKING_GARAGE', 'ELEVATOR'],
      projectTypes: ['NEW BUILD', 'STOCK']
    },
    affordable: {
      priceMin: 50000,
      priceMax: 250000,
      features: ['PETS_FRIENDLY', 'BUILT-IN-KITCHEN'],
      projectTypes: ['STOCK', 'TEMPORARY LIVING']
    },
    investment: {
      priceMin: 200000,
      priceMax: 1500000,
      features: ['REDUCE_MOBILITY', 'COMMISSION_FREE', 'PARKING_GARAGE'],
      projectTypes: ['INVESTMENT', 'NEW BUILD']
    },
    family: {
      priceMin: 150000,
      priceMax: 800000,
      features: ['GARDEN', 'PARKING_GARAGE', 'PETS_FRIENDLY'],
      projectTypes: ['NEW BUILD', 'STOCK']
    },
    urban: {
      priceMin: 100000,
      priceMax: 500000,
      features: ['ELEVATOR', 'BALCONY_TERRACE', 'BUILT-IN-KITCHEN'],
      projectTypes: ['NEW BUILD', 'STOCK']
    },
    suburban: {
      priceMin: 150000,
      priceMax: 600000,
      features: ['GARDEN', 'PARKING_GARAGE', 'CELLAR'],
      projectTypes: ['STOCK', 'NEW BUILD']
    },
    commercial: {
      priceMin: 500000,
      priceMax: 2000000,
      features: ['PARKING_GARAGE', 'REDUCE_MOBILITY'],
      projectTypes: ['STOCK', 'INVESTMENT']
    }
  };

  const contexts: Context[] = [];
  let contextId = 1;

  themes.forEach((theme, themeIdx) => {
    const themeConfig = themeConfigs[theme];
    for (let i = 0; i < 15; i++) {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const district = location.districts[Math.floor(Math.random() * location.districts.length)];
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const selectedFeatures = themeConfig.features.slice(0, Math.floor(Math.random() * 3) + 2);

      const bedroomsMin = Math.floor(Math.random() * 4);
      const bedroomsMax = bedroomsMin + Math.floor(Math.random() * 3) + 1;

      const context: Context = {
        id: contextId++,
        theme,
        title: `${propertyType} ${district} - ${location.city} (${theme})`,
        h1: `Find your ${propertyType} in ${district}, ${location.city}`,
        metaDesc: `Discover our selection of ${propertyType} in ${district}. ${selectedFeatures.length} great features available. ${theme.charAt(0).toUpperCase() + theme.slice(1)} properties.`,
        url: `/properties/${location.city.toLowerCase()}/${district.replace(/'/g, '').replace(/\s+/g, '-')}/${propertyType.toLowerCase()}`,
        linkbox: `${location.city} - ${propertyType}`,
        criteria: {
          location: `${location.city} - ${district}`,
          type: propertyType,
          priceRange: `${themeConfig.priceMin.toLocaleString()} - ${themeConfig.priceMax.toLocaleString()} €`,
          bedrooms: `${bedroomsMin} - ${bedroomsMax}`,
          bathrooms: `${Math.max(1, bedroomsMin)} - ${bedroomsMax}`
        },
        indexation: ['auto', 'forced'][Math.floor(Math.random() * 2)],
        features: selectedFeatures,
        geoLevels: {
          country: 'France',
          region: location.region,
          province: location.city,
          city: location.city
        },
        distributionType: [distributionTypes[Math.floor(Math.random() * distributionTypes.length)]],
        propertyTypes: [propertyType],
        projectTypes: [themeConfig.projectTypes[Math.floor(Math.random() * themeConfig.projectTypes.length)]],
        numericCriteria: {
          priceMin: themeConfig.priceMin,
          priceMax: themeConfig.priceMax,
          areaMin: 30 + Math.floor(Math.random() * 100),
          areaMax: 150 + Math.floor(Math.random() * 200),
          bedroomsMin,
          bedroomsMax
        },
        linkBoxConfig: {
          topRegions: Math.random() > 0.5,
          topCities: Math.random() > 0.5,
          propertyType: Math.random() > 0.5,
          priceRange: Math.random() > 0.5,
          features: Math.random() > 0.5
        },
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString()
      };

      contexts.push(context);
    }
  });

  return contexts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const generateContextList = (): Context[] => generateContexts();
