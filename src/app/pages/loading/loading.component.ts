import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BetweennessApiService } from '../../services/betweenness-api.service';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  private apiService = inject(BetweennessApiService);
  private graphService = inject(GraphService);
  private router = inject(Router);

  status = 'Ejecutando algoritmos...';
  error: string | null = null;

  ngOnInit(): void {
    this.executeComparison();
  }

  executeComparison(): void {
    this.error = null;
    this.status = 'Ejecutando algoritmos de centralidad...';
    this.graphService.setLoading(true);

    this.apiService.compareAlgorithms().subscribe({
      next: (result) => {
        console.log('Comparison completed:', result);
        this.status = '¡Comparación completada!';
        this.graphService.setComparisonData(result);
        this.graphService.setLoading(false);
        
        // Navigate to results after a brief delay
        setTimeout(() => {
          this.router.navigate(['/results']);
        }, 500);
      },
      error: (err) => {
        console.error('Error during comparison:', err);
        this.error = err.message;
        this.status = 'Error al ejecutar la comparación';
        this.graphService.setLoading(false);
        this.graphService.setError(err.message);
      }
    });
  }

  retry(): void {
    this.executeComparison();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

