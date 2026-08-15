import { ProjectCategory, ProjectRequirements, GraphNode, GraphEdge, PersonaRole } from '../core/types.js';
import { RosterRegistry } from '../personas/roster.js';

export class IntentParser {
  public static parseIntent(prompt: string): ProjectRequirements {
    const lower = prompt.toLowerCase();
    let category: ProjectCategory = 'general-web';

    if (lower.includes('user') && (lower.includes('management') || lower.includes('admin') || lower.includes('system') || lower.includes('rbac') || lower.includes('auth') || lower.includes('managemt'))) {
      category = 'user-management';
    } else if (lower.includes('student') || lower.includes('school') || lower.includes('university') || lower.includes('education') || lower.includes('grade')) {
      category = 'student-management';
    } else if (lower.includes('shop') || lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('cart') || lower.includes('store')) {
      category = 'e-commerce';
    } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('reservation')) {
      category = 'booking-appointment';
    } else if (lower.includes('blog') || lower.includes('cms') || lower.includes('content') || lower.includes('article')) {
      category = 'content-management';
    } else if (lower.includes('dashboard') || lower.includes('analytics') || lower.includes('saas') || lower.includes('metrics')) {
      category = 'saas-dashboard';
    }

    const inferredFeatures: string[] = [];
    if (category === 'user-management') {
      inferredFeatures.push(
        'User Directory Explorer (Search, Filter by Department/Role/Status, Status Badges, 2FA Indicator)',
        'Role-Based Access Control (RBAC) Matrix (Permissions, Custom Roles, Capability Enforcer)',
        'Audit Log & Security Telemetry (Session IP, Login History, Failed Login Alerting, Risk Scores)',
        'Executive Identity Dashboard (Total Users, Active Sessions, 2FA Adoption, Role Distribution)',
        'User Lifecycle Modals (Invite User, Edit Profile, Suspend/Activate, Force Session Revocation)'
      );
    } else if (category === 'student-management') {
      inferredFeatures.push('Student Directory & Profiles', 'Course Enrollment & Catalog', 'Attendance Tracking', 'Gradebook & GPA Calculations', 'Executive Analytics Dashboard');
    } else if (category === 'e-commerce') {
      inferredFeatures.push('Product Catalog', 'Cart & Dynamic Totals', 'Checkout Ledger', 'Order History');
    } else {
      inferredFeatures.push('Entity Management', 'Real-Time Dashboard', 'Search & Filtering', 'Data Reporting');
    }

    return {
      rawPrompt: prompt,
      category,
      inferredFeatures,
      techStack: {
        frontend: 'HTML5 / Modern ES6+ JavaScript',
        backend: 'In-Memory / LocalStorage Synchronized Service Layer',
        database: 'Relational Entity Store with Validation',
        styling: 'Vanilla CSS Glassmorphic Custom Properties',
        testing: 'Vitest Automated Suite'
      },
      visualTheme: {
        mode: 'dark',
        accentColor: '#6366f1',
        style: 'Glassmorphism with backdrop filters and glowing accents'
      }
    };
  }

  public static buildInitialDAG(req: ProjectRequirements): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const rawRoles: PersonaRole[] = [
      'requirements_analyst',
      'systems_architect',
      'database_designer',
      'api_designer',
      'tech_stack_selector',
      'senior_backend',
      'auth_specialist',
      'ui_ux_designer',
      'design_system_theme',
      'senior_frontend',
      'visual_3d_realism',
      'screenshot_match_critique',
      'cyber_security_auditor',
      'unit_test_author',
      'cicd_pipeline',
      req.category === 'student-management'
        ? 'student_management_specialist'
        : req.category === 'e-commerce'
        ? 'ecommerce_specialist'
        : 'student_management_specialist',
      'integration_agent',
      'final_review_agent',
      'documentation_agent'
    ];

    const selectedRoles = Array.from(new Set(rawRoles));
    const nodeMap = new Map<PersonaRole, string>();

    for (const role of selectedRoles) {
      const meta = RosterRegistry.getPersona(role);
      const nodeId = `node-${role}`;
      nodeMap.set(role, nodeId);

      nodes.push({
        id: nodeId,
        personaId: role,
        version: 1,
        status: 'pending',
        prompt: `Execute principal responsibility for role: ${meta?.name || role}`,
        inputContext: { projectPrompt: req.rawPrompt, category: req.category },
        artifacts: [],
        metadata: { discipline: meta?.discipline, maxRevisions: meta?.maxRevisions || 3 }
      });
    }

    for (const role of selectedRoles) {
      const meta = RosterRegistry.getPersona(role);
      if (!meta) continue;
      const targetNodeId = nodeMap.get(role)!;

      for (const upRole of meta.requiredUpstreamRoles) {
        if (nodeMap.has(upRole)) {
          const fromNodeId = nodeMap.get(upRole)!;
          edges.push({
            id: `edge-dep-${fromNodeId}-${targetNodeId}`,
            fromNodeId,
            toNodeId: targetNodeId,
            type: 'DEPENDENCY'
          });
        }
      }
    }

    return { nodes, edges };
  }
}