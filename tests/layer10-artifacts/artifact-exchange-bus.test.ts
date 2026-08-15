import { describe, it, expect } from 'vitest';
import { ReasoningGraphStore } from '../../src/core/graph-store.js';

describe('Layer 10: Artifact Exchange Bus & Storage', () => {
  it('should extract and deduplicate all artifacts from completed nodes', () => {
    const graph = new ReasoningGraphStore();
    graph.addNode({
      id: 'n1',
      personaId: 'requirements_analyst',
      version: 1,
      status: 'completed',
      prompt: '',
      inputContext: {},
      artifacts: [{ id: 'art-1', name: 'SPEC.md', type: 'spec', content: 'Spec content' }]
    });

    graph.addNode({
      id: 'n2',
      personaId: 'database_designer',
      version: 1,
      status: 'completed',
      prompt: '',
      inputContext: {},
      artifacts: [{ id: 'art-2', name: 'schema.sql', type: 'schema', content: 'CREATE TABLE...' }]
    });

    const all = graph.getAllArtifacts();
    expect(all.length).toBe(2);
    expect(all.map((a) => a.name)).toEqual(['SPEC.md', 'schema.sql']);
  });
});
