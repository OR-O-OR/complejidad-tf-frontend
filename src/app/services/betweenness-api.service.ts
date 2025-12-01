import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  ComparisonResponse,
  BetweennessResponse,
  GraphInfoResponse
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class BetweennessApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}${environment.apiPrefix}`;

  /**
   * Compare both algorithms (Brandes and Floyd-Warshall)
   * Calculates centrality for all nodes and returns top 10 for display
   */
  compareAlgorithms(): Observable<ComparisonResponse> {
    const url = `${this.baseUrl}/betweenness/compare`;
    return this.http.post<ComparisonResponse>(url, {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Execute Brandes algorithm only
   * Calculates centrality for all nodes and returns top 10 for display
   */
  getBrandes(): Observable<BetweennessResponse> {
    const url = `${this.baseUrl}/betweenness/brandes`;
    return this.http.post<BetweennessResponse>(url, {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Execute Floyd-Warshall algorithm only
   * Calculates centrality for all nodes and returns top 10 for display
   */
  getFloydWarshall(): Observable<BetweennessResponse> {
    const url = `${this.baseUrl}/betweenness/floyd-warshall`;
    return this.http.post<BetweennessResponse>(url, {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get information about the loaded graph
   */
  getGraphInfo(): Observable<GraphInfoResponse> {
    const url = `${this.baseUrl}/betweenness/graph/info`;
    return this.http.get<GraphInfoResponse>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Check if the backend API is available
   */
  checkHealth(): Observable<any> {
    const url = `${environment.apiUrl}/health`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:8000';
      } else if (error.status === 404) {
        errorMessage = 'Endpoint no encontrado';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

