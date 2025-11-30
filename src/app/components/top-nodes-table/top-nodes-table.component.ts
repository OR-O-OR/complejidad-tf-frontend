import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface NodeData {
  rank: number;
  node: string;
  centrality: number;
}

@Component({
  selector: 'app-top-nodes-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './top-nodes-table.component.html',
  styleUrl: './top-nodes-table.component.scss'
})
export class TopNodesTableComponent implements OnInit {
  @Input() dataSource: NodeData[] = [];
  
  displayedColumns: string[] = ['rank', 'node', 'centrality'];

  // Datos de ejemplo para demostración
  ngOnInit(): void {
    if (this.dataSource.length === 0) {
      this.dataSource = [
        { rank: 1, node: 'Nodo 1', centrality: 0.014 },
        { rank: 2, node: 'Nodo 2', centrality: 0.012 },
        { rank: 3, node: 'Nodo 3', centrality: 0.010 },
        { rank: 4, node: 'Nodo 4', centrality: 0.008 },
        { rank: 5, node: 'Nodo 5', centrality: 0.006 },
        { rank: 6, node: 'Nodo 6', centrality: 0.005 },
        { rank: 7, node: 'Nodo 7', centrality: 0.004 },
        { rank: 8, node: 'Nodo 8', centrality: 0.003 },
        { rank: 9, node: 'Nodo 9', centrality: 0.002 },
        { rank: 10, node: 'Nodo 10', centrality: 0.001 }
      ];
    }
  }
}

