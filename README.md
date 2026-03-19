# AVIV SEO Toolbox

A real estate SEO context management application for optimizing search engine results pages (SERPs) across multiple brands. Manage search criteria, SEO content, and link box configurations for real estate property listings.

## 📋 Overview

**AVIV SEO Toolbox** is a centralized management system for SERP (Search Engine Results Page) contexts in the real estate domain. It enables:

- **Multi-brand support** — Manage contexts across 3 real estate brands (SL, LI, IWT) with distinct branding
- **Context-based optimization** — Define detailed search criteria and SEO content for property search scenarios
- **SEO content management** — Configure 11 SEO text variants per context (titles, meta descriptions, headers)
- **Link box clusters** — Define and manage relationships between related search contexts
- **URL pattern management** — Generate and preview both White Label and Legacy URL formats
- **Advanced filtering** — Filter contexts using 30+ tag-based criteria with autocomplete suggestions

## 🏗️ Architecture

### Data Model
```
Brand (SL, LI, IWT)
  └─ Context (e.g., "Apartments in Paris")
      ├─ Search Criteria (25+ fields: rooms, price, features, etc.)
      ├─ SEO Content (11 text variants for titles, headers, descriptions)
      └─ Link Box Clusters (relationships to other contexts)
```

### Data Flow
```
CSV Files (SerpContext, SerpTextConfig, SerpSearchQueries, SeoLinkBoxClusters)
    ↓
CSV Parser (csvParser.ts) - Parse and merge data
    ↓
React State (ContextManagement.tsx) - Load and manage parsed data
    ↓
UI Components
  - ContextList - Filter and browse contexts
  - ContextDetailPage - View/edit detailed context information
```

### Components

| Component | Purpose |
|-----------|---------|
| **App** | Root container managing brand selection and layout |
| **Sidebar** | Fixed left navigation with app branding |
| **TopBrandMenu** | Brand switcher (SL, LI, IWT) |
| **ContextManagement** | Data orchestration and CSV parsing |
| **ContextList** | Searchable, filterable context listing page |
| **ContextDetailPage** | Detailed view of a single context |

## ✨ Key Features

### 1. Multi-Brand Context Management
- Switch between 3 brands instantly
- Each brand has its own color scheme and localization
- Separate CSV data per brand

### 2. Advanced Filtering System
Filter contexts by:
- **Hierarchy:** Alias, Level, Indexation status
- **Estate Types:** Distribution type, Estate type, Sub-type
- **Numeric Criteria:** Room count, bedrooms, price range
- **Features:** Furnished, build states, locations in building
- **Special Fields:** Energy certificate, goodwill sales, project types
- **URL Patterns:** Search for URL template suggestions

### 3. Context Details
View complete configuration:
- Search query parameters (25+ fields)
- SEO text variants (11 text fields)
- Link box relationships
- URL pattern examples

