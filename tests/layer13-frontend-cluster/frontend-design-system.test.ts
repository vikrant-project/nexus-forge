import { describe, it, expect } from 'vitest';
import { FrontendCluster } from '../../src/personas/definitions/frontend.js';

describe('Layer 13: Frontend & Design System Persona Cluster', () => {
  it('should produce reactive frontend controller app.js', () => {
    const out = FrontendCluster.executeSeniorFrontend({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].name).toBe('app.js');
    expect(out.artifacts[0].content).toContain('class StudentApp');
  });

  it('should produce dark glassmorphism design system styles.css', () => {
    const out = FrontendCluster.executeDesignSystemTheme({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].name).toBe('styles.css');
    expect(out.artifacts[0].content).toContain('backdrop-filter');
    expect(out.artifacts[0].content).toContain('--accent-gradient');
  });
});
