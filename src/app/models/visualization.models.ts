/**
 * Models for graph visualization
 */

export interface VisualizationNode {
  id: number;
  label: string;
  centrality?: number;
  color?: string;
  size?: number;
}

export interface VisualizationEdge {
  from: number;
  to: number;
}

export interface GraphVisualizationData {
  nodes: VisualizationNode[];
  edges: VisualizationEdge[];
  node_count: number;
  edge_count: number;
  max_centrality?: number;
  min_centrality?: number;
}

export interface DatasetInfo {
  id: string;
  name: string;
  description: string;
  full_node_count: number;
  full_edge_count: number;
  available: boolean;
}

export interface DatasetListResponse {
  datasets: DatasetInfo[];
}

export interface SubgraphConfig {
  min_nodes: number;
  max_nodes: number;
}

export interface SubgraphConfigResponse {
  message: string;
  min_nodes: number;
  max_nodes: number;
  new_node_count: number;
  new_edge_count: number;
}

export interface SubgraphConfigCurrent {
  min_nodes: number;
  max_nodes: number;
  current_node_count: number;
  current_edge_count: number;
}

