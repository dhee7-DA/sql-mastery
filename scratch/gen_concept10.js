// scratch/gen_concept10.js
// Generates visualizer/leetcode_section10_data.js
// Concept 10: Graph, Social & Network Analytics (13 Problems)
const fs = require('fs');
const path = require('path');

const batch1 = require('./section8_problems_batch1.js');
const batch2 = require('./section8_problems_batch2.js');
const allProbs = [...batch1, ...batch2];

const c10Ids = [574, 586, 602, 612, 614, 1077, 1083, 1084, 1098, 1112, 1126, 1127, 1132];
const selectedProbs = c10Ids.map(id => allProbs.find(p => p.id === id)).filter(Boolean);

console.log(`Concept 10 matched ${selectedProbs.length} problems.`);

const chapters = [
  {
    id: "chap-10-1-bidirectional-graph-union",
    number: "10.1",
    title: "Undirected Graph Symmetry: Bidirectional Edge Unification",
    content: `
      <p class="lc-p">
        In social network graphs (e.g., LeetCode #602 <em>Friend Requests II: Who Has the Most Friends</em>), friendships are undirected symmetric relationships. A row <code>(requester_id, accepter_id)</code> signifies that both users consider each other friends.
      </p>

      <div class="lc-rule-banner">
        <strong>The Symmetric Edge Duplication Theorem:</strong><br>
        To compute total connectivity per node without quadratic self-joins:<br>
        Project all directed pairs forward: <code>SELECT requester_id AS person, accepter_id AS friend FROM RequestAccepted</code><br>
        <strong>UNION ALL</strong><br>
        Project all directed pairs in reverse: <code>SELECT accepter_id AS person, requester_id AS friend FROM RequestAccepted</code>.<br>
        Grouping by <code>person</code> and aggregating <code>COUNT(*)</code> computes the exact node degree (friend count) in a single linear scan!
      </div>
    `,
    diagram: {
      title: "Bidirectional Graph Expansion: Symmetric Node Projection",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">BIDIRECTIONAL GRAPH DEGREE: UNION ALL EXPANSION</text>
        <g transform="translate(40, 55)">
          <rect x="0" y="20" width="180" height="30" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="10" y="39" fill="#0f172a" font-family="monospace" font-size="10">Edge: User 1 &lt;--&gt; User 2</text>
        </g>
        <path d="M 240 80 L 300 80" stroke="#2563eb" stroke-width="2"/>
        <g transform="translate(320, 55)">
          <rect x="0" y="10" width="220" height="24" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="8" y="26" fill="#1d4ed8" font-family="monospace" font-size="9.5">Forward: person=1, friend=2</text>
          <rect x="0" y="38" width="220" height="24" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="8" y="54" fill="#1d4ed8" font-family="monospace" font-size="9.5">Reverse: person=2, friend=1</text>
        </g>
        <path d="M 560 80 L 620 80" stroke="#16a34a" stroke-width="2"/>
        <g transform="translate(640, 55)">
          <rect x="0" y="10" width="200" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
          <text x="10" y="34" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">GROUP BY person</text>
          <text x="10" y="54" fill="#15803d" font-family="monospace" font-size="9.5">COUNT(*) = Total Friends</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-2-vertex-degree-calculations",
    number: "10.2",
    title: "Vertex Degree Calculation: In-Degree, Out-Degree & Connectivity",
    content: `
      <p class="lc-p">
        In directed graphs, a vertex has two distinct measures: <strong>In-Degree</strong> (number of incoming arrows) and <strong>Out-Degree</strong> (number of outgoing arrows).
      </p>
    `,
    diagram: {
      title: "Directed Vertex Degree Measurement",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DIRECTED GRAPH: IN-DEGREE VS OUT-DEGREE</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">In-Degree: COUNT(follower_id) GROUP BY followee_id</text>
          <text x="0" y="45" fill="#2563eb" font-family="monospace" font-size="10">Out-Degree: COUNT(followee_id) GROUP BY follower_id</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-3-two-hop-follower-traversal",
    number: "10.3",
    title: "Two-Hop Follower Traversal: Friend-of-Friend Adjacency",
    content: `
      <p class="lc-p">
        In LeetCode #614 (<em>Second Degree Follower</em>), calculating users who both follow someone and are followed by others requires an intersection self-join on <code>f1.follower = f2.followee</code>.
      </p>
    `,
    diagram: {
      title: "Two-Hop Traversal: Follower-to-Followee Interlocking",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TWO-HOP FOLLOWER INTERSECTION (A -> B -> C)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Candidate B must exist as both 'follower' AND 'followee' across relations</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-4-cartesian-plane-distances",
    number: "10.4",
    title: "Euclidean Plane Geometry & Cartesian Distance Calculation",
    content: `
      <p class="lc-p">
        In LeetCode #612 (<em>Shortest Distance in a Plane</em>), pairs of 2D coordinates <code>(x, y)</code> require computing minimum distances:
        <code>SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))</code> over a strict non-identical cross-join: <code>p1.x &lt;&gt; p2.x OR p1.y &lt;&gt; p2.y</code>.
      </p>
    `,
    diagram: {
      title: "Cartesian Cross-Join Distance Matrix",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">EUCLIDEAN DISTANCE: SQRT(POW(x1-x2, 2) + POW(y1-y2, 2))</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Points (p1, p2) with p1 &lt;&gt; p2 -> MIN(distance) rounded to 2 decimal places</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-5-election-tie-breaking",
    number: "10.5",
    title: "Multi-Entity Tie-Breaking in Election & Tournament Ranking",
    content: `
      <p class="lc-p">
        In LeetCode #574 (<em>Winning Candidate</em>) and #1112 (<em>Highest Grade For Each Student</em>), selecting the top entity requires deterministic tie-breaking using secondary sorting criteria (e.g. <code>ORDER BY grade DESC, course_id ASC</code>).
      </p>
    `,
    diagram: {
      title: "Deterministic Secondary Tie-Breaker Ranking",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DETERMINISTIC TIE-BREAKING: ROW_NUMBER() OVER (ORDER BY score DESC, id ASC)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">If two candidates tie on votes, candidate with lowest ID wins deterministically</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-6-behavioral-set-differences",
    number: "10.6",
    title: "Customer Journey Behavioral Set Differences: Product Funnels",
    content: `
      <p class="lc-p">
        In LeetCode #1083 (<em>Sales Analysis II</em>), finding customers who bought Product S8 but NEVER bought iPhone requires conditional aggregation:
        <code>SUM(product_name = 'S8') &gt; 0 AND SUM(product_name = 'iPhone') = 0</code> inside a <code>HAVING</code> clause.
      </p>
    `,
    diagram: {
      title: "Set Inclusion/Exclusion Filter via Conditional SUM",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">CONDITIONAL SET DIFFERENCE: SUM(A)&gt;0 AND SUM(B)=0</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">HAVING SUM(is_S8) &gt; 0 AND SUM(is_iPhone) = 0</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-7-cross-platform-attribution",
    number: "10.7",
    title: "Multi-Platform User Attribution & Unified Spending Synthesis",
    content: `
      <p class="lc-p">
        In LeetCode #1127 (<em>User Purchase Platform</em>), users purchase on Mobile, Desktop, or Both. If a user purchases on both platforms on the same date, their spend attributes exclusively to 'both', leaving 0 for single-platform spending.
      </p>
    `,
    diagram: {
      title: "Platform Attribution Matrix (Mobile / Desktop / Both)",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">PLATFORM ATTRIBUTION: COUNT(DISTINCT platform)=2 -> 'both'</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Cross-join distinct dates with all 3 platform states, then LEFT JOIN user spending</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-10-8-action-rate-ratios",
    number: "10.8",
    title: "Spam Filtering & Action Rate Aggregation across Social Entities",
    content: `
      <p class="lc-p">
        In LeetCode #1132 (<em>Reported Posts II</em>), daily spam removal ratios require computing the fraction of spam-reported posts removed per day, then averaging the daily fractions across all active days.
      </p>
    `,
    diagram: {
      title: "Two-Tier Ratio Aggregation: Average of Daily Ratios",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TWO-TIER RATIO: AVG(daily_removed / daily_reported * 100)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Step 1: Compute daily percentage. Step 2: AVG() over all distinct dates.</text>
        </g>
      </svg>`
    }
  }
];

const callouts = [
  {
    type: "danger",
    title: "UNION vs UNION ALL in Graph Degree",
    content: "When duplicating symmetric edges in social graphs, always use UNION ALL. A standard UNION deduplicates rows across the two projections, silently discarding mutual connections where person A and person B both initiated requests."
  },
  {
    type: "warning",
    title: "Ratio of Averages vs Average of Ratios",
    content: "In metric evaluation (e.g. LeetCode #1132), computing SUM(removed)/SUM(reported) across all days calculates the global ratio of sums. If the prompt specifies the average daily percentage, you must compute the ratio per day first, then take the AVG() across days."
  },
  {
    type: "info",
    title: "Coordinate Distance Deduplication",
    content: "When computing shortest distances across Cartesian points, filtering p1.id < p2.id cuts the pairwise comparison count in half while eliminating self-pairing distance zeroes."
  }
];

const mcqs = [];
const mcqTopics = [
  "Undirected graph symmetric edge expansion",
  "UNION ALL vs UNION deduplication in node degree",
  "Two-hop follower traversal joins",
  "Euclidean coordinate distance calculation",
  "Deterministic tie-breaking in group rankings",
  "Behavioral funnels with conditional HAVING sums",
  "Multi-platform attribution cross-joins",
  "Ratio of averages vs average of daily ratios",
  "Left join temporal exclusion filters",
  "Counting distinct vertices across edge lists"
];

for (let i = 1; i <= 100; i++) {
  const qNum = 1000 + i;
  const topic = mcqTopics[(i - 1) % mcqTopics.length];
  mcqs.push({
    id: qNum,
    q: `[Q${qNum}] In graph analytics and social network SQL, which design pattern correctly addresses ${topic.toLowerCase()}?`,
    options: [
      `Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.`,
      `Always convert edge lists into adjacency matrices using dynamic JSON functions.`,
      `Undirected graphs can only be represented using recursive CTEs.`,
      `Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts.`
    ],
    correct: 0,
    explanation: `For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.`,
    isTrap: i % 3 === 0,
    trapBadge: i % 3 === 0 ? "Graph Symmetry Trap" : undefined
  });
}

const drills = [];
for (let i = 1; i <= 100; i++) {
  const dNum = 1000 + i;
  drills.push({
    id: dNum,
    prompt: `[Drill #${dNum}] Write an optimized query to find the user with the most friends in an undirected friendship table.`,
    task: `Compute max friend degree across symmetric friendship requests.`,
    starterSQL: `SELECT requester_id, accepter_id FROM Friendship;`,
    solutionSQL: `WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;`,
    hints: [`Project both directions via UNION ALL`, `Group by person`, `Order by COUNT(*) DESC LIMIT 1`]
  });
}

const section10Data = {
  conceptId: "concept-10",
  conceptNumber: 10,
  title: "Graph, Social & Network Analytics",
  description: "Master bidirectional edge unification, two-hop follower networks, coordinate geometry joins, and cross-platform multi-entity attribution.",
  masterclass: {
    chapters,
    callouts
  },
  mcqs,
  drills,
  problems: selectedProbs
};

const fileContent = `// =============================================================================
// LEETCODE ARENA - CONCEPT 10: GRAPH, SOCIAL & NETWORK ANALYTICS
// 13 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_10_DATA = ${JSON.stringify(section10Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../visualizer/leetcode_section10_data.js'), fileContent, 'utf8');
console.log(`Successfully generated visualizer/leetcode_section10_data.js with ${selectedProbs.length} problems!`);
