# 📓 14-Day SQL Mastery: Master Development & Learning Journal

> **Purpose**: This master journal provides an institutional-grade, chronological audit of every day's learning sprints, architectural upgrades, problem-solving breakthroughs, and engine developments across the SQL Mastery platform.

---

## 🧭 Executive Summary of Progress
- **Current Milestone**: 🏆 **Phase 1–4 100% Conquered | Phase 5 Underway (Day 11 Complete)**
- **Total Problems Conquered**: **52 / 58 HackerRank & LeetCode Benchmarks**
- **Interactive Masterclass Assets**:
  - **11 Visual Masterclass Modules**: With custom Neo-Brutalist SVG engineering diagrams.
  - **1,450 Master Technical MCQs**: Across 21 categories (including 350 dedicated Relational Join questions).
  - **1,040 Enterprise Case Studies**: Handcrafted production scenarios across 10 industries (including 390 Relational Join cases with zero template repetition).
  - **30 Gamified Quests**: In-browser AST validation studio.

---

## 📜 Chronological Daily Entries

### 📅 Entry 01: 2026-08-30 to 2026-08-31
**Sprint Focus**: Phase 1 Initiation — Basic SELECT, Predicate Filtering & Three-Valued Logic (3VL)  
**Module**: [`day-01-basic-select/`](./day-01-basic-select/)

#### Accomplishments:
- Established the repository architecture and standardized the **6-File Daily Protocol** (`README.md`, `THEORY.md`, `queries.sql`, `SOLUTIONS_BREAKDOWN.md`, `INTERVIEW_QUESTIONS.md`, `DAILY_LOG.md`).
- Conquered 8 initial HackerRank Basic Select challenges: Revising the Select Query I & II, Select All, Select By ID, Japanese Cities' Attributes & Names, Weather Observation Station 1 & 3.
- Mastered Modulo arithmetic (`MOD(ID, 2) = 0` vs. `ID % 2 = 0`) and duplicate elimination via `DISTINCT`.
- Formulated production interview scenarios for **Amazon**, **Meta**, **Uber**, and **Netflix**.

---

### 📅 Entry 02: 2026-08-31 to 2026-09-02
**Sprint Focus**: String Slicing, Character Sets, Regular Expressions & HackerRank Badges  
**Module**: [`day-02-ordering-wildcards/`](./day-02-ordering-wildcards/)

#### Accomplishments:
- Deconstructed the Weather Observation Station series (Stations 4 through 12).
- Built deep mastery over POSIX regex syntax: `^[aeiou]`, `[aeiou]$`, and bidirectional anchors `^[aeiou].*[aeiou]$`.
- Solved the character length delta algorithm: `COUNT(CITY) - COUNT(DISTINCT CITY)`.
- **Badges Unlocked**:
  - 🌟 **1st Star HackerRank SQL Badge** (2026-08-31 23:26 IST).
  - 🌟🌟 **2nd Star HackerRank SQL Badge** (2026-09-02 11:54 IST) at 185 / 300 points.
- Concluded Day 02 at **200 points** with 100% first-pass test case pass rate.

---

### 📅 Entry 03: 2026-09-02
**Sprint Focus**: Sorting Mechanics, Keyset Ordering, Determinism & Phase 1 Completion  
**Module**: [`day-03-sorting-ordering/`](./day-03-sorting-ordering/)

#### Accomplishments:
- Mastered SQL string-slicing functions across database engines: `RIGHT(Name, 3)`, `SUBSTRING()`, and `LEFT()`.
- Solved **Higher Than 75 Marks** (+15.00 pts), **Employee Names** (+10.00 pts), and **Employee Salaries** (+10.00 pts).
- Reached **235 / 300 points** on HackerRank.
- 🏆 **MILESTONE**: **Phase 1 (Basic Select) 100% Conquered (20 / 20 Problems)!**

---

### 📅 Entry 04: 2026-09-02 to 2026-09-03
**Sprint Focus**: Phase 2 — Advanced Select, Conditional Logic & Geometric Decision Trees  
**Module**: [`day-04-advanced-select-case/`](./day-04-advanced-select-case/)

#### Accomplishments:
- Deep-dived into `CASE WHEN ... THEN ... ELSE ... END` short-circuit execution semantics.
- Deconstructed the triangle inequality theorem: $A + B > C \land B + C > A \land A + C > B$.
- Solved **Type of Triangle** with strict priority ordering (evaluating `NOT A TRIANGLE` *before* `EQUILATERAL`, `ISOSCELES`, and `SCALENE`).
- Documented nested branching logic and boolean short-circuit performance rules.

---

