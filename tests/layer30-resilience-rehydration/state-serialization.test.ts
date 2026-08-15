import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';

describe('Layer 30: State Serialization & Graph Rehydration', () => {
  it('should serialize graph to JSON and fully rehydrate with 100% fidelity', () => {
    const graph1 = new ReasoningGraphStore();
    graph1.addNode({
      id: 'n1',
      personaId: 'requirements_analyst',
      version: 1,
      status: 'completed',
      prompt: 'P1',
      inputContext: { key: 'val' },
      artifacts: [{ id: 'a1', name: 'art.txt', type: 'spec', content: 'hello' }],
      critiqueScore: 95
    });
    graph1.addNode({
      id: 'n2',
      personaId: 'systems_architect',
      version: 1,
      status: 'pending',
      prompt: 'P2',
      inputContext: {},
      artifacts: []
    });
    graph1.addEdge({ id: 'e1', fromNodeId: 'n1', toNodeId: 'n2', type: 'DEPENDENCY' });

    const json = graph1.toJSON();
    const graph2 = new ReasoningGraphStore();
    graph2.fromJSON(json);

    expect(graph2.getAllNodes().length).toBe(2);
    expect(graph2.getEdges().length).toBe(1);
    expect(graph2.getNode('n1')?.critiqueScore).toBe(95);
    expect(graph2.getNode('n1')?.artifacts[0].content).toBe('hello');
    expect(graph2.getUpstreamNodes('n2')[0].id).toBe('n1');
  });
});
