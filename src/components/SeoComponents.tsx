import React from 'react';
import { Code, Navigation, Link2, FileText, Hash, Globe } from 'lucide-react';
import { Brand } from '../data/brands';

interface SeoComponentProps {
  title: string;
  icon: React.ElementType;
  brand: Brand;
  children: React.ReactNode;
}

const SeoComponentWrapper: React.FC<SeoComponentProps> = ({ title, icon: Icon, brand, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div className={`px-4 py-3 ${brand.colors.secondary} border-b border-gray-200`}>
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 ${brand.colors.accent}`} />
        <span className={`font-medium ${brand.colors.accent}`}>{title}</span>
      </div>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

export const HeadInfoComponent: React.FC<{ brand: Brand; page: string }> = ({ brand, page }) => (
  <SeoComponentWrapper title="Head Info" icon={Code} brand={brand}>
    <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
      <div className="space-y-1">
        <div>&lt;<span className="text-blue-400">title</span>&gt;Apartments for sale Paris 15th | {brand.name}&lt;/<span className="text-blue-400">title</span>&gt;</div>
        <div>&lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400">name</span>=<span className="text-red-400">"description"</span> <span className="text-yellow-400">content</span>=<span className="text-red-400">"Discover our apartments for sale in the 15th arrondissement of Paris. Attractive prices, virtual tours."</span> /&gt;</div>
        <div>&lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400">name</span>=<span className="text-red-400">"robots"</span> <span className="text-yellow-400">content</span>=<span className="text-red-400">"index, follow"</span> /&gt;</div>
        <div>&lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400">property</span>=<span className="text-red-400">"og:title"</span> <span className="text-yellow-400">content</span>=<span className="text-red-400">"Apartments Paris 15th"</span> /&gt;</div>
        <div>&lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400">property</span>=<span className="text-red-400">"og:type"</span> <span className="text-yellow-400">content</span>=<span className="text-red-400">"website"</span> /&gt;</div>
        <div>&lt;<span className="text-blue-400">link</span> <span className="text-yellow-400">rel</span>=<span className="text-red-400">"canonical"</span> <span className="text-yellow-400">href</span>=<span className="text-red-400">"https://{brand.name.toLowerCase()}.com/apartments/paris-15th"</span> /&gt;</div>
      </div>
    </div>
  </SeoComponentWrapper>
);

export const BreadcrumbComponent: React.FC<{ brand: Brand }> = ({ brand }) => (
  <SeoComponentWrapper title="Breadcrumb" icon={Navigation} brand={brand}>
    <nav className="flex items-center space-x-2 text-sm">
      <a href="#" className={`${brand.colors.accent} hover:underline`}>Home</a>
      <span className="text-gray-400">/</span>
      <a href="#" className={`${brand.colors.accent} hover:underline`}>Île-de-France</a>
      <span className="text-gray-400">/</span>
      <a href="#" className={`${brand.colors.accent} hover:underline`}>Paris</a>
      <span className="text-gray-400">/</span>
      <a href="#" className={`${brand.colors.accent} hover:underline`}>15th arrondissement</a>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">Apartments</span>
    </nav>
  </SeoComponentWrapper>
);

export const SeoLinkBoxComponent: React.FC<{ brand: Brand; type: string }> = ({ brand, type }) => {
  const links = {
    geo: [
      'Apartments Paris 16th', 'Apartments Paris 14th', 'Apartments Boulogne-Billancourt',
      'Apartments Issy-les-Moulineaux', 'Apartments Vanves'
    ],
    type: [
      'Studios Paris 15th', '2-room apartments Paris 15th', '3-room apartments Paris 15th',
      '4-room apartments Paris 15th', 'Duplex Paris 15th'
    ],
    features: [
      'Apartments with balcony Paris 15th', 'Apartments with parking Paris 15th',
      'Apartments with cellar Paris 15th', 'Recent apartments Paris 15th'
    ]
  };

  return (
    <SeoComponentWrapper title="SEO LinkBox" icon={Link2} brand={brand}>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Searches by location</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {links.geo.map((link, index) => (
              <a key={index} href="#" className={`text-sm ${brand.colors.accent} hover:underline block`}>
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Searches by type</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {links.type.map((link, index) => (
              <a key={index} href="#" className={`text-sm ${brand.colors.accent} hover:underline block`}>
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Specialized searches</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {links.features.map((link, index) => (
              <a key={index} href="#" className={`text-sm ${brand.colors.accent} hover:underline block`}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </SeoComponentWrapper>
  );
};

export const H1Component: React.FC<{ brand: Brand }> = ({ brand }) => (
  <SeoComponentWrapper title="H1 Title" icon={Hash} brand={brand}>
    <div className="bg-gray-50 p-4 rounded-md">
      <h1 className={`text-2xl font-bold ${brand.colors.accent}`}>
        Apartments for sale in the 15th arrondissement of Paris
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        SEO optimized H1 tag with main keywords
      </p>
    </div>
  </SeoComponentWrapper>
);

export const ContentComponent: React.FC<{ brand: Brand }> = ({ brand }) => (
  <SeoComponentWrapper title="SEO Content" icon={FileText} brand={brand}>
    <div className="prose prose-sm max-w-none">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className={`font-semibold ${brand.colors.accent} mb-2`}>Living in the 15th arrondissement of Paris</h3>
        <p className="text-gray-700 mb-3">
          The 15th arrondissement of Paris, also called the Vaugirard arrondissement, is the most populated and one of the largest in the capital.
          Located on the left bank of the Seine, it offers a pleasant living environment with many green spaces like André-Citroën park.
        </p>
        <h4 className="font-medium text-gray-900 mb-2">Sought-after neighborhoods</h4>
        <ul className="text-gray-700 space-y-1 list-disc list-inside">
          <li>Grenelle - Modern district with Montparnasse tower</li>
          <li>Vaugirard - Family area with local shops</li>
          <li>Convention - Quiet residential area</li>
          <li>Javel - District undergoing urban transformation</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3 italic">
          SEO optimized content with local keywords and useful information
        </p>
      </div>
    </div>
  </SeoComponentWrapper>
);

export const UrlResolverComponent: React.FC<{ brand: Brand }> = ({ brand }) => (
  <SeoComponentWrapper title="URL Resolver" icon={Globe} brand={brand}>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL Pattern</label>
        <input
          type="text"
          value="/apartments/{city}/{district}/{rooms}-rooms"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Generated URL</label>
        <input
          type="text"
          value="/apartments/paris/15th-arrondissement/3-rooms"
          className={`w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm ${brand.colors.secondary}`}
          readOnly
        />
      </div>
      <div className="text-xs text-gray-600">
        <strong>Associated criteria:</strong> Paris 15th, Apartment, 3 rooms, Sale
      </div>
    </div>
  </SeoComponentWrapper>
);

export const HtmlSitemapsComponent: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="col-span-2 space-y-6">
    <SeoComponentWrapper title="HTML Sitemaps - Neighborhood Pages" icon={Globe} brand={brand}>
      <div className="space-y-6">
        {[
          {
            district: "15th Arrondissement - Grenelle",
            description: "Modern district with Montparnasse Tower and André Citroën Park",
            pricePerSqm: "€11,200/m²",
            popularType: "3-room apartments",
            schools: ["École Élémentaire Grenelle", "Collège André Citroën"],
            landmarks: ["Eiffel Tower (nearby)", "André Citroën Park", "Beaugrenelle Shopping Center"],
            transport: ["Metro Line 6 (Bir-Hakeim)", "Metro Line 8 (La Motte-Picquet)", "RER C (Champ de Mars)"],
            sports: ["Aquaboulevard", "Tennis Club de Paris", "Fitness clubs"],
            links: [
              "Apartments for sale Grenelle",
              "3-room apartments Grenelle", 
              "Studios Grenelle",
              "Houses near Grenelle"
            ]
          },
          {
            district: "15th Arrondissement - Vaugirard",
            description: "Family-friendly residential area with local shops and markets",
            pricePerSqm: "€10,800/m²",
            popularType: "2-3 room apartments",
            schools: ["École Primaire Vaugirard", "Lycée Buffon"],
            landmarks: ["Parc Georges Brassens", "Vaugirard Market", "Convention District"],
            transport: ["Metro Line 12 (Convention)", "Metro Line 6 (Pasteur)", "Bus lines 39, 70"],
            sports: ["Piscine Keller", "Gymnase Vaugirard", "Tennis courts"],
            links: [
              "Apartments for sale Vaugirard",
              "Family apartments Vaugirard",
              "2-room apartments Vaugirard",
              "Rentals Vaugirard"
            ]
          },
          {
            district: "15th Arrondissement - Javel",
            description: "District undergoing urban transformation with modern developments",
            pricePerSqm: "€9,900/m²",
            popularType: "New apartments",
            schools: ["École Javel", "Collège Camille Sée"],
            landmarks: ["Seine riverbank", "Parc André Citroën", "Pont de Grenelle"],
            transport: ["Metro Line 10 (Javel)", "RER C (Javel)", "Tramway T2"],
            sports: ["Riverside jogging paths", "Citroën Park activities", "Water sports center"],
            links: [
              "New apartments Javel",
              "Apartments with Seine view",
              "Modern developments Javel",
              "Investment properties Javel"
            ]
          }
        ].map((neighborhood, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
              <h3 className={`text-lg font-semibold ${brand.colors.accent} mb-2`}>
                {neighborhood.district}
              </h3>
              <p className="text-gray-700 mb-3">{neighborhood.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-900 mb-1">Market Data</div>
                  <div className="text-xs text-gray-600">
                    <div>Average price: <span className="font-medium">{neighborhood.pricePerSqm}</span></div>
                    <div>Most popular: <span className="font-medium">{neighborhood.popularType}</span></div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-900 mb-1">Schools</div>
                  <div className="text-xs text-gray-600">
                    {neighborhood.schools.map((school, idx) => (
                      <div key={idx}>• {school}</div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-900 mb-1">Landmarks</div>
                  <div className="text-xs text-gray-600">
                    {neighborhood.landmarks.map((landmark, idx) => (
                      <div key={idx}>• {landmark}</div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-900 mb-1">Transport</div>
                  <div className="text-xs text-gray-600">
                    {neighborhood.transport.map((transport, idx) => (
                      <div key={idx}>• {transport}</div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md md:col-span-2">
                  <div className="text-sm font-medium text-gray-900 mb-1">Sports & Recreation</div>
                  <div className="text-xs text-gray-600">
                    {neighborhood.sports.map((sport, idx) => (
                      <span key={idx} className="inline-block mr-3">• {sport}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">SEO Links</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {neighborhood.links.map((link, idx) => (
                  <a key={idx} href="#" className={`text-xs ${brand.colors.accent} hover:underline block p-2 bg-white rounded border`}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SeoComponentWrapper>
  </div>
);