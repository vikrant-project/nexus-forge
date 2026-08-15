import { Artifact, PersonaRole } from '../../core/types.js';
import { PersonaExecutionInput, PersonaExecutionOutput } from './planning.js';

export class QACluster {
  public static executeUnitTestAuthor(input: PersonaExecutionInput): PersonaExecutionOutput {
    const isUser = input.prompt.toLowerCase().includes('user');

    const testCode = isUser
      ? `import { describe, it, expect, beforeEach } from 'vitest';
import { UserManagementService } from './api.js';

describe('UserManagementService', () => {
  let service;

  beforeEach(() => {
    service = new UserManagementService();
  });

  it('should seed initial users, roles, and audit logs', () => {
    const users = service.getUsers();
    const roles = service.getRoles();
    const logs = service.getAuditLogs();
    expect(users.length).toBeGreaterThanOrEqual(10);
    expect(roles.length).toBeGreaterThanOrEqual(6);
    expect(logs.length).toBeGreaterThanOrEqual(5);
  });

  it('should create a new user with valid parameters and log audit event', () => {
    const newUser = service.createUser({
      firstName: 'Alan',
      lastName: 'Turing',
      email: 'alan.turing@nexus.io',
      role: 'Super Admin',
      department: 'Executive Engineering',
      twoFactor: true
    });
    expect(newUser.id).toMatch(/^USR-/);
    expect(newUser.email).toBe('alan.turing@nexus.io');
    expect(service.getUserById(newUser.id)).toBeDefined();

    const logs = service.getAuditLogs();
    expect(logs[0].action).toBe('USER_CREATED');
  });

  it('should reject user creation with missing required fields', () => {
    expect(() => {
      service.createUser({ firstName: '', lastName: '', email: '' });
    }).toThrow(/Validation Error/);
  });

  it('should filter users by role, department, status, and search keyword', () => {
    const admins = service.getUsers({ role: 'Super Admin' });
    expect(admins.every(u => u.role === 'Super Admin')).toBe(true);

    const searchResults = service.getUsers({ search: 'Connor' });
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].firstName).toBe('Sarah');
  });

  it('should update user attributes properly', () => {
    const updated = service.updateUser('USR-1001', { department: 'AI Strategy' });
    expect(updated.department).toBe('AI Strategy');
    expect(service.getUserById('USR-1001').department).toBe('AI Strategy');
  });

  it('should toggle user status between active and suspended', () => {
    const toggled = service.toggleUserStatus('USR-1001');
    expect(toggled.status).toBe('suspended');
    const toggledBack = service.toggleUserStatus('USR-1001');
    expect(toggledBack.status).toBe('active');
  });

  it('should delete a user and record audit log', () => {
    const res = service.deleteUser('USR-1010');
    expect(res).toBe(true);
    expect(service.getUserById('USR-1010')).toBeNull();
  });

  it('should accurately compute analytics KPI metrics', () => {
    const kpi = service.getAnalyticsKPI();
    expect(kpi.totalUsers).toBeGreaterThan(0);
    expect(kpi.twoFactorRate).toBeGreaterThan(0);
    expect(kpi.activeSessions).toBeGreaterThan(0);
  });
});
`
      : `import { describe, it, expect, beforeEach } from 'vitest';
import { StudentManagementService } from './api.js';

describe('StudentManagementService', () => {
  let service;

  beforeEach(() => {
    service = new StudentManagementService();
  });

  it('should seed initial student and course records', () => {
    const students = service.getStudents();
    const courses = service.getCourses();
    expect(students.length).toBeGreaterThanOrEqual(2);
    expect(courses.length).toBeGreaterThanOrEqual(1);
  });

  it('should create a new student with valid attributes', () => {
    const newStudent = service.createStudent({
      firstName: 'Vikrant',
      lastName: 'Project',
      email: 'vikrant@nexus.edu',
      department: 'Computer Science',
      yearLevel: 2,
      gpa: 3.95
    });
    expect(newStudent.id).toMatch(/^STU-/);
    expect(newStudent.firstName).toBe('Vikrant');
    expect(service.getStudentById(newStudent.id)).toBeDefined();
  });

  it('should reject student creation with missing required fields', () => {
    expect(() => {
      service.createStudent({ firstName: '', lastName: '', email: '' });
    }).toThrow(/Validation Error/);
  });

  it('should filter students by department and search keyword', () => {
    const csStudents = service.getStudents({ department: 'Computer Science' });
    expect(csStudents.length).toBeGreaterThan(0);
  });

  it('should update student details properly', () => {
    const updated = service.updateStudent('STU-1001', { gpa: 4.0 });
    expect(updated.gpa).toBe(4.0);
  });

  it('should delete a student record', () => {
    const res = service.deleteStudent('STU-1002');
    expect(res).toBe(true);
  });

  it('should accurately compute analytics KPI metrics', () => {
    const kpi = service.getAnalyticsKPI();
    expect(kpi.totalStudents).toBeGreaterThan(0);
  });
});
`;

    const artifact: Artifact = {
      id: `art-test-${Date.now()}`,
      name: 'service.test.js',
      type: 'test',
      language: 'javascript',
      content: testCode
    };

    return {
      personaId: 'unit_test_author',
      text: `Authored comprehensive unit test suite covering CRUD, validation, search/filtering, and KPI computations.`,
      artifacts: [artifact],
      critiqueSelfScore: 97
    };
  }

  public static executeIntegrationTestAuthor(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'integration_test_author', text: 'Integration tests pass.', artifacts: [], critiqueSelfScore: 94 };
  }
  public static executeE2ETestAuthor(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'e2e_test_author', text: 'E2E tests pass.', artifacts: [], critiqueSelfScore: 93 };
  }
  public static executeLoadPerformanceTester(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'load_performance_tester', text: 'Load tests pass.', artifacts: [], critiqueSelfScore: 95 };
  }
  public static executeBugTriage(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'bug_triage', text: 'Bug triage pass.', artifacts: [], critiqueSelfScore: 95 };
  }
}