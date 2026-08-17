# Architectural Design Decisions — Project BRIDGE

Every design decision in Project BRIDGE traces directly to an empirical constraint or SUVIDHA hackathon evaluation criterion:

---

## 1. UX & Interface Decisions

### Decision 1: "Preserve the Original Curriculum (Never Hide the Textbook)"
- **Rationale:** The goal of accessibility is **independent access to the real world**, not dependency on a simplified AI sandbox. By keeping the original NCERT sentence visible alongside the bridge, the student builds confidence reading the actual curriculum.

### Decision 2: "Barrier Qualification Dialog (Screen 3)"
- **Rationale:** Prevents the tool from assuming every difficulty is a language problem. When a student clicks a term, they qualify whether they understand the underlying idea or need fundamental conceptual grounding first.

### Decision 3: "Side-by-Side Three-Part Relationship"
- **Structure:** `[Familiar Concept Analogy] ⟷ [Formal Academic Term] ⟷ [Original Textbook Context]`.
- **Rationale:** Directly fulfills the UNESCO 2025 progression: everyday home language $\rightarrow$ regional terminology $\rightarrow$ formal academic/scientific register.

---

## 2. Technical & Model Architecture Decisions

### Decision 4: "Zero Authentication & Zero Database"
- **Rationale:** The SUVIDHA handbook explicitly requires the public demo to work **anonymously in a fresh browser without credentials or installation**. A database adds latency, GDPR/privacy risks, and login friction without increasing judging points.

### Decision 5: "Deterministic Offline Benchmark Fixtures"
- **Rationale:** Protects the **Execution (20%)** score against live API rate limits, slow WiFi during judge evaluation, or network dropouts. If no Gemini API key is provided, the system seamlessly serves high-fidelity pre-compiled benchmark sets at $0\text{ms}$ latency.

### Decision 6: "5-Stage Constrained Prompt Chaining vs Open-Ended Chat"
- **Rationale:** Open-ended chatbots hallucinate facts and drift into generic tutoring. Chaining 5 narrow, structured JSON prompts (`extract` $\rightarrow$ `interpret` $\rightarrow$ `bridge` $\rightarrow$ `reconnect` $\rightarrow$ `check`) guarantees strict academic fidelity.

---

## 3. Evaluation Decisions

### Decision 7: "The Quick Check Verification Task"
- **Rationale:** Without a verification check, the demo only proves *"AI generated a nice paragraph"*. With the quick check, we demonstrate **measurable before-and-after task completion** on the original curriculum text.
