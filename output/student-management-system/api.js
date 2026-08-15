// Student Management In-Memory / LocalStorage Business Engine
export class StudentManagementService {
  constructor() {
    this.students = new Map();
    this.courses = new Map();
    this.enrollments = new Map();
    this.attendance = new Map();
    this.seedInitialData();
  }

  seedInitialData() {
    const initialStudents = [
      { id: 'STU-1001', firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@nexus.edu', department: 'Computer Science', yearLevel: 3, gpa: 3.92, status: 'active' },
      { id: 'STU-1002', firstName: 'Elena', lastName: 'Rostova', email: 'elena.rostova@nexus.edu', department: 'Data Science', yearLevel: 4, gpa: 3.85, status: 'active' },
      { id: 'STU-1003', firstName: 'Marcus', lastName: 'Chen', email: 'marcus.chen@nexus.edu', department: 'Cyber Security', yearLevel: 2, gpa: 3.45, status: 'active' },
      { id: 'STU-1004', firstName: 'Sophia', lastName: 'Al-Mansoor', email: 'sophia.m@nexus.edu', department: 'Artificial Intelligence', yearLevel: 1, gpa: 3.78, status: 'active' },
      { id: 'STU-1005', firstName: 'Devon', lastName: 'Vance', email: 'devon.v@nexus.edu', department: 'Software Engineering', yearLevel: 3, gpa: 2.95, status: 'probation' }
    ];
    for (const s of initialStudents) this.students.set(s.id, s);

    const initialCourses = [
      { id: 'CRS-301', code: 'CS-301', title: 'Advanced Distributed Systems', department: 'Computer Science', credits: 4, capacity: 45, enrolled: 38 },
      { id: 'CRS-405', code: 'AI-405', title: 'Neural Networks & Deep Learning', department: 'Artificial Intelligence', credits: 4, capacity: 40, enrolled: 39 },
      { id: 'CRS-202', code: 'SEC-202', title: 'Network Security & Cryptography', department: 'Cyber Security', credits: 3, capacity: 50, enrolled: 42 },
      { id: 'CRS-101', code: 'SE-101', title: 'Software Design Patterns', department: 'Software Engineering', credits: 3, capacity: 60, enrolled: 55 }
    ];
    for (const c of initialCourses) this.courses.set(c.id, c);
  }

  getStudents(filter = {}) {
    let list = Array.from(this.students.values());
    if (filter.department) list = list.filter(s => s.department === filter.department);
    if (filter.status) list = list.filter(s => s.status === filter.status);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(s => 
        s.firstName.toLowerCase().includes(q) || 
        s.lastName.toLowerCase().includes(q) || 
        s.email.toLowerCase().includes(q) || 
        s.id.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getStudentById(id) {
    return this.students.get(id) || null;
  }

  createStudent(data) {
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error('Validation Error: firstName, lastName, and email are required.');
    }
    const id = data.id || 'STU-' + Math.floor(1000 + Math.random() * 9000);
    const newStudent = {
      id,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      department: data.department || 'General Science',
      yearLevel: Number(data.yearLevel) || 1,
      gpa: Number(data.gpa) || 0.0,
      status: data.status || 'active',
      createdAt: new Date().toISOString()
    };
    this.students.set(id, newStudent);
    return newStudent;
  }

  updateStudent(id, data) {
    const existing = this.students.get(id);
    if (!existing) throw new Error('Student not found: ' + id);
    const updated = { ...existing, ...data, id };
    this.students.set(id, updated);
    return updated;
  }

  deleteStudent(id) {
    return this.students.delete(id);
  }

  getCourses() {
    return Array.from(this.courses.values());
  }

  getAnalyticsKPI() {
    const students = Array.from(this.students.values());
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'active').length;
    const avgGpa = totalStudents > 0 ? (students.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2) : '0.00';
    const courses = Array.from(this.courses.values());
    const totalCourses = courses.length;
    const totalCapacity = courses.reduce((a, c) => a + c.capacity, 0);
    const totalEnrolled = courses.reduce((a, c) => a + c.enrolled, 0);
    const enrollmentRate = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

    return {
      totalStudents,
      activeStudents,
      averageGPA: Number(avgGpa),
      totalCourses,
      totalEnrolled,
      enrollmentRate
    };
  }
}
