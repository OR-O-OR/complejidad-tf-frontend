import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComparisonResponse, GraphInfoResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  // State management for comparison results
  private comparisonData = new BehaviorSubject<ComparisonResponse | null>(null);
  public comparisonData$ = this.comparisonData.asObservable();

  // State management for graph info
  private graphInfo = new BehaviorSubject<GraphInfoResponse | null>(null);
  public graphInfo$ = this.graphInfo.asObservable();

  // Loading state
  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  // Error state
  private error = new BehaviorSubject<string | null>(null);
  public error$ = this.error.asObservable();

  /**
   * Set comparison results
   */
  setComparisonData(data: ComparisonResponse): void {
    this.comparisonData.next(data);
    this.error.next(null);
  }

  /**
   * Get current comparison data
   */
  getComparisonData(): ComparisonResponse | null {
    return this.comparisonData.value;
  }

  /**
   * Set graph info
   */
  setGraphInfo(info: GraphInfoResponse): void {
    this.graphInfo.next(info);
  }

  /**
   * Get current graph info
   */
  getGraphInfo(): GraphInfoResponse | null {
    return this.graphInfo.value;
  }

  /**
   * Set loading state
   */
  setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
  }

  /**
   * Set error message
   */
  setError(errorMessage: string | null): void {
    this.error.next(errorMessage);
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.comparisonData.next(null);
    this.graphInfo.next(null);
    this.loading.next(false);
    this.error.next(null);
  }

  /**
   * Check if comparison data exists
   */
  hasComparisonData(): boolean {
    return this.comparisonData.value !== null;
  }
}

