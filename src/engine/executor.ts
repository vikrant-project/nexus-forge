import { GraphNode, PersonaRole, Artifact } from '../core/types.js';
import { PlanningCluster } from '../personas/definitions/planning.js';
import { BackendCluster } from '../personas/definitions/backend.js';
import { FrontendCluster } from '../personas/definitions/frontend.js';
import { VisualCluster } from '../personas/definitions/visual.js';
import { SecurityCluster } from '../personas/definitions/security.js';
import { QACluster } from '../personas/definitions/qa.js';
import { DevOpsCluster } from '../personas/definitions/devops.js';
import { DomainCluster } from '../personas/definitions/domains.js';
import { MetaCluster } from '../personas/definitions/meta.js';

export class PersonaExecutor {
  public static async executeNode(
    node: GraphNode,
    graphContextStr: string,
    rawPrompt: string
  ): Promise<{ text: string; artifacts: Artifact[]; critiqueSelfScore: number }> {
    const input = {
      prompt: rawPrompt,
      graphContext: graphContextStr,
      upstreamArtifacts: []
    };

    switch (node.personaId) {
      // 1. Planning
      case 'requirements_analyst': return PlanningCluster.executeRequirementsAnalyst(input);
      case 'systems_architect': return PlanningCluster.executeSystemsArchitect(input);
      case 'database_designer': return PlanningCluster.executeDatabaseDesigner(input);
      case 'api_designer': return PlanningCluster.executeApiDesigner(input);
      case 'tech_stack_selector': return PlanningCluster.executeTechStackSelector(input);

      // 2. Backend
      case 'senior_backend': return BackendCluster.executeSeniorBackend(input);
      case 'auth_specialist': return BackendCluster.executeAuthSpecialist(input);
      case 'payment_specialist': return BackendCluster.executePaymentSpecialist(input);
      case 'caching_performance': return BackendCluster.executeCachingPerformance(input);
      case 'background_jobs': return BackendCluster.executeBackgroundJobs(input);

      // 3. Frontend
      case 'senior_frontend': return FrontendCluster.executeSeniorFrontend(input);
      case 'ui_ux_designer': return FrontendCluster.executeUiUxDesigner(input);
      case 'design_system_theme': return FrontendCluster.executeDesignSystemTheme(input);
      case 'component_behavior': return FrontendCluster.executeComponentBehavior(input);
      case 'accessibility_a11y': return FrontendCluster.executeAccessibility(input);
      case 'responsive_mobile': return FrontendCluster.executeResponsiveMobile(input);

      // 4. Visual
      case 'visual_3d_realism': return VisualCluster.executeVisual3DRealism(input);
      case 'screenshot_match_critique': return VisualCluster.executeScreenshotMatchCritique(input);
      case 'animation_motion': return VisualCluster.executeAnimationMotion(input);
      case 'asset_texture': return VisualCluster.executeAssetTexture(input);

      // 5. Security
      case 'cyber_security_auditor': return SecurityCluster.executeCyberSecurityAuditor(input);
      case 'penetration_tester': return SecurityCluster.executePenetrationTester(input);
      case 'supply_chain_risk': return SecurityCluster.executeSupplyChainRisk(input);
      case 'data_privacy_compliance': return SecurityCluster.executeDataPrivacyCompliance(input);

      // 6. QA
      case 'unit_test_author': return QACluster.executeUnitTestAuthor(input);
      case 'integration_test_author': return QACluster.executeIntegrationTestAuthor(input);
      case 'e2e_test_author': return QACluster.executeE2ETestAuthor(input);
      case 'load_performance_tester': return QACluster.executeLoadPerformanceTester(input);
      case 'bug_triage': return QACluster.executeBugTriage(input);

      // 7. DevOps
      case 'cicd_pipeline': return DevOpsCluster.executeCicdPipeline(input);
      case 'deployment_config': return DevOpsCluster.executeDeploymentConfig(input);
      case 'monitoring_logging': return DevOpsCluster.executeMonitoringLogging(input);
      case 'environment_secrets': return DevOpsCluster.executeEnvironmentSecrets(input);

      // 8. Domains
      case 'ecommerce_specialist': return DomainCluster.executeEcommerceSpecialist(input);
      case 'booking_specialist': return DomainCluster.executeBookingSpecialist(input);
      case 'cms_specialist': return DomainCluster.executeCmsSpecialist(input);
      case 'student_management_specialist': return DomainCluster.executeStudentManagementSpecialist(input);

      // 9. Meta
      case 'integration_agent': return MetaCluster.executeIntegrationAgent(input);
      case 'final_review_agent': return MetaCluster.executeFinalReviewAgent(input);
      case 'documentation_agent': return MetaCluster.executeDocumentationAgent(input);

      default:
        return {
          text: `Executed standard expert persona responsibility.`,
          artifacts: [],
          critiqueSelfScore: 90
        };
    }
  }
}
