import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GraphVisualizationService } from '../../services/graph-visualization.service';
import { DatasetInfo } from '../../models/visualization.models';

@Component({
  selector: 'app-dataset-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dataset-selector.component.html',
  styleUrl: './dataset-selector.component.scss'
})
export class DatasetSelectorComponent implements OnInit {
  private vizService = inject(GraphVisualizationService);

  datasets: DatasetInfo[] = [];
  selectedDataset: DatasetInfo | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadDatasets();
  }

  loadDatasets() {
    this.loading = true;
    this.error = null;

    this.vizService.getAvailableDatasets().subscribe({
      next: (response) => {
        this.datasets = response.datasets;
        // Auto-select the first available dataset
        const available = this.datasets.find(d => d.available);
        if (available) {
          this.selectedDataset = available;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}

