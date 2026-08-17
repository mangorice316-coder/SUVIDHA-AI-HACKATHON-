# System Architecture & Prompt Chaining Specification — Project BRIDGE

## 1. Core Architectural Principle: "Bridge, Don't Replace"

```
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│ ORIGINAL CURRICULUM│ ──►│   CONCEPT BRIDGE   │ ──►│CURRICULUM RECONNECT│
│ (Dense STEM Text)  │    │(Vernacular Anchors)│    │(Exam Derivation/QA)│
└────────────────────┘    └────────────────────┘    └────────────────────┘
```

---

## 2. 5-Stage Constrained Prompt Pipeline

### Stage 1: Terminology Bottleneck Extraction (`prompts/extract-v1.txt`)
- **Input:** Raw curriculum paragraph.
- **Task:** Identify the minimum set of domain-specific academic register terms that gate access to the learning objective.

### Stage 2: Contextual Semantic Interpretation (`prompts/interpret-v1.txt`)
- **Input:** Source passage + extracted term.
- **Task:** Determine the exact disciplinary meaning in this specific physical/mathematical context (avoid generic dictionary definitions).

### Stage 3: Familiar-Language Conceptual Bridge (`prompts/bridge-v1.txt`)
- **Input:** Disciplinary concept + target regional language (Tamil/Hindi/Telugu/Marathi/etc.).
- **Task:** Construct a concrete, intuitive physical analogy without discarding mathematical/scientific rigor.

### Stage 4: Academic Register Reconnection (`prompts/reconnect-v1.txt`)
- **Input:** Familiar explanation + original textbook sentence.
- **Task:** Explicitly map the vernacular analogy back to the exact formal English syntax and mathematical operators.

### Stage 5: Quick-Check Task Generation (`prompts/check-v1.txt`)
- **Input:** Scaffolding map.
- **Task:** Generate an interactive 1-minute verification challenge testing whether the learner can now apply the concept to the original learning task.

---

## 3. Strict JSON Output Schema
```json
{
  "academic_term": "string",
  "source_context": "string",
  "concept": "string",
  "bridge_explanation": "string",
  "example": "string",
  "connection": "string",
  "quick_check": {
    "question": "string",
    "correct_derivation_clauses": ["string"],
    "expected_answer": "string"
  }
}
```
