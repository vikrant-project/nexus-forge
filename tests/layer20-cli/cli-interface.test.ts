import { describe, it, expect } from 'vitest';
import { RosterRegistry } from '../../src/personas/roster.js';

describe('Layer 20: CLI Interface & Arguments', () => {
  it('should list all 40 personas across 9 disciplines', () => {
    const personas = RosterRegistry.getAllPersonas();
    expect(personas.length).toBe(40);
  });
});