### 4. Tag-Based Auto-Complete
Smart search suggestions as you type:
- Shows available tag values
- Suggests URL templates for `/` prefix
- Separates regular tags from alias tags

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Development server (hot reload on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📊 Data Structure

Each brand folder contains 4 CSV files:

### SerpContext.csv
Core context definitions:
- `id` - Unique context identifier
- `alias` - Human-readable context name
- `distributionType` - Type of real estate distribution (e.g., "For Sale")
- `estateType` - Estate category (e.g., "Apartment")
- `estateSubType` - Specific estate subtype
- `numberOfRooms`, `numberOfBedrooms`, `price`, `feature` - Search criteria
- `openedLevels` - Geographic hierarchy levels (Country, Region, Province, Municipality, Borough, Neighborhood)

### SerpTextConfig.csv
SEO text content (11 variants per context):
- `titleSingular` / `titlePlural` - Page title variants
- `headerSingular` / `headerPlural` - Page header text
- `metaDescSingular` / `metaDescPlural` - Meta descriptions
- `linkText` - Link anchor text
- `breadcrumbLinkText` - Breadcrumb link text
- `linkboxLinkText` / `topLinkboxLinkText` - Link box text variants

### SerpSearchQueries.csv
Detailed search criteria (25+ fields):
- Count ranges: `numberOfRoomsMin/Max`, `numberOfBedroomsMin/Max`
- Price filters: `priceMin/Max`
- Building info: `buildStates`, `locationsInBuildingIncluded/Excluded`, `yearOfConstructionMin/Max`
- Special: `furnished`, `energyCertificateClass`, `projectTypes`, `pagingOrder`

### SeoLinkBoxClusters.csv
Link box relationship definitions:
- `currentContextIds` - Contexts that display this cluster
- `targetedContextIds` - Target contexts this cluster links to
- `clusterCode` - Cluster identifier
- `order` - Display order

## 🛠️ Usage Examples

### Example 1: Filter Apartments in Paris
1. Select brand "LI" from top menu
2. In the filter box, type `apartment` → suggests "Apartment" tag
3. Click to add tag
4. Results show all apartment contexts for LI brand

### Example 2: Filter by Price Range
1. Type `priceMin:500` → adds "PriceMin:500k" filter
2. Additionally type `priceMax:1000` → adds "PriceMax:1000k" filter
3. Contexts are filtered to match both criteria (AND logic)

### Example 3: View Context Details
1. Click any context in the list
2. View all 25+ search criteria, 11 SEO text variants
3. See related link box clusters
4. View URL pattern examples (WL and Legacy formats)
5. Use browser back or "Back" button to return to list

### Example 4: URL Template Search
1. Type `/` in filter box
2. See suggestions for WL URL: `/recherche/{dist}/{estate}/{geo}`
3. See Legacy URL: `/immobilier/{dist}/bien-{estate}/{geo}`

## 🗺️ Navigation

```
App Root
├─ Sidebar (Navigation panel)
├─ TopBrandMenu (Brand selector SL/LI/IWT)
└─ Main Content
   ├─ ContextList (if no context selected)
   │  └─ Search & Filter Contexts
   └─ ContextDetailPage (if context selected)
      └─ Back Button → Return to ContextList
```

## 📈 MVP Development Phases

### Phase 1: ✅ Read-Only Implementation
- Load CSV data from local files
- Parse and merge contexts with SEO text configurations
- Display contexts in searchable, filterable list
- Show detailed context information
- **Status:** Current implementation

### Phase 2: 🔄 Edit Context Details (Planned)
- Add edit mode to ContextDetailPage
- Modify SEO text variants (11 fields)
- Modify search criteria
- Save changes by rewriting CSV files
- **Timeline:** Next phase

### Phase 3: ➕ Add New Contexts (Planned)
- Add create mode to ContextList page
- Define new context with all required fields
- Generate new context with unique ID
- Save to CSV files
- **Timeline:** Final phase

## 🔄 Data Evolution: Local CSV → S3 Bucket

**Current State (MVP Phase 1):**
- CSV files bundled in `/src/data/{brand}/` directories
- Data loaded at build time via Vite's `?raw` import
- Read-only operation

**Future State (Post-MVP):**
- CSV files stored in AWS S3 bucket
- Loaded dynamically at runtime (not bundled)
- Enables:
  - **Simultaneous consumption** by both SEO API and Toolbox
  - **Single source of truth** for all real estate context data
  - **Scalability** for large datasets
  - **Real-time updates** without rebuilding application

**Implementation Strategy:**
1. Replace Vite's `?raw` imports with S3 API calls
2. Add AWS SDK for S3 file operations
3. Implement runtime CSV parsing (instead of build-time)
4. Update save operations to write back to S3
5. Add caching strategy for performance

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Icons:** Lucide React
- **Colors:** Brand-specific color schemes (SL: red, LI: blue, IWT: yellow)
- **Responsive:** Mobile-friendly layout with fixed sidebar and header

## 📝 Localization

Translations available in `src/i18n/translations.ts`:
- Currently supports English (`en`) locale
- All UI strings are keyed and translatable
- Easy to extend for additional languages

## 🔍 Filtering & Tag System

The tag-based filtering supports multiple criteria with AND logic:

**Available Tag Categories:**
- **Alias tags:** Filter by context alias
- **Level tags:** Country, Region, Province, Municipality, Borough, Neighborhood
- **Estate tags:** Distribution type, Estate type
- **Numeric tags:** Rooms, bedrooms, price, construction year
- **Feature tags:** Build states, locations, furnished, energy class
- **Business tags:** Classified business type, goodwill sales
- **URL tags:** Triggers `/` prefix for URL template suggestions

## 🧠 Technical Details

### Technology Stack
- React 18 with TypeScript
- Vite (bundler)
- Tailwind CSS (styling)
- Lucide React (icons)

### Key Libraries & Patterns
- `useMemo` - Expensive operation optimization (CSV parsing, filtering)
- `useRef` - Scroll position preservation, DOM references
- `history.pushState` - Browser back button support
- CSV parsing via simple string splitting (lightweight, no dependencies)

### Performance Considerations
- CSV files parsed once on component mount
- Memoized filter results
- Scroll position preserved during navigation
- Efficient tag-based filtering with Map lookups

## 📂 Project Structure

```
src/
├── components/
│   ├── App.tsx                    # Root component
│   ├── Sidebar.tsx                # Left navigation
│   ├── TopBrandMenu.tsx           # Brand switcher
│   ├── ContextManagement.tsx      # Data orchestration
│   ├── ContextList.tsx            # Context listing/filtering
│   └── ContextDetailPage.tsx      # Context details view
├── data/
│   ├── brands.ts                  # Brand definitions
│   ├── csvParser.ts               # CSV parsing logic
│   ├── sl/, li/, iwt/             # Brand-specific CSV files
│   │   ├── SerpContext.csv
│   │   ├── SerpTextConfig.csv
│   │   ├── SerpSearchQueries.csv
│   │   └── SeoLinkBoxClusters.csv
│   └── contexts.ts                # Context data utilities
├── i18n/
│   └── translations.ts            # UI translations
├── utils/
│   └── helpers.ts                 # Utility functions
├── App.tsx                        # App entry point
├── main.tsx                       # React DOM render
└── index.css                      # Global styles
```

## 🚀 Future Enhancements

- [ ] Edit context details (Phase 2)
- [ ] Create new contexts (Phase 3)
- [ ] Migrate CSV data to S3 bucket
- [ ] Add data validation and error handling
- [ ] Implement context versioning
- [ ] Add bulk operations (import/export)
- [ ] Database integration for persistence
- [ ] Role-based access control (admin/editor/viewer)
- [ ] Activity logging and audit trail
- [ ] Advanced search (full-text, regex)

## 📧 Support

For issues or questions, please contact the AVIV team or create an issue in the repository.
