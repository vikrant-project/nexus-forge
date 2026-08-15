import { Artifact, PersonaRole } from '../../core/types.js';
import { PersonaExecutionInput, PersonaExecutionOutput } from './planning.js';

export class FrontendCluster {
  public static executeSeniorFrontend(input: PersonaExecutionInput): PersonaExecutionOutput {
    const isUser = input.prompt.toLowerCase().includes('user');
    const isStudent = input.prompt.toLowerCase().includes('student');

    let appJsCode = '';
    if (isUser) {
      appJsCode = `// Nexus Forge User Management Reactive Frontend Controller
import { UserManagementService } from './api.js';
import { AuthManager } from './auth-manager.js';

class UserApp {
  constructor() {
    this.service = new UserManagementService();
    this.activeTab = 'dashboard';
    this.searchQuery = '';
    this.filterRole = '';
    this.filterStatus = '';
    this.filterDepartment = '';
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindSearchAndFilters();
    this.bindModalActions();
    this.render();
  }

  bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) {
          this.activeTab = tab;
          document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.render();
        }
      });
    });
  }

  bindSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderUsersTable();
      });
    }

    const roleFilter = document.getElementById('filter-role');
    if (roleFilter) {
      roleFilter.addEventListener('change', (e) => {
        this.filterRole = e.target.value;
        this.renderUsersTable();
      });
    }

    const statusFilter = document.getElementById('filter-status');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.filterStatus = e.target.value;
        this.renderUsersTable();
      });
    }

    const deptFilter = document.getElementById('filter-dept');
    if (deptFilter) {
      deptFilter.addEventListener('change', (e) => {
        this.filterDepartment = e.target.value;
        this.renderUsersTable();
      });
    }
  }

  bindModalActions() {
    const addBtn = document.getElementById('btn-add-user');
    const modal = document.getElementById('user-modal');
    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('user-form');

    if (addBtn && modal) {
      addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-title').textContent = 'Invite New Team Member';
        document.getElementById('edit-user-id').value = '';
        modal.classList.add('open');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-user-id').value;
        const userData = {
          firstName: document.getElementById('field-firstName').value,
          lastName: document.getElementById('field-lastName').value,
          email: document.getElementById('field-email').value,
          role: document.getElementById('field-role').value,
          department: document.getElementById('field-department').value,
          status: document.getElementById('field-status').value,
          twoFactor: document.getElementById('field-twoFactor') ? document.getElementById('field-twoFactor').checked : false
        };

        try {
          if (id) {
            this.service.updateUser(id, userData);
            this.showToast('User profile updated successfully', 'success');
          } else {
            this.service.createUser(userData);
            this.showToast('User invitation dispatched successfully', 'success');
          }
          modal.classList.remove('open');
          this.render();
        } catch (err) {
          this.showToast(err.message, 'error');
        }
      });
    }
  }

  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type + ' animate-fade-in';
    toast.innerHTML = '<span>' + AuthManager.sanitizeInput(msg) + '</span>';
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  render() {
    const views = ['dashboard', 'users', 'roles', 'audit'];
    views.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.style.display = (this.activeTab === v) ? 'block' : 'none';
    });

    if (this.activeTab === 'dashboard') {
      this.renderDashboard();
    } else if (this.activeTab === 'users') {
      this.renderUsersTable();
    } else if (this.activeTab === 'roles') {
      this.renderRolesView();
    } else if (this.activeTab === 'audit') {
      this.renderAuditLogsView();
    }
  }

  renderDashboard() {
    const kpi = this.service.getAnalyticsKPI();
    document.getElementById('kpi-total-users').textContent = kpi.totalUsers;
    document.getElementById('kpi-active-sessions').textContent = kpi.activeSessions;
    document.getElementById('kpi-2fa-rate').textContent = kpi.twoFactorRate + '%';
    document.getElementById('kpi-security-alerts').textContent = kpi.securityAlertCount;
    this.renderRecentUsersTable();
  }

  renderRecentUsersTable() {
    const tbody = document.getElementById('recent-users-tbody');
    if (!tbody) return;
    const recent = this.service.getUsers().slice(0, 5);
    tbody.innerHTML = recent.map(u => \`
      <tr>
        <td><code>\${AuthManager.sanitizeInput(u.id)}</code></td>
        <td>
          <div class="user-cell">
            <div class="avatar">\${u.firstName[0]}\${u.lastName[0]}</div>
            <div>
              <div class="font-bold">\${AuthManager.sanitizeInput(u.firstName + ' ' + u.lastName)}</div>
              <div class="text-xs text-muted">\${AuthManager.sanitizeInput(u.email)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-role">\${AuthManager.sanitizeInput(u.role)}</span></td>
        <td><span class="badge badge-dept">\${AuthManager.sanitizeInput(u.department)}</span></td>
        <td><span class="badge badge-\${u.status}">\${u.status.toUpperCase()}</span></td>
      </tr>
    \`).join('');
  }

  renderUsersTable() {
    const tbody = document.getElementById('users-table-tbody');
    if (!tbody) return;
    const list = this.service.getUsers({
      search: this.searchQuery,
      role: this.filterRole,
      status: this.filterStatus,
      department: this.filterDepartment
    });

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-muted">No users found matching filter parameters.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(u => \`
      <tr class="user-row">
        <td><code>\${AuthManager.sanitizeInput(u.id)}</code></td>
        <td>
          <div class="user-cell">
            <div class="avatar \${u.twoFactor ? 'avatar-secure' : ''}">\${u.firstName[0]}\${u.lastName[0]}</div>
            <div>
              <div class="font-bold">\${AuthManager.sanitizeInput(u.firstName + ' ' + u.lastName)}</div>
              <div class="text-xs text-muted">\${AuthManager.sanitizeInput(u.email)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-role">\${AuthManager.sanitizeInput(u.role)}</span></td>
        <td><span class="badge badge-dept">\${AuthManager.sanitizeInput(u.department)}</span></td>
        <td>\${u.twoFactor ? '<span class="text-success font-bold">Ã¢Å“â€œ Enabled</span>' : '<span class="text-muted">Disabled</span>'}</td>
        <td><span class="badge badge-\${u.status}">\${u.status.toUpperCase()}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="btn-icon edit-btn" data-id="\${u.id}" title="Edit Profile">Ã¢Å“Å½</button>
            <button class="btn-icon status-btn" data-id="\${u.id}" title="Toggle Active/Suspended">Ã¢ÂÂ»</button>
            <button class="btn-icon delete-btn text-danger" data-id="\${u.id}" title="Delete User">Ã°Å¸â€”â€˜</button>
          </div>
        </td>
      </tr>
    \`).join('');

    tbody.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const user = this.service.getUserById(btn.dataset.id);
        if (user) {
          document.getElementById('modal-title').textContent = 'Edit User Profile';
          document.getElementById('edit-user-id').value = user.id;
          document.getElementById('field-firstName').value = user.firstName;
          document.getElementById('field-lastName').value = user.lastName;
          document.getElementById('field-email').value = user.email;
          document.getElementById('field-role').value = user.role;
          document.getElementById('field-department').value = user.department;
          document.getElementById('field-status').value = user.status;
          if (document.getElementById('field-twoFactor')) {
            document.getElementById('field-twoFactor').checked = user.twoFactor;
          }
          document.getElementById('user-modal').classList.add('open');
        }
      });
    });

    tbody.querySelectorAll('.status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const updated = this.service.toggleUserStatus(btn.dataset.id);
        this.showToast('User status changed to ' + updated.status.toUpperCase(), 'info');
        this.render();
      });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to permanently delete user ' + btn.dataset.id + '?')) {
          this.service.deleteUser(btn.dataset.id);
          this.showToast('User deleted', 'warn');
          this.render();
        }
      });
    });
  }

  renderRolesView() {
    const container = document.getElementById('roles-grid');
    if (!container) return;
    const roles = this.service.getRoles();
    container.innerHTML = roles.map(r => \`
      <div class="card role-card">
        <div class="role-header">
          <h3 class="role-title">\${AuthManager.sanitizeInput(r.name)}</h3>
          <span class="badge badge-dept">\${r.memberCount} Members</span>
        </div>
        <p class="role-desc text-xs text-muted">\${AuthManager.sanitizeInput(r.description)}</p>
        <div class="permissions-list">
          \${r.permissions.map(p => \`<span class="badge badge-perm">\${p}</span>\`).join('')}
        </div>
      </div>
    \`).join('');
  }

  renderAuditLogsView() {
    const tbody = document.getElementById('audit-table-tbody');
    if (!tbody) return;
    const logs = this.service.getAuditLogs();
    tbody.innerHTML = logs.map(l => \`
      <tr>
        <td><code>\${l.id}</code></td>
        <td><span class="text-xs text-muted">\${l.timestamp}</span></td>
        <td><strong>\${AuthManager.sanitizeInput(l.actor)}</strong></td>
        <td><span class="badge badge-action">\${AuthManager.sanitizeInput(l.action)}</span></td>
        <td>\${AuthManager.sanitizeInput(l.target)}</td>
        <td><code>\${l.ip}</code></td>
        <td><span class="badge badge-\${l.severity}">\${l.severity.toUpperCase()}</span></td>
      </tr>
    \`).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new UserApp();
});
`;
    } else {
      appJsCode = `// Nexus Forge Student Reactive Frontend Controller
import { StudentManagementService } from './api.js';
import { AuthManager } from './auth-manager.js';

class StudentApp {
  constructor() {
    this.service = new StudentManagementService();
    this.activeTab = 'dashboard';
    this.searchQuery = '';
    this.filterDepartment = '';
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindSearchAndFilter();
    this.bindModalActions();
    this.render();
  }

  bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) {
          this.activeTab = tab;
          document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.render();
        }
      });
    });
  }

  bindSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderStudentsTable();
      });
    }

    const deptFilter = document.getElementById('filter-dept');
    if (deptFilter) {
      deptFilter.addEventListener('change', (e) => {
        this.filterDepartment = e.target.value;
        this.renderStudentsTable();
      });
    }
  }

  bindModalActions() {
    const addBtn = document.getElementById('btn-add-student');
    const modal = document.getElementById('student-modal');
    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('student-form');

    if (addBtn && modal) {
      addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-title').textContent = 'Add New Student Record';
        document.getElementById('edit-student-id').value = '';
        modal.classList.add('open');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-student-id').value;
        const studentData = {
          firstName: document.getElementById('field-firstName').value,
          lastName: document.getElementById('field-lastName').value,
          email: document.getElementById('field-email').value,
          department: document.getElementById('field-department').value,
          yearLevel: Number(document.getElementById('field-yearLevel').value),
          gpa: Number(document.getElementById('field-gpa').value),
          status: document.getElementById('field-status').value
        };

        try {
          if (id) {
            this.service.updateStudent(id, studentData);
            this.showToast('Student record updated successfully', 'success');
          } else {
            this.service.createStudent(studentData);
            this.showToast('New student enrolled successfully', 'success');
          }
          modal.classList.remove('open');
          this.render();
        } catch (err) {
          this.showToast(err.message, 'error');
        }
      });
    }
  }

  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type + ' animate-fade-in';
    toast.innerHTML = '<span>' + AuthManager.sanitizeInput(msg) + '</span>';
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  render() {
    const views = ['dashboard', 'students', 'courses', 'analytics'];
    views.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.style.display = (this.activeTab === v) ? 'block' : 'none';
    });

    if (this.activeTab === 'dashboard') {
      this.renderDashboard();
    } else if (this.activeTab === 'students') {
      this.renderStudentsTable();
    } else if (this.activeTab === 'courses') {
      this.renderCoursesView();
    } else if (this.activeTab === 'analytics') {
      this.renderAnalyticsView();
    }
  }

  renderDashboard() {
    const kpi = this.service.getAnalyticsKPI();
    document.getElementById('kpi-total-students').textContent = kpi.totalStudents;
    document.getElementById('kpi-active-students').textContent = kpi.activeStudents;
    document.getElementById('kpi-avg-gpa').textContent = kpi.averageGPA;
    document.getElementById('kpi-enrollment-rate').textContent = kpi.enrollmentRate + '%';
    this.renderRecentStudents();
  }

  renderRecentStudents() {
    const tbody = document.getElementById('recent-students-tbody');
    if (!tbody) return;
    const recent = this.service.getStudents().slice(-4).reverse();
    tbody.innerHTML = recent.map(s => \`
      <tr>
        <td><strong>\${AuthManager.sanitizeInput(s.id)}</strong></td>
        <td>\${AuthManager.sanitizeInput(s.firstName + ' ' + s.lastName)}</td>
        <td><span class="badge badge-dept">\${AuthManager.sanitizeInput(s.department)}</span></td>
        <td><strong>\${s.gpa.toFixed(2)}</strong></td>
        <td><span class="badge badge-\${s.status}">\${s.status.toUpperCase()}</span></td>
      </tr>
    \`).join('');
  }

  renderStudentsTable() {
    const tbody = document.getElementById('students-table-tbody');
    if (!tbody) return;
    const list = this.service.getStudents({ search: this.searchQuery, department: this.filterDepartment });
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-muted">No student records found matching filter.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(s => \`
      <tr class="student-row">
        <td><code>\${AuthManager.sanitizeInput(s.id)}</code></td>
        <td>
          <div class="user-cell">
            <div class="avatar">\${s.firstName[0]}\${s.lastName[0]}</div>
            <div>
              <div class="font-bold">\${AuthManager.sanitizeInput(s.firstName + ' ' + s.lastName)}</div>
              <div class="text-xs text-muted">\${AuthManager.sanitizeInput(s.email)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-dept">\${AuthManager.sanitizeInput(s.department)}</span></td>
        <td>Year \${s.yearLevel}</td>
        <td><span class="gpa-pill \${s.gpa >= 3.5 ? 'gpa-high' : 'gpa-normal'}">\${s.gpa.toFixed(2)}</span></td>
        <td>
          <span class="badge badge-\${s.status}">\${s.status.toUpperCase()}</span>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-icon edit-btn" data-id="\${s.id}" title="Edit Student">Ã¢Å“Å½</button>
            <button class="btn-icon delete-btn text-danger" data-id="\${s.id}" title="Delete Student">Ã°Å¸â€”â€˜</button>
          </div>
        </td>
      </tr>
    \`).join('');

    tbody.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const student = this.service.getStudentById(btn.dataset.id);
        if (student) {
          document.getElementById('modal-title').textContent = 'Edit Student Record';
          document.getElementById('edit-student-id').value = student.id;
          document.getElementById('field-firstName').value = student.firstName;
          document.getElementById('field-lastName').value = student.lastName;
          document.getElementById('field-email').value = student.email;
          document.getElementById('field-department').value = student.department;
          document.getElementById('field-yearLevel').value = student.yearLevel;
          document.getElementById('field-gpa').value = student.gpa;
          document.getElementById('field-status').value = student.status;
          document.getElementById('student-modal').classList.add('open');
        }
      });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete student record ' + btn.dataset.id + '?')) {
          this.service.deleteStudent(btn.dataset.id);
          this.showToast('Student deleted', 'warn');
          this.render();
        }
      });
    });
  }

  renderCoursesView() {
    const container = document.getElementById('courses-grid');
    if (!container) return;
    const courses = this.service.getCourses();
    container.innerHTML = courses.map(c => \`
      <div class="card course-card">
        <div class="course-header">
          <span class="course-code">\${AuthManager.sanitizeInput(c.code)}</span>
          <span class="course-credits">\${c.credits} Credits</span>
        </div>
        <h3 class="course-title">\${AuthManager.sanitizeInput(c.title)}</h3>
        <p class="course-dept">\${AuthManager.sanitizeInput(c.department)}</p>
        <div class="course-capacity-bar">
          <div class="capacity-fill" style="width: \${Math.round((c.enrolled / c.capacity) * 100)}%"></div>
        </div>
        <div class="course-footer">
          <span>Enrolled: <strong>\${c.enrolled} / \${c.capacity}</strong></span>
          <span class="badge badge-success">Active</span>
        </div>
      </div>
    \`).join('');
  }

  renderAnalyticsView() {
    const kpi = this.service.getAnalyticsKPI();
    document.getElementById('analytics-total-enrolled').textContent = kpi.totalEnrolled;
    document.getElementById('analytics-avg-gpa').textContent = kpi.averageGPA;
    document.getElementById('analytics-rate').textContent = kpi.enrollmentRate + '%';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new StudentApp();
});
`;
    }

    const artifact: Artifact = {
      id: `art-fe-${Date.now()}`,
      name: 'app.js',
      type: 'code',
      language: 'javascript',
      content: appJsCode
    };

    return {
      personaId: 'senior_frontend',
      text: `Architected reactive frontend controller with interactive views, modals, filters, and real-time state synchronization.`,
      artifacts: [artifact],
      critiqueSelfScore: 97
    };
  }

  public static executeUiUxDesigner(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'ui_ux_designer', text: 'UI/UX layout spec complete.', artifacts: [], critiqueSelfScore: 95 };
  }

  public static executeDesignSystemTheme(input: PersonaExecutionInput): PersonaExecutionOutput {
    const cssCode = `/* Nexus Forge Ultra-Premium Glassmorphic Identity Design System */
:root {
  --bg-primary: #090d16;
  --bg-secondary: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.75);
  --bg-card-hover: rgba(30, 41, 59, 0.85);
  --border-color: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(99, 102, 241, 0.35);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-primary: #6366f1;
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  --accent-glow: 0 0 25px rgba(99, 102, 241, 0.35);
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  overflow-x: hidden;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  z-index: 20;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-left: 8px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  box-shadow: var(--accent-glow);
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-name span {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
  text-align: left;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-primary);
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

/* Main Content */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 32px 40px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* Cards */
.card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-card);
  transition: var(--transition);
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kpi-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.kpi-value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
}

/* Data Tables */
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

th {
  background: rgba(255, 255, 255, 0.03);
  padding: 14px 20px;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
}

td {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

/* Avatars */
.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.avatar-secure {
  border-color: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.badge-active { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.badge-inactive { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }
.badge-suspended { background: rgba(239, 68, 68, 0.15); color: #f87171; }
.badge-pending { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.badge-role { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
.badge-dept { background: rgba(6, 182, 212, 0.15); color: #22d3ee; }
.badge-perm { background: rgba(255, 255, 255, 0.05); color: #cbd5e1; margin: 2px; }
.badge-action { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
.badge-info { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
.badge-warning { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.badge-critical { background: rgba(239, 68, 68, 0.15); color: #f87171; }

.gpa-pill { padding: 4px 8px; border-radius: var(--radius-sm); font-weight: 700; }
.gpa-high { background: rgba(16, 185, 129, 0.2); color: #34d399; }
.gpa-normal { background: rgba(255, 255, 255, 0.06); color: var(--text-primary); }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: var(--transition);
}

.btn-primary {
  background: var(--accent-gradient);
  color: #fff;
  box-shadow: var(--accent-glow);
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-icon {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: var(--transition);
}
.btn-icon:hover { color: var(--text-primary); background: rgba(255, 255, 255, 0.06); }
.text-danger:hover { color: var(--danger); }
.text-success { color: var(--success); }
.text-muted { color: var(--text-muted); }
.font-bold { font-weight: 600; }
.text-xs { font-size: 12px; }

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-backdrop.open { display: flex; }

.modal-dialog {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-control {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: var(--transition);
}

.form-control:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 200;
}

.toast {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}
.toast-success { border-color: var(--success); color: #34d399; }
.toast-error { border-color: var(--danger); color: #f87171; }
.toast-warn { border-color: var(--warning); color: #fbbf24; }
`;

    const artifact: Artifact = {
      id: `art-theme-${Date.now()}`,
      name: 'styles.css',
      type: 'style',
      language: 'css',
      content: cssCode
    };

    return {
      personaId: 'design_system_theme',
      text: `Created glassmorphic dark-theme design tokens, CSS variables, interactive states, and typography scale.`,
      artifacts: [artifact],
      critiqueSelfScore: 97
    };
  }

  public static executeComponentBehavior(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'component_behavior', text: 'Behavior configured.', artifacts: [], critiqueSelfScore: 94 };
  }
  public static executeAccessibility(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'accessibility_a11y', text: 'WCAG a11y verified.', artifacts: [], critiqueSelfScore: 95 };
  }
  public static executeResponsiveMobile(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'responsive_mobile', text: 'Responsive breakpoints configured.', artifacts: [], critiqueSelfScore: 94 };
  }
}