# Garry Tan's gstack — Antigravity Integration Guide

**gstack** (Garry's Stack) is an opinionated AI engineering workflow created by Garry Tan (CEO of Y Combinator). It transforms the AI coding agent into a full-stack startup team with distinct personas and rigorous workflows.

All **53 gstack skills** have been installed and adapted for **Google Antigravity** in both project workspace (`.agents/skills/`) and global configuration (`~/.gemini/config/skills/`).

---

## 🏛️ Core Roles & Skills

### 1. Founder & Product Strategy
- **/office-hours (`office-hours`)**: YC Office Hours brainstorming session. Forcing questions on customer demand, desperate specificity, narrowest wedge, and killer differentiation.
- **/plan-ceo-review (`plan-ceo-review`)**: CEO/founder-mode plan review. Scope expansion, 10-star product design, business model alignment, and strategic focus.

### 2. Engineering Architecture & Guardrails
- **/plan-eng-review (`plan-eng-review`)**: Engineering Manager architectural guardrails review. Data structures, scaling bottlenecks, reliability, and edge case defense.
- **/plan-devex-review (`plan-devex-review`)**: Developer experience, API ergonomics, CLI usability, and SDK cleanliness.
- **/plan-design-review (`plan-design-review`)**: Product UX & interface flow review, interaction friction detection.
- **/cso (`cso`)**: Chief Security Officer threat modeling, attack surface reduction, and auth/permission validation.

### 3. Execution, QA & Deployment
- **/qa (`qa`)**: Systematic browser-based QA testing and iterative bug fixing with atomic commits and verification.
- **/qa-only (`qa-only`)**: Non-modifying QA health score audit and bug report generation.
- **/gstack-review (`gstack-review`)**: Senior multi-axis pre-ship code review (correctness, performance, security, architecture).
- **/ship (`ship`)**: Release engineering pipeline — verification gates, changelog, tagging, and automated deployment.
- **/land-and-deploy (`land-and-deploy`)**: Production deployment coordinator.

### 4. Safety & System Control
- **/careful (`careful`)**: Safety guardrails for high-stakes, destructive, or irreversible operations.
- **/gstack-guard (`gstack-guard`)**: Pre-commit security, credential leak prevention, and prompt defense.
- **/investigate (`investigate`)**: Systematic root-cause debugging without guessing.
- **/freeze (`freeze`) / /unfreeze (`unfreeze`)**: Context state preservation and restoration.
- **/make-pdf (`make-pdf`)**: High quality documentation and PDF report synthesis.
- **/diagram (`diagram`)**: System architecture diagram generation (Mermaid/SVG).

---

## ⚡ Tool Mappings in Antigravity

| gstack / Claude Tool | Antigravity Native Equivalent |
| :--- | :--- |
| `Bash` | `run_command` |
| `Read` | `view_file` |
| `Write` | `write_to_file` |
| `Edit` | `replace_file_content` / `multi_replace_file_content` |
| `Grep` | `grep_search` |
| `Glob` | `find_by_name` |
| `AskUserQuestion` | `ask_question` |
| `WebSearch` | `search_web` / `read_url_content` |
| Sub-agent Swarm | `invoke_subagent` / `define_subagent` |

---

## 🚀 How to Use in Antigravity

You can trigger any gstack workflow anytime by mentioning the command or asking in natural language:
- *"Run office hours on my new idea"* $\rightarrow$ Activates `office-hours`
- *"Do a CEO plan review"* $\rightarrow$ Activates `plan-ceo-review`
- *"Run QA on the live web app"* $\rightarrow$ Activates `qa`
- *"Do an engineering architecture review"* $\rightarrow$ Activates `plan-eng-review`
- *"Prepare to ship and deploy"* $\rightarrow$ Activates `ship`
