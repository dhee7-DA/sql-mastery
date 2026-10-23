# 📦 Day 18: Semi-Structured JSON, Lateral Unnesting & GIN Indexes

## 🎯 Executive Overview
Day 18 dives deep into hybrid relational/document architectures. We explore the internal storage differences between raw `JSON` and decomposed binary `JSONB`, Generalized Inverted Indexes (GIN) using `jsonb_ops` and `jsonb_path_ops`, and how `LATERAL` joins enable row-by-row array unnesting and correlated subquery evaluations.

---

## 🛠️ Curriculum File Structure
```
day-18-json-semi-structured-arrays/
├── README.md               # Architecture roadmap and sprint guide
├── THEORY.md               # JSONB binary layout, GIN index physics, LATERAL joins
├── queries.sql             # 6 production JSONB manipulation queries
├── SOLUTIONS_BREAKDOWN.md  # Binary traversal autopsy & GIN search analysis
├── INTERVIEW_QUESTIONS.md  # 10 Staff Backend / Data Engineer interview questions
├── ASSESSMENT.md           # 5 Semi-structured engineering challenges
└── DAILY_LOG.md            # Sprint benchmarks and mental models
```
