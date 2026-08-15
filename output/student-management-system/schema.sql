CREATE TABLE students (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  year_level INTEGER NOT NULL,
  gpa REAL DEFAULT 0.0,
  status TEXT CHECK(status IN ('active', 'probation', 'graduated', 'suspended')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  credits INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  enrolled INTEGER DEFAULT 0
);

CREATE TABLE enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  course_id TEXT REFERENCES courses(id),
  grade TEXT,
  grade_point REAL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  course_id TEXT REFERENCES courses(id),
  date TEXT NOT NULL,
  status TEXT CHECK(status IN ('present', 'absent', 'late', 'excused'))
);