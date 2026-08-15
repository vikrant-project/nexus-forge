import { describe, it, expect } from 'vitest';
import { QACluster } from '../../src/personas/definitions/qa.js';

describe('Layer 16: Quality Assurance & Test Author Cluster', () => {
  it('should generate executable unit test suite for student service', () => {
    const out = QACluster.executeUnitTestAuthor({ prompt: 'student management system', graphContext: '' });
    expect(out.artifacts[0].name).toBe('service.test.js');
    expect(out.artifacts[0].content).toContain("describe('StudentManagementService'");
  });
});
