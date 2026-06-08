## CompIntel
India's Compensation Intelligence Platform, compare real salary data across top tech companies by role, level, and location.

## Features
- Real salary data with base, bonus & stock breakdown
- Compare up to 3 companies side by side
- Individual company pages with detailed stats
- Filter by role, level, location & company
- Visual bar & radar charts
- Covers 10+ top Indian tech companies

## Tech Stack
- **Next.js** — Framework
- **React** — UI Library
- **TypeScript** — Language
- **TailwindCSS** — Styling
- **Recharts** — Charts & Visualizations

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Deployment
- Vercel

## Architecture
User → Next.js Frontend → Static Data Layer → Recharts Visualization → UI Render

Role/Level/Location Filters → Filter Logic → Filtered Results → Table & Charts

## How It Works
1. User visits CompIntel and applies filters (role, level, location, company)
2. Filter logic processes the static salary dataset
3. Matching results are displayed in the salary table
4. Charts & radar graphs render the compensation breakdown
5. User can compare up to 3 companies side by side

## Live Demo 
 https://comp-intel-three.vercel.app

## Author 
Srishti Sachan
