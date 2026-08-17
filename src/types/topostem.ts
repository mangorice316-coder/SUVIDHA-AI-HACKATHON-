export type ComponentType = 
  | 'battery' 
  | 'resistor' 
  | 'capacitor' 
  | 'inductor' 
  | 'diode' 
  | 'switch' 
  | 'ground' 
  | 'junction_node' 
  | 'ac_source' 
  | 'voltmeter' 
  | 'ammeter'
  // Data Structure & Optics Types
  | 'tree_root'
  | 'tree_node'
  | 'tree_leaf'
  | 'optical_lens'
  | 'light_ray'
  | 'focal_point';

export interface CircuitNode {
  id: string;
  label: string;
  type: ComponentType;
  value?: string;
  numericValue?: number; // for live mathematical calculation
  unit?: string;
  position: { x: number; y: number }; // normalized 0.0 - 1.0
  description: string;
  connectedEdgeIds: string[];
}

export interface CircuitEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label: string;
  direction?: 'bidirectional' | 'forward' | 'reverse';
  branchType: 'series' | 'parallel' | 'ground_return' | 'tree_left' | 'tree_right' | 'ray_refraction';
  impedanceEstimate?: string;
}

export interface CircuitLoop {
  id: string;
  name: string;
  nodeSequence: string[];
  description: string;
  kirchhoffVoltageFormula?: string;
}

export interface SimulationResult {
  totalEquivalentImpedance: string;
  totalCurrentRMS: string;
  branchCurrents: Record<string, string>;
  nodeVoltages: Record<string, string>;
}

export interface CircuitGraphData {
  id: string;
  title: string;
  domain: 'Electrical Engineering' | 'Computer Science Data Structures' | 'Ray Optics & Physics';
  description: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  totalComponents: number;
  entryNodeId: string;
  groundNodeId: string;
  nodes: CircuitNode[];
  edges: CircuitEdge[];
  loops: CircuitLoop[];
  inaccessibleLinearAltText: string;
  spatialExplanation: string;
  simulation?: SimulationResult;
  interactiveQuestions: {
    question: string;
    answer: string;
    calculationHint: string;
  }[];
}
