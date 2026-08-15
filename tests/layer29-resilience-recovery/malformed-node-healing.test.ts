import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { GraphValidationError } from '../../src/utils/errors.js';

describe('Layer 29: Resilience & Broken Edge Error Recovery', () => {
  it('should catch invalid edge references and prevent graph corruption', () => {
    const graph = new ReasoningGraphStore();
    graph.addNode({ id: 'valid', personaId: 'senior_backend', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });

    expect(() => {
      graph.addEdge({ id: 'bad-edge', fromNodeId: 'valid', toNodeId: 'non-existent', type: 'DEPENDENCY' });
    }).toThrow(GraphValidationError);
  });
});
