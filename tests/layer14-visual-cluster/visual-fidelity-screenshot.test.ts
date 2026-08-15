import { describe, it, expect } from 'vitest';
import { VisualCluster } from '../../src/personas/definitions/visual.js';
import { VisualComparator } from '../../src/engine/visual-comparator.js';

describe('Layer 14: Visual Fidelity & Screenshot-Match Persona Cluster', () => {
  it('should score visual fidelity >= 90 for glassmorphism styling', () => {
    const css = ':root { --accent-gradient: linear-gradient(135deg, #6366f1, #a855f7); } .card { backdrop-filter: blur(12px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }';
    const html = '<div class="kpi-grid"><div class="card kpi-card"></div></div><div class="modal-backdrop"></div>';

    const result = VisualComparator.evaluateFidelity(html, css);
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.verdict).toBe('EXCEPTIONAL_FIDELITY');
  });

  it('should execute screenshot match critique agent', () => {
    const out = VisualCluster.executeScreenshotMatchCritique({ prompt: 'student management', graphContext: '' });
    expect(out.critiqueSelfScore).toBeGreaterThanOrEqual(90);
  });
});
