import { ReasoningGraphStore } from './graph-store.js';
import { GraphNode, Artifact, PersonaRole } from './types.js';

export class ContextBus {
  public static buildNodeContext(
    graph: ReasoningGraphStore,
    targetNodeId: string
  ): {
    upstreamOutputs: Array<{ personaId: PersonaRole; output: string; artifacts: Artifact[] }>;
    allAvailableArtifacts: Artifact[];
    critiqueHistory: Array<{ score: number; feedback: string }>;
  } {
    const upstreamNodes = graph.getUpstreamNodes(targetNodeId);
    const upstreamOutputs = upstreamNodes.map((n) => ({
      personaId: n.personaId,
      output: n.output || '',
      artifacts: n.artifacts || []
    }));

    const allAvailableArtifacts = graph.getAllArtifacts();

    const critiqueEdges = graph.getInEdges(targetNodeId, 'CRITIQUE');
    const critiqueHistory = critiqueEdges.map((e) => ({
      score: e.score || 0,
      feedback: e.critiqueFeedback || ''
    }));

    return {
      upstreamOutputs,
      allAvailableArtifacts,
      critiqueHistory
    };
  }

  public static formatGraphContextString(
    upstreamOutputs: Array<{ personaId: PersonaRole; output: string; artifacts: Artifact[] }>
  ): string {
    if (upstreamOutputs.length === 0) {
      return 'No upstream outputs. This is a root planning node.';
    }

    const sections = upstreamOutputs.map((u) => {
      const header = `--- [UPSTREAM AGENT: ${u.personaId.toUpperCase()}] ---`;
      const out = u.output ? u.output.trim() : '(No text output)';
      const artCount = u.artifacts.length > 0 ? `\nArtifacts Generated: ${u.artifacts.map((a) => a.name).join(', ')}` : '';
      return `${header}\n${out}${artCount}`;
    });

    return sections.join('\n\n');
  }
}
