import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ComparisonResponse } from '../../models/api.models';

@Component({
  selector: 'app-comparison-metrics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './comparison-metrics.component.html',
  styleUrl: './comparison-metrics.component.scss'
})
export class ComparisonMetricsComponent {
  @Input() comparisonData!: ComparisonResponse;

  get brandesTime(): number {
    return this.comparisonData?.brandes_result.execution_time_ms || 0;
  }

  get floydWarshallTime(): number {
    return this.comparisonData?.floyd_warshall_result.execution_time_ms || 0;
  }

  get speedup(): number {
    return this.comparisonData?.speedup_factor || 0;
  }

  get timeDifference(): number {
    return this.comparisonData?.time_difference_ms || 0;
  }

  get nodeCount(): number {
    return this.comparisonData?.brandes_result.node_count || 0;
  }

  get edgeCount(): number {
    return this.comparisonData?.brandes_result.edge_count || 0;
  }

  formatTime(ms: number): string {
    if (ms < 1000) {
      return `${ms.toFixed(2)} ms`;
    }
    return `${(ms / 1000).toFixed(2)} s`;
  }
}

