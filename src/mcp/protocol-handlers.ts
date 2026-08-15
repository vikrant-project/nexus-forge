import { NexusForgeOrchestrator } from '../engine/orchestrator.js';
import { RosterRegistry } from '../personas/roster.js';

export class MCPHandlers {
  public static async handleOrchestrate(params: { prompt: string }): Promise<any> {
    const result = await NexusForgeOrchestrator.executePrompt(params.prompt);
    return {
      jobId: result.jobId,
      category: result.category,
      artifactCount: result.artifacts.length,
      finalReviewPassed: result.finalReviewPassed,
      artifacts: result.artifacts.map((a) => ({ name: a.name, type: a.type }))
    };
  }

  public static handleListPersonas(): any {
    return RosterRegistry.getAllPersonas();
  }
}
