import { describe, it, expect } from 'vitest';
import { NexusForgeOrchestrator } from '../../src/engine/orchestrator.js';

describe('Layer 26: Student Management System Synthesis E2E', () => {
  it('should synthesize complete Student Management System with all required web artifacts', async () => {
    const res = await NexusForgeOrchestrator.executePrompt('build a site for student management system');
    expect(res.category).toBe('student-management');
    
    const fileNames = res.artifacts.map((a) => a.name);
    expect(fileNames).toContain('index.html');
    expect(fileNames).toContain('styles.css');
    expect(fileNames).toContain('app.js');
    expect(fileNames).toContain('api.js');
    expect(fileNames).toContain('service.test.js');
    expect(fileNames).toContain('README.md');
    expect(fileNames).toContain('SECURITY_AUDIT_REPORT.md');
  });
});
