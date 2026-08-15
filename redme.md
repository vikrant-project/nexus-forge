# Nexus Forge — Multi-Agent Orchestration System for Antigravity IDE

**Version:** 1.0 (Spec Draft)
**Type:** Single-model, multi-persona agent orchestration framework
**Owner Model:** Antigravity IDE's native model only (no external AI/LLM APIs, no per-agent API keys)
**Reasoning Mode:** Graph-based prompting (not linear/loop-based)

---

## 1. Problem Statement

Most AI code-generation tools use a single agent to do everything — design, backend, frontend, security, QA — which caps quality at "average" because one generalist persona is handling every specialized concern at once.

**Goal:** Build one orchestration tool that runs ~40 specialized expert personas — all powered by the *same* underlying Antigravity model (no external API keys needed per agent) — each handling one discipline at true top-level expert depth, working together on a single project until it reaches production/professional quality.

---

## 2. Tool Name

**Nexus Forge**
*(Alternate names considered: AgentMesh, Synapse Build, Council — "Nexus Forge" chosen: "Nexus" = the graph/convergence point of all agents, "Forge" = where the final product is built and refined.)*

---

## 3. Core Principles

1. **One model, many personas.** No external API calls, no separate API keys per agent. Every "agent" is the same Antigravity model invoked with a distinct, rigorously defined expert persona/system prompt.
2. **Graph-based reasoning, not linear loops.** Agents and their outputs are nodes in a reasoning graph — dependencies, critiques, and revisions are edges. This replaces simple "loop until done" logic with structured, traceable reasoning paths.
3. **Top-of-field personas.** Every persona prompt is written so the agent behaves as the undisputed top expert in its domain — no hedging, no generic mid-level output.
4. **Self-critique and iteration loops.** Agents don't just generate once — critique agents evaluate output (code quality, security, visual fidelity) and send it back for revision until it clears a defined bar.
5. **One user prompt in, full project out.** User says something like *"build a site for shopping"* — the system infers requirements, assigns agents, and builds end-to-end without further specification needed.

---

## 4. High-Level Architecture

```
                        ┌───────────────────────────┐
                        │       User Prompt          │
                        │  "Build a site for X"      │
                        └──────────────┬─────────────┘
                                       ▼
                        ┌───────────────────────────┐
                        │     Orchestrator Node       │
                        │ (interprets intent, builds  │
                        │  the agent-dependency graph) │
                        └──────────────┬─────────────┘
                                       ▼
        ┌────────────────────────────────────────────────────────┐
        │                  Agent Reasoning Graph                   │
        │                                                            │
        │   [Requirements Agent] → [Architecture Agent]              │
        │           │                     │                          │
        │           ▼                     ▼                          │
        │   [Backend Agent]      [Frontend/UI Agent]                 │
        │           │                     │                          │
        │           ▼                     ▼                          │
        │   [DB Agent]           [3D/Visual Fidelity Agent] ──┐       │
        │           │                     │                    │ loop │
        │           ▼                     ▼                    │ until│
        │   [Cyber Security Agent] [QA/Screenshot-Match Agent]◄┘ match│
        │           │                     │                          │
        │           └──────────┬──────────┘                          │
        │                      ▼                                     │
        │              [Integration Agent]                           │
        │                      ▼                                     │
        │              [Final Review Agent]                          │
        └────────────────────────────────────────────────────────┘
                                       ▼
                        ┌───────────────────────────┐
                        │   Production-Ready Output   │
                        └───────────────────────────┘
```

Each box is not a separate service — it's the **same model**, re-invoked with a different persona prompt and given only the graph context relevant to its node.

---

## 5. Agent Roster (~40 Personas)

Grouped by discipline. Exact count flexes based on project type — not every project needs every agent.

### Planning & Architecture
1. Requirements Analyst
2. Systems Architect
3. Database Schema Designer
4. API Contract Designer
5. Tech Stack Selector

### Backend
6. Senior Backend Engineer
7. Auth & Session Specialist
8. Payment/Transaction Logic Agent
9. Caching & Performance Agent
10. Background Jobs/Queue Agent

### Frontend / UI / UX
11. Senior Frontend Engineer
12. UI/UX Designer
13. Design System & Theme Agent
14. Component Behavior Agent (button states, forms, interactions)
15. Accessibility (a11y) Agent
16. Responsive/Mobile Layout Agent

### Visual Fidelity (the "looks real, not generic" layer)
17. 3D/Visual Realism Agent
18. Screenshot-Match Critique Agent — compares rendered output against the user's described reference and scores fidelity
19. Animation & Motion Agent
20. Asset/Texture Quality Agent

### Security
21. Cyber Security Auditor — reviews all generated code for vulnerabilities
22. Penetration-Test Simulation Agent
23. Dependency/Supply-Chain Risk Agent
24. Data Privacy Compliance Agent

