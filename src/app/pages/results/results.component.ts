import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopNodesTableComponent } from '../../components/top-nodes-table/top-nodes-table.component';
import { GraphPreviewComponent } from '../../components/graph-preview/graph-preview.component';
import { GraphLegendComponent } from '../../components/graph-legend/graph-legend.component';
import { ComparisonMetricsComponent } from '../../components/comparison-metrics/comparison-metrics.component';
import { PerformanceChartComponent } from '../../components/performance-chart/performance-chart.component';
import { GraphService } from '../../services/graph.service';
import { GraphVisualizationService } from '../../services/graph-visualization.service';
import { ComparisonResponse } from '../../models/api.models';
import { GraphVisualizationData } from '../../models/visualization.models';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NavbarComponent,
    TopNodesTableComponent,
    GraphPreviewComponent,
    GraphLegendComponent,
    ComparisonMetricsComponent,
    PerformanceChartComponent
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  private graphService = inject(GraphService);
  private vizService = inject(GraphVisualizationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  comparisonData: ComparisonResponse | null = null;
  brandesVizData: GraphVisualizationData | null = null;
  floydVizData: GraphVisualizationData | null = null;
  loadingBrandes = false;
  loadingFloyd = false;

  ngOnInit() {
    this.comparisonData = this.graphService.getComparisonData();
    
    if (!this.comparisonData) {
      // If no data, redirect to home
      this.router.navigate(['/']);
      return;
    }

    // Load visualizations with centrality after view initialization
    setTimeout(() => {
      this.loadCentralityVisualizations();
    }, 0);
  }

  loadCentralityVisualizations() {
    // Load Brandes visualization
    this.loadingBrandes = true;
    this.vizService.getGraphWithCentrality('brandes').subscribe({
      next: (data) => {
        console.log('Brandes visualization data:', data);
        this.brandesVizData = data;
        this.loadingBrandes = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading Brandes visualization:', err);
        this.loadingBrandes = false;
        this.cdr.detectChanges();
      }
    });

    // Load Floyd-Warshall visualization
    this.loadingFloyd = true;
    this.vizService.getGraphWithCentrality('floyd-warshall').subscribe({
      next: (data) => {
        console.log('Floyd-Warshall visualization data:', data);
        this.floydVizData = data;
        this.loadingFloyd = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading Floyd-Warshall visualization:', err);
        this.loadingFloyd = false;
        this.cdr.detectChanges();
      }
    });
  }

  exportCSV(): void {
    if (!this.comparisonData) return;

    const csv = this.generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'betweenness_comparison.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private generateCSV(): string {
    if (!this.comparisonData) return '';

    const lines: string[] = [];
    
    // Header
    lines.push('Algorithm,Node ID,Centrality Score,Rank');
    
    // Brandes data
    this.comparisonData.brandes_result.top_k_nodes.forEach((node, index) => {
      lines.push(`Brandes,${node.node_id},${node.centrality_score},${index + 1}`);
    });
    
    // Floyd-Warshall data
    this.comparisonData.floyd_warshall_result.top_k_nodes.forEach((node, index) => {
      lines.push(`Floyd-Warshall,${node.node_id},${node.centrality_score},${index + 1}`);
    });
    
    // Performance metrics
    lines.push('');
    lines.push('Performance Metrics');
    lines.push(`Brandes Time (ms),${this.comparisonData.brandes_result.execution_time_ms}`);
    lines.push(`Floyd-Warshall Time (ms),${this.comparisonData.floyd_warshall_result.execution_time_ms}`);
    lines.push(`Speedup Factor,${this.comparisonData.speedup_factor}`);
    lines.push(`Time Difference (ms),${this.comparisonData.time_difference_ms}`);
    
    return lines.join('\n');
  }

  newComparison(): void {
    this.graphService.clear();
    this.router.navigate(['/']);
  }
}

