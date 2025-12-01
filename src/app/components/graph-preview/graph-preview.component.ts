import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Edge, Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { GraphVisualizationData } from '../../models/visualization.models';

@Component({
  selector: 'app-graph-preview',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './graph-preview.component.html',
  styleUrl: './graph-preview.component.scss'
})
export class GraphPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('networkContainer', { static: false }) networkContainer?: ElementRef;
  
  @Input() set graphData(value: GraphVisualizationData | undefined) {
    this._graphData = value;
    if (this.isViewInitialized && value) {
      console.log('GraphPreviewComponent: New graph data received, reinitializing...', value.node_count, 'nodes');
      setTimeout(() => this.initializeNetwork(), 100);
    }
  }
  get graphData(): GraphVisualizationData | undefined {
    return this._graphData;
  }
  
  @Input() loading = false;
  @Input() title = 'Visualización del Grafo';
  
  private _graphData?: GraphVisualizationData;
  private network?: Network;
  private isViewInitialized = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.isViewInitialized = true;
    if (this.graphData && this.networkContainer) {
      console.log('GraphPreviewComponent: View initialized, creating network...');
      setTimeout(() => this.initializeNetwork(), 100);
    }
  }

  ngOnDestroy() {
    if (this.network) {
      this.network.destroy();
    }
  }

  private initializeNetwork() {
    if (!this.networkContainer || !this.graphData) {
      console.log('GraphPreviewComponent: Missing container or data');
      return;
    }

    const container = this.networkContainer.nativeElement;
    
    // Check if container has dimensions
    if (!container.offsetWidth || !container.offsetHeight) {
      console.log('GraphPreviewComponent: Container has no dimensions, retrying...');
      setTimeout(() => this.initializeNetwork(), 100);
      return;
    }
    
    console.log('GraphPreviewComponent: Container size:', container.offsetWidth, 'x', container.offsetHeight);
    console.log('GraphPreviewComponent: Initializing with', this.graphData.nodes.length, 'nodes');

    // Destroy previous network
    if (this.network) {
      console.log('GraphPreviewComponent: Destroying previous network');
      this.network.destroy();
      this.network = undefined;
    }

    // Prepare data
    const nodes = new DataSet(
      this.graphData.nodes.map(node => ({
        id: node.id,
        label: String(node.label),
        color: node.color || '#97C2FC',
        size: node.size || 10,
        title: (node.centrality !== undefined && node.centrality !== null) ? 
          `Nodo ${node.label}\nCentralidad: ${node.centrality.toFixed(6)}` : 
          `Nodo ${node.label}`,
        font: { size: 12, color: '#333' }
      }))
    );

    const edges = new DataSet<Edge>(
      this.graphData.edges.map(edge => ({
        from: edge.from,
        to: edge.to,
        color: { color: '#848484', opacity: 0.5 },
        width: 1
      }))
    );

    console.log('GraphPreviewComponent: DataSets created -', nodes.length, 'nodes,', edges.length, 'edges');

    const options = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 30
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.5
        }
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 100
        },
        barnesHut: {
          gravitationalConstant: -2000,
          springLength: 95,
          springConstant: 0.04
        }
      },
      interaction: {
        hover: true,
        zoomView: true,
        dragView: true
      }
    };

    try {
      this.network = new Network(container, { nodes, edges }, options);
      console.log('GraphPreviewComponent: Network created successfully!');

      // Fit to view after stabilization
      this.network.once('stabilizationIterationsDone', () => {
        console.log('GraphPreviewComponent: Stabilized, fitting to view');
        if (this.network) {
          this.network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
          this.network.setOptions({ physics: { enabled: false } });
        }
      });

      // Fallback fit after 2 seconds
      setTimeout(() => {
        if (this.network) {
          console.log('GraphPreviewComponent: Fallback fit');
          this.network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
        }
      }, 2000);

    } catch (error) {
      console.error('GraphPreviewComponent: Error creating network:', error);
    }
  }

  centerGraph() {
    if (this.network) {
      console.log('GraphPreviewComponent: Centering graph');
      this.network.fit({ animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
    }
  }

  resetZoom() {
    if (this.network) {
      console.log('GraphPreviewComponent: Resetting zoom');
      this.network.moveTo({ scale: 1.0, animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
    }
  }
}
