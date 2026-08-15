import { describe, it, expect, beforeEach } from 'vitest';
import { StudentManagementService } from './api.js';

describe('StudentManagementService', () => {
  let service;

  beforeEach(() => {
    service = new StudentManagementService();
  });

  it('should seed initial student and course records', () => {
    const students = service.getStudents();
    const courses = service.getCourses();
    expect(students.length).toBeGreaterThanOrEqual(5);
    expect(courses.length).toBeGreaterThanOrEqual(4);
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
    expect(csStudents.every(s => s.department === 'Computer Science')).toBe(true);

    const searchResults = service.getStudents({ search: 'Elena' });
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].firstName).toBe('Elena');
  });

  it('should update student details properly', () => {
    const updated = service.updateStudent('STU-1001', { gpa: 4.0 });
    expect(updated.gpa).toBe(4.0);
    expect(service.getStudentById('STU-1001').gpa).toBe(4.0);
  });

  it('should delete a student record', () => {
    const res = service.deleteStudent('STU-1005');
    expect(res).toBe(true);
    expect(service.getStudentById('STU-1005')).toBeNull();
  });

  it('should accurately compute analytics KPI metrics', () => {
    const kpi = service.getAnalyticsKPI();
    expect(kpi.totalStudents).toBeGreaterThan(0);
    expect(kpi.averageGPA).toBeGreaterThan(0);
    expect(kpi.enrollmentRate).toBeGreaterThan(0);
  });
});
