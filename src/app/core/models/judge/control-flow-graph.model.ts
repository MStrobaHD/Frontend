
export interface CFG {
  nodes: Node[];
  edges: Edge[];
}

export interface Node  {
  id: string;
  label: string;
}
export interface Edge {
  id: string;
  source: string;
  target: string;
  label: string;
}
