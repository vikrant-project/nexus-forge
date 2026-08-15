import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { ConvergenceManager } from '../../src/engine/convergence-manager.js';
import { GraphNode } from '../../src/core/types.js';

describe('Layer 24: Max-Revision Safety Cap & Circuit Breaker', () => {
  it('should prevent infinite loops by capping revisions at maxRevisions limit', () => {
    const graph = new ReasoningGraphStore();
    const node: GraphNode = {
      id: 'infinite-loop-candidate',
      personaId: 'visual_3d_realism',
      version: 3,
      status: 'running',
      prompt: 'Refine 3D',
      inputContext: {},
      artifacts: [],
      metadata: { maxRevisions: 3 }
    };
    graph.addNode(node);

    const res = ConvergenceManager.checkAndHandleConvergence(graph, node, {
      score: 60,
      passed: false,
      verdict: 'Still failing',
      strengths: [],
      weaknesses: [],
      actionableFixes: []
    });

    expect(res.converged).toBe(true);
    expect(graph.getNode('infinite-loop-candidate')?.metadata?.capped).toBe(true);
  });
});
