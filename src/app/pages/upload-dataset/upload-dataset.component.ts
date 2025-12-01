import { Component, OnInit, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatasetSelectorComponent } from '../../components/dataset-selector/dataset-selector.component';
import { SubgraphConfigComponent } from '../../components/subgraph-config/subgraph-config.component';
import { GraphPreviewComponent } from '../../components/graph-preview/graph-preview.component';
import { BetweennessApiService } from '../../services/betweenness-api.service';
import { GraphVisualizationService } from '../../services/graph-visualization.service';
import { GraphService } from '../../services/graph.service';
import { GraphInfoResponse } from '../../models/api.models';
import { GraphVisualizationData } from '../../models/visualization.models';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-upload-dataset',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NavbarComponent,
    DatasetSelectorComponent,
    SubgraphConfigComponent,
    GraphPreviewComponent
  ],
  templateUrl: './upload-dataset.component.html',
  styleUrl: './upload-dataset.component.scss'
})
export class UploadDatasetComponent implements OnInit, OnDestroy {
  private apiService = inject(BetweennessApiService);
  private vizService = inject(GraphVisualizationService);
  private graphService = inject(GraphService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  graphInfo: GraphInfoResponse | null = null;
  graphVizData: GraphVisualizationData | null = null;
  loading = false;
  loadingViz = false;
  error: string | null = null;
  
  private subscriptions: Subscription[] = [];
  private loadingTimeout: any = null;

  ngOnInit() {
    this.loadGraphInfo();
    this.loadGraphVisualization();
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  loadGraphInfo() {
    this.loading = true;
    this.error = null;

    console.log('Loading graph info from API...');
    
    // Safety timeout: if loading takes more than 10 seconds, show error
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    this.loadingTimeout = setTimeout(() => {
      if (this.loading) {
        console.error('Loading timeout exceeded');
        this.error = 'Tiempo de espera excedido. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    }, 10000);

    const sub = this.apiService.getGraphInfo().subscribe({
      next: (info) => {
        console.log('Graph info loaded successfully:', info);
        this.graphInfo = info;
        this.graphService.setGraphInfo(info);
        this.loading = false;
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
        console.log('Loading state set to false');
      },
      error: (err) => {
        console.error('Error loading graph info:', err);
        console.error('Error details:', {
          message: err.message,
          status: err.status,
          error: err.error
        });
        this.error = err.message || 'Error al cargar información del grafo';
        this.loading = false;
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
        console.log('Loading state set to false after error');
      }
    });
    
    this.subscriptions.push(sub);
  }

  loadGraphVisualization() {
    this.loadingViz = true;
    
    console.log('Loading graph visualization from API...');
    
    // Clear previous data to trigger change detection
    this.graphVizData = null;

    const sub = this.vizService.getGraphVisualization().subscribe({
      next: (data) => {
        console.log('Graph visualization loaded successfully:', data);
        console.log('Nodes:', data.nodes.length, 'Edges:', data.edges.length);
        
        // Create new object to ensure change detection
        this.graphVizData = { ...data };
        this.loadingViz = false;
        
        // Force change detection to update the graph visualization
        this.cdr.detectChanges();
        console.log('Visualization loading state set to false and change detection triggered');
      },
      error: (err) => {
        console.error('Error loading graph visualization:', err);
        console.error('Visualization error details:', {
          message: err.message,
          status: err.status,
          error: err.error
        });
        this.loadingViz = false;
        this.cdr.detectChanges();
        console.log('Visualization loading state set to false after error');
      }
    });
    
    this.subscriptions.push(sub);
  }

  onConfigUpdated() {
    console.log('Config updated, reloading graph data...');
    // Clear error state
    this.error = null;
    
    // Reload graph info WITHOUT showing full-page loading
    this.reloadGraphInfoSilently();
    
    // Reload visualization separately
    this.loadGraphVisualization();
  }

  startComparison() {
    this.router.navigate(['/loading']);
  }

  reloadGraphInfoSilently() {
    // Reload graph info without showing the full-page loading screen
    console.log('Reloading graph info silently...');

    const sub = this.apiService.getGraphInfo().subscribe({
      next: (info) => {
        console.log('Graph info reloaded successfully:', info);
        this.graphInfo = info;
        this.graphService.setGraphInfo(info);
        // Force change detection to update the UI
        this.cdr.detectChanges();
        console.log('Change detection triggered');
      },
      error: (err) => {
        console.error('Error reloading graph info:', err);
        this.error = err.message || 'Error al cargar información del grafo';
        this.cdr.detectChanges();
      }
    });
    
    this.subscriptions.push(sub);
  }

  retry() {
    this.loadGraphInfo();
    this.loadGraphVisualization();
  }
}

