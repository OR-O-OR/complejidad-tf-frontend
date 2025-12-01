import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NodeCentrality } from '../../models/api.models';

export interface NodeTableData {
  rank: number;
  node: number;
  centrality: number;
}

@Component({
  selector: 'app-top-nodes-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './top-nodes-table.component.html',
  styleUrl: './top-nodes-table.component.scss'
})
export class TopNodesTableComponent implements OnChanges {
  @Input() nodes: NodeCentrality[] = [];
  @Input() algorithmName: string = 'Algorithm';
  @Input() algorithmColor: string = '#1976d2';
  
  dataSource: NodeTableData[] = [];
  displayedColumns: string[] = ['rank', 'node', 'centrality'];

  ngOnChanges(): void {
    if (this.nodes && this.nodes.length > 0) {
      this.dataSource = this.nodes.map((node, index) => ({
        rank: index + 1,
        node: node.node_id,
        centrality: node.centrality_score
      }));
    }
  }
}

