// =============================================================================
// TRACK 02: CASE WHEN & CONDITIONAL LOGIC LAB
// =============================================================================

window.CASEWHEN_SCHEMA = {
  tableName: 'TRIANGLES',
  columns: ['A', 'B', 'C'],
  types: { A: 'INT', B: 'INT', C: 'INT' },
  rows: [
    { A: 20, B: 20, C: 20 },
    { A: 20, B: 20, C: 40 },
    { A: 20, B: 20, C: 30 },
    { A: 13, B: 14, C: 30 },
    { A: 10, B: 10, C: 10 },
    { A: 30, B: 40, C: 50 },
    { A: 15, B: 15, C: 25 },
    { A: 25, B: 15, C: 15 }
  ]
};

window.CASEWHEN_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: Anatomy of CASE
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'case_anatomy',
    keyword: 'CASE WHEN',
    title: 'Step 01: Anatomy of the CASE Expression',
    pillClass: 'pill-case',
    conceptHeading: 'A scalar expression that produces a computed column',
    conceptText: 'In SQL, CASE is not a procedural control statement (like in Python or C++); it is a scalar expression that computes and returns exactly one value per row. It begins with the keyword CASE and must terminate with END. You almost always give the resulting expression a meaningful alias using AS.',
    sqlCode: `SELECT A, B, C,\n       CASE\n         WHEN A = B AND B = C THEN 'Equilateral'\n         ELSE 'Not Equilateral'\n       END AS simple_triangle_check\nFROM TRIANGLES;`,
    explanationPoints: [
      'CASE opens the conditional evaluation block.',
      'WHEN introduces the boolean predicate to test.',
      'THEN specifies the output value returned if the WHEN test is TRUE.',
      'ELSE provides the guaranteed fallback value if no WHEN condition matched.',
      'END concludes the expression block. Without END, SQL raises a syntax error.'
    ],
    gotcha: 'All THEN and ELSE result expressions must be of compatible data types! If one THEN returns a VARCHAR string and another returns an INTEGER, SQL will raise a type coercion error.',
    actionPrompt: 'Evaluating basic CASE expression on TRIANGLES dataset:',
    transform: (rows) => rows.map(r => {
      const isEq = (r.A === r.B && r.B === r.C);
      return {
        A: r.A,
        B: r.B,
        C: r.C,
        simple_triangle_check: isEq ? 'Equilateral' : 'Not Equilateral',
        _status: isEq ? 'passed' : 'loaded',
        _label: isEq ? 'EQUILATERAL' : 'OTHER'
      };
    }),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <g transform="translate(30, 25)">
          <rect width="210" height="130" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="24" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700">INPUT COLUMNS</text>
          <text x="15" y="55" fill="#d1d5db" font-family="monospace" font-size="9.5">Column A: 20</text>
          <text x="15" y="75" fill="#d1d5db" font-family="monospace" font-size="9.5">Column B: 20</text>
          <text x="15" y="95" fill="#d1d5db" font-family="monospace" font-size="9.5">Column C: 20</text>
        </g>

        <!-- Connecting Arrow -->
        <path d="M 245 90 L 310 90" stroke="#dfcaa9" stroke-width="2"/>

        <!-- CASE Evaluator Box -->
        <g transform="translate(315, 20)">
          <rect width="240" height="140" rx="5" fill="rgba(209, 184, 150, 0.1)" stroke="#dfcaa9" stroke-width="1.5"/>
          <text x="120" y="24" fill="#dfcaa9" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">CASE Expression Engine</text>
          <rect x="15" y="38" width="210" height="24" rx="3" fill="#181a20" stroke="#2e303b"/>
          <text x="25" y="54" fill="#9ec5ad" font-family="monospace" font-size="8.5">WHEN A=B AND B=C</text>
          <text x="200" y="54" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="end">&rarr; 'Equilateral'</text>

          <rect x="15" y="70" width="210" height="24" rx="3" fill="#181a20" stroke="#2e303b"/>
          <text x="25" y="86" fill="#71717a" font-family="monospace" font-size="8.5">ELSE Fallback</text>
          <text x="200" y="86" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="end">&rarr; 'Not Equilateral'</text>

          <text x="120" y="118" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">Returns exactly 1 value per row</text>
        </g>

        <path d="M 560 90 L 615 90" stroke="#9ec5ad" stroke-width="2"/>

        <!-- Output Column -->
        <g transform="translate(620, 25)">
          <rect width="130" height="130" rx="4" fill="#121216" stroke="#9ec5ad" stroke-width="1.5"/>
          <text x="15" y="24" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700">COMPUTED ALIAS</text>
          <text x="15" y="44" fill="#dfcaa9" font-family="monospace" font-size="8">AS simple_check</text>
          <rect x="10" y="60" width="110" height="25" rx="3" fill="rgba(139, 179, 156, 0.15)"/>
          <text x="65" y="76" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">'Equilateral'</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: Simple vs Searched CASE
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'case_types',
    keyword: 'CASE FORMS',
    title: 'Step 02: Simple CASE vs Searched CASE',
    pillClass: 'pill-case',
    conceptHeading: 'Value matching vs flexible boolean logic',
    conceptText: 'SQL supports two distinct syntactic forms of CASE. A Simple CASE compares a single expression against constant values (like a switch statement). A Searched CASE evaluates independent boolean expressions with comparisons (<, >, =, AND, OR) in every branch.',
    sqlCode: `-- 1. Searched CASE (Flexible, evaluates any boolean condition):\nSELECT name,\n       CASE\n         WHEN salary >= 90000 THEN 'Tier 1'\n         WHEN salary >= 70000 THEN 'Tier 2'\n         ELSE 'Tier 3'\n       END AS salary_tier\nFROM Employees;\n\n-- 2. Simple CASE (Exact equality matching only):\nSELECT name,\n       CASE department\n         WHEN 'Engineering' THEN 'Tech'\n         WHEN 'Finance'     THEN 'Capital'\n         ELSE 'Operations'\n       END AS business_unit\nFROM Employees;`,
    explanationPoints: [
      'Searched CASE (WHEN condition THEN result) is used in 95% of real-world queries.',
      'Searched CASE can test different columns in different branches (e.g. WHEN A = B OR C > 100).',
      'Simple CASE (CASE col WHEN val THEN result) can ONLY test equality (=) against a single column.'
    ],
    gotcha: 'You CANNOT use Simple CASE to check for NULL! Writing "CASE col WHEN NULL THEN ..." will NEVER match because in SQL NULL = NULL is UNKNOWN (not TRUE). You must use Searched CASE with "WHEN col IS NULL".',
    actionPrompt: 'Comparing Searched CASE vs Simple CASE side-by-side:',
    transform: (rows) => rows.slice(0, 5).map(r => ({
      A: r.A,
      B: r.B,
      C: r.C,
      searched_check: (r.A + r.B > r.C && r.A + r.C > r.B && r.B + r.C > r.A) ? 'Valid Geometry' : 'Invalid Geometry',
      _status: (r.A + r.B > r.C && r.A + r.C > r.B && r.B + r.C > r.A) ? 'passed' : 'rejected',
      _label: (r.A + r.B > r.C && r.A + r.C > r.B && r.B + r.C > r.A) ? 'VALID' : 'INVALID'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Left: Simple CASE Box -->
        <g transform="translate(30, 20)">
          <rect width="330" height="140" rx="5" fill="#121216" stroke="#33333b"/>
          <text x="15" y="24" fill="#a4b7cf" font-family="monospace" font-size="10.5" font-weight="700">SIMPLE CASE (Exact Equality Only)</text>
          <rect x="15" y="38" width="300" height="85" rx="3" fill="#09090b" stroke="#202026"/>
          <text x="25" y="56" fill="#71717a" font-family="monospace" font-size="8.5">CASE department</text>
          <text x="35" y="72" fill="#d1d5db" font-family="monospace" font-size="8.5">WHEN 'Engineering' THEN 'Tech'</text>
          <text x="35" y="88" fill="#d1d5db" font-family="monospace" font-size="8.5">WHEN 'Finance'     THEN 'Capital'</text>
          <text x="25" y="104" fill="#71717a" font-family="monospace" font-size="8.5">END</text>
          <text x="25" y="117" fill="#52525b" font-family="monospace" font-size="7.5">&bull; Only checks equality against 1 column</text>
        </g>

        <!-- Right: Searched CASE Box (Winner) -->
        <g transform="translate(390, 20)">
          <rect width="360" height="140" rx="5" fill="rgba(139, 179, 156, 0.08)" stroke="#9ec5ad" stroke-width="1.5"/>
          <text x="15" y="24" fill="#9ec5ad" font-family="monospace" font-size="10.5" font-weight="700">SEARCHED CASE (Universal Standard)</text>
          <rect x="15" y="38" width="330" height="85" rx="3" fill="#09090b" stroke="#202026"/>
          <text x="25" y="56" fill="#71717a" font-family="monospace" font-size="8.5">CASE</text>
          <text x="35" y="72" fill="#dfcaa9" font-family="monospace" font-size="8.5">WHEN salary &gt;= 90k AND dept='Eng' THEN 'Staff'</text>
          <text x="35" y="88" fill="#dfcaa9" font-family="monospace" font-size="8.5">WHEN A + B &lt;= C THEN 'Not A Triangle'</text>
          <text x="25" y="104" fill="#71717a" font-family="monospace" font-size="8.5">END</text>
          <text x="25" y="117" fill="#9ec5ad" font-family="monospace" font-size="7.5">&check; Evaluates complex boolean algebra across multiple cols</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: The Waterfall Short-Circuit Engine
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'case_waterfall',
    keyword: 'SHORT-CIRCUIT',
    title: 'Step 03: The Waterfall Short-Circuit Evaluation Flow',
    pillClass: 'pill-case',
    conceptHeading: 'Evaluation terminates at the very first matching branch',
    conceptText: 'A SQL CASE statement evaluates its WHEN branches sequentially from top to bottom. The moment a branch evaluates to TRUE, the engine returns that THEN value and immediately STOPS evaluating the rest of the CASE expression for that row.',
    sqlCode: `SELECT A, B, C,\n       CASE\n         -- Evaluated FIRST:\n         WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n         -- Evaluated SECOND (only if physically valid!):\n         WHEN A = B AND B = C THEN 'Equilateral'\n         -- Evaluated THIRD:\n         WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n         ELSE 'Scalene'\n       END AS triangle_type\nFROM TRIANGLES;`,
    explanationPoints: [
      'Short-circuit behavior means branch ordering is critically important.',
      'If row (20, 20, 40) is evaluated, Branch 1 tests: 20 + 20 <= 40 (TRUE!). It returns "Not A Triangle" and exits immediately.',
      'If you accidentally swapped Branch 1 and Branch 3, row (20, 20, 40) would test A = B (TRUE!) and falsely return "Isosceles"!'
    ],
    gotcha: 'Always write your most restrictive, exceptional, or invalid conditions at the top of the waterfall! General catch-all conditions belong at the bottom.',
    actionPrompt: 'Testing short-circuit waterfall on row (20, 20, 40):',
    transform: (rows) => [
      { A: 20, B: 20, C: 40, evaluated_branch: 'Branch 1: A + B <= C', result: 'Not A Triangle (Short-Circuited)', _status: 'rejected', _label: 'NOT A TRIANGLE' },
      { A: 20, B: 20, C: 20, evaluated_branch: 'Branch 2: A = B AND B = C', result: 'Equilateral', _status: 'passed', _label: 'EQUILATERAL' },
      { A: 20, B: 20, C: 30, evaluated_branch: 'Branch 3: A = B', result: 'Isosceles', _status: 'passed', _label: 'ISOSCELES' },
      { A: 30, B: 40, C: 50, evaluated_branch: 'Branch 4: ELSE Fallback', result: 'Scalene', _status: 'passed', _label: 'SCALENE' }
    ],
    svg: `
      <svg viewBox="0 0 780 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="200" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Incoming Row -->
        <g transform="translate(30, 20)">
          <rect width="160" height="50" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="22" fill="#a4b7cf" font-family="monospace" font-size="9" font-weight="700">CANDIDATE ROW</text>
          <text x="15" y="38" fill="#d69d8f" font-family="monospace" font-size="10" font-weight="700">A=20, B=20, C=40</text>
        </g>

        <!-- Waterfall Pipe -->
        <path d="M 200 45 L 260 45" stroke="#dfcaa9" stroke-width="2"/>

        <!-- Gate 1: Inequality -->
        <g transform="translate(270, 20)">
          <rect width="250" height="40" rx="4" fill="rgba(201, 136, 119, 0.15)" stroke="#d69d8f" stroke-width="1.5"/>
          <text x="15" y="18" fill="#d69d8f" font-family="monospace" font-size="8.5" font-weight="700">GATE 1: A + B &le; C ?</text>
          <text x="15" y="30" fill="#dfcaa9" font-family="monospace" font-size="8">20 + 20 &le; 40 &rarr; TRUE!</text>
          <text x="240" y="24" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700" text-anchor="end">&check; MATCH</text>
        </g>

        <!-- Exit arrow from Gate 1 -->
        <path d="M 530 40 L 600 40" stroke="#9ec5ad" stroke-width="2"/>
        <g transform="translate(610, 20)">
          <rect width="140" height="40" rx="4" fill="#121216" stroke="#9ec5ad" stroke-width="1.5"/>
          <text x="10" y="18" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700">RETURN VALUE:</text>
          <text x="10" y="30" fill="#d69d8f" font-family="monospace" font-size="8.5" font-weight="700">'Not A Triangle'</text>
        </g>

        <!-- Short-circuit stop wall -->
        <line x1="395" y1="65" x2="395" y2="85" stroke="#c98877" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="395" y="98" fill="#c98877" font-family="monospace" font-size="8" text-anchor="middle">&cross; SHORT-CIRCUIT: GATES 2, 3, 4 NEVER EXECUTED</text>

        <!-- Unreachable Gates -->
        <g transform="translate(270, 115)" opacity="0.35">
          <rect width="250" height="30" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="18" fill="#71717a" font-family="monospace" font-size="8">GATE 2: A = B AND B = C (Skipped)</text>
        </g>
        <g transform="translate(270, 150)" opacity="0.35">
          <rect width="250" height="30" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="18" fill="#71717a" font-family="monospace" font-size="8">GATE 3: A = B OR B = C (Skipped)</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: The Missing ELSE Trap & Silent NULL
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'case_null_trap',
    keyword: 'ELSE TRAP',
    title: 'Step 04: The Missing ELSE Trap & Silent NULL Generation',
    pillClass: 'pill-case',
    conceptHeading: 'What happens when no WHEN condition matches?',
    conceptText: 'The ELSE clause in a CASE expression is optional. However, if no WHEN conditions evaluate to TRUE and you omitted the ELSE clause, SQL does NOT throw an error—it silently returns NULL for that row!',
    sqlCode: `-- DANGEROUS: No ELSE provided!\nSELECT A, B, C,\n       CASE\n         WHEN A = B AND B = C THEN 'Equilateral'\n       END AS faulty_triangle\nFROM TRIANGLES;\n-- Any row that is NOT Equilateral will produce NULL!`,
    explanationPoints: [
      'In production pipelines, unexpected NULLs cause downstream calculation failures and broken reports.',
      'Always provide an explicit ELSE (e.g. ELSE \'Unknown\' or ELSE 0) to ensure deterministic outputs.',
      'If you intentionally want NULL, write "ELSE NULL" explicitly so your code intent is transparent to other engineers.'
    ],
    gotcha: 'Aggregate functions like SUM() and AVG() silently ignore NULL values! If your CASE produces unexpected NULLs, your averages and counts will be corrupted.',
    actionPrompt: 'Comparing explicit ELSE vs missing ELSE on TRIANGLES:',
    transform: (rows) => rows.slice(0, 5).map(r => {
      const isEq = (r.A === r.B && r.B === r.C);
      return {
        A: r.A,
        B: r.B,
        C: r.C,
        with_else: isEq ? 'Equilateral' : 'Other Shape',
        without_else: isEq ? 'Equilateral' : 'NULL (Silent)',
        _status: isEq ? 'passed' : 'rejected',
        _label: isEq ? 'MATCH' : 'NO MATCH'
      };
    }),
    svg: `
      <svg viewBox="0 0 780 170" width="100%" height="170" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="170" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- No Match Row -->
        <g transform="translate(30, 25)">
          <rect width="180" height="50" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="20" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">ROW: Scalene Triangle</text>
          <text x="15" y="36" fill="#d1d5db" font-family="monospace" font-size="9.5">A=30, B=40, C=50</text>
        </g>

        <!-- Fork arrows -->
        <path d="M 220 50 L 290 50" stroke="#dfcaa9" stroke-width="2"/>

        <!-- Scenario A: With Explicit ELSE -->
        <g transform="translate(300, 15)">
          <rect width="210" height="65" rx="4" fill="rgba(139, 179, 156, 0.1)" stroke="#9ec5ad"/>
          <text x="15" y="20" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700">&check; WITH EXPLICIT ELSE</text>
          <text x="15" y="36" fill="#71717a" font-family="monospace" font-size="8">ELSE 'Other Shape'</text>
          <text x="15" y="52" fill="#dfcaa9" font-family="monospace" font-size="9" font-weight="600">Output: 'Other Shape'</text>
        </g>

        <!-- Scenario B: Missing ELSE -->
        <g transform="translate(300, 90)">
          <rect width="210" height="65" rx="4" fill="rgba(201, 136, 119, 0.1)" stroke="#c98877"/>
          <text x="15" y="20" fill="#c98877" font-family="monospace" font-size="9" font-weight="700">&cross; OMITTED ELSE (Silent Trap)</text>
          <text x="15" y="36" fill="#71717a" font-family="monospace" font-size="8">No fallback defined</text>
          <text x="15" y="52" fill="#c98877" font-family="monospace" font-size="9" font-weight="700">Output: NULL</text>
        </g>

        <g transform="translate(530, 90)">
          <rect width="220" height="65" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="15" y="24" fill="#c98877" font-family="monospace" font-size="8" font-weight="700">DOWNSTREAM DANGER:</text>
          <text x="15" y="40" fill="#52525b" font-family="monospace" font-size="7.5">&bull; COUNT(col) skips this row</text>
          <text x="15" y="52" fill="#52525b" font-family="monospace" font-size="7.5">&bull; String concat becomes NULL</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: The Complete Triangle Classifier (HackerRank Simulator!)
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'case_triangle_sim',
    keyword: 'TRIANGLES',
    title: 'Step 05: The Full Triangle Classifier Engine',
    pillClass: 'pill-case',
    conceptHeading: 'The exact algorithm to solve HackerRank: Type of Triangle',
    conceptText: 'This is the complete, production-grade 4-branch CASE WHEN expression to classify every record in the TRIANGLES table into Equilateral, Isosceles, Scalene, or Not A Triangle.',
    sqlCode: `SELECT CASE\n         WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n         WHEN A = B AND B = C THEN 'Equilateral'\n         WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n         ELSE 'Scalene'\n       END\nFROM TRIANGLES;`,
    explanationPoints: [
      'Branch 1 eliminates impossible geometry: sum of two sides must be strictly greater than third side.',
      'Branch 2 identifies Equilateral: all 3 sides equal.',
      'Branch 3 identifies Isosceles: any 2 sides equal.',
      'Branch 4 (ELSE) captures Scalene: all 3 sides distinct.'
    ],
    gotcha: 'Remember: On HackerRank, the prompt requires ONLY the triangle classification string in the output column, not the original A, B, C values!',
    actionPrompt: 'Live classification of all 8 test cases from the official HackerRank challenge:',
    transform: (rows) => rows.map(r => {
      const isInvalid = (r.A + r.B <= r.C || r.A + r.C <= r.B || r.B + r.C <= r.A);
      let type = '';
      if (isInvalid) type = 'Not A Triangle';
      else if (r.A === r.B && r.B === r.C) type = 'Equilateral';
      else if (r.A === r.B || r.B === r.C || r.A === r.C) type = 'Isosceles';
      else type = 'Scalene';

      return {
        A: r.A,
        B: r.B,
        C: r.C,
        output: type,
        _status: isInvalid ? 'rejected' : 'passed',
        _label: type.toUpperCase()
      };
    }),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- 4 Branches Matrix -->
        <g transform="translate(30, 15)">
          <rect width="720" height="150" rx="5" fill="#111115" stroke="#dfcaa9" stroke-width="1.5"/>
          <text x="20" y="24" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700">4-STAGE WATERFALL ENGINE FOR TRIANGLES</text>

          <!-- Branch 1 -->
          <g transform="translate(20, 36)">
            <rect width="680" height="24" rx="3" fill="#181517" stroke="#c98877"/>
            <text x="15" y="16" fill="#c98877" font-family="monospace" font-size="8.5" font-weight="700">BRANCH 1 (Invalid):</text>
            <text x="155" y="16" fill="#d1d5db" font-family="monospace" font-size="8">WHEN A+B &le; C OR A+C &le; B OR B+C &le; A</text>
            <text x="665" y="16" fill="#c98877" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="end">&rarr; 'Not A Triangle'</text>
          </g>

          <!-- Branch 2 -->
          <g transform="translate(20, 64)">
            <rect width="680" height="24" rx="3" fill="#131816" stroke="#9ec5ad"/>
            <text x="15" y="16" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="700">BRANCH 2 (3 Equal):</text>
            <text x="155" y="16" fill="#d1d5db" font-family="monospace" font-size="8">WHEN A = B AND B = C</text>
            <text x="665" y="16" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="end">&rarr; 'Equilateral'</text>
          </g>

          <!-- Branch 3 -->
          <g transform="translate(20, 92)">
            <rect width="680" height="24" rx="3" fill="#14171c" stroke="#a4b7cf"/>
            <text x="15" y="16" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">BRANCH 3 (2 Equal):</text>
            <text x="155" y="16" fill="#d1d5db" font-family="monospace" font-size="8">WHEN A = B OR B = C OR A = C</text>
            <text x="665" y="16" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="end">&rarr; 'Isosceles'</text>
          </g>

          <!-- Branch 4 -->
          <g transform="translate(20, 120)">
            <rect width="680" height="24" rx="3" fill="#19171f" stroke="#beafcc"/>
            <text x="15" y="16" fill="#beafcc" font-family="monospace" font-size="8.5" font-weight="700">BRANCH 4 (All Diff):</text>
            <text x="155" y="16" fill="#d1d5db" font-family="monospace" font-size="8">ELSE Fallback</text>
            <text x="665" y="16" fill="#beafcc" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="end">&rarr; 'Scalene'</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: Corporate Conditional Aggregation (SUM(CASE WHEN...))
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'case_aggregation',
    keyword: 'SUM(CASE)',
    title: 'Step 06: Corporate Pattern: Conditional Aggregation',
    pillClass: 'pill-case',
    conceptHeading: 'Pivoting rows into columns for financial reporting',
    conceptText: 'In corporate analytics, CASE is frequently placed inside aggregate functions like SUM() or COUNT(). This allows you to count or sum specific sub-populations in a single pass without writing multiple queries.',
    sqlCode: `SELECT SUM(CASE WHEN department = 'Engineering' THEN salary ELSE 0 END) AS eng_payroll,\n       SUM(CASE WHEN department = 'Sales'       THEN salary ELSE 0 END) AS sales_payroll,\n       COUNT(CASE WHEN salary >= 80000 THEN 1 END) AS high_earners_count\nFROM Employees;`,
    explanationPoints: [
      'Executes in a single table scan—massively faster than running 3 separate queries.',
      'SUM(CASE WHEN cond THEN value ELSE 0 END) creates a financial payroll pivot.',
      'COUNT(CASE WHEN cond THEN 1 END) leverages the fact that omitted ELSE produces NULL, and COUNT(col) skips NULLs!'
    ],
    gotcha: 'When using SUM(CASE...), always specify "ELSE 0"! If you omit the ELSE, unmatched rows become NULL, and adding values to NULL can yield unexpected results in some SQL engines.',
    actionPrompt: 'Executive payroll pivot generated via conditional aggregation:',
    transform: (rows) => [
      { metric: 'Engineering Total Payroll', value: '$272,000 (Alice + Charlie + Evan)' },
      { metric: 'Sales Total Payroll', value: '$132,000 (Diana + Fiona)' },
      { metric: 'High Earners Count (&ge; $80k)', value: '4 Executives' }
    ],
    svg: `
      <svg viewBox="0 0 780 170" width="100%" height="170" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="170" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Left: Raw Rows -->
        <g transform="translate(30, 20)">
          <rect width="200" height="130" rx="4" fill="#121216" stroke="#33333b"/>
          <text x="15" y="24" fill="#a4b7cf" font-family="monospace" font-size="9" font-weight="700">8 RAW EMPLOYEES</text>
          <text x="15" y="50" fill="#dfcaa9" font-family="monospace" font-size="8">Alice: Eng ($95k)</text>
          <text x="15" y="68" fill="#a4b7cf" font-family="monospace" font-size="8">Bob: Mktg ($62k)</text>
          <text x="15" y="86" fill="#dfcaa9" font-family="monospace" font-size="8">Charlie: Eng ($82k)</text>
          <text x="15" y="104" fill="#71717a" font-family="monospace" font-size="8">Diana: Sales ($74k)...</text>
        </g>

        <!-- Center: Conditional Aggregation Engine -->
        <path d="M 240 85 L 295 85" stroke="#9ec5ad" stroke-width="2"/>
        <g transform="translate(305, 20)">
          <rect width="250" height="130" rx="4" fill="rgba(139, 179, 156, 0.1)" stroke="#9ec5ad" stroke-width="1.5"/>
          <text x="15" y="24" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700">SUM(CASE WHEN...) FILTER</text>
          <text x="15" y="50" fill="#d1d5db" font-family="monospace" font-size="8.5">Dept == 'Engineering' ? salary : 0</text>
          <text x="15" y="70" fill="#9ec5ad" font-family="monospace" font-size="8.5">&rarr; 95k + 82k + 95k = $272k</text>
          <text x="15" y="96" fill="#d1d5db" font-family="monospace" font-size="8.5">Dept == 'Sales' ? salary : 0</text>
          <text x="15" y="116" fill="#a4b7cf" font-family="monospace" font-size="8.5">&rarr; 74k + 58k = $132k</text>
        </g>

        <!-- Right: Executive KPI Output -->
        <path d="M 565 85 L 610 85" stroke="#dfcaa9" stroke-width="2"/>
        <g transform="translate(620, 20)">
          <rect width="130" height="130" rx="4" fill="#121216" stroke="#dfcaa9" stroke-width="1.5"/>
          <text x="12" y="24" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">EXECUTIVE PIVOT</text>
          <rect x="8" y="38" width="114" height="35" rx="3" fill="#181a20"/>
          <text x="12" y="52" fill="#71717a" font-family="monospace" font-size="7">ENG PAYROLL</text>
          <text x="12" y="66" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700">$272,000</text>

          <rect x="8" y="80" width="114" height="35" rx="3" fill="#181a20"/>
          <text x="12" y="94" fill="#71717a" font-family="monospace" font-size="7">SALES PAYROLL</text>
          <text x="12" y="108" fill="#a4b7cf" font-family="monospace" font-size="9" font-weight="700">$132,000</text>
        </g>
      </svg>
    `
  }
];
