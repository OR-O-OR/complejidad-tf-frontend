import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopNodesTableComponent } from '../../components/top-nodes-table/top-nodes-table.component';
import { GraphPreviewComponent } from '../../components/graph-preview/graph-preview.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    NavbarComponent,
    TopNodesTableComponent,
    GraphPreviewComponent
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  exportCSV(): void {
    // Función para exportar CSV (simulación)
    console.log('Exportando CSV...');
    // Aquí iría la lógica real de exportación
  }
}

