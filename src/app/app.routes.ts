import { Routes } from '@angular/router';
import { UploadDatasetComponent } from './pages/upload-dataset/upload-dataset.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { ResultsComponent } from './pages/results/results.component';

export const routes: Routes = [
  { path: '', component: UploadDatasetComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];
