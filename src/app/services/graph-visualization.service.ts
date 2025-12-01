import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  GraphVisualizationData,
  DatasetListResponse,
  SubgraphConfig,
  SubgraphConfigResponse,
  SubgraphConfigCurrent
} from '../models/visualization.models';

@Injectable({
  providedIn: 'root'
})
export class GraphVisualizationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}${environment.apiPrefix}`;

  /**
   * Get list of available datasets
   */
  getAvailableDatasets(): Observable<DatasetListResponse> {
    const url = `${this.baseUrl}/datasets`;
    return this.http.get<DatasetListResponse>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get basic graph visualization data (without centrality)
   */
  getGraphVisualization(): Observable<GraphVisualizationData> {
    const url = `${this.baseUrl}/betweenness/graph/visualization`;
    return this.http.get<GraphVisualizationData>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get graph visualization with centrality scores
   * @param algorithm 'brandes' or 'floyd-warshall'
   */
  getGraphWithCentrality(algorithm: string): Observable<GraphVisualizationData> {
    const url = `${this.baseUrl}/betweenness/graph/visualization-with-centrality?algorithm=${algorithm}`;
    return this.http.get<GraphVisualizationData>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Update subgraph configuration
   */
  updateSubgraphConfig(config: SubgraphConfig): Observable<SubgraphConfigResponse> {
    const url = `${this.baseUrl}/datasets/config/subgraph`;
    return this.http.post<SubgraphConfigResponse>(url, config)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get current subgraph configuration
   */
  getCurrentConfig(): Observable<SubgraphConfigCurrent> {
    const url = `${this.baseUrl}/datasets/config/subgraph`;
    return this.http.get<SubgraphConfigCurrent>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error del servidor: ${error.status}`;
      }
    }

    console.error('GraphVisualizationService Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

