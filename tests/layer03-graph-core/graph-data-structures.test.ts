import { describe, it, expect, beforeEach } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { GraphValidationError } from '../../src/utils/errors.js';

describe('Layer 03: Graph Data Structures & Primitives', () => {
  let graph: ReasoningGraphStore;

  beforeEach(() => {
    graph = new ReasoningGraphStore();
  });

  it('should add, retrieve, and update nodes', () => {
    graph.addNode({
      id: 'node-1',
      personaId: 'requirements_analyst',
      version: 1,
      status: 'pending',
      prompt: 'Test prompt',
      inputContext: {},
      artifacts: []
    });

    const retrieved = graph.getNode('node-1');
    expect(retrieved).not.toBeNull();
    expect(retrieved?.personaId).toBe('requirements_analyst');

    graph.updateNode('node-1', { status: 'completed', output: 'Done' });
    expect(graph.getNode('node-1')?.status).toBe('completed');
    expect(graph.getNode('node-1')?.output).toBe('Done');
  });

  it('should throw GraphValidationError on duplicate node insertion', () => {
    graph.addNode({ id: 'dup', personaId: 'senior_backend', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    expect(() => {
      graph.addNode({ id: 'dup', personaId: 'senior_backend', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    }).toThrow(GraphValidationError);
  });

  it('should connect and query in-edges and out-edges', () => {
    graph.addNode({ id: 'a', personaId: 'requirements_analyst', version: 1, status: 'completed', prompt: '', inputContext: {}, artifacts: [] });
    graph.addNode({ id: 'b', personaId: 'systems_architect', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });

    graph.addEdge({ id: 'e1', fromNodeId: 'a', toNodeId: 'b', type: 'DEPENDENCY' });

    expect(graph.getOutEdges('a').length).toBe(1);
    expect(graph.getInEdges('b').length).toBe(1);
    expect(graph.getUpstreamNodes('b')[0].id).toBe('a');
  });
});
