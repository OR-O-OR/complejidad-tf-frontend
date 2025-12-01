import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-graph-legend',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './graph-legend.component.html',
  styleUrl: './graph-legend.component.scss'
})
export class GraphLegendComponent {
  @Input() minCentrality: number = 0;
  @Input() maxCentrality: number = 1;
  @Input() algorithmName: string = '';

  get centralityRange(): string {
    return `${this.minCentrality.toFixed(6)} - ${this.maxCentrality.toFixed(6)}`;
  }
}

