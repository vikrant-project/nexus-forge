import { describe, it, expect } from 'vitest';
import { NexusForgeOrchestrator } from '../../src/engine/orchestrator.js';

describe('Layer 09: Multi-Agent Orchestrator Pipeline', () => {
  it('should execute end-to-end orchestration pipeline on prompt', async () => {
    const result = await NexusForgeOrchestrator.executePrompt('build a site for student management system');
    expect(result.jobId).toBeDefined();
    expect(result.category).toBe('student-management');
    expect(result.nodes.length).toBeGreaterThanOrEqual(15);
    expect(result.artifacts.length).toBeGreaterThanOrEqual(5);
    expect(result.finalReviewPassed).toBe(true);
  });
});
