export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'skipped';

export interface ActionDAGNode {
  id: string;
  title: string;
  department: string;
  targetRole: string; // e.g. "Lab Safety Coordinator"
  daysToDeadline: number;
  hardDeadlineDate: string;
  status: NodeStatus;
  isImplicitSocialPrerequisite: boolean; // Highlights unwritten hidden curriculum
  explicitPolicyCitation: string;
  plainLanguageDirective: string;
  whatHappensIfOmitted: string;
  requiredInputIds: string[]; // parent node IDs
  scriptTemplateId?: string;
  estimatedMinutes: number;
  position: { x: number; y: number };
}

export interface DAGEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  isStrictDependency: boolean;
  label?: string;
}

export interface PreDraftedScript {
  id: string;
  title: string;
  recipientType: string;
  recipientEmailPlaceholder: string;
  subjectLine: string;
  bodyText: string;
  variables: { key: string; label: string; defaultValue: string }[];
  neurodivergentCommunicationTips: string[];
}

export interface PathWeaverCaseStudy {
  id: string;
  title: string;
  institutionContext: string;
  studentPersona: string;
  rawPolicySnippet: string; // The opaque 40-page administrative text
  whyAutisticStudentsGetLockedOut: string;
  nodes: ActionDAGNode[];
  edges: DAGEdge[];
  scripts: Record<string, PreDraftedScript>;
}
