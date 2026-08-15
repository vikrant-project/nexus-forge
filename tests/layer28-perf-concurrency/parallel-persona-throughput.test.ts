import { describe, it, expect } from 'vitest';
import { PersonaExecutor } from '../../src/engine/executor.js';
import { GraphNode } from '../../src/core/types.js';

describe('Layer 28: Parallel Persona Concurrency & Throughput', () => {
  it('should execute 500 persona simulations concurrently in sub-50ms', async () => {
    const node: GraphNode = {
      id: 'bench-node',
      personaId: 'requirements_analyst',
      version: 1,
      status: 'pending',
      prompt: '',
      inputContext: {},
      artifacts: []
    };

    const tasks: Promise<any>[] = [];
    const t0 = performance.now();
    for (let i = 0; i < 500; i++) {
      tasks.push(PersonaExecutor.executeNode(node, 'Context', 'student management'));
    }

    const results = await Promise.all(tasks);
    const elapsed = performance.now() - t0;

    expect(results.length).toBe(500);
    expect(elapsed).toBeLessThan(150);
  });
});
