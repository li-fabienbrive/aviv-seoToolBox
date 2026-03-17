export interface Brand {
  id: string;
  name: string;
  locale: 'en';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const brands: Brand[] = [
  {
    id: 'sl',
    name: 'SL',
    locale: 'en',
    colors: {
      primary: 'bg-red-600',
      secondary: 'bg-red-100',
      accent: 'text-red-600'
    }
  },
  {
    id: 'li',
    name: 'LI',
    locale: 'en',
    colors: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-100',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'iwt',
    name: 'IWT',
    locale: 'en',
    colors: {
      primary: 'bg-yellow-500',
      secondary: 'bg-yellow-100',
      accent: 'text-yellow-600'
    }
  },
];