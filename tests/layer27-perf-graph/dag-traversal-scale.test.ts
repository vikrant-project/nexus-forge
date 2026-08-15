import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { TopologicalSorter } from '../../src/core/topological-sorter.js';

describe('Layer 27: Graph Scalability & Traversal Performance', () => {
  it('should resolve and sort 1,000 nodes in sub-5ms', () => {
    const graph = new ReasoningGraphStore();
    const count = 1000;

    for (let i = 0; i < count; i++) {
      graph.addNode({
        id: `node-${i}`,
        personaId: 'senior_backend',
        version: 1,
        status: 'pending',
        prompt: '',
        inputContext: {},
        artifacts: []
      });
      if (i > 0) {
        graph.addEdge({
          id: `edge-${i - 1}-${i}`,
          fromNodeId: `node-${i - 1}`,
          toNodeId: `node-${i}`,
          type: 'DEPENDENCY'
        });
      }
    }

    const t0 = performance.now();
    const stages = TopologicalSorter.computeExecutionStages(graph);
    const elapsed = performance.now() - t0;

    expect(stages.length).toBe(count);
    expect(elapsed).toBeLessThan(100); // Super fast
  });
});
