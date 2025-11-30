import { Routes } from '@angular/router';
import { UploadDatasetComponent } from './pages/upload-dataset/upload-dataset.component';
import { ConfigAlgorithmComponent } from './pages/config-algorithm/config-algorithm.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { ResultsComponent } from './pages/results/results.component';
import { GraphViewerComponent } from './pages/graph-viewer/graph-viewer.component';

export const routes: Routes = [
  { path: '', component: UploadDatasetComponent },
  { path: 'config', component: ConfigAlgorithmComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'graph', component: GraphViewerComponent },
  { path: '**', redirectTo: '' }
];