### Quality & Testing
25. Unit Test Author
26. Integration Test Author
27. End-to-End Test Author
28. Load/Performance Test Agent
29. Bug Triage Agent

### DevOps / Infra
30. CI/CD Pipeline Agent
31. Deployment Config Agent
32. Monitoring/Logging Agent
33. Environment/Secrets Config Agent

### Domain Specialists (loaded conditionally based on project type)
34. E-commerce Logic Agent
35. Booking/Appointment Logic Agent
36. Content Management Agent
37. Analytics/Reporting Agent

### Meta / Oversight
38. Integration Agent — merges all sub-outputs into one coherent codebase
39. Final Review Agent — acts as a principal engineer doing final sign-off
40. Documentation Agent — writes README, architecture docs, setup guide

---

## 6. Graph-Based Prompting Rules

Unlike a simple loop ("keep retrying until pass"), every agent action is a **node** in a directed graph with explicit edges:

1. **Dependency edges** — an agent only runs once its upstream dependency nodes have produced output (e.g., Backend Agent waits on Database Schema Designer).
2. **Critique edges** — critique/QA agents attach a scored review to the node they evaluated, not a blind pass/fail.
3. **Revision edges** — if a critique score is below threshold, a new revision node is created (v2, v3...) linked back to the original — full history is preserved, nothing is silently overwritten.
4. **Convergence condition** — a node is "done" only when its critique edge score crosses the defined bar (e.g., visual fidelity ≥ 90% match to reference description). This replaces "loop N times" with "loop until graph condition met," with a sane max-revision safety cap to prevent infinite cycles.
5. **No agent talks to another agent directly** — all communication passes through the graph (shared context store), so the reasoning path stays fully traceable and auditable.

---

## 7. Example Flow: "Build a site for shopping"

1. **Orchestrator** parses intent → tags project type `e-commerce`.
2. **Requirements Analyst** infers needed features (catalog, cart, checkout, auth, admin panel).
3. **Architecture + DB + API agents** run in parallel, each producing a spec node.
4. **Backend Agent** implements against those specs.
5. **Frontend/UI + Design System agents** build the interface.
6. **3D/Visual Realism Agent** generates polished visual output (not the "flat/broken" look typical of generic AI-built sites).
7. **Screenshot-Match Critique Agent** compares output against what a real top-tier shopping site looks like; scores it.
8. **If score < threshold** → revision edge created → Visual Realism Agent revises → re-scored. Loop continues (graph-bounded, not blind) until it clears the bar.
9. **Cyber Security Auditor** reviews the finished backend + frontend code for vulnerabilities.
10. **QA agents** run generated tests.
11. **Integration Agent** merges everything into one working codebase.
12. **Final Review Agent** signs off as a principal engineer would before merge.
13. **Documentation Agent** writes the README and setup docs.

---

## 8. Persona Prompt Design Rule

Every persona system prompt follows this fixed template so quality stays consistently top-tier across all 40:

```
You are the single most senior [DISCIPLINE] expert in the world.
You do not hedge, guess, or produce average output — your work is
held to the standard of a principal-level [DISCIPLINE] professional
at a top-tier company. You have full context of what upstream agents
have already produced (provided below). Critique your own output
honestly before finalizing it. If your output does not meet
professional production standard, say so and revise before returning.

[GRAPH CONTEXT: upstream node outputs relevant to this agent]
[TASK: specific node responsibility]
```

---

## 9. Tech Stack

- **Language:** TypeScript (Node.js) for the orchestrator/graph engine
- **Model access:** Antigravity IDE's native model only — the orchestrator issues multiple scoped invocations to the same model with different persona contexts; no external LLM API keys anywhere in the system
- **Graph engine:** In-memory directed graph (can later persist via the Continuum project's Neo4j layer for cross-session history)
- **No external AI SDKs, no per-agent credentials**

---

## 10. Production Readiness / Testing Notes

- Max-revision safety cap on every critique loop (prevents infinite cost/time spend on an unreachable fidelity score).
- Full graph history retained per project — every revision, every critique score — for auditability.
- Final Review Agent acts as a hard gate: nothing ships without its sign-off node.
- Recommend reusing Continuum's 7-layer testing strategy (unit → integration → schema/contract → protocol → E2E → performance → resilience) for this system too, since it's the same production-grade bar.

---

## 11. Next Steps

1. Define the full persona prompt library (40 templates using the Section 8 format).
2. Build the orchestrator's intent-parser (maps a one-line user prompt to a project-type → agent-subset selection).
3. Implement the graph engine (nodes, dependency edges, critique edges, revision edges, convergence checks).
4. Wire the Screenshot-Match Critique Agent to actually render and visually compare output (needed for the "looks real, not generic" requirement).
5. Test end-to-end on a few project types (e-commerce, booking system, student management system) as validation.