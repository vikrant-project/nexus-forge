import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';
import { ContextBus } from '../../src/core/context-bus.js';

describe('Layer 08: Context Bus & State Isolation', () => {
  it('should aggregate only upstream outputs and format context string', () => {
    const graph = new ReasoningGraphStore();
    graph.addNode({
      id: 'req',
      personaId: 'requirements_analyst',
      version: 1,
      status: 'completed',
      prompt: '',
      inputContext: {},
      output: 'Requirements: Student Directory CRUD',
      artifacts: [{ id: 'a1', name: 'req.md', type: 'spec', content: 'Spec' }]
    });

    graph.addNode({
      id: 'arch',
      personaId: 'systems_architect',
      version: 1,
      status: 'pending',
      prompt: '',
      inputContext: {},
      artifacts: []
    });

    graph.addEdge({ id: 'e1', fromNodeId: 'req', toNodeId: 'arch', type: 'DEPENDENCY' });

    const context = ContextBus.buildNodeContext(graph, 'arch');
    expect(context.upstreamOutputs.length).toBe(1);
    expect(context.upstreamOutputs[0].personaId).toBe('requirements_analyst');

    const formatted = ContextBus.formatGraphContextString(context.upstreamOutputs);
    expect(formatted).toContain('[UPSTREAM AGENT: REQUIREMENTS_ANALYST]');
    expect(formatted).toContain('Requirements: Student Directory CRUD');
  });
});
