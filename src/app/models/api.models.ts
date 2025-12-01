/**
 * API Models - TypeScript interfaces matching backend Pydantic models
 */

export interface NodeCentrality {
  node_id: number;
  centrality_score: number;
}

export interface BetweennessResponse {
  algorithm_name: string;
  execution_time_ms: number;
  node_count: number;
  edge_count: number;
  centrality_scores: NodeCentrality[];
  top_k_nodes: NodeCentrality[];
}

export interface ComparisonResponse {
  brandes_result: BetweennessResponse;
  floyd_warshall_result: BetweennessResponse;
  speedup_factor: number;
  time_difference_ms: number;
  complexity_comparison: {
    brandes: string;
    floyd_warshall: string;
  };
}

export interface GraphInfoResponse {
  node_count: number;
  edge_count: number;
  is_connected: boolean;
  density: number;
  average_degree: number;
  source: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  detail?: string;
}