### 📅 Entry 05: 2026-09-03
**Sprint Focus**: Phase 3 Initiation — Aggregations, GROUP BY, HAVING & Financial Rounding  
**Module**: [`day-05-basic-aggregations/`](./day-05-basic-aggregations/)

#### Accomplishments:
- Mastered the statistical aggregate core: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
- Solved 10 aggregation challenges: Revising Aggregations (Count, Sum, Averages), Average Population, Japan Population, Population Density Difference, The Blunder (miscalculated salaries via `REPLACE()`), and Top Earners.
- Formulated the Top Earners compound metric: `MAX(months * salary)` and grouped frequency counts.
- Clarified the strict distinction between row-level filtering (`WHERE`) and group-level filtering (`HAVING`).

---

### 📅 Entry 06: 2026-09-04
**Sprint Focus**: Analytical Mathematics, Coordinate Distances & Statistical Medians  
**Module**: [`day-06-station-math-aggregates/`](./day-06-station-math-aggregates/)

#### Accomplishments:
- Mastered spatial coordinate metrics in SQL:
  - **Manhattan Distance ($L_1$ norm)**: $|a - c| + |b - d|$.
  - **Euclidean Distance ($L_2$ norm)**: $\sqrt{(a - c)^2 + (b - d)^2}$.
- Solved Weather Observation Station 2, 13, 14, 15, 16, 17, 18, 19, and 20.
- Implemented **Exact Continuous Medians** without native `MEDIAN()` functions using window ranking and variable row count offsets for Station 20.

---

### 📅 Entry 07: 2026-09-05 to 2026-09-06
**Sprint Focus**: Visualizer Architecture & Neo-Brutalist Masterclass Platform  
**Directory**: [`visualizer/`](./visualizer/)

#### Accomplishments:
- Architected the standalone **Interactive Visualizer & Masterclass Platform** (`visualizer/index.html`).
- Designed the tactile **Poppy Neo-Brutalist Design System**: 3px solid black borders, 4px/6px ink drop shadows, and vibrant highlighter sticker palettes (`#fef08a`, `#38bdf8`, `#f472b6`, `#22c55e`).
- Built the **Dynamic In-Browser Query Studio**: Synthesizes and mounts virtual disk tables for any schema on the fly, supporting live WHERE evaluation, projections, and AST syntax parsing.
- Created **30 Gamified Interactive Quests** with audio feedback and token-based puzzle mechanics.
- Added live multi-domain ERD showcase across 10 enterprise industries.

---

### 📅 Entry 08: 2026-09-07
**Sprint Focus**: Phase 4 Initiation — Relational Joins Track Foundations  
**Module**: [`day-08-basic-joins/`](./day-08-basic-joins/)

#### Accomplishments:
- Initiated the Relational Joins curriculum covering ANSI-92 syntax.
- Solved **Asian Population**, **African Cities**, and **Average Population of Each Continent**.
- Deconstructed foreign key referential integrity, relational cardinality ($1:1$, $1:N$, $N:M$), and Left Anti-Join patterns.
- Expanded the Visualizer's Guided Lab (Track 04) with step-by-step visual linker simulators.

---

### 📅 Entry 09: 2026-09-12 (Evening)
**Sprint Focus**: Intermediate Joins, Non-Equi Joins & Multi-Table Chains  
**Module**: [`day-09-intermediate-joins/`](./day-09-intermediate-joins/)

#### Accomplishments:
- Solved three renowned HackerRank Medium join problems:
  1. **The Report**: Non-equi join on grade ranges (`Marks BETWEEN Min_Mark AND Max_Mark`) with conditional name masking via `CASE WHEN`.
  2. **Top Competitors**: 4-table relational join pipeline (`Hackers` $\to$ `Submissions` $\to$ `Challenges` $\to$ `Difficulty`) filtering users with multiple full-score submissions.
  3. **Ollivander's Inventory**: Correlated subquery join isolating minimum coin costs for non-evil wands by age and power.
- Documented physical join algorithms: Nested Loop Join, Hash Join, and Sort-Merge Join.

---

### 📅 Entry 10: 2026-09-13 (00:00 to 01:45 IST)
**Sprint Focus**: Advanced Relational Joins, Coordinate Matrices & Join MCQ Master Suite  
**Module**: [`day-10-advanced-joins-scoring/`](./day-10-advanced-joins-scoring/)

