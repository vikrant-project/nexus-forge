import { describe, it, expect } from 'vitest';
import { MetaCluster } from '../../src/personas/definitions/meta.js';

describe('Layer 19: Meta & Final Review Gatekeeper Cluster', () => {
  it('should sign off on production release with Principal approval', () => {
    const out = MetaCluster.executeFinalReviewAgent({ prompt: 'student management', graphContext: '' });
    expect(out.text).toContain('APPROVED FOR PRODUCTION RELEASE');
    expect(out.critiqueSelfScore).toBeGreaterThanOrEqual(95);
  });

  it('should generate comprehensive README documentation', () => {
    const out = MetaCluster.executeDocumentationAgent({ prompt: 'student management', graphContext: '' });
    expect(out.artifacts[0].name).toBe('README.md');
    expect(out.artifacts[0].content).toContain('Student Management System');
  });
});
