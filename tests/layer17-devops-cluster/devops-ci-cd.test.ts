import { describe, it, expect } from 'vitest';
import { DevOpsCluster } from '../../src/personas/definitions/devops.js';

describe('Layer 17: DevOps & CI/CD Pipeline Cluster', () => {
  it('should generate GitHub Actions CI configuration targeting Node 22.x', () => {
    const out = DevOpsCluster.executeCicdPipeline({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].name).toBe('ci.yml');
    expect(out.artifacts[0].content).toContain("node-version: '22.x'");
  });
});
