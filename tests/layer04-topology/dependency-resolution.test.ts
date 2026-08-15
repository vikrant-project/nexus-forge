import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { TopologicalSorter } from '../../src/core/topological-sorter.js';
import { CyclicDependencyError } from '../../src/utils/errors.js';

describe('Layer 04: Topological Sorter & Dependency Resolution', () => {
  it('should compute parallel execution stages correctly', () => {
    const graph = new ReasoningGraphStore();
    graph.addNode({ id: 'root', personaId: 'requirements_analyst', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    graph.addNode({ id: 'p1', personaId: 'database_designer', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    graph.addNode({ id: 'p2', personaId: 'ui_ux_designer', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    graph.addNode({ id: 'sink', personaId: 'integration_agent', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });

    graph.addEdge({ id: 'e1', fromNodeId: 'root', toNodeId: 'p1', type: 'DEPENDENCY' });
    graph.addEdge({ id: 'e2', fromNodeId: 'root', toNodeId: 'p2', type: 'DEPENDENCY' });
    graph.addEdge({ id: 'e3', fromNodeId: 'p1', toNodeId: 'sink', type: 'DEPENDENCY' });
    graph.addEdge({ id: 'e4', fromNodeId: 'p2', toNodeId: 'sink', type: 'DEPENDENCY' });

    const stages = TopologicalSorter.computeExecutionStages(graph);
    expect(stages.length).toBe(3);
    expect(stages[0].nodeIds).toEqual(['root']);
    expect(stages[1].nodeIds.sort()).toEqual(['p1', 'p2']);
    expect(stages[1].parallel).toBe(true);
    expect(stages[2].nodeIds).toEqual(['sink']);
  });

  it('should detect cyclic dependencies and throw CyclicDependencyError', () => {
    const graph = new ReasoningGraphStore();
    graph.addNode({ id: 'n1', personaId: 'senior_backend', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });
    graph.addNode({ id: 'n2', personaId: 'senior_frontend', version: 1, status: 'pending', prompt: '', inputContext: {}, artifacts: [] });

    graph.addEdge({ id: 'c1', fromNodeId: 'n1', toNodeId: 'n2', type: 'DEPENDENCY' });
    graph.addEdge({ id: 'c2', fromNodeId: 'n2', toNodeId: 'n1', type: 'DEPENDENCY' });

    expect(() => {
      TopologicalSorter.computeExecutionStages(graph);
    }).toThrow(CyclicDependencyError);
  });
});
