import { Artifact, PersonaRole } from '../../core/types.js';
import { PersonaExecutionInput, PersonaExecutionOutput } from './planning.js';

export class BackendCluster {
  public static executeSeniorBackend(input: PersonaExecutionInput): PersonaExecutionOutput {
    const isUser = (input.prompt || '').toLowerCase().includes('user');
    const isStudent = (input.prompt || '').toLowerCase().includes('student');

    let backendCode = '';
    if (isUser) {
      backendCode = `// Nexus Forge User Management & Identity Business Engine
export class UserManagementService {
  constructor() {
    this.users = new Map();
    this.roles = new Map();
    this.auditLogs = [];
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Seed Roles & Permissions
    const initialRoles = [
      { id: 'ROLE-1', name: 'Super Admin', description: 'Unrestricted root authority across all services', permissions: ['all'], memberCount: 1 },
      { id: 'ROLE-2', name: 'System Admin', description: 'Full access to user lifecycle, security settings, and audits', permissions: ['user:read', 'user:write', 'user:delete', 'roles:manage', 'audit:read', 'audit:export'], memberCount: 2 },
      { id: 'ROLE-3', name: 'Team Lead', description: 'Department management, onboarding, and team reporting', permissions: ['user:read', 'user:write', 'audit:read'], memberCount: 3 },
      { id: 'ROLE-4', name: 'Senior Engineer', description: 'Standard platform developer with pipeline and API access', permissions: ['user:read'], memberCount: 4 },
      { id: 'ROLE-5', name: 'Product Manager', description: 'Product analytics, roadmaps, and read-only member lists', permissions: ['user:read'], memberCount: 2 },
      { id: 'ROLE-6', name: 'Security Auditor', description: 'Compliance inspection, security telemetry, and forensic exports', permissions: ['user:read', 'audit:read', 'audit:export'], memberCount: 1 },
      { id: 'ROLE-7', name: 'Viewer', description: 'Restricted read-only access for external stakeholders', permissions: ['user:read:limited'], memberCount: 1 }
    ];
    for (const r of initialRoles) this.roles.set(r.name, r);

    // 2. Seed Users
    const initialUsers = [
      { id: 'USR-1001', firstName: 'Vikrant', lastName: 'Sharma', email: 'vikrant.admin@nexus.io', role: 'Super Admin', department: 'Executive Engineering', status: 'active', twoFactor: true, lastActive: 'Just now', createdAt: '2025-01-10T09:00:00Z' },
      { id: 'USR-1002', firstName: 'Sarah', lastName: 'Connor', email: 'sarah.c@nexus.io', role: 'System Admin', department: 'Security & Operations', status: 'active', twoFactor: true, lastActive: '5m ago', createdAt: '2025-01-15T11:20:00Z' },
      { id: 'USR-1003', firstName: 'David', lastName: 'Kim', email: 'david.k@nexus.io', role: 'Team Lead', department: 'Core Platform', status: 'active', twoFactor: true, lastActive: '12m ago', createdAt: '2025-02-01T14:45:00Z' },
      { id: 'USR-1004', firstName: 'Amara', lastName: 'Okafor', email: 'amara.o@nexus.io', role: 'Senior Engineer', department: 'Distributed Systems', status: 'active', twoFactor: true, lastActive: '1h ago', createdAt: '2025-02-10T10:15:00Z' },
      { id: 'USR-1005', firstName: 'Lucas', lastName: 'Muller', email: 'lucas.m@nexus.io', role: 'Product Manager', department: 'Product Design', status: 'active', twoFactor: false, lastActive: '3h ago', createdAt: '2025-02-18T16:00:00Z' },
      { id: 'USR-1006', firstName: 'Elena', lastName: 'Vasquez', email: 'elena.v@nexus.io', role: 'Security Auditor', department: 'Cyber Security', status: 'active', twoFactor: true, lastActive: 'Yesterday', createdAt: '2025-03-01T08:30:00Z' },
      { id: 'USR-1007', firstName: 'Zack', lastName: 'Taylor', email: 'zack.t@nexus.io', role: 'Senior Engineer', department: 'Frontend Architecture', status: 'inactive', twoFactor: false, lastActive: '3 days ago', createdAt: '2025-03-12T13:10:00Z' },
      { id: 'USR-1008', firstName: 'Priya', lastName: 'Patel', email: 'priya.p@nexus.io', role: 'Team Lead', department: 'Data Intelligence', status: 'active', twoFactor: true, lastActive: '2h ago', createdAt: '2025-04-05T09:40:00Z' },
      { id: 'USR-1009', firstName: 'Marcus', lastName: 'Brody', email: 'marcus.b@nexus.io', role: 'Viewer', department: 'External Audit', status: 'suspended', twoFactor: false, lastActive: '1 week ago', createdAt: '2025-04-20T17:00:00Z' },
      { id: 'USR-1010', firstName: 'Chloe', lastName: 'Bennett', email: 'chloe.b@nexus.io', role: 'Senior Engineer', department: 'Cloud Infrastructure', status: 'pending', twoFactor: false, lastActive: 'Never', createdAt: '2025-05-02T12:00:00Z' }
    ];
    for (const u of initialUsers) this.users.set(u.id, u);

    // 3. Seed Audit Logs
    const initialLogs = [
      { id: 'LOG-501', timestamp: '2 mins ago', actor: 'vikrant.admin@nexus.io', action: 'ROLE_PERMISSION_UPDATED', target: 'Security Auditor', ip: '192.168.1.10', severity: 'warning' },
      { id: 'LOG-502', timestamp: '14 mins ago', actor: 'sarah.c@nexus.io', action: 'USER_CREATED', target: 'chloe.b@nexus.io', ip: '10.0.4.22', severity: 'info' },
      { id: 'LOG-503', timestamp: '1 hour ago', actor: 'system-auth', action: 'FAILED_LOGIN_ALERT', target: 'marcus.b@nexus.io', ip: '185.220.101.5', severity: 'critical' },
      { id: 'LOG-504', timestamp: '3 hours ago', actor: 'david.k@nexus.io', action: 'PASSWORD_RESET_TRIGGERED', target: 'amara.o@nexus.io', ip: '10.0.2.14', severity: 'info' },
      { id: 'LOG-505', timestamp: 'Yesterday', actor: 'sarah.c@nexus.io', action: 'USER_STATUS_SUSPENDED', target: 'marcus.b@nexus.io', ip: '10.0.4.22', severity: 'warning' }
    ];
    this.auditLogs = [...initialLogs];
  }

  getUsers(filter = {}) {
    let list = Array.from(this.users.values());
    if (filter.role) list = list.filter(u => u.role === filter.role);
    if (filter.status) list = list.filter(u => u.status === filter.status);
    if (filter.department) list = list.filter(u => u.department === filter.department);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(u =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getUserById(id) {
    return this.users.get(id) || null;
  }

  createUser(data) {
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error('Validation Error: First name, last name, and email are required.');
    }
    const id = data.id || 'USR-' + Math.floor(1000 + Math.random() * 9000);
    const newUser = {
      id,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      role: data.role || 'Senior Engineer',
      department: data.department || 'Core Engineering',
      status: data.status || 'active',
      twoFactor: Boolean(data.twoFactor),
      lastActive: 'Just now',
      createdAt: new Date().toISOString()
    };
    this.users.set(id, newUser);
    this.logSecurityEvent('USER_CREATED', newUser.email, 'info');
    return newUser;
  }

  updateUser(id, data) {
    const existing = this.users.get(id);
    if (!existing) throw new Error('User not found: ' + id);
    const updated = { ...existing, ...data, id };
    this.users.set(id, updated);
    this.logSecurityEvent('USER_UPDATED', updated.email, 'info');
    return updated;
  }

  deleteUser(id) {
    const existing = this.users.get(id);
    if (existing) {
      this.logSecurityEvent('USER_DELETED', existing.email, 'warning');
      return this.users.delete(id);
    }
    return false;
  }

  toggleUserStatus(id) {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    user.status = (user.status === 'active') ? 'suspended' : 'active';
    this.users.set(id, user);
    this.logSecurityEvent('USER_STATUS_TOGGLED', user.email + ' -> ' + user.status, user.status === 'suspended' ? 'warning' : 'info');
    return user;
  }

  getRoles() {
    return Array.from(this.roles.values());
  }

  getAuditLogs() {
    return [...this.auditLogs];
  }

  logSecurityEvent(action, target, severity = 'info') {
    const newLog = {
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: 'Just now',
      actor: 'admin@nexus.io',
      action,
      target,
      ip: '127.0.0.1',
      severity
    };
    this.auditLogs.unshift(newLog);
  }

  getAnalyticsKPI() {
    const users = Array.from(this.users.values());
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const twoFactorCount = users.filter(u => u.twoFactor).length;
    const twoFactorRate = totalUsers > 0 ? Math.round((twoFactorCount / totalUsers) * 100) : 0;
    const suspendedCount = users.filter(u => u.status === 'suspended').length;

    return {
      totalUsers,
      activeUsers,
      twoFactorRate,
      suspendedCount,
      activeSessions: Math.round(activeUsers * 1.4),
      securityAlertCount: this.auditLogs.filter(l => l.severity === 'critical' || l.severity === 'warning').length
    };
  }
}
`;
    } else if (isStudent) {
      backendCode = `// Student Management Service
export class StudentManagementService {
  constructor() {
    this.students = new Map();
    this.courses = new Map();
    this.seedInitialData();
  }
  seedInitialData() {
    const s = [
      { id: 'STU-1001', firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@nexus.edu', department: 'Computer Science', yearLevel: 3, gpa: 3.92, status: 'active' },
      { id: 'STU-1002', firstName: 'Elena', lastName: 'Rostova', email: 'elena.rostova@nexus.edu', department: 'Data Science', yearLevel: 4, gpa: 3.85, status: 'active' }
    ];
    for (const x of s) this.students.set(x.id, x);
    const c = [{ id: 'CRS-301', code: 'CS-301', title: 'Distributed Systems', department: 'Computer Science', credits: 4, capacity: 45, enrolled: 38 }];
    for (const x of c) this.courses.set(x.id, x);
  }
  getStudents(filter = {}) { return Array.from(this.students.values()); }
  getStudentById(id) { return this.students.get(id) || null; }
  createStudent(data) {
    if (!data.firstName || !data.lastName || !data.email) throw new Error('Validation Error');
    const id = data.id || 'STU-' + Math.floor(1000 + Math.random() * 9000);
    const s = { id, ...data };
    this.students.set(id, s);
    return s;
  }
  updateStudent(id, data) { const ex = this.students.get(id); if (!ex) throw new Error('Not found'); const u = { ...ex, ...data, id }; this.students.set(id, u); return u; }
  deleteStudent(id) { return this.students.delete(id); }
  getCourses() { return Array.from(this.courses.values()); }
  getAnalyticsKPI() { return { totalStudents: this.students.size, activeStudents: this.students.size, averageGPA: 3.88, totalCourses: 1, totalEnrolled: 38, enrollmentRate: 85 }; }
}`;
    } else {
      backendCode = `export class GenericBackendService {
  constructor() { this.records = new Map(); }
  getAll() { return Array.from(this.records.values()); }
  create(data) { const id = 'REC-' + Date.now(); const rec = { id, ...data }; this.records.set(id, rec); return rec; }
  delete(id) { return this.records.delete(id); }
}`;
    }

    const artifact: Artifact = {
      id: `art-be-${Date.now()}`,
      name: 'api.js',
      type: 'code',
      language: 'javascript',
      content: backendCode
    };

    return {
      personaId: 'senior_backend',
      text: `Engineered senior backend logic with robust CRUD, filtering, aggregate analytics, and relational constraints.`,
      artifacts: [artifact],
      critiqueSelfScore: 96
    };
  }

  public static executeAuthSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    const artifact: Artifact = {
      id: `art-auth-${Date.now()}`,
      name: 'auth-manager.js',
      type: 'code',
      language: 'javascript',
      content: `export class AuthManager {
  static currentUser = { id: 'USR-ROOT-1', name: 'Principal Administrator', email: 'admin@nexus.io', role: 'Super Admin', permissions: ['all'] };
  static getCurrentUser() { return this.currentUser; }
  static hasPermission(perm) {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes('all') || this.currentUser.permissions.includes(perm);
  }
  static sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
}`
    };

    return {
      personaId: 'auth_specialist',
      text: `Implemented secure session authority, RBAC permission checker, and input sanitization layer.`,
      artifacts: [artifact],
      critiqueSelfScore: 95
    };
  }

  public static executePaymentSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'payment_specialist', text: 'Payment specialist pass.', artifacts: [], critiqueSelfScore: 92 };
  }
  public static executeCachingPerformance(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'caching_performance', text: 'Caching pass.', artifacts: [], critiqueSelfScore: 93 };
  }
  public static executeBackgroundJobs(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'background_jobs', text: 'Background jobs pass.', artifacts: [], critiqueSelfScore: 91 };
  }
}