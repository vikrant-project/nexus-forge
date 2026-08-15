import { describe, it, expect } from 'vitest';
import { BackendCluster } from '../../src/personas/definitions/backend.js';

describe('Layer 12: Backend Engineering Persona Cluster', () => {
  it('should execute Senior Backend and produce student service engine', () => {
    const out = BackendCluster.executeSeniorBackend({ prompt: 'student management system', graphContext: '' });
    expect(out.personaId).toBe('senior_backend');
    expect(out.artifacts[0].name).toBe('api.js');
    expect(out.artifacts[0].content).toContain('class StudentManagementService');
  });

  it('should execute Auth Specialist and produce security auth manager', () => {
    const out = BackendCluster.executeAuthSpecialist({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].content).toContain('class AuthManager');
  });
});
