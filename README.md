# Betweenness Centrality Frontend

Frontend Angular application for comparing Brandes and Floyd-Warshall algorithms for betweenness centrality calculation.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:8000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at **http://localhost:4200**

## 📱 Application Flow

1. **Dashboard** (`/`) - View dataset information and start comparison
2. **Loading** (`/loading`) - Algorithms execute in backend
3. **Results** (`/results`) - View comparison results, metrics, and visualizations

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── comparison-metrics/
│   │   ├── performance-chart/
│   │   ├── top-nodes-table/
│   │   ├── graph-preview/
│   │   └── navbar/
│   ├── pages/              # Page components
│   │   ├── upload-dataset/ (Dashboard)
│   │   ├── loading/
│   │   └── results/
│   ├── services/           # Services
│   │   ├── betweenness-api.service.ts
│   │   └── graph.service.ts
│   ├── models/             # TypeScript interfaces
│   │   └── api.models.ts
│   └── app.routes.ts       # Route configuration
├── environments/           # Environment configs
└── styles.scss            # Global styles
```

## 🔌 API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000/api`

**Main endpoints used:**
- `GET /api/betweenness/graph/info` - Get graph metadata
- `POST /api/betweenness/compare` - Run both algorithms

## 🎨 Features

- ✅ Real-time algorithm comparison
- ✅ Performance metrics visualization
- ✅ Top K nodes display
- ✅ Graph visualization (static image)
- ✅ CSV export functionality
- ✅ Responsive design
- ✅ Error handling with retry

## 🛠️ Development

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Technologies

- **Angular 20** - Framework
- **Angular Material** - UI Components
- **RxJS** - Reactive programming
- **TypeScript** - Type safety

## 🔧 Configuration

Update API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  apiPrefix: '/api'
};
```

## 📝 Notes

- Ensure backend is running before starting frontend
- Default dataset is pre-loaded in backend (SNAP ca-GrQc)
- Results are cached in GraphService for navigation

---

**Part of:** Betweenness Centrality Comparison Project