#### Accomplishments:
- Conquered the final three HackerRank Joins milestones:
  1. **Contest Leaderboard**: Subquery pre-aggregation preventing score inflation across repeated submissions.
  2. **Placements**: Multi-instance table aliasing (`Packages` joined twice for student salary vs. best friend's salary).
  3. **Symmetric Pairs**: Coordinate matrix self-joins detecting reciprocal pairs $(X_1 = Y_2 \land Y_1 = X_2)$ with bifurcation between distinct and identical coordinate points.
- 🏆 **MILESTONE**: **ALL HACKERRANK BASIC & ADVANCED JOINS CONQUERED (100%)!**
- Built and deployed the **350-Question Relational Joins Master MCQ Suite** (35 deep questions each across 10 join archetypes) bringing the MCQ Vault to **1,450 total questions**.

---

### 📅 Entry 11: 2026-09-13 (01:45 to 03:15 IST)
**Sprint Focus**: Section 8 Case Studies Total Overhaul (390 Distinct Enterprise Cases)  
**File**: [`visualizer/case_studies_500.js`](./visualizer/case_studies_500.js)

#### Accomplishments:
- Eliminated all legacy repetitive/parameterized loop cases from Section 8 (IDs 651 to 1040).
- Handcrafted **390 completely distinct, production-grade enterprise case studies** across 10 relational join disciplines and 10 industries (Fintech, SaaS, Retail, Healthcare, Logistics, Media, Security, Hardware, HR, Platforms).
- Calibrated exact difficulty distribution: **130 Easy**, **130 Medium**, and **130 Hard** ($130 / 130 / 130$).
- Total vault reached exactly **1,040 verified cases** with 100% unique titles, complete schemas, ELI5 stories, common mistakes, and target queries.

---

### 📅 Entry 12: 2026-09-13 (03:15 to 03:25 IST)
**Sprint Focus**: Phase 5 Initiation — Window Functions (Ranking, Partitioning & Deduplication)  
**Module**: [`day-11-window-ranking/`](./day-11-window-ranking/)

#### Accomplishments:
- Deployed the complete 7-file Day 11 module suite.
- Solved 4 premier analytical ranking benchmarks:
  1. **Department Top 3 Salaries** (LeetCode 185 / HackerRank Advanced): Dense rank tie preservation.
  2. **Latest State Deduplication**: Deterministic secondary tie-breaking via `event_id DESC`.
  3. **Customer Revenue Deciles**: `NTILE(10)` equi-height bucketing and quartile labeling.
  4. **Active Consecutive Login Streaks**: Gaps-and-Islands difference clustering ($date - row\_number$).
- Formulated Tier-1 interview scenarios for **Stripe**, **Meta**, and **Uber**.

---

### 📅 Entry 13: 2026-09-13 (03:25 to 13:15 IST)
**Sprint Focus**: GitHub Repository Synchronization & Sunday Strategy Review  
**Milestone**: Working tree clean, remote repository verified, master development journal established.

#### Accomplishments:
- Verified GitHub remote synchronization: `HEAD` and `origin/main` aligned at latest commit.
- Committed all 12 generator and assembly scripts to `scratch/` for total reproducibility.
- Established this centralized `DAILY_JOURNAL.md` to preserve full narrative history.
- Structured the roadmap for **Day 12: Window Functions Part 2 (Aggregates, Value Offsets & Rolling Frames)**.

---

### 📅 Entry 14: 2026-09-13 (13:15 to 14:15 IST)
**Sprint Focus**: Window Functions Completion — Value Offsets, Rolling Frames & Masterclass Module 12  
**Modules**: [`day-12-window-aggregates/`](./day-12-window-aggregates/) & [`visualizer/study_library_data.js`](./visualizer/study_library_data.js)

#### Accomplishments:
- Deployed the complete 7-file Day 12 module suite:
  1. **SaaS MoM Revenue Growth**: `LAG(mrr, 1)` with `NULLIF()` division-by-zero protection.
  2. **Bank Account Running Balance**: `SUM(amount) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` solving the tied-timestamp balance jump disaster.
  3. **7-Day Smoothed Moving Average**: `AVG(signups) OVER (ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` removing cyclical weekend noise.
  4. **User Inactivity Timeouts & Drop-Offs**: `LEAD(event_time, 1)` measuring inter-event elapsed seconds.
  5. **High-Water Mark Peak Tracker**: `MAX(revenue) OVER (ROWS UNBOUNDED PRECEDING)`.
- Added **Module 12: Analytical Window Functions, Value Offsets & Sliding Window Physics** to the Visual Masterclass Study Library (`visualizer/study_library_data.js`) complete with custom Neo-Brutalist SVG engineering diagram.
- 🏆 **MILESTONE**: **WINDOW FUNCTIONS TRACK 100% CONQUERED (Both Ranking and Aggregates)!** Total problems solved: **56 / 58**. Ready for Day 13 (Business Analytics & Churn Cohorts).
