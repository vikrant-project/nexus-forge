import { describe, it, expect } from 'vitest';
import { DomainCluster } from '../../src/personas/definitions/domains.js';

describe('Layer 18: Domain Specialist Persona Cluster', () => {
  it('should produce complete HTML5 responsive markup for Student Management System', () => {
    const out = DomainCluster.executeStudentManagementSpecialist({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].name).toBe('index.html');
    expect(out.artifacts[0].content).toContain('Executive Academic Dashboard');
    expect(out.artifacts[0].content).toContain('Student Directory & Records');
  });
});
