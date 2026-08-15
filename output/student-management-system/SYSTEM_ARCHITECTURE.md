# System Architecture Specification
## 1. High-Level Architecture
Three-tier decoupled client-server architecture with state-driven reactive UI and isolated storage service layer.

## 2. Component Boundaries
- **Presentation Layer**: Modern component-based view controllers with glassmorphic design tokens
- **Domain Logic Layer**: Validated business handlers, calculation engines (e.g. GPA / Cart totals)
- **Data Persistence Layer**: In-memory repository with local storage synchronization and audit log
- **Security & Middleware**: Input sanitizer, RBAC authority gates, and error boundary wrappers