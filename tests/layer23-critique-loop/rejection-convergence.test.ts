import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { ConvergenceManager } from '../../src/engine/convergence-manager.js';
import { GraphNode } from '../../src/core/types.js';

describe('Layer 23: Critique Loop & Revision Convergence', () => {
  it('should trigger revision when score is low, then converge when updated score is high', () => {
    const graph = new ReasoningGraphStore();
    const node: GraphNode = {
      id: 'test-node',
      personaId: 'senior_frontend',
      version: 1,
      status: 'running',
      prompt: 'Build UI',
      inputContext: {},
      artifacts: []
    };
    graph.addNode(node);

    // Initial low score
    const res1 = ConvergenceManager.checkAndHandleConvergence(graph, node, {
      score: 70,
      passed: false,
      verdict: 'Needs revision',
      strengths: [],
      weaknesses: ['Add animations'],
      actionableFixes: []
    });

    expect(res1.converged).toBe(false);
    const revNode = res1.nextNodeToExecute!;
    expect(revNode.version).toBe(2);

    // Revised high score
    const res2 = ConvergenceManager.checkAndHandleConvergence(graph, revNode, {
      score: 95,
      passed: true,
      verdict: 'PASSED',
      strengths: ['Polished animations added'],
      weaknesses: [],
      actionableFixes: []
    });

    expect(res2.converged).toBe(true);
    expect(graph.getNode(revNode.id)?.status).toBe('completed');
  });
});
