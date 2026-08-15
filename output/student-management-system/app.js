import { StudentManagementService } from './api.js';
import { AuthManager } from './auth-manager.js';

// Nexus Forge Frontend Reactive Application Controller
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
      btn.addEventListener('click', (e) => {
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
    tbody.innerHTML = recent.map(s => `
      <tr>
        <td><strong>${AuthManager.sanitizeInput(s.id)}</strong></td>
        <td>${AuthManager.sanitizeInput(s.firstName + ' ' + s.lastName)}</td>
        <td><span class="badge badge-dept">${AuthManager.sanitizeInput(s.department)}</span></td>
        <td><strong>${s.gpa.toFixed(2)}</strong></td>
        <td><span class="badge badge-${s.status}">${s.status.toUpperCase()}</span></td>
      </tr>
    `).join('');
  }

  renderStudentsTable() {
    const tbody = document.getElementById('students-table-tbody');
    if (!tbody) return;
    const list = this.service.getStudents({ search: this.searchQuery, department: this.filterDepartment });
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-muted">No student records found matching filter.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(s => `
      <tr class="student-row">
        <td><code>${AuthManager.sanitizeInput(s.id)}</code></td>
        <td>
          <div class="user-cell">
            <div class="avatar">${s.firstName[0]}${s.lastName[0]}</div>
            <div>
              <div class="font-bold">${AuthManager.sanitizeInput(s.firstName + ' ' + s.lastName)}</div>
              <div class="text-xs text-muted">${AuthManager.sanitizeInput(s.email)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-dept">${AuthManager.sanitizeInput(s.department)}</span></td>
        <td>Year ${s.yearLevel}</td>
        <td><span class="gpa-pill ${s.gpa >= 3.5 ? 'gpa-high' : 'gpa-normal'}">${s.gpa.toFixed(2)}</span></td>
        <td>
          <span class="badge badge-${s.status}">${s.status.toUpperCase()}</span>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-icon edit-btn" data-id="${s.id}" title="Edit Student">Ã¢Å“Å½</button>
            <button class="btn-icon delete-btn text-danger" data-id="${s.id}" title="Delete Student">Ã°Å¸â€”â€˜</button>
          </div>
        </td>
      </tr>
    `).join('');

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
    container.innerHTML = courses.map(c => `
      <div class="card course-card">
        <div class="course-header">
          <span class="course-code">${AuthManager.sanitizeInput(c.code)}</span>
          <span class="course-credits">${c.credits} Credits</span>
        </div>
        <h3 class="course-title">${AuthManager.sanitizeInput(c.title)}</h3>
        <p class="course-dept">${AuthManager.sanitizeInput(c.department)}</p>
        <div class="course-capacity-bar">
          <div class="capacity-fill" style="width: ${Math.round((c.enrolled / c.capacity) * 100)}%"></div>
        </div>
        <div class="course-footer">
          <span>Enrolled: <strong>${c.enrolled} / ${c.capacity}</strong></span>
          <span class="badge badge-success">Active</span>
        </div>
      </div>
    `).join('');
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
