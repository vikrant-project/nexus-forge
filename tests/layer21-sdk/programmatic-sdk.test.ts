import { describe, it, expect } from 'vitest';
import * as NexusForge from '../../src/index.js';

describe('Layer 21: Programmatic TypeScript SDK', () => {
  it('should export all core classes, types, and orchestrators', () => {
    expect(NexusForge.NexusForgeOrchestrator).toBeDefined();
    expect(NexusForge.ReasoningGraphStore).toBeDefined();
    expect(NexusForge.TopologicalSorter).toBeDefined();
    expect(NexusForge.ContextBus).toBeDefined();
    expect(NexusForge.RosterRegistry).toBeDefined();
    expect(NexusForge.IntentParser).toBeDefined();
    expect(NexusForge.CritiqueEngine).toBeDefined();
  });
});
