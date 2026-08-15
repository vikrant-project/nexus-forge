import { ReasoningGraphStore } from '../core/graph-store.js';
import { GraphNode, GraphEdge, CritiqueReport } from '../core/types.js';
import { MaxRevisionsExceededError } from '../utils/errors.js';

export class ConvergenceManager {
  public static checkAndHandleConvergence(
    graph: ReasoningGraphStore,
    node: GraphNode,
    critique: CritiqueReport
  ): { converged: boolean; nextNodeToExecute?: GraphNode } {
    // Record critique edge
    const critiqueEdge: GraphEdge = {
      id: `edge-critique-${node.id}-${Date.now()}`,
      fromNodeId: node.id,
      toNodeId: node.id,
      type: 'CRITIQUE',
      score: critique.score,
      critiqueFeedback: critique.verdict
    };
    graph.addEdge(critiqueEdge);

    if (critique.passed) {
      graph.updateNode(node.id, { status: 'completed', critiqueScore: critique.score });
      return { converged: true };
    }

    // Handle failure / revision
    const maxRevisions = (node.metadata?.maxRevisions as number) || 3;
    const existingRevisions = graph.getRevisions(node.id);

    if (node.version >= maxRevisions || existingRevisions.length >= maxRevisions) {
      // Circuit-breaker cap reached: force converge with warning to prevent infinite loops
      graph.updateNode(node.id, { status: 'completed', critiqueScore: critique.score, metadata: { capped: true } });
      return { converged: true };
    }

    // Create revision node
    const nextVersion = node.version + 1;
    const revNodeId = `${node.id}-v${nextVersion}`;
    const revisionNode: GraphNode = {
      id: revNodeId,
      personaId: node.personaId,
      version: nextVersion,
      status: 'pending',
      prompt: `${node.prompt} (Revision v${nextVersion} addressing critique: ${critique.weaknesses.join('; ')})`,
      inputContext: { ...node.inputContext, previousCritique: critique },
      artifacts: [],
      revisionOfNodeId: node.id,
      metadata: { ...node.metadata }
    };

    graph.addNode(revisionNode);

    // Add revision edge
    const revEdge: GraphEdge = {
      id: `edge-rev-${node.id}-${revNodeId}`,
      fromNodeId: node.id,
      toNodeId: revNodeId,
      type: 'REVISION',
      score: critique.score
    };
    graph.addEdge(revEdge);

    graph.updateNode(node.id, { status: 'revised' });

    return { converged: false, nextNodeToExecute: revisionNode };
  }
}
