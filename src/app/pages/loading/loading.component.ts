import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NavbarComponent
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  algorithmText: string = 'O(V³)';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simular ejecución del algoritmo y navegar después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/results']);
    }, 3000);
  }
}

