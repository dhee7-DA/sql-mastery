// =============================================================================
// SQL PROBLEM DECONSTRUCTOR & CORPORATE BUSINESS CONTEXT ENGINE
// =============================================================================

window.DECONSTRUCTOR_PRESETS = [
  {
    id: 'triangle',
    title: 'HackerRank: Type of Triangle',
    difficulty: 'Easy',
    points: 20,
    tags: ['CASE WHEN', 'Relational Math', 'Conditional Logic'],
    schema: {
      table: 'TRIANGLES',
      columns: ['A', 'B', 'C'],
      types: { A: 'INT', B: 'INT', C: 'INT' },
      sampleRows: [
        { A: 20, B: 20, C: 20 },
        { A: 20, B: 20, C: 40 },
        { A: 20, B: 20, C: 30 },
        { A: 13, B: 14, C: 30 },
        { A: 10, B: 10, C: 10 },
        { A: 30, B: 40, C: 50 }
      ]
    },
    rawPrompt: `Write a query identifying the type of each record in the TRIANGLES table using its three side lengths. Output one of the following for each row:
- Equilateral: It's a triangle with 3 sides of equal length.
- Isosceles: It's a triangle with 2 sides of equal length.
- Scalene: It's a triangle with 3 sides of differing lengths.
- Not A Triangle: The given values of A, B, and C don't form a triangle.`,
    
    plainEnglishGoal: 'Evaluate three numeric columns (A, B, C) per row and classify each row into one of 4 discrete text labels based on geometric validity and side equality.',
    
    mentalModel: 'Think of this as a waterfall cascading filter. You MUST test whether the shape can physically exist first (Triangle Inequality). Only if it is a real triangle do you check if 3 sides match, then 2 sides, then all different.',
    svgDiagram: `<svg viewBox="0 0 760 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="160" fill="#080c14" rx="8" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="730" height="26" fill="rgba(255,255,255,0.02)" rx="4" stroke="rgba(56,189,248,0.2)"/>
  <text x="380" y="29" fill="#38bdf8" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">CASE WHEN WATERFALL: TRIANGLE VALIDATION DECISION TREE</text>
  <g transform="translate(15, 48)">
    <rect x="0" y="0" width="165" height="95" fill="rgba(244,63,94,0.08)" rx="6" stroke="rgba(244,63,94,0.3)"/>
    <text x="82" y="22" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">01. INEQUALITY TEST</text>
    <text x="82" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">A+B&lt;=C | A+C&lt;=B | B+C&lt;=A</text>
    <rect x="12" y="52" width="141" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="82" y="68" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle">&rarr; 'Not A Triangle'</text>
    <path d="M 168 47 L 182 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="185" y="0" width="165" height="95" fill="rgba(56,189,248,0.08)" rx="6" stroke="rgba(56,189,248,0.3)"/>
    <text x="267" y="22" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">02. EQUILATERAL</text>
    <text x="267" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">A = B AND B = C</text>
    <rect x="197" y="52" width="141" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="267" y="68" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle">&rarr; 'Equilateral'</text>
    <path d="M 353 47 L 367 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="370" y="0" width="170" height="95" fill="rgba(251,191,36,0.08)" rx="6" stroke="rgba(251,191,36,0.3)"/>
    <text x="455" y="22" fill="#fbbf24" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">03. ISOSCELES</text>
    <text x="455" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">A = B | B = C | A = C</text>
    <rect x="385" y="52" width="140" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="455" y="68" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle">&rarr; 'Isosceles'</text>
    <path d="M 543 47 L 557 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="560" y="0" width="170" height="95" fill="rgba(34,197,94,0.08)" rx="6" stroke="rgba(34,197,94,0.3)"/>
    <text x="645" y="22" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">04. SCALENE</text>
    <text x="645" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">ELSE (All Sides Unequal)</text>
    <rect x="575" y="52" width="140" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="645" y="68" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle">&rarr; 'Scalene'</text>
  </g>
</svg>`,
    
    edgeCases: [
      {
        trap: 'Checking Isosceles (A = B) before checking Triangle Inequality',
        detail: 'In row (20, 20, 40), A = B is TRUE! But 20 + 20 is NOT greater than 40. The two sides collapse into a flat straight line! If you test A = B first, your query will falsely label it "Isosceles" instead of "Not A Triangle".'
      },
      {
        trap: 'Non-exhaustive Inequality Check',
        detail: 'You cannot just test A + B <= C. The longest side could be in column A or B! You must test: (A + B <= C) OR (A + C <= B) OR (B + C <= A).'
      },
      {
        trap: 'Order of WHEN Branches in SQL',
        detail: 'SQL CASE WHEN stops evaluating at the FIRST matching condition. Place the most restrictive / invalid test at the very top!'
      }
    ],

    corporateContext: {
      industry: 'Autonomous Robotics, Drone Navigation & 3D CAD Engines',
      role: 'Sensor Telemetry & Surface Geometry Validation Engineer',
      realWorldProblem: 'Self-driving vehicles and autonomous warehouse drones fire LiDAR pulses in 3 directions (A, B, C) to triangulate open pathway surfaces. If a sensor glitches or a wall is angled, the returned vector distances will violate the Triangle Inequality. In production, SQL pipelines flag these records as "Sensor Glitch / Non-Planar" to trigger sensor re-calibration and prevent robotic collisions.',
      kpiImpact: 'Reduces false-positive collision emergency stops by 98.4% and ensures 3D surface meshes do not contain non-manifold geometry.'
    },

    executionBlueprint: [
      { step: '01 FROM', action: 'Load TRIANGLES table from disk.' },
      { step: '02 SELECT CASE', action: 'Evaluate CASE WHEN conditions in strict waterfall sequence.' },
      { step: 'Branch 1', action: 'WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'' },
      { step: 'Branch 2', action: 'WHEN A = B AND B = C THEN \'Equilateral\'' },
      { step: 'Branch 3', action: 'WHEN A = B OR B = C OR A = C THEN \'Isosceles\'' },
      { step: 'Branch 4', action: 'ELSE \'Scalene\'' }
    ],

    solutionSQL: `SELECT CASE\n         WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n         WHEN A = B AND B = C THEN 'Equilateral'\n         WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n         ELSE 'Scalene'\n       END AS triangle_type\nFROM TRIANGLES;`
  },

  {
    id: 'station5',
    title: 'HackerRank: Weather Observation Station 5',
    difficulty: 'Easy',
    points: 15,
    tags: ['ORDER BY', 'LENGTH()', 'Tie-Breakers', 'LIMIT'],
    schema: {
      table: 'STATION',
      columns: ['ID', 'CITY', 'STATE', 'LAT_N', 'LONG_W'],
      types: { ID: 'INT', CITY: 'VARCHAR', STATE: 'VARCHAR', LAT_N: 'INT', LONG_W: 'INT' },
      sampleRows: [
        { ID: 1, CITY: 'Amo', STATE: 'IN', LAT_N: 39, LONG_W: 86 },
        { ID: 2, CITY: 'Lee', STATE: 'IL', LAT_N: 41, LONG_W: 89 },
        { ID: 3, CITY: 'Roy', STATE: 'WA', LAT_N: 46, LONG_W: 122 },
        { ID: 4, CITY: 'Marine On Saint Croix', STATE: 'MN', LAT_N: 45, LONG_W: 92 },
        { ID: 5, CITY: 'Manchester', STATE: 'MD', LAT_N: 39, LONG_W: 76 }
      ]
    },
    rawPrompt: `Query the two cities in STATION with the shortest and longest CITY names, as well as their respective lengths (i.e.: number of characters in the name). If there is more than one smallest or largest city, choose the one that comes first when ordered alphabetically.`,
    
    plainEnglishGoal: 'Execute two separate queries: one to find the city with the minimum character length, and one for the maximum length. If multiple cities share the shortest length, break the tie alphabetically.',
    
    mentalModel: 'Instead of searching for MIN() and MAX() with complex subqueries, sort all cities by LENGTH(CITY) ASC and pick the first one with LIMIT 1. Repeat in DESC order for the longest city.',
    svgDiagram: `<svg viewBox="0 0 760 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="160" fill="#080c14" rx="8" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="730" height="26" fill="rgba(255,255,255,0.02)" rx="4" stroke="rgba(16,185,129,0.2)"/>
  <text x="380" y="29" fill="#10b981" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">WEATHER OBSERVATION STATION 5: DUAL EXTREME HEAP PIPELINE</text>
  <g transform="translate(15, 48)">
    <rect x="0" y="0" width="350" height="95" fill="rgba(56,189,248,0.08)" rx="6" stroke="rgba(56,189,248,0.3)"/>
    <text x="175" y="22" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">PIPELINE 1: SHORTEST CITY (MIN HEAP)</text>
    <text x="175" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">ORDER BY LENGTH(city) ASC, city ASC LIMIT 1</text>
    <rect x="25" y="52" width="300" height="26" fill="rgba(0,0,0,0.45)" rx="4"/>
    <text x="175" y="69" fill="#38bdf8" font-family="monospace" font-size="8.5" font-weight="bold" text-anchor="middle">Result: ('Amo', 3) &bull; Alphabetical Tie-Breaker</text>

    <path d="M 353 47 L 377 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="380" y="0" width="350" height="95" fill="rgba(251,191,36,0.08)" rx="6" stroke="rgba(251,191,36,0.3)"/>
    <text x="555" y="22" fill="#fbbf24" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">PIPELINE 2: LONGEST CITY (MAX HEAP)</text>
    <text x="555" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">ORDER BY LENGTH(city) DESC, city ASC LIMIT 1</text>
    <rect x="405" y="52" width="300" height="26" fill="rgba(0,0,0,0.45)" rx="4"/>
    <text x="555" y="69" fill="#fbbf24" font-family="monospace" font-size="8.5" font-weight="bold" text-anchor="middle">Result: ('Marine On Saint Croix', 21)</text>
  </g>
</svg>`,
    
    edgeCases: [
      {
        trap: 'Ignoring Alphabetical Tie-Breaker',
        detail: 'Cities "Amo", "Lee", and "Roy" all have length 3! Without secondary sort "CITY ASC", the engine returns whichever row happened to sit first in physical disk storage.'
      },
      {
        trap: 'Trying to return both rows in a single non-union query',
        detail: 'SQL SELECT operates on sets. You cannot easily return the top-1 and bottom-1 in a single standard SELECT without UNION ALL or two separate queries.'
      }
    ],

    corporateContext: {
      industry: 'E-Commerce, Travel Search & Mobile Design Systems',
      role: 'Design System & Data Quality Engineer',
      realWorldProblem: 'When Airbnb or Booking.com designs search dropdowns and mobile cards, UI components have strict character boundaries (e.g. max 24px label height). Engineers run this exact SQL pattern across millions of destination names to find boundary outliers (e.g. longest city "Marine On Saint Croix" vs shortest "Amo") to test text truncation, ellipsis logic, and prevent UI layout breakage on iOS and Android devices.',
      kpiImpact: 'Prevents 100% of mobile layout overflow bugs and ensures clean UI typography across 140+ countries.'
    },

    executionBlueprint: [
      { step: 'Query 1 (Shortest)', action: 'ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1;' },
      { step: 'Query 2 (Longest)', action: 'ORDER BY LENGTH(CITY) DESC, CITY ASC LIMIT 1;' }
    ],

    solutionSQL: `(SELECT CITY, LENGTH(CITY)\n FROM STATION\n ORDER BY LENGTH(CITY) ASC, CITY ASC\n LIMIT 1)\nUNION ALL\n(SELECT CITY, LENGTH(CITY)\n FROM STATION\n ORDER BY LENGTH(CITY) DESC, CITY ASC\n LIMIT 1);`
  },

  {
    id: 'top_earners',
    title: 'HackerRank: Top Earners',
    difficulty: 'Easy / Medium',
    points: 20,
    tags: ['GROUP BY', 'Aggregations', 'Computed Columns', 'LIMIT'],
    schema: {
      table: 'Employees',
      columns: ['emp_id', 'name', 'months', 'salary'],
      types: { emp_id: 'INT', name: 'VARCHAR', months: 'INT', salary: 'INT' },
      sampleRows: [
        { emp_id: 101, name: 'Alice', months: 12, salary: 9000 },
        { emp_id: 102, name: 'Bob', months: 10, salary: 10800 },
        { emp_id: 103, name: 'Charlie', months: 6, salary: 5000 },
        { emp_id: 104, name: 'Diana', months: 12, salary: 9000 },
        { emp_id: 105, name: 'Evan', months: 8, salary: 4000 }
      ]
    },
    rawPrompt: `We define an employee's total earnings to be their monthly salary * months worked, and the maximum total earnings to be the maximum total earnings for any employee in the Employee table. Write a query to find the maximum total earnings for all employees as well as the total number of employees who have maximum total earnings.`,
    
    plainEnglishGoal: 'Multiply salary * months to find each employee\'s total earnings. Then find what the highest earnings figure is, and count how many employees earned that exact top amount.',
    
    mentalModel: 'Group employees by their computed earnings (months * salary), sort the groups from highest earnings to lowest, and take LIMIT 1.',
    svgDiagram: `<svg viewBox="0 0 760 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="160" fill="#080c14" rx="8" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="730" height="26" fill="rgba(255,255,255,0.02)" rx="4" stroke="rgba(245,158,11,0.2)"/>
  <text x="380" y="29" fill="#fbbf24" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">TOP EARNERS: COMPUTED PROJECTION &bull; GROUP BY &bull; TOP-1 SLICE</text>
  <g transform="translate(15, 48)">
    <rect x="0" y="0" width="220" height="95" fill="rgba(56,189,248,0.08)" rx="6" stroke="rgba(56,189,248,0.3)"/>
    <text x="110" y="22" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">01. COMPUTE TOTAL</text>
    <text x="110" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">earnings = months * salary</text>
    <rect x="15" y="52" width="190" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="110" y="68" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Row-by-row integer math</text>
    <path d="M 223 47 L 252 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="255" y="0" width="220" height="95" fill="rgba(192,132,252,0.08)" rx="6" stroke="rgba(192,132,252,0.3)"/>
    <text x="365" y="22" fill="#c084fc" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">02. HASH GROUP BY</text>
    <text x="365" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">GROUP BY months * salary</text>
    <rect x="270" y="52" width="190" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="365" y="68" fill="#c084fc" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Aggregate COUNT(*) headcount</text>
    <path d="M 478 47 L 507 47" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

    <rect x="510" y="0" width="220" height="95" fill="rgba(34,197,94,0.08)" rx="6" stroke="rgba(34,197,94,0.3)"/>
    <text x="620" y="22" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">03. ORDER BY &amp; LIMIT 1</text>
    <text x="620" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">ORDER BY 1 DESC LIMIT 1</text>
    <rect x="525" y="52" width="190" height="24" fill="rgba(0,0,0,0.4)" rx="4"/>
    <text x="620" y="68" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Output: (108064, 7)</text>
  </g>
</svg>`,
    
    edgeCases: [
      {
        trap: 'Using Subqueries unnecessarily',
        detail: 'Beginners often write WHERE (months * salary) = (SELECT MAX(months * salary) FROM Employee). While valid, GROUP BY (months * salary) ORDER BY 1 DESC LIMIT 1 is faster and simpler.'
      },
      {
        trap: 'Grouping by employee_id instead of total earnings',
        detail: 'You want to know how many people tied for the top spot. You must group by the earnings value itself!'
      }
    ],

    corporateContext: {
      industry: 'Fintech, Payroll & Executive Compensation Governance',
      role: 'Compensation Analytics & Governance Auditor',
      realWorldProblem: 'At multinational enterprises, executive bonus pools and sales commissions are capped by regulatory governance (e.g. Sarbanes-Oxley). Auditing teams run this SQL logic to detect compensation outliers, identify if multiple executives reached the maximum payout threshold simultaneously, and verify that payout allocations do not exceed budgeted reserve pools.',
      kpiImpact: 'Guarantees regulatory compliance in executive bonus distribution and flags anomaly payouts before wire execution.'
    },

    executionBlueprint: [
      { step: '01 FROM', action: 'Employees table' },
      { step: '02 GROUP BY', action: 'Group by computed total earnings: (months * salary)' },
      { step: '03 SELECT', action: '(months * salary), COUNT(*)' },
      { step: '04 ORDER BY', action: '(months * salary) DESC' },
      { step: '05 LIMIT', action: 'LIMIT 1 (takes the maximum earnings and its headcount)' }
    ],

    solutionSQL: `SELECT (months * salary) AS max_earnings,\n       COUNT(*)\nFROM Employees\nGROUP BY (months * salary)\nORDER BY max_earnings DESC\nLIMIT 1;`
  }
];
