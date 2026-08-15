import { describe, it, expect } from 'vitest';
import { CritiqueEngine } from '../../src/engine/critique-engine.js';
import { GraphNode } from '../../src/core/types.js';

describe('Layer 05: Critique Engine & Scoring Rubric', () => {
  it('should score high-quality node output with artifacts', () => {
    const node: GraphNode = {
      id: 'node-test',
      personaId: 'database_designer',
      version: 1,
      status: 'completed',
      prompt: 'Design DB',
      inputContext: {},
      output: 'Successfully generated database schema with referential integrity.',
      artifacts: [{ id: 'a1', name: 'schema.sql', type: 'schema', content: 'CREATE TABLE...' }],
      critiqueScore: 94
    };

    const critique = CritiqueEngine.evaluateNodeOutput(node);
    expect(critique.passed).toBe(true);
    expect(critique.score).toBeGreaterThanOrEqual(90);
    expect(critique.strengths.length).toBeGreaterThan(0);
  });

  it('should flag output needing revision if score is below threshold', () => {
    const node: GraphNode = {
      id: 'node-weak',
      personaId: 'cyber_security_auditor',
      version: 1,
      status: 'completed',
      prompt: 'Audit code',
      inputContext: {},
      output: '',
      artifacts: [],
      critiqueScore: 60
    };

    const critique = CritiqueEngine.evaluateNodeOutput(node);
    expect(critique.passed).toBe(false);
    expect(critique.verdict).toContain('NEEDS_REVISION');
  });
});
