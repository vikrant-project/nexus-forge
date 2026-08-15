import { describe, it, expect } from 'vitest';
import { NexusForgeOrchestrator } from '../../src/engine/orchestrator.js';

describe('Layer 22: One Prompt In, Full DAG Out Execution', () => {
  it('should transform a simple prompt into a completed graph with artifacts', async () => {
    const res = await NexusForgeOrchestrator.executePrompt('build a site for student management system');
    expect(res.nodes.every((n) => n.status === 'completed' || n.status === 'revised')).toBe(true);
    expect(res.finalReviewPassed).toBe(true);
  });
});
