# Gates — MixMaster C1

## Pipeline Position

```
Stage 1: Requirements  ← CURRENT
Stage 2: Validation
[Human Gate 1]        ← BLOCKED (awaiting plan approval)
Stage 3: Synthesis
Stage 4: Verification
[Human Gate 2]
Stage 5: Acceptance
```

---

## GATE-0001 — Human Gate 1 (Plan Approval)

| Field | Value |
|-------|-------|
| **Type** | Human-Decision |
| **Cycle** | C1 |
| **Status** | `PENDING` |
| **Scope** | Approve C1 task waves and requirement set |
| **Evidence** | `.agile-v/STATE.md`, `.agile-v/TASKS.md`, `.agile-v/REQUIREMENTS.md` |
| **Decision needed** | Which approval scope: Minimal / Recommended / Full C1 / Full C1 + Sentry |

**Approver:** User  
**Blocked until:** Explicit approval message

---

## GATE-0002 — Human Gate 2 (Release / Cycle Close)

| Field | Value |
|-------|-------|
| **Type** | Human-Verify |
| **Cycle** | C1 |
| **Status** | `NOT_STARTED` |
| **Prerequisites** | All approved tasks complete; `VALIDATION_SUMMARY.md` updated; no open Critical/High risks without acceptance |

---

## Checkpoints

No `CHECKPOINTS.md` entries yet (durable HITL not triggered).
