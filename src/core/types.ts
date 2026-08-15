export type DisciplineCluster =
  | 'planning'
  | 'backend'
  | 'frontend'
  | 'visual'
  | 'security'
  | 'qa'
  | 'devops'
  | 'domain'
  | 'meta';

export type PersonaRole =
  // 1. Planning & Architecture (1-5)
  | 'requirements_analyst'
  | 'systems_architect'
  | 'database_designer'
  | 'api_designer'
  | 'tech_stack_selector'
  // 2. Backend (6-10)
  | 'senior_backend'
  | 'auth_specialist'
  | 'payment_specialist'
  | 'caching_performance'
  | 'background_jobs'
  // 3. Frontend / UI / UX (11-16)
  | 'senior_frontend'
  | 'ui_ux_designer'
  | 'design_system_theme'
  | 'component_behavior'
  | 'accessibility_a11y'
  | 'responsive_mobile'
  // 4. Visual Fidelity (17-20)
  | 'visual_3d_realism'
  | 'screenshot_match_critique'
  | 'animation_motion'
  | 'asset_texture'
  // 5. Security (21-24)
  | 'cyber_security_auditor'
  | 'penetration_tester'
  | 'supply_chain_risk'
  | 'data_privacy_compliance'
  // 6. Quality & Testing (25-29)
  | 'unit_test_author'
  | 'integration_test_author'
  | 'e2e_test_author'
  | 'load_performance_tester'
  | 'bug_triage'
  // 7. DevOps / Infra (30-33)
  | 'cicd_pipeline'
  | 'deployment_config'
  | 'monitoring_logging'
  | 'environment_secrets'
  // 8. Domain Specialists (34-37)
  | 'ecommerce_specialist'
  | 'booking_specialist'
  | 'cms_specialist'
  | 'student_management_specialist'
  // 9. Meta / Oversight (38-40)
  | 'integration_agent'
  | 'final_review_agent'
  | 'documentation_agent';

export interface PersonaMetadata {
  id: PersonaRole;
  number: number;
  name: string;
  discipline: DisciplineCluster;
  description: string;
  defaultCritiqueThreshold: number;
  maxRevisions: number;
  requiredUpstreamRoles: PersonaRole[];
}

export type NodeStatus = 'pending' | 'running' | 'completed' | 'failed' | 'rejected' | 'revised';

export interface Artifact {
  id: string;
  name: string;
  type: 'spec' | 'schema' | 'code' | 'style' | 'test' | 'doc' | 'config' | 'report';
  content: string;
  language?: string;
  path?: string;
  metadata?: Record<string, any>;
}

export interface GraphNode {
  id: string;
  personaId: PersonaRole;
  version: number;
  status: NodeStatus;
  prompt: string;
  inputContext: Record<string, any>;
  output?: string;
  artifacts: Artifact[];
  critiqueScore?: number;
  revisionOfNodeId?: string;
  startedAt?: string;
  completedAt?: string;
  metadata?: Record<string, any>;
}

export type EdgeType = 'DEPENDENCY' | 'CRITIQUE' | 'REVISION';

export interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  type: EdgeType;
  score?: number;
  critiqueFeedback?: string;
  metadata?: Record<string, any>;
}

export interface CritiqueReport {
  score: number; // 0 - 100
  passed: boolean;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  actionableFixes: string[];
  visualFidelityMatch?: number; // 0 - 100
}

export interface ExecutionStage {
  stageNumber: number;
  nodeIds: string[];
  parallel: boolean;
}

export type ProjectCategory =
  | 'e-commerce'
  | 'student-management'
  | 'user-management'
  | 'booking-appointment'
  | 'content-management'
  | 'saas-dashboard'
  | 'general-web';

export interface ProjectRequirements {
  rawPrompt: string;
  category: ProjectCategory;
  inferredFeatures: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    styling: string;
    testing: string;
  };
  visualTheme: {
    mode: 'dark' | 'light' | 'custom';
    accentColor: string;
    style: string;
  };
}

export interface OrchestrationResult {
  jobId: string;
  prompt: string;
  category: ProjectCategory;
  nodes: GraphNode[];
  edges: GraphEdge[];
  artifacts: Artifact[];
  finalReviewPassed: boolean;
  totalRevisions: number;
  executionDurationMs: number;
  summary: string;
}