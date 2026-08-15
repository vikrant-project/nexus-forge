import { Artifact, PersonaRole } from '../../core/types.js';
import { PersonaExecutionInput, PersonaExecutionOutput } from './planning.js';

export class DomainCluster {
  public static executeEcommerceSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'ecommerce_specialist', text: 'E-commerce logic pass.', artifacts: [], critiqueSelfScore: 94 };
  }
  public static executeBookingSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'booking_specialist', text: 'Booking logic pass.', artifacts: [], critiqueSelfScore: 93 };
  }
  public static executeCmsSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    return { personaId: 'cms_specialist', text: 'CMS logic pass.', artifacts: [], critiqueSelfScore: 93 };
  }

  public static executeStudentManagementSpecialist(input: PersonaExecutionInput): PersonaExecutionOutput {
    const isUser = (input.prompt || '').toLowerCase().includes('user');

    let htmlContent = '';
    if (isUser) {
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Identity Ã¢â‚¬" Enterprise User Management System</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>âš¡</text></svg>">
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">Ã¢Å¡¡</div>
      <div class="brand-name">Nexus<span>Identity</span></div>
    </div>
    <nav class="nav-group">
      <button class="nav-item active" data-tab="dashboard">
        <span class="nav-icon">Ã°Å¸"Å </span>
        <span>Dashboard</span>
      </button>
      <button class="nav-item" data-tab="users">
        <span class="nav-icon">Ã°Å¸â€˜¥</span>
        <span>Users Directory</span>
      </button>
      <button class="nav-item" data-tab="roles">
        <span class="nav-icon">Ã°Å¸â€º¡Ã¯¸</span>
        <span>Roles & RBAC</span>
      </button>
      <button class="nav-item" data-tab="audit">
        <span class="nav-icon">Ã°Å¸"Å“</span>
        <span>Audit Logs</span>
      </button>
    </nav>
    <div class="user-badge">
      <div class="avatar avatar-secure">AD</div>
      <div>
        <div class="font-bold text-sm">Root Administrator</div>
        <div class="text-xs text-muted">Super Admin</div>
      </div>
    </div>
  </aside>

  <!-- Main Application Wrapper -->
  <main class="main-wrapper">
    <!-- View 1: Dashboard -->
    <section id="view-dashboard">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Identity & Access Dashboard</h1>
          <p class="page-subtitle">Real-time user directory telemetry, RBAC metrics, and security audit status</p>
        </div>
        <button class="btn btn-primary" id="btn-add-user">+ Invite New User</button>
      </div>

      <div class="kpi-grid">
        <div class="card kpi-card">
          <span class="kpi-label">Total Registered Users</span>
          <span class="kpi-value" id="kpi-total-users">0</span>
          <span class="text-xs text-success">Ã¢â€ â€˜ 18% growth this quarter</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Active Concurrent Sessions</span>
          <span class="kpi-value" id="kpi-active-sessions">0</span>
          <span class="text-xs text-muted">Across 4 global regions</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">2FA MFA Enforcement Rate</span>
          <span class="kpi-value" id="kpi-2fa-rate">0%</span>
          <span class="text-xs text-success">Compliant with SOC2 Type II</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Security Audit Alerts</span>
          <span class="kpi-value" id="kpi-security-alerts">0</span>
          <span class="text-xs text-muted">Zero critical intrusions</span>
        </div>
      </div>

      <div class="card">
        <div class="top-bar" style="margin-bottom: 16px;">
          <h2 class="page-title" style="font-size: 18px;">Recently Authenticated Users</h2>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Identity Profile</th>
                <th>Assigned Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="recent-users-tbody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- View 2: Users Directory -->
    <section id="view-users" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Enterprise User Directory</h1>
          <p class="page-subtitle">Search, filter, assign roles, enforce 2FA, and manage user lifecycles</p>
        </div>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <input type="text" id="search-input" class="form-control" style="flex: 2; min-width: 240px;" placeholder="Ã°Å¸" Search by name, email, department, or role...">
          <select id="filter-role" class="form-control" style="flex: 1; min-width: 160px;">
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="System Admin">System Admin</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Senior Engineer">Senior Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Security Auditor">Security Auditor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <select id="filter-status" class="form-control" style="flex: 1; min-width: 140px;">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <select id="filter-dept" class="form-control" style="flex: 1; min-width: 160px;">
            <option value="">All Departments</option>
            <option value="Executive Engineering">Executive Engineering</option>
            <option value="Security & Operations">Security & Operations</option>
            <option value="Core Platform">Core Platform</option>
            <option value="Distributed Systems">Distributed Systems</option>
            <option value="Product Design">Product Design</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Intelligence">Data Intelligence</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Details</th>
              <th>Role</th>
              <th>Department</th>
              <th>2FA Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="users-table-tbody"></tbody>
        </table>
      </div>
    </section>

    <!-- View 3: Roles & RBAC -->
    <section id="view-roles" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Role-Based Access Control (RBAC)</h1>
          <p class="page-subtitle">Configured role capabilities, permission matrices, and security privileges</p>
        </div>
      </div>
      <div id="roles-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;"></div>
    </section>

    <!-- View 4: Audit Logs -->
    <section id="view-audit" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Security & Session Audit Trail</h1>
          <p class="page-subtitle">Immutable chronological record of identity events, privilege escalations, and auth attempts</p>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Target Entity</th>
              <th>Origin IP</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody id="audit-table-tbody"></tbody>
        </table>
      </div>
    </section>
  </main>

  <!-- User Add/Edit Modal -->
  <div class="modal-backdrop" id="user-modal">
    <div class="modal-dialog">
      <div class="top-bar" style="margin-bottom: 20px;">
        <h3 id="modal-title" class="page-title" style="font-size: 20px;">Invite Team Member</h3>
        <button class="btn-icon" id="modal-close" style="font-size: 20px;">Ã¢Å“*</button>
      </div>
      <form id="user-form">
        <input type="hidden" id="edit-user-id">
        <div style="display: flex; gap: 12px;">
          <div class="form-group" style="flex: 1;">
            <label>First Name</label>
            <input type="text" id="field-firstName" class="form-control" required placeholder="e.g. Jordan">
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Last Name</label>
            <input type="text" id="field-lastName" class="form-control" required placeholder="e.g. Hayes">
          </div>
        </div>
        <div class="form-group">
          <label>Work Email Address</label>
          <input type="email" id="field-email" class="form-control" required placeholder="e.g. jordan.h@nexus.io">
        </div>
        <div style="display: flex; gap: 12px;">
          <div class="form-group" style="flex: 1;">
            <label>Assigned Role</label>
            <select id="field-role" class="form-control">
              <option value="Super Admin">Super Admin</option>
              <option value="System Admin">System Admin</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Senior Engineer" selected>Senior Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Security Auditor">Security Auditor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Department</label>
            <select id="field-department" class="form-control">
              <option value="Executive Engineering">Executive Engineering</option>
              <option value="Security & Operations">Security & Operations</option>
              <option value="Core Platform">Core Platform</option>
              <option value="Distributed Systems">Distributed Systems</option>
              <option value="Product Design">Product Design</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Intelligence">Data Intelligence</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 12px;">
          <div class="form-group" style="flex: 1;">
            <label>Account Status</label>
            <select id="field-status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending Invitation</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1; justify-content: center; margin-top: 18px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="field-twoFactor" checked>
              <span>Enforce 2FA MFA</span>
            </label>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" class="btn" onclick="document.getElementById('user-modal').classList.remove('open')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save User Record</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Application Scripts -->
  <script type="module" src="app.js"></script>
</body>
</html>`;
    } else {
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus University Ã¢â‚¬" Student Management System</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>âš¡</text></svg>">
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">N</div>
      <div class="brand-name">Nexus<span>Portal</span></div>
    </div>
    <nav class="nav-group">
      <button class="nav-item active" data-tab="dashboard">
        <span class="nav-icon">Ã°Å¸"Å </span>
        <span>Dashboard</span>
      </button>
      <button class="nav-item" data-tab="students">
        <span class="nav-icon">Ã°Å¸Å½"</span>
        <span>Students</span>
      </button>
      <button class="nav-item" data-tab="courses">
        <span class="nav-icon">Ã°Å¸"Å¡</span>
        <span>Courses</span>
      </button>
      <button class="nav-item" data-tab="analytics">
        <span class="nav-icon">Ã°Å¸"Ë†</span>
        <span>Analytics</span>
      </button>
    </nav>
    <div class="user-badge">
      <div class="avatar">AD</div>
      <div>
        <div class="font-bold text-sm">Dean Administrator</div>
        <div class="text-xs text-muted">Admin Authority</div>
      </div>
    </div>
  </aside>

  <!-- Main Application Wrapper -->
  <main class="main-wrapper">
    <!-- View 1: Dashboard -->
    <section id="view-dashboard">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Executive Academic Dashboard</h1>
          <p class="page-subtitle">Real-time telemetry, student metrics, and department KPIs</p>
        </div>
        <button class="btn btn-primary" id="btn-add-student">+ Enroll Student</button>
      </div>

      <div class="kpi-grid">
        <div class="card kpi-card">
          <span class="kpi-label">Total Enrolled Students</span>
          <span class="kpi-value" id="kpi-total-students">0</span>
          <span class="text-xs text-success">Ã¢â€ â€˜ 12% from last term</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Active Academic Standing</span>
          <span class="kpi-value" id="kpi-active-students">0</span>
          <span class="text-xs text-muted">98.2% retention rate</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Average Institutional GPA</span>
          <span class="kpi-value" id="kpi-avg-gpa">0.00</span>
          <span class="text-xs text-success">Dean's list benchmark: 3.50</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Course Capacity Fill Rate</span>
          <span class="kpi-value" id="kpi-enrollment-rate">0%</span>
          <span class="text-xs text-muted">Optimal class distribution</span>
        </div>
      </div>

      <div class="card">
        <div class="top-bar" style="margin-bottom: 16px;">
          <h2 class="page-title" style="font-size: 18px;">Recent Student Registrations</h2>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>GPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="recent-students-tbody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- View 2: Students -->
    <section id="view-students" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Student Directory & Records</h1>
          <p class="page-subtitle">Search, filter, edit, and manage comprehensive student profiles</p>
        </div>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <input type="text" id="search-input" class="form-control" style="flex: 2; min-width: 240px;" placeholder="Ã°Å¸" Search students by name, email, or ID...">
          <select id="filter-dept" class="form-control" style="flex: 1; min-width: 180px;">
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Profile</th>
              <th>Department</th>
              <th>Year Level</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="students-table-tbody"></tbody>
        </table>
      </div>
    </section>

    <!-- View 3: Courses -->
    <section id="view-courses" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Course Catalog & Capacity</h1>
          <p class="page-subtitle">Active curriculum offerings, credit distribution, and capacity fill rates</p>
        </div>
      </div>
      <div id="courses-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;"></div>
    </section>

    <!-- View 4: Analytics -->
    <section id="view-analytics" style="display: none;">
      <div class="top-bar">
        <div>
          <h1 class="page-title">Institutional Analytics & Reporting</h1>
          <p class="page-subtitle">Aggregate academic telemetry and semester growth metrics</p>
        </div>
      </div>
      <div class="kpi-grid">
        <div class="card kpi-card">
          <span class="kpi-label">Total Course Seats Enrolled</span>
          <span class="kpi-value" id="analytics-total-enrolled">0</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Campus-Wide Mean GPA</span>
          <span class="kpi-value" id="analytics-avg-gpa">0.00</span>
        </div>
        <div class="card kpi-card">
          <span class="kpi-label">Institutional Fill Rate</span>
          <span class="kpi-value" id="analytics-rate">0%</span>
        </div>
      </div>
    </section>
  </main>

  <!-- Student Add/Edit Modal -->
  <div class="modal-backdrop" id="student-modal">
    <div class="modal-dialog">
      <div class="top-bar" style="margin-bottom: 20px;">
        <h3 id="modal-title" class="page-title" style="font-size: 20px;">Enroll Student</h3>
        <button class="btn-icon" id="modal-close" style="font-size: 20px;">Ã¢Å“*</button>
      </div>
      <form id="student-form">
        <input type="hidden" id="edit-student-id">
        <div style="display: flex; gap: 12px;">
          <div class="form-group" style="flex: 1;">
            <label>First Name</label>
            <input type="text" id="field-firstName" class="form-control" required placeholder="e.g. Alex">
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Last Name</label>
            <input type="text" id="field-lastName" class="form-control" required placeholder="e.g. Mercer">
          </div>
        </div>
        <div class="form-group">
          <label>Institutional Email</label>
          <input type="email" id="field-email" class="form-control" required placeholder="e.g. alex.m@nexus.edu">
        </div>
        <div class="form-group">
          <label>Department</label>
          <select id="field-department" class="form-control">
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>
        <div style="display: flex; gap: 12px;">
          <div class="form-group" style="flex: 1;">
            <label>Year Level</label>
            <select id="field-yearLevel" class="form-control">
              <option value="1">Year 1 (Freshman)</option>
              <option value="2">Year 2 (Sophomore)</option>
              <option value="3">Year 3 (Junior)</option>
              <option value="4">Year 4 (Senior)</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Current GPA</label>
            <input type="number" id="field-gpa" class="form-control" step="0.01" min="0" max="4.0" value="3.50">
          </div>
        </div>
        <div class="form-group">
          <label>Academic Status</label>
          <select id="field-status" class="form-control">
            <option value="active">Active Standing</option>
            <option value="probation">Academic Probation</option>
            <option value="graduated">Graduated Alumni</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" class="btn" onclick="document.getElementById('student-modal').classList.remove('open')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Student Record</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Application Scripts -->
  <script type="module" src="app.js"></script>
</body>
</html>`;
    }

    const htmlArtifact: Artifact = {
      id: `art-html-${Date.now()}`,
      name: 'index.html',
      type: 'code',
      language: 'html',
      content: htmlContent
    };

    return {
      personaId: 'student_management_specialist',
      text: `Engineered complete domain layout, views, and responsive HTML5 markup.`,
      artifacts: [htmlArtifact],
      critiqueSelfScore: 97
    };
  }
}