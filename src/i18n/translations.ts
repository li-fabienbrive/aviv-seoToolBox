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
    temporary: string;
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

export const translations: Record<'fr' | 'de', Translations> = {
  fr: {
    dashboard: {
      welcome: 'Bienvenue sur AVIV SEO Toolbox',
      subtitle: 'Gérez efficacement vos configurations SEO pour toutes vos marques immobilières.',
      managedPages: 'Pages gérées',
      activeContexts: 'Contextes actifs',
      brands: 'Marques',
      sitemaps: 'Sitemaps',
      weeklyIndexation: 'Aperçu hebdomadaire de l\'indexation',
      newlyIndexed: 'URLs nouvellement indexées',
      deindexed: 'URLs désindexées',
      totalIndexed: 'Total URLs indexées',
      indexationRate: 'Taux d\'indexation',
      quickActions: 'Actions rapides',
      createContext: 'Créer un nouveau contexte',
      createContextDesc: 'Ajouter une nouvelle configuration SERP',
      generateSitemap: 'Générer un sitemap',
      generateSitemapDesc: 'Créer un nouveau sitemap pour une marque',
      analyzePerformance: 'Analyser les performances',
      analyzePerformanceDesc: 'Voir les statistiques détaillées',
      recentActivity: 'Activité récente',
      contextCreated: 'Contexte créé',
      linkBoxUpdated: 'LinkBox mise à jour',
      headInfoModified: 'Head-info modifié',
      sitemapGenerated: 'Sitemap généré',
      seoPages: 'Pages SEO',
      seoPagesDesc: 'Gérez les composants SEO de toutes vos pages : Accueil, SERP, CDP, et plus.',
      types: 'Types',
      multiBrand: 'Multi-marques',
      multiBrandDesc: 'Configuration indépendante pour chaque marque avec leurs couleurs et styles.',
      serpContexts: 'Contextes SERP',
      serpContextsDesc: 'Système de gestion de contexte avancé avec critères et métriques.',
      advanced: 'Avancé',
    },
    contextManagement: {
      title: 'Gestion des contextes',
      subtitle: 'Gérez les contextes de recherche immobilière pour optimiser votre SEO SERP.',
      addContext: 'Ajouter un contexte',
      searchCriteria: 'Critères de recherche',
      seoContent: 'Contenu SEO',
      linkBox: 'LinkBox',
      url: 'URL',
      indexing: 'Indexation',
      features: 'Caractéristiques',
      actions: 'Actions',
      title_label: 'Titre',
      h1_label: 'H1',
      meta_label: 'Meta',
    },
    contextCreation: {
      title: 'Créer un nouveau contexte',
      geolocation: 'Géolocalisation',
      country: 'Pays',
      region: 'Région',
      province: 'Département',
      city: 'Ville',
      neighborhood1: 'Quartier 1',
      neighborhood2: 'Quartier 2',
      neighborhood3: 'Quartier 3',
      transactionType: 'Type de transaction',
      propertyTypes: 'Types de propriété',
      apartment: 'Appartement',
      house: 'Maison',
      office: 'Bureau',
      parking: 'Parking',
      plot: 'Terrain',
      projectTypes: 'Types de projet',
      numericCriteria: 'Critères numériques',
      minPrice: 'Prix min',
      maxPrice: 'Prix max',
      minRooms: 'Pièces min',
      maxRooms: 'Pièces max',
      minArea: 'Surface min (m²)',
      maxArea: 'Surface max (m²)',
      minBedrooms: 'Chambres min',
      maxBedrooms: 'Chambres max',
      includedFeatures: 'Caractéristiques incluses',
      linkBoxConfig: 'Configuration LinkBox',
      indexing: 'Indexation',
      auto: 'Auto',
      forced: 'Forcée',
      temporary: 'Temporaire',
      seoConfig: 'Configuration SEO',
      h1: 'H1',
      metaTitle: 'Titre Meta',
      metaDescription: 'Meta Description',
      urlPattern: 'Modèle d\'URL',
      cancel: 'Annuler',
      createContext: 'Créer le contexte',
    },
    statistics: {
      globalTitle: 'Statistiques SEO',
      contextTitle: 'Statistiques du contexte',
      subtitle: 'Analysez les performances de vos contextes et optimisez votre stratégie SEO.',
      contextSubtitle: 'Analysez les performances de ce contexte spécifique et optimisez votre stratégie SEO.',
      indexedUrls: 'URLs indexées',
      impressions: 'Impressions',
      clicks: 'Clics',
      averageCtr: 'CTR moyen',
      monthlyTrends: 'Tendances mensuelles',
      topUrls: 'URLs principales',
      topContexts: 'Contextes principaux',
      performanceAnalysis: 'Analyse de performance',
      indexationRate: 'Taux d\'indexation',
      indexationRateDesc: 'URLs trouvées par Google',
      trafficGrowth: 'Croissance du trafic',
      trafficGrowthDesc: 'Par rapport au mois dernier',
      averagePosition: 'Position moyenne',
      averagePositionDesc: 'Dans les résultats Google',
    },
  },
  de: {
    dashboard: {
      welcome: 'Willkommen bei AVIV SEO Toolbox',
      subtitle: 'Verwalten Sie effizient Ihre SEO-Konfigurationen für alle Ihre Immobilienmarken.',
      managedPages: 'Verwaltete Seiten',
      activeContexts: 'Aktive Kontexte',
      brands: 'Marken',
      sitemaps: 'Sitemaps',
      weeklyIndexation: 'Wöchentliche Indexierungsübersicht',
      newlyIndexed: 'Neu indexierte URLs',
      deindexed: 'Deindexierte URLs',
      totalIndexed: 'Gesamt indexierte URLs',
      indexationRate: 'Indexierungsrate',
      quickActions: 'Schnellaktionen',
      createContext: 'Neuen Kontext erstellen',
      createContextDesc: 'Neue SERP-Konfiguration hinzufügen',
      generateSitemap: 'Sitemap generieren',
      generateSitemapDesc: 'Neue Sitemap für eine Marke erstellen',
      analyzePerformance: 'Leistung analysieren',
      analyzePerformanceDesc: 'Detaillierte Statistiken anzeigen',
      recentActivity: 'Kürzliche Aktivität',
      contextCreated: 'Kontext erstellt',
      linkBoxUpdated: 'LinkBox aktualisiert',
      headInfoModified: 'Head-Info geändert',
      sitemapGenerated: 'Sitemap generiert',
      seoPages: 'SEO-Seiten',
      seoPagesDesc: 'Verwalten Sie SEO-Komponenten für alle Ihre Seiten: Homepage, SERP, CDP und mehr.',
      types: 'Typen',
      multiBrand: 'Multi-Marken',
      multiBrandDesc: 'Unabhängige Konfiguration für jede Marke mit ihren Farben und Stilen.',
      serpContexts: 'SERP-Kontexte',
      serpContextsDesc: 'Erweitertes Kontextverwaltungssystem mit Kriterien und Metriken.',
      advanced: 'Erweitert',
    },
    contextManagement: {
      title: 'Kontextverwaltung',
      subtitle: 'Verwalten Sie Immobiliensuchkontexte zur Optimierung Ihrer SERP-SEO.',
      addContext: 'Kontext hinzufügen',
      searchCriteria: 'Suchkriterien',
      seoContent: 'SEO-Inhalt',
      linkBox: 'LinkBox',
      url: 'URL',
      indexing: 'Indexierung',
      features: 'Merkmale',
      actions: 'Aktionen',
      title_label: 'Titel',
      h1_label: 'H1',
      meta_label: 'Meta',
    },
    contextCreation: {
      title: 'Neuen Kontext erstellen',
      geolocation: 'Geolokalisierung',
      country: 'Land',
      region: 'Region',
      province: 'Bundesland',
      city: 'Stadt',
      neighborhood1: 'Stadtteil 1',
      neighborhood2: 'Stadtteil 2',
      neighborhood3: 'Stadtteil 3',
      transactionType: 'Transaktionsart',
      propertyTypes: 'Immobilientypen',
      apartment: 'Wohnung',
      house: 'Haus',
      office: 'Büro',
      parking: 'Parkplatz',
      plot: 'Grundstück',
      projectTypes: 'Projekttypen',
      numericCriteria: 'Numerische Kriterien',
      minPrice: 'Min. Preis',
      maxPrice: 'Max. Preis',
      minRooms: 'Min. Zimmer',
      maxRooms: 'Max. Zimmer',
      minArea: 'Min. Fläche (m²)',
      maxArea: 'Max. Fläche (m²)',
      minBedrooms: 'Min. Schlafzimmer',
      maxBedrooms: 'Max. Schlafzimmer',
      includedFeatures: 'Enthaltene Merkmale',
      linkBoxConfig: 'LinkBox-Konfiguration',
      indexing: 'Indexierung',
      auto: 'Auto',
      forced: 'Erzwungen',
      temporary: 'Temporär',
      seoConfig: 'SEO-Konfiguration',
      h1: 'H1',
      metaTitle: 'Meta-Titel',
      metaDescription: 'Meta-Beschreibung',
      urlPattern: 'URL-Muster',
      cancel: 'Abbrechen',
      createContext: 'Kontext erstellen',
    },
    statistics: {
      globalTitle: 'SEO-Statistiken',
      contextTitle: 'Kontextstatistiken',
      subtitle: 'Analysieren Sie die Leistung Ihrer Kontexte und optimieren Sie Ihre SEO-Strategie.',
      contextSubtitle: 'Analysieren Sie die Leistung dieses spezifischen Kontexts und optimieren Sie Ihre SEO-Strategie.',
      indexedUrls: 'Indexierte URLs',
      impressions: 'Impressionen',
      clicks: 'Klicks',
      averageCtr: 'Durchschnittl. CTR',
      monthlyTrends: 'Monatliche Trends',
      topUrls: 'Top-URLs',
      topContexts: 'Top-Kontexte',
      performanceAnalysis: 'Leistungsanalyse',
      indexationRate: 'Indexierungsrate',
      indexationRateDesc: 'Von Google gefundene URLs',
      trafficGrowth: 'Traffic-Wachstum',
      trafficGrowthDesc: 'Im Vergleich zum letzten Monat',
      averagePosition: 'Durchschnittl. Position',
      averagePositionDesc: 'In Google-Ergebnissen',
    },
  },
};

export const useTranslation = (locale: 'fr' | 'de') => {
  return translations[locale];
};
