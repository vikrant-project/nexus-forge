import { describe, it, expect } from 'vitest';
import { PERSONA_ROSTER, RosterRegistry } from '../../src/personas/roster.js';
import { PersonaPromptBuilder } from '../../src/personas/prompt-template.js';

describe('Layer 01: Persona Roster Integrity', () => {
  it('should have exactly 40 registered personas', () => {
    expect(RosterRegistry.count()).toBe(40);
    expect(PERSONA_ROSTER.length).toBe(40);
  });

  it('should have unique IDs and consecutive numbers from 1 to 40', () => {
    const ids = new Set<string>();
    const numbers = new Set<number>();

    for (const p of PERSONA_ROSTER) {
      expect(ids.has(p.id)).toBe(false);
      expect(numbers.has(p.number)).toBe(false);
      ids.add(p.id);
      numbers.add(p.number);
      expect(p.number).toBeGreaterThanOrEqual(1);
      expect(p.number).toBeLessThanOrEqual(40);
    }
  });

  it('should categorize personas into all 9 discipline clusters', () => {
    const disciplines = new Set(PERSONA_ROSTER.map((p) => p.discipline));
    expect(disciplines.size).toBe(9);
    expect(disciplines.has('planning')).toBe(true);
    expect(disciplines.has('backend')).toBe(true);
    expect(disciplines.has('frontend')).toBe(true);
    expect(disciplines.has('visual')).toBe(true);
    expect(disciplines.has('security')).toBe(true);
    expect(disciplines.has('qa')).toBe(true);
    expect(disciplines.has('devops')).toBe(true);
    expect(disciplines.has('domain')).toBe(true);
    expect(disciplines.has('meta')).toBe(true);
  });

  it('should format system prompt adhering strictly to Section 8 template', () => {
    const prompt = PersonaPromptBuilder.buildSystemPrompt(
      'senior_backend',
      'Senior Backend Engineer',
      'Upstream Context Sample',
      'Implement API controller'
    );
    expect(prompt).toContain('You are the single most senior SENIOR BACKEND ENGINEER expert in the world.');
    expect(prompt).toContain('[GRAPH CONTEXT: upstream node outputs relevant to this agent]');
    expect(prompt).toContain('[TASK: specific node responsibility]');
  });
});
