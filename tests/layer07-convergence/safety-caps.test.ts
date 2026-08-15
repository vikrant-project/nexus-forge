import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { ConvergenceManager } from '../../src/engine/convergence-manager.js';
import { GraphNode, CritiqueReport } from '../../src/core/types.js';

describe('Layer 07: Convergence Conditions & Safety Caps', () => {
  it('should converge immediately when critique passes threshold', () => {
    const graph = new ReasoningGraphStore();
    const node: GraphNode = {
      id: 'node-pass',
      personaId: 'database_designer',
      version: 1,
      status: 'running',
      prompt: 'Design DB',
      inputContext: {},
      artifacts: []
    };
    graph.addNode(node);

    const critique: CritiqueReport = {
      score: 95,
      passed: true,
      verdict: 'PASSED',
      strengths: ['Complete'],
      weaknesses: [],
      actionableFixes: []
    };

    const res = ConvergenceManager.checkAndHandleConvergence(graph, node, critique);
    expect(res.converged).toBe(true);
    expect(graph.getNode('node-pass')?.status).toBe('completed');
  });

  it('should enforce circuit-breaker cap when max revisions are reached', () => {
    const graph = new ReasoningGraphStore();
    const node: GraphNode = {
      id: 'node-cap',
      personaId: 'senior_backend',
      version: 3,
      status: 'running',
      prompt: 'Implement logic',
      inputContext: {},
      artifacts: [],
      metadata: { maxRevisions: 3 }
    };
    graph.addNode(node);

    const critique: CritiqueReport = {
      score: 70,
      passed: false,
      verdict: 'Failed',
      strengths: [],
      weaknesses: [],
      actionableFixes: []
    };

    const res = ConvergenceManager.checkAndHandleConvergence(graph, node, critique);
    expect(res.converged).toBe(true);
    expect(graph.getNode('node-cap')?.status).toBe('completed');
  });
});
