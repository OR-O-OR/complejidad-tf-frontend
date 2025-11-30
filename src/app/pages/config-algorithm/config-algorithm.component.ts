import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-config-algorithm',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    NavbarComponent
  ],
  templateUrl: './config-algorithm.component.html',
  styleUrl: './config-algorithm.component.scss'
})
export class ConfigAlgorithmComponent {
  algorithms = [
    {
      name: 'Floyd-Warshall',
      complexity: 'O(V³)',
      description: 'Algoritmo de Programación Dinámica que resuelve el problema de Camino Mínimo en Todos los Pares (APSP). Fundamental para el cálculo de la Centralidad de Intermediación.'
    },
    {
      name: 'Bellman-Ford',
      complexity: 'O(VE)',
      description: 'Algoritmo que resuelve el Camino Mínimo desde una Fuente Única (SSSP). Permite el manejo de aristas con pesos negativos.'
    },
    {
      name: 'BFS',
      complexity: 'O(V+E)',
      description: 'Búsqueda en Amplitud para recorrido y búsqueda en grafos. Representa el límite inferior de eficiencia para el recorrido de un grafo.'
    }
  ];
}

