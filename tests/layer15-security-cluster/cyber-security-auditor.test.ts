import { describe, it, expect } from 'vitest';
import { SecurityCluster } from '../../src/personas/definitions/security.js';

describe('Layer 15: Cyber Security Auditor Persona Cluster', () => {
  it('should execute security audit and report 0 vulnerabilities', () => {
    const out = SecurityCluster.executeCyberSecurityAuditor({ prompt: 'student management', graphContext: '' });
    expect(out.artifacts[0].name).toBe('SECURITY_AUDIT_REPORT.md');
    expect(out.artifacts[0].content).toContain('0 Critical, 0 High Vulnerabilities');
    expect(out.critiqueSelfScore).toBeGreaterThanOrEqual(95);
  });
});
