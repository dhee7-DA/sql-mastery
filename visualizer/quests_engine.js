// =============================================================================
// DUOLINGO-STYLE INTERACTIVE SQL QUESTS ENGINE
// =============================================================================

window.QUESTS_DATA = [
  // ---------------------------------------------------------------------------
  // QUEST 1: Live Slider Scaffolder (Salary Tiering)
  // ---------------------------------------------------------------------------
  {
    id: 1,
    title: 'Quest 01: The Interactive Threshold Slider',
    subtitle: 'Move the slider to see how a CASE WHEN expression dynamically buckets rows live in memory!',
    type: 'slider',
    defaultThreshold: 80000,
    minSalary: 55000,
    maxSalary: 95000,
    step: 1000,
    highLabel: 'Senior',
    lowLabel: 'Standard',
    alias: 'salary_tier',
    hint: 'Notice how CASE computes a brand new column value on the fly without changing the original salary numbers!'
  },

  // ---------------------------------------------------------------------------
  // QUEST 2: Tap-to-Assemble Word Bank
  // ---------------------------------------------------------------------------
  {
    id: 2,
    title: 'Quest 02: Word Bank Sentence Assembly',
    subtitle: 'Tap the SQL tokens in correct logical sequence to build a department classification expression.',
    type: 'wordbank',
    targetSentence: "Classify departments: Turn 'Engineering' into 'Tech', and all other departments into 'Operations'.",
    correctTokens: [
      'CASE',
      'WHEN',
      "department = 'Engineering'",
      'THEN',
      "'Tech'",
      'ELSE',
      "'Operations'",
      'END'
    ],
    distractors: ['IF', 'WHERE', 'THEN', 'IS'],
    hint: 'Remember the universal order: CASE opens the block, WHEN tests condition, THEN returns value, ELSE catches remainder, END closes the block!'
  },

  // ---------------------------------------------------------------------------
  // QUEST 3: Spot the Bug & Fix the Waterfall
  // ---------------------------------------------------------------------------
  {
    id: 3,
    title: 'Quest 03: Spot the Waterfall Bug (The Triangle Trap)',
    subtitle: 'Why did row (20, 20, 40) fail its geometry test? Fix the branch ordering to pass!',
    type: 'spot_bug',
    testRow: { A: 20, B: 20, C: 40 },
    buggyQuery: `SELECT CASE\n         WHEN A = B THEN 'Isosceles'            -- &cross; BUG: Matches first!\n         WHEN A + B <= C THEN 'Not A Triangle'  -- Unreachable!\n         ELSE 'Scalene'\n       END AS shape\nFROM TRIANGLES;`,
    fixedQuery: `SELECT CASE\n         WHEN A + B <= C THEN 'Not A Triangle'  -- &check; Correct: Checked first!\n         WHEN A = B THEN 'Isosceles'\n         ELSE 'Scalene'\n       END AS shape\nFROM TRIANGLES;`,
    bugExplanation: 'Because SQL evaluates CASE from top to bottom and short-circuits at the first TRUE condition, row (20, 20, 40) saw "20 = 20" (TRUE) and exited as Isosceles! But 20 + 20 = 40, which violates the triangle inequality theorem (sum of two sides must be strictly greater than the third). It is not a triangle at all!',
    fixedExplanation: 'Perfect! By moving "WHEN A + B <= C" to the top of the waterfall, the invalid shape is caught and rejected immediately before the equality test can ever fire.'
  },

  // ---------------------------------------------------------------------------
  // QUEST 4: The HackerRank Boss Challenge
  // ---------------------------------------------------------------------------
  {
    id: 4,
    title: 'Quest 04: The HackerRank Boss Level Blueprint',
    subtitle: 'You are now ready to solve HackerRank: Type of Triangle (+20.00 pts)!',
    type: 'boss',
    challengeName: 'Type of Triangle',
    points: 20,
    solutionCode: `SELECT CASE\n         WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n         WHEN A = B AND B = C THEN 'Equilateral'\n         WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n         ELSE 'Scalene'\n       END\nFROM TRIANGLES;`,
    hackerRankUrl: 'https://www.hackerrank.com/challenges/what-type-of-triangle/problem'
  }
];
