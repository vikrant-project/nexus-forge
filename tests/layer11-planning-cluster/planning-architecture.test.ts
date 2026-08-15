import { describe, it, expect } from 'vitest';
import { PlanningCluster } from '../../src/personas/definitions/planning.js';

describe('Layer 11: Planning & Architecture Persona Cluster', () => {
  it('should execute all 5 planning personas with principal quality output', () => {
    const input = { prompt: 'student management system', graphContext: '' };

    const reqOut = PlanningCluster.executeRequirementsAnalyst(input);
    expect(reqOut.personaId).toBe('requirements_analyst');
    expect(reqOut.artifacts.length).toBe(1);

    const archOut = PlanningCluster.executeSystemsArchitect(input);
    expect(archOut.personaId).toBe('systems_architect');

    const dbOut = PlanningCluster.executeDatabaseDesigner(input);
    expect(dbOut.artifacts[0].content).toContain('CREATE TABLE students');

    const apiOut = PlanningCluster.executeApiDesigner(input);
    expect(apiOut.artifacts[0].content).toContain('/api/records');

    const stackOut = PlanningCluster.executeTechStackSelector(input);
    expect(stackOut.critiqueSelfScore).toBeGreaterThanOrEqual(85);
  });
});
