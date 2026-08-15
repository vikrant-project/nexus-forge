export class AuthManager {
  static currentUser = { id: 'USR-ADMIN-1', name: 'Principal Administrator', role: 'admin', permissions: ['all'] };
  static getCurrentUser() { return this.currentUser; }
  static hasPermission(perm) { return this.currentUser.permissions.includes('all') || this.currentUser.permissions.includes(perm); }
  static sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
}