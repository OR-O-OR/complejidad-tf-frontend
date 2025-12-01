import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './performance-chart.component.html',
  styleUrl: './performance-chart.component.scss'
})
export class PerformanceChartComponent implements OnInit {
  @Input() brandesTime: number = 0;
  @Input() floydWarshallTime: number = 0;

  brandesHeight: number = 0;
  floydWarshallHeight: number = 0;

  ngOnInit() {
    this.calculateHeights();
  }

  calculateHeights() {
    const maxTime = Math.max(this.brandesTime, this.floydWarshallTime);
    
    if (maxTime > 0) {
      this.brandesHeight = (this.brandesTime / maxTime) * 100;
      this.floydWarshallHeight = (this.floydWarshallTime / maxTime) * 100;
    }
  }

  formatTime(ms: number): string {
    if (ms < 1000) {
      return `${ms.toFixed(2)} ms`;
    }
    return `${(ms / 1000).toFixed(2)} s`;
  }
}

