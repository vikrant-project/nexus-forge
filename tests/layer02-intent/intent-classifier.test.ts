import { describe, it, expect } from 'vitest';
import { IntentParser } from '../../src/engine/intent-parser.js';

describe('Layer 02: Intent Classifier & Project Taxonomy', () => {
  it('should classify student management system prompt', () => {
    const req = IntentParser.parseIntent('build a site for student management system');
    expect(req.category).toBe('student-management');
    expect(req.inferredFeatures).toContain('Student Directory & Profiles');
  });

  it('should classify e-commerce shopping prompt', () => {
    const req = IntentParser.parseIntent('create an online shoe store with shopping cart');
    expect(req.category).toBe('e-commerce');
    expect(req.inferredFeatures).toContain('Product Catalog');
  });

  it('should classify appointment booking prompt', () => {
    const req = IntentParser.parseIntent('build a doctor appointment booking system');
    expect(req.category).toBe('booking-appointment');
  });

  it('should construct initial multi-agent DAG for parsed requirements', () => {
    const req = IntentParser.parseIntent('build a site for student management system');
    const { nodes, edges } = IntentParser.buildInitialDAG(req);
    expect(nodes.length).toBeGreaterThanOrEqual(15);
    expect(edges.length).toBeGreaterThanOrEqual(10);
    expect(nodes.some((n) => n.personaId === 'student_management_specialist')).toBe(true);
  });
});
