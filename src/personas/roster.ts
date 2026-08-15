import { PersonaMetadata, PersonaRole } from '../core/types.js';

export const PERSONA_ROSTER: PersonaMetadata[] = [
  // 1. Planning & Architecture (1-5)
  {
    id: 'requirements_analyst',
    number: 1,
    name: 'Requirements Analyst',
    discipline: 'planning',
    description: 'Infers explicit and implicit feature requirements, user journeys, edge cases, and acceptance criteria.',
    defaultCritiqueThreshold: 85,
    maxRevisions: 3,
    requiredUpstreamRoles: []
  },
  {
    id: 'systems_architect',
    number: 2,
    name: 'Systems Architect',
    discipline: 'planning',
    description: 'Designs module boundaries, state lifecycle, data pipelines, and architectural patterns.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },
  {
    id: 'database_designer',
    number: 3,
    name: 'Database Schema Designer',
    discipline: 'planning',
    description: 'Models normalized entities, relationships, indexes, constraints, and audit trails.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['systems_architect']
  },
  {
    id: 'api_designer',
    number: 4,
    name: 'API Contract Designer',
    discipline: 'planning',
    description: 'Drafts REST/JSON-RPC/GraphQL contracts with request/response schemas, status codes, and error models.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['systems_architect', 'database_designer']
  },
  {
    id: 'tech_stack_selector',
    number: 5,
    name: 'Tech Stack Selector',
    discipline: 'planning',
    description: 'Selects optimal runtime libraries, database engines, styling paradigms, and bundler configurations.',
    defaultCritiqueThreshold: 85,
    maxRevisions: 2,
    requiredUpstreamRoles: ['requirements_analyst']
  },

  // 2. Backend (6-10)
  {
    id: 'senior_backend',
    number: 6,
    name: 'Senior Backend Engineer',
    discipline: 'backend',
    description: 'Implements business logic, data persistence layer, validation rules, and service endpoints.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['database_designer', 'api_designer']
  },
  {
    id: 'auth_specialist',
    number: 7,
    name: 'Auth & Session Specialist',
    discipline: 'backend',
    description: 'Implements secure session management, JWT/RBAC role checks, password hashing, and token renewal.',
    defaultCritiqueThreshold: 92,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_backend']
  },
  {
    id: 'payment_specialist',
    number: 8,
    name: 'Payment & Transaction Logic Agent',
    discipline: 'backend',
    description: 'Implements idempotent ledger entries, checkout flows, refund logic, and transaction isolation.',
    defaultCritiqueThreshold: 95,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_backend']
  },
  {
    id: 'caching_performance',
    number: 9,
    name: 'Caching & Performance Agent',
    discipline: 'backend',
    description: 'Optimizes query bottlenecks, in-memory cache layers (LRU/TTL), and response compression.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['senior_backend']
  },
  {
    id: 'background_jobs',
    number: 10,
    name: 'Background Jobs & Queue Agent',
    discipline: 'backend',
    description: 'Implements asynchronous queues, retry policies, scheduled cron jobs, and worker pools.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['senior_backend']
  },

  // 3. Frontend / UI / UX (11-16)
  {
    id: 'senior_frontend',
    number: 11,
    name: 'Senior Frontend Engineer',
    discipline: 'frontend',
    description: 'Builds modern UI views, state management, client routing, API clients, and interactive controllers.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['api_designer']
  },
  {
    id: 'ui_ux_designer',
    number: 12,
    name: 'UI/UX Designer',
    discipline: 'frontend',
    description: 'Creates aesthetic layouts, hierarchy, visual spacing, micro-copy, and intuitive user flows.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },
  {
    id: 'design_system_theme',
    number: 13,
    name: 'Design System & Theme Agent',
    discipline: 'frontend',
    description: 'Authors dark/light design tokens, glassmorphic CSS variables, HSL color palettes, and typography scales.',
    defaultCritiqueThreshold: 92,
    maxRevisions: 3,
    requiredUpstreamRoles: ['ui_ux_designer']
  },
  {
    id: 'component_behavior',
    number: 14,
    name: 'Component Behavior Agent',
    discipline: 'frontend',
    description: 'Wires interactive states (hover, active, disabled, loading skeletons, modal toggles, validation tooltips).',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_frontend', 'design_system_theme']
  },
  {
    id: 'accessibility_a11y',
    number: 15,
    name: 'Accessibility (a11y) Agent',
    discipline: 'frontend',
    description: 'Guarantees WCAG 2.1 AA compliance, ARIA attributes, semantic HTML tags, and keyboard navigation.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['senior_frontend']
  },
  {
    id: 'responsive_mobile',
    number: 16,
    name: 'Responsive & Mobile Layout Agent',
    discipline: 'frontend',
    description: 'Ensures fluid breakpoints (mobile, tablet, desktop, ultra-wide) and touch-friendly controls.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['senior_frontend', 'design_system_theme']
  },

  // 4. Visual Fidelity (17-20)
  {
    id: 'visual_3d_realism',
    number: 17,
    name: '3D & Visual Realism Agent',
    discipline: 'visual',
    description: 'Elevates visual fidelity with backdrop filters, depth shadows, glows, gradients, and premium polish.',
    defaultCritiqueThreshold: 92,
    maxRevisions: 3,
    requiredUpstreamRoles: ['design_system_theme', 'senior_frontend']
  },
  {
    id: 'screenshot_match_critique',
    number: 18,
    name: 'Screenshot-Match Critique Agent',
    discipline: 'visual',
    description: 'Evaluates rendered UI against top-tier design references; scores visual polish, alignment, and aesthetic appeal.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['visual_3d_realism']
  },
  {
    id: 'animation_motion',
    number: 19,
    name: 'Animation & Motion Agent',
    discipline: 'visual',
    description: 'Implements cubic-bezier micro-interactions, entrance keyframes, page transitions, and toast notifications.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['visual_3d_realism']
  },
  {
    id: 'asset_texture',
    number: 20,
    name: 'Asset & Texture Quality Agent',
    discipline: 'visual',
    description: 'Generates SVG icons, badges, avatar generators, mock charts, and visual assets without placeholders.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['visual_3d_realism']
  },

  // 5. Security (21-24)
  {
    id: 'cyber_security_auditor',
    number: 21,
    name: 'Cyber Security Auditor',
    discipline: 'security',
    description: 'Conducts AST & SAST security review for XSS, SQLi, CSRF, IDOR, SSRF, and prototype pollution.',
    defaultCritiqueThreshold: 95,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_backend', 'senior_frontend']
  },
  {
    id: 'penetration_tester',
    number: 22,
    name: 'Penetration-Test Simulation Agent',
    discipline: 'security',
    description: 'Simulates fuzzing attacks, malicious payloads, rate-limit bypassing, and permission tampering.',
    defaultCritiqueThreshold: 92,
    maxRevisions: 3,
    requiredUpstreamRoles: ['cyber_security_auditor']
  },
  {
    id: 'supply_chain_risk',
    number: 23,
    name: 'Dependency & Supply-Chain Risk Agent',
    discipline: 'security',
    description: 'Audits dependencies for known CVEs, outdated licenses, and excessive permissions.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['tech_stack_selector']
  },
  {
    id: 'data_privacy_compliance',
    number: 24,
    name: 'Data Privacy Compliance Agent',
    discipline: 'security',
    description: 'Verifies GDPR/CCPA compliance, PII redaction, cookie consent, and data retention policies.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['database_designer']
  },

  // 6. Quality & Testing (25-29)
  {
    id: 'unit_test_author',
    number: 25,
    name: 'Unit Test Author',
    discipline: 'qa',
    description: 'Writes thorough unit tests for algorithms, data transformations, validators, and edge cases.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_backend', 'senior_frontend']
  },
  {
    id: 'integration_test_author',
    number: 26,
    name: 'Integration Test Author',
    discipline: 'qa',
    description: 'Writes multi-module tests for end-to-end API workflows, database mutations, and session state.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['unit_test_author']
  },
  {
    id: 'e2e_test_author',
    number: 27,
    name: 'End-to-End Test Author',
    discipline: 'qa',
    description: 'Authors browser automation scenarios for full user journeys (onboarding, CRUD, checkout).',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['integration_test_author']
  },
  {
    id: 'load_performance_tester',
    number: 28,
    name: 'Load & Performance Test Agent',
    discipline: 'qa',
    description: 'Benchmarks throughput, latency percentiles (p50/p95/p99), memory usage, and concurrency.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['integration_test_author']
  },
  {
    id: 'bug_triage',
    number: 29,
    name: 'Bug Triage Agent',
    discipline: 'qa',
    description: 'Analyzes test failures, pinpoints root causes, and generates actionable reproduction steps.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['unit_test_author']
  },

  // 7. DevOps / Infra (30-33)
  {
    id: 'cicd_pipeline',
    number: 30,
    name: 'CI/CD Pipeline Agent',
    discipline: 'devops',
    description: 'Writes GitHub Actions workflows, test runners, lint checks, and automated build scripts.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['tech_stack_selector']
  },
  {
    id: 'deployment_config',
    number: 31,
    name: 'Deployment Config Agent',
    discipline: 'devops',
    description: 'Creates Dockerfiles, docker-compose manifests, and production runtime configs.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['tech_stack_selector']
  },
  {
    id: 'monitoring_logging',
    number: 32,
    name: 'Monitoring & Logging Agent',
    discipline: 'devops',
    description: 'Configures structured telemetry, error logging, health checks, and performance metrics.',
    defaultCritiqueThreshold: 88,
    maxRevisions: 2,
    requiredUpstreamRoles: ['senior_backend']
  },
  {
    id: 'environment_secrets',
    number: 33,
    name: 'Environment & Secrets Config Agent',
    discipline: 'devops',
    description: 'Defines .env.example templates, credential sanitization, and environment validation schemas.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['tech_stack_selector']
  },

  // 8. Domain Specialists (34-37)
  {
    id: 'ecommerce_specialist',
    number: 34,
    name: 'E-commerce Logic Agent',
    discipline: 'domain',
    description: 'Specializes in SKU variants, dynamic discounts, shipping rate calculations, and order statuses.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },
  {
    id: 'booking_specialist',
    number: 35,
    name: 'Booking & Appointment Logic Agent',
    discipline: 'domain',
    description: 'Specializes in slot availability, timezone offsets, double-booking prevention, and calendar sync.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },
  {
    id: 'cms_specialist',
    number: 36,
    name: 'Content Management Agent',
    discipline: 'domain',
    description: 'Specializes in rich markdown rendering, draft revisions, media libraries, and taxonomy tagging.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },
  {
    id: 'student_management_specialist',
    number: 37,
    name: 'Student Management Specialist',
    discipline: 'domain',
    description: 'Specializes in student records, GPA computations, course enrollment, attendance calendars, and department analytics.',
    defaultCritiqueThreshold: 92,
    maxRevisions: 3,
    requiredUpstreamRoles: ['requirements_analyst']
  },

  // 9. Meta / Oversight (38-40)
  {
    id: 'integration_agent',
    number: 38,
    name: 'Integration Agent',
    discipline: 'meta',
    description: 'Merges all frontend, backend, styles, database, and test artifacts into a single cohesive codebase.',
    defaultCritiqueThreshold: 95,
    maxRevisions: 3,
    requiredUpstreamRoles: ['senior_backend', 'senior_frontend', 'visual_3d_realism', 'cyber_security_auditor']
  },
  {
    id: 'final_review_agent',
    number: 39,
    name: 'Final Review Agent (Gatekeeper)',
    discipline: 'meta',
    description: 'Acts as Principal Software Engineer performing final production sign-off before release.',
    defaultCritiqueThreshold: 95,
    maxRevisions: 3,
    requiredUpstreamRoles: ['integration_agent']
  },
  {
    id: 'documentation_agent',
    number: 40,
    name: 'Documentation Agent',
    discipline: 'meta',
    description: 'Produces comprehensive README, ARCHITECTURE, setup instructions, and API docs.',
    defaultCritiqueThreshold: 90,
    maxRevisions: 2,
    requiredUpstreamRoles: ['integration_agent', 'final_review_agent']
  }
];

export class RosterRegistry {
  private static rosterMap = new Map<PersonaRole, PersonaMetadata>(
    PERSONA_ROSTER.map((p) => [p.id, p])
  );

  public static getAllPersonas(): PersonaMetadata[] {
    return [...PERSONA_ROSTER];
  }

  public static getPersona(role: PersonaRole): PersonaMetadata | null {
    return this.rosterMap.get(role) || null;
  }

  public static getByDiscipline(discipline: string): PersonaMetadata[] {
    return PERSONA_ROSTER.filter((p) => p.discipline === discipline);
  }

  public static count(): number {
    return PERSONA_ROSTER.length;
  }
}
