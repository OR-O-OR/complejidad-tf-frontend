import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GraphVisualizationService } from '../../services/graph-visualization.service';
import { SubgraphConfig } from '../../models/visualization.models';

@Component({
  selector: 'app-subgraph-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './subgraph-config.component.html',
  styleUrl: './subgraph-config.component.scss'
})
export class SubgraphConfigComponent implements OnInit {
  private vizService = inject(GraphVisualizationService);

  @Output() configUpdated = new EventEmitter<void>();

  minNodes: number = 500;
  maxNodes: number = 1000;
  currentNodeCount: number = 0;
  currentEdgeCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  ngOnInit() {
    this.loadCurrentConfig();
  }

  loadCurrentConfig() {
    this.vizService.getCurrentConfig().subscribe({
      next: (config) => {
        this.minNodes = config.min_nodes;
        this.maxNodes = config.max_nodes;
        this.currentNodeCount = config.current_node_count;
        this.currentEdgeCount = config.current_edge_count;
      },
      error: (err) => {
        console.error('Error loading config:', err);
      }
    });
  }

  applyConfig() {
    if (this.minNodes >= this.maxNodes) {
      this.error = 'El mínimo debe ser menor que el máximo';
      return;
    }

    if (this.minNodes < 100 || this.maxNodes > 5000) {
      this.error = 'Rango válido: 100-5000 nodos';
      return;
    }

    this.loading = true;
    this.error = null;

    const config: SubgraphConfig = {
      min_nodes: this.minNodes,
      max_nodes: this.maxNodes
    };

    console.log('Applying config:', config);

    this.vizService.updateSubgraphConfig(config).subscribe({
      next: (response) => {
        console.log('Config updated successfully:', response);
        this.currentNodeCount = response.new_node_count;
        this.currentEdgeCount = response.new_edge_count;
        this.loading = false;
        this.configUpdated.emit();
      },
      error: (err) => {
        console.error('Error updating config:', err);
        this.error = err.message || 'Error al actualizar configuración';
        this.loading = false;
      }
    });
  }

  resetDefaults() {
    this.minNodes = 500;
    this.maxNodes = 1000;
    this.error = null;
  }
}

