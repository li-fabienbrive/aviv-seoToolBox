export interface Translations {
  dashboard: {
    welcome: string;
    subtitle: string;
    managedPages: string;
    activeContexts: string;
    brands: string;
    sitemaps: string;
    weeklyIndexation: string;
    newlyIndexed: string;
    deindexed: string;
    totalIndexed: string;
    indexationRate: string;
    quickActions: string;
    createContext: string;
    createContextDesc: string;
    generateSitemap: string;
    generateSitemapDesc: string;
    analyzePerformance: string;
    analyzePerformanceDesc: string;
    recentActivity: string;
    contextCreated: string;
    linkBoxUpdated: string;
    headInfoModified: string;
    sitemapGenerated: string;
    seoPages: string;
    seoPagesDesc: string;
    types: string;
    multiBrand: string;
    multiBrandDesc: string;
    serpContexts: string;
    serpContextsDesc: string;
    advanced: string;
  };
  contextManagement: {
    title: string;
    subtitle: string;
    addContext: string;
    searchCriteria: string;
    seoContent: string;
    linkBox: string;
    url: string;
    indexing: string;
    features: string;
    actions: string;
    title_label: string;
    h1_label: string;
    meta_label: string;
  };
  contextCreation: {
    title: string;
    geolocation: string;
    country: string;
    region: string;
    province: string;
    city: string;
    neighborhood1: string;
    neighborhood2: string;
    neighborhood3: string;
    transactionType: string;
    propertyTypes: string;
    apartment: string;
    house: string;
    office: string;
    parking: string;
    plot: string;
    projectTypes: string;
    numericCriteria: string;
    minPrice: string;
    maxPrice: string;
    minRooms: string;
    maxRooms: string;
    minArea: string;
    maxArea: string;
    minBedrooms: string;
    maxBedrooms: string;
    includedFeatures: string;
    linkBoxConfig: string;
    indexing: string;
    auto: string;
    forced: string;
    seoConfig: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    urlPattern: string;
    cancel: string;
    createContext: string;
  };
  statistics: {
    globalTitle: string;
    contextTitle: string;
    subtitle: string;
    contextSubtitle: string;
    indexedUrls: string;
    impressions: string;
    clicks: string;
    averageCtr: string;
    monthlyTrends: string;
    topUrls: string;
    topContexts: string;
    performanceAnalysis: string;
    indexationRate: string;
    indexationRateDesc: string;
    trafficGrowth: string;
    trafficGrowthDesc: string;
    averagePosition: string;
    averagePositionDesc: string;
  };
}

export const translations: Record<'en', Translations> = {
  en: {
    dashboard: {
      welcome: 'Welcome to AVIV SEO Toolbox',
      subtitle: 'Efficiently manage your SEO configurations for all your real estate brands.',
      managedPages: 'Managed Pages',
      activeContexts: 'Active Contexts',
      brands: 'Brands',
      sitemaps: 'Sitemaps',
      weeklyIndexation: 'Weekly Indexation Overview',
      newlyIndexed: 'Newly Indexed URLs',
      deindexed: 'Deindexed URLs',
      totalIndexed: 'Total Indexed URLs',
      indexationRate: 'Indexation Rate',
      quickActions: 'Quick Actions',
      createContext: 'Create New Context',
      createContextDesc: 'Add a new SERP configuration',
      generateSitemap: 'Generate Sitemap',
      generateSitemapDesc: 'Create a new sitemap for a brand',
      analyzePerformance: 'Analyze Performance',
      analyzePerformanceDesc: 'View detailed statistics',
      recentActivity: 'Recent Activity',
      contextCreated: 'Context Created',
      linkBoxUpdated: 'LinkBox Updated',
      headInfoModified: 'Head-info Modified',
      sitemapGenerated: 'Sitemap Generated',
      seoPages: 'SEO Pages',
      seoPagesDesc: 'Manage SEO components for all your pages: Homepage, SERP, CDP, and more.',
      types: 'Types',
      multiBrand: 'Multi-brand',
      multiBrandDesc: 'Independent configuration for each brand with their colors and styles.',
      serpContexts: 'SERP Contexts',
      serpContextsDesc: 'Advanced context management system with criteria and metrics.',
      advanced: 'Advanced',
    },
    contextManagement: {
      title: 'Context Management',
      subtitle: 'Manage real estate search contexts to optimize your SERP SEO.',
      addContext: 'Add Context',
      searchCriteria: 'Search Criteria',
      seoContent: 'SEO Content',
      linkBox: 'LinkBox',
      url: 'URL',
      indexing: 'Indexation',
      features: 'Keyfacts',
      actions: 'Actions',
      title_label: 'Title',
      h1_label: 'H1',
      meta_label: 'Meta',
    },
    contextCreation: {
      title: 'Create New Context',
      geolocation: 'Geolocation',
      country: 'Country',
      region: 'Region',
      province: 'Province',
      city: 'City',
      neighborhood1: 'Neighborhood 1',
      neighborhood2: 'Neighborhood 2',
      neighborhood3: 'Neighborhood 3',
      transactionType: 'Transaction Type',
      propertyTypes: 'Property Types',
      apartment: 'Apartment',
      house: 'House',
      office: 'Office',
      parking: 'Parking',
      plot: 'Plot',
      projectTypes: 'Project Types',
      numericCriteria: 'Numeric Criteria',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minRooms: 'Min Rooms',
      maxRooms: 'Max Rooms',
      minArea: 'Min Area (m²)',
      maxArea: 'Max Area (m²)',
      minBedrooms: 'Min Bedrooms',
      maxBedrooms: 'Max Bedrooms',
      includedFeatures: 'Included Keyfacts',
      linkBoxConfig: 'LinkBox Configuration',
      indexing: 'Indexation',
      auto: 'Auto',
      forced: 'Forced',
      seoConfig: 'SEO Configuration',
      h1: 'H1',
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Description',
      urlPattern: 'URL Pattern',
      cancel: 'Cancel',
      createContext: 'Create Context',
    },
    statistics: {
      globalTitle: 'SEO Statistics',
      contextTitle: 'Context Statistics',
      subtitle: 'Analyze the performance of your contexts and optimize your SEO strategy.',
      contextSubtitle: 'Analyze the performance of this specific context and optimize your SEO strategy.',
      indexedUrls: 'Indexed URLs',
      impressions: 'Impressions',
      clicks: 'Clicks',
      averageCtr: 'Average CTR',
      monthlyTrends: 'Monthly Trends',
      topUrls: 'Top URLs',
      topContexts: 'Top Contexts',
      performanceAnalysis: 'Performance Analysis',
      indexationRate: 'Indexation Rate',
      indexationRateDesc: 'URLs found by Google',
      trafficGrowth: 'Traffic Growth',
      trafficGrowthDesc: 'Compared to last month',
      averagePosition: 'Average Position',
      averagePositionDesc: 'In Google results',
    },
  },
};

export const useTranslation = (locale: 'en') => {
  return translations[locale];
};
