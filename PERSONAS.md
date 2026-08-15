# Nexus Forge â€” 40 Expert Persona Roster

| # | Role ID | Display Name | Discipline | Threshold | Max Rev | Upstream Dependencies |
|---|---|---|---|---|---|---|
| **01** | `requirements_analyst` | Requirements Analyst | Planning | 85 | 3 | None (Root) |
| **02** | `systems_architect` | Systems Architect | Planning | 88 | 3 | `requirements_analyst` |
| **03** | `database_designer` | Database Schema Designer | Planning | 90 | 3 | `systems_architect` |
| **04** | `api_designer` | API Contract Designer | Planning | 90 | 3 | `systems_architect`, `database_designer` |
| **05** | `tech_stack_selector` | Tech Stack Selector | Planning | 85 | 2 | `requirements_analyst` |
| **06** | `senior_backend` | Senior Backend Engineer | Backend | 90 | 3 | `database_designer`, `api_designer` |
| **07** | `auth_specialist` | Auth & Session Specialist | Backend | 92 | 3 | `senior_backend` |
| **08** | `payment_specialist` | Payment Logic Agent | Backend | 95 | 3 | `senior_backend` |
| **09** | `caching_performance` | Caching & Performance Agent | Backend | 88 | 2 | `senior_backend` |
| **10** | `background_jobs` | Background Jobs & Queue Agent | Backend | 88 | 2 | `senior_backend` |
| **11** | `senior_frontend` | Senior Frontend Engineer | Frontend | 90 | 3 | `api_designer` |
| **12** | `ui_ux_designer` | UI/UX Designer | Frontend | 90 | 3 | `requirements_analyst` |
| **13** | `design_system_theme` | Design System & Theme Agent | Frontend | 92 | 3 | `ui_ux_designer` |
| **14** | `component_behavior` | Component Behavior Agent | Frontend | 90 | 3 | `senior_frontend`, `design_system_theme` |
| **15** | `accessibility_a11y` | Accessibility (a11y) Agent | Frontend | 90 | 2 | `senior_frontend` |
| **16** | `responsive_mobile` | Responsive & Mobile Layout Agent | Frontend | 90 | 2 | `senior_frontend`, `design_system_theme` |
| **17** | `visual_3d_realism` | 3D & Visual Realism Agent | Visual | 92 | 3 | `design_system_theme`, `senior_frontend` |
| **18** | `screenshot_match_critique` | Screenshot-Match Critique Agent | Visual | 90 | 3 | `visual_3d_realism` |
| **19** | `animation_motion` | Animation & Motion Agent | Visual | 88 | 2 | `visual_3d_realism` |
| **20** | `asset_texture` | Asset & Texture Quality Agent | Visual | 88 | 2 | `visual_3d_realism` |
| **21** | `cyber_security_auditor` | Cyber Security Auditor | Security | 95 | 3 | `senior_backend`, `senior_frontend` |
| **22** | `penetration_tester` | Penetration-Test Simulation Agent | Security | 92 | 3 | `cyber_security_auditor` |
| **23** | `supply_chain_risk` | Dependency & Supply-Chain Risk | Security | 90 | 2 | `tech_stack_selector` |
| **24** | `data_privacy_compliance` | Data Privacy Compliance Agent | Security | 90 | 2 | `database_designer` |
| **25** | `unit_test_author` | Unit Test Author | QA | 90 | 3 | `senior_backend`, `senior_frontend` |
| **26** | `integration_test_author` | Integration Test Author | QA | 90 | 3 | `unit_test_author` |
| **27** | `e2e_test_author` | End-to-End Test Author | QA | 90 | 2 | `integration_test_author` |
| **28** | `load_performance_tester` | Load & Performance Test Agent | QA | 88 | 2 | `integration_test_author` |
| **29** | `bug_triage` | Bug Triage Agent | QA | 88 | 2 | `unit_test_author` |
| **30** | `cicd_pipeline` | CI/CD Pipeline Agent | DevOps | 88 | 2 | `tech_stack_selector` |
| **31** | `deployment_config` | Deployment Config Agent | DevOps | 88 | 2 | `tech_stack_selector` |
| **32** | `monitoring_logging` | Monitoring & Logging Agent | DevOps | 88 | 2 | `senior_backend` |
| **33** | `environment_secrets` | Environment & Secrets Config | DevOps | 90 | 2 | `tech_stack_selector` |
| **34** | `ecommerce_specialist` | E-commerce Logic Agent | Domain | 90 | 3 | `requirements_analyst` |
| **35** | `booking_specialist` | Booking & Appointment Logic Agent | Domain | 90 | 3 | `requirements_analyst` |
| **36** | `cms_specialist` | Content Management Agent | Domain | 90 | 3 | `requirements_analyst` |
| **37** | `student_management_specialist` | Student Management Specialist | Domain | 92 | 3 | `requirements_analyst` |
| **38** | `integration_agent` | Integration Agent | Meta | 95 | 3 | `senior_backend`, `senior_frontend`, `visual_3d_realism`, `cyber_security_auditor` |
| **39** | `final_review_agent` | Final Review Agent (Gatekeeper) | Meta | 95 | 3 | `integration_agent` |
| **40** | `documentation_agent` | Documentation Agent | Meta | 90 | 2 | `integration_agent`, `final_review_agent` |