import { describe, it, expect } from 'vitest';
import { NexusForgeOrchestrator } from '../../src/engine/orchestrator.js';

describe('Layer 25: E-Commerce System Synthesis E2E', () => {
  it('should synthesize full e-commerce project graph', async () => {
    const res = await NexusForgeOrchestrator.executePrompt('build an online shopping platform with cart and checkout');
    expect(res.category).toBe('e-commerce');
    expect(res.finalReviewPassed).toBe(true);
    expect(res.artifacts.length).toBeGreaterThan(0);
  });
});
