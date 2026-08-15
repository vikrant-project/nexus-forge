import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { ConvergenceManager } from '../../src/engine/convergence-manager.js';
import { GraphNode, CritiqueReport } from '../../src/core/types.js';

describe('Layer 06: Revision History & Version Chaining', () => {
  it('should create revision node v2 and link with REVISION edge on critique failure', () => {
    const graph = new ReasoningGraphStore();
    const node: GraphNode = {
      id: 'node-ui',
      personaId: 'senior_frontend',
      version: 1,
      status: 'running',
      prompt: 'Build UI',
      inputContext: {},
      artifacts: [],
      metadata: { maxRevisions: 3 }
    };
    graph.addNode(node);

    const critique: CritiqueReport = {
      score: 75,
      passed: false,
      verdict: 'Score 75 below 90',
      strengths: [],
      weaknesses: ['Add responsive styling'],
      actionableFixes: []
    };

    const result = ConvergenceManager.checkAndHandleConvergence(graph, node, critique);
    expect(result.converged).toBe(false);
    expect(result.nextNodeToExecute?.version).toBe(2);
    expect(result.nextNodeToExecute?.id).toBe('node-ui-v2');

    const revEdges = graph.getOutEdges('node-ui', 'REVISION');
    expect(revEdges.length).toBe(1);
    expect(revEdges[0].toNodeId).toBe('node-ui-v2');
  });
});
