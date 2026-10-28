// =============================================================================
// LEETCODE ARENA - CONCEPT 10: GRAPH, SOCIAL & NETWORK ANALYTICS
// 13 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_10_DATA = {
  "conceptId": "concept-10",
  "conceptNumber": 10,
  "title": "Graph, Social & Network Analytics",
  "description": "Master bidirectional edge unification, two-hop follower networks, coordinate geometry joins, and cross-platform multi-entity attribution.",
  "masterclass": {
    "chapters": [
      {
        "id": "chap-10-1-bidirectional-graph-union",
        "number": "10.1",
        "title": "Undirected Graph Symmetry: Bidirectional Edge Unification",
        "content": "\n      <p class=\"lc-p\">\n        In social network graphs (e.g., LeetCode #602 <em>Friend Requests II: Who Has the Most Friends</em>), friendships are undirected symmetric relationships. A row <code>(requester_id, accepter_id)</code> signifies that both users consider each other friends.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Symmetric Edge Duplication Theorem:</strong><br>\n        To compute total connectivity per node without quadratic self-joins:<br>\n        Project all directed pairs forward: <code>SELECT requester_id AS person, accepter_id AS friend FROM RequestAccepted</code><br>\n        <strong>UNION ALL</strong><br>\n        Project all directed pairs in reverse: <code>SELECT accepter_id AS person, requester_id AS friend FROM RequestAccepted</code>.<br>\n        Grouping by <code>person</code> and aggregating <code>COUNT(*)</code> computes the exact node degree (friend count) in a single linear scan!\n      </div>\n    ",
        "diagram": {
          "title": "Bidirectional Graph Expansion: Symmetric Node Projection",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">BIDIRECTIONAL GRAPH DEGREE: UNION ALL EXPANSION</text>\n        <g transform=\"translate(40, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"180\" height=\"30\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"10\" y=\"39\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Edge: User 1 &lt;--&gt; User 2</text>\n        </g>\n        <path d=\"M 240 80 L 300 80\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n        <g transform=\"translate(320, 55)\">\n          <rect x=\"0\" y=\"10\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"8\" y=\"26\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">Forward: person=1, friend=2</text>\n          <rect x=\"0\" y=\"38\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"8\" y=\"54\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">Reverse: person=2, friend=1</text>\n        </g>\n        <path d=\"M 560 80 L 620 80\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n        <g transform=\"translate(640, 55)\">\n          <rect x=\"0\" y=\"10\" width=\"200\" height=\"60\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/>\n          <text x=\"10\" y=\"34\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">GROUP BY person</text>\n          <text x=\"10\" y=\"54\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">COUNT(*) = Total Friends</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-2-vertex-degree-calculations",
        "number": "10.2",
        "title": "Vertex Degree Calculation: In-Degree, Out-Degree & Connectivity",
        "content": "\n      <p class=\"lc-p\">\n        In directed graphs, a vertex has two distinct measures: <strong>In-Degree</strong> (number of incoming arrows) and <strong>Out-Degree</strong> (number of outgoing arrows).\n      </p>\n    ",
        "diagram": {
          "title": "Directed Vertex Degree Measurement",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DIRECTED GRAPH: IN-DEGREE VS OUT-DEGREE</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">In-Degree: COUNT(follower_id) GROUP BY followee_id</text>\n          <text x=\"0\" y=\"45\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">Out-Degree: COUNT(followee_id) GROUP BY follower_id</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-3-two-hop-follower-traversal",
        "number": "10.3",
        "title": "Two-Hop Follower Traversal: Friend-of-Friend Adjacency",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #614 (<em>Second Degree Follower</em>), calculating users who both follow someone and are followed by others requires an intersection self-join on <code>f1.follower = f2.followee</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Two-Hop Traversal: Follower-to-Followee Interlocking",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TWO-HOP FOLLOWER INTERSECTION (A -> B -> C)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Candidate B must exist as both 'follower' AND 'followee' across relations</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-4-cartesian-plane-distances",
        "number": "10.4",
        "title": "Euclidean Plane Geometry & Cartesian Distance Calculation",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #612 (<em>Shortest Distance in a Plane</em>), pairs of 2D coordinates <code>(x, y)</code> require computing minimum distances:\n        <code>SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))</code> over a strict non-identical cross-join: <code>p1.x &lt;&gt; p2.x OR p1.y &lt;&gt; p2.y</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Cartesian Cross-Join Distance Matrix",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">EUCLIDEAN DISTANCE: SQRT(POW(x1-x2, 2) + POW(y1-y2, 2))</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Points (p1, p2) with p1 &lt;&gt; p2 -> MIN(distance) rounded to 2 decimal places</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-5-election-tie-breaking",
        "number": "10.5",
        "title": "Multi-Entity Tie-Breaking in Election & Tournament Ranking",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #574 (<em>Winning Candidate</em>) and #1112 (<em>Highest Grade For Each Student</em>), selecting the top entity requires deterministic tie-breaking using secondary sorting criteria (e.g. <code>ORDER BY grade DESC, course_id ASC</code>).\n      </p>\n    ",
        "diagram": {
          "title": "Deterministic Secondary Tie-Breaker Ranking",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DETERMINISTIC TIE-BREAKING: ROW_NUMBER() OVER (ORDER BY score DESC, id ASC)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">If two candidates tie on votes, candidate with lowest ID wins deterministically</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-6-behavioral-set-differences",
        "number": "10.6",
        "title": "Customer Journey Behavioral Set Differences: Product Funnels",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1083 (<em>Sales Analysis II</em>), finding customers who bought Product S8 but NEVER bought iPhone requires conditional aggregation:\n        <code>SUM(product_name = 'S8') &gt; 0 AND SUM(product_name = 'iPhone') = 0</code> inside a <code>HAVING</code> clause.\n      </p>\n    ",
        "diagram": {
          "title": "Set Inclusion/Exclusion Filter via Conditional SUM",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">CONDITIONAL SET DIFFERENCE: SUM(A)&gt;0 AND SUM(B)=0</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">HAVING SUM(is_S8) &gt; 0 AND SUM(is_iPhone) = 0</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-7-cross-platform-attribution",
        "number": "10.7",
        "title": "Multi-Platform User Attribution & Unified Spending Synthesis",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1127 (<em>User Purchase Platform</em>), users purchase on Mobile, Desktop, or Both. If a user purchases on both platforms on the same date, their spend attributes exclusively to 'both', leaving 0 for single-platform spending.\n      </p>\n    ",
        "diagram": {
          "title": "Platform Attribution Matrix (Mobile / Desktop / Both)",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">PLATFORM ATTRIBUTION: COUNT(DISTINCT platform)=2 -> 'both'</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Cross-join distinct dates with all 3 platform states, then LEFT JOIN user spending</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-10-8-action-rate-ratios",
        "number": "10.8",
        "title": "Spam Filtering & Action Rate Aggregation across Social Entities",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1132 (<em>Reported Posts II</em>), daily spam removal ratios require computing the fraction of spam-reported posts removed per day, then averaging the daily fractions across all active days.\n      </p>\n    ",
        "diagram": {
          "title": "Two-Tier Ratio Aggregation: Average of Daily Ratios",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TWO-TIER RATIO: AVG(daily_removed / daily_reported * 100)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Step 1: Compute daily percentage. Step 2: AVG() over all distinct dates.</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "UNION vs UNION ALL in Graph Degree",
        "content": "When duplicating symmetric edges in social graphs, always use UNION ALL. A standard UNION deduplicates rows across the two projections, silently discarding mutual connections where person A and person B both initiated requests."
      },
      {
        "type": "warning",
        "title": "Ratio of Averages vs Average of Ratios",
        "content": "In metric evaluation (e.g. LeetCode #1132), computing SUM(removed)/SUM(reported) across all days calculates the global ratio of sums. If the prompt specifies the average daily percentage, you must compute the ratio per day first, then take the AVG() across days."
      },
      {
        "type": "info",
        "title": "Coordinate Distance Deduplication",
        "content": "When computing shortest distances across Cartesian points, filtering p1.id < p2.id cuts the pairwise comparison count in half while eliminating self-pairing distance zeroes."
      }
    ]
  },
  "mcqs": [
    {
      "id": 1001,
      "q": "[Q1001] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1002,
      "q": "[Q1002] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1003,
      "q": "[Q1003] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1004,
      "q": "[Q1004] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1005,
      "q": "[Q1005] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1006,
      "q": "[Q1006] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1007,
      "q": "[Q1007] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1008,
      "q": "[Q1008] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1009,
      "q": "[Q1009] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1010,
      "q": "[Q1010] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1011,
      "q": "[Q1011] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1012,
      "q": "[Q1012] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1013,
      "q": "[Q1013] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1014,
      "q": "[Q1014] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1015,
      "q": "[Q1015] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1016,
      "q": "[Q1016] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1017,
      "q": "[Q1017] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1018,
      "q": "[Q1018] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1019,
      "q": "[Q1019] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1020,
      "q": "[Q1020] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1021,
      "q": "[Q1021] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1022,
      "q": "[Q1022] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1023,
      "q": "[Q1023] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1024,
      "q": "[Q1024] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1025,
      "q": "[Q1025] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1026,
      "q": "[Q1026] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1027,
      "q": "[Q1027] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1028,
      "q": "[Q1028] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1029,
      "q": "[Q1029] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1030,
      "q": "[Q1030] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1031,
      "q": "[Q1031] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1032,
      "q": "[Q1032] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1033,
      "q": "[Q1033] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1034,
      "q": "[Q1034] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1035,
      "q": "[Q1035] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1036,
      "q": "[Q1036] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1037,
      "q": "[Q1037] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1038,
      "q": "[Q1038] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1039,
      "q": "[Q1039] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1040,
      "q": "[Q1040] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1041,
      "q": "[Q1041] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1042,
      "q": "[Q1042] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1043,
      "q": "[Q1043] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1044,
      "q": "[Q1044] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1045,
      "q": "[Q1045] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1046,
      "q": "[Q1046] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1047,
      "q": "[Q1047] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1048,
      "q": "[Q1048] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1049,
      "q": "[Q1049] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1050,
      "q": "[Q1050] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1051,
      "q": "[Q1051] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1052,
      "q": "[Q1052] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1053,
      "q": "[Q1053] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1054,
      "q": "[Q1054] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1055,
      "q": "[Q1055] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1056,
      "q": "[Q1056] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1057,
      "q": "[Q1057] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1058,
      "q": "[Q1058] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1059,
      "q": "[Q1059] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1060,
      "q": "[Q1060] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1061,
      "q": "[Q1061] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1062,
      "q": "[Q1062] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1063,
      "q": "[Q1063] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1064,
      "q": "[Q1064] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1065,
      "q": "[Q1065] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1066,
      "q": "[Q1066] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1067,
      "q": "[Q1067] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1068,
      "q": "[Q1068] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1069,
      "q": "[Q1069] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1070,
      "q": "[Q1070] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1071,
      "q": "[Q1071] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1072,
      "q": "[Q1072] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1073,
      "q": "[Q1073] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1074,
      "q": "[Q1074] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1075,
      "q": "[Q1075] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1076,
      "q": "[Q1076] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1077,
      "q": "[Q1077] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1078,
      "q": "[Q1078] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1079,
      "q": "[Q1079] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1080,
      "q": "[Q1080] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1081,
      "q": "[Q1081] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1082,
      "q": "[Q1082] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1083,
      "q": "[Q1083] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1084,
      "q": "[Q1084] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1085,
      "q": "[Q1085] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1086,
      "q": "[Q1086] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1087,
      "q": "[Q1087] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1088,
      "q": "[Q1088] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1089,
      "q": "[Q1089] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1090,
      "q": "[Q1090] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1091,
      "q": "[Q1091] In graph analytics and social network SQL, which design pattern correctly addresses undirected graph symmetric edge expansion?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1092,
      "q": "[Q1092] In graph analytics and social network SQL, which design pattern correctly addresses union all vs union deduplication in node degree?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1093,
      "q": "[Q1093] In graph analytics and social network SQL, which design pattern correctly addresses two-hop follower traversal joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1094,
      "q": "[Q1094] In graph analytics and social network SQL, which design pattern correctly addresses euclidean coordinate distance calculation?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1095,
      "q": "[Q1095] In graph analytics and social network SQL, which design pattern correctly addresses deterministic tie-breaking in group rankings?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1096,
      "q": "[Q1096] In graph analytics and social network SQL, which design pattern correctly addresses behavioral funnels with conditional having sums?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1097,
      "q": "[Q1097] In graph analytics and social network SQL, which design pattern correctly addresses multi-platform attribution cross-joins?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1098,
      "q": "[Q1098] In graph analytics and social network SQL, which design pattern correctly addresses ratio of averages vs average of daily ratios?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    },
    {
      "id": 1099,
      "q": "[Q1099] In graph analytics and social network SQL, which design pattern correctly addresses left join temporal exclusion filters?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": true,
      "trapBadge": "Graph Symmetry Trap"
    },
    {
      "id": 1100,
      "q": "[Q1100] In graph analytics and social network SQL, which design pattern correctly addresses counting distinct vertices across edge lists?",
      "options": [
        "Duplicate symmetric edges via UNION ALL so every node appears uniformly in the primary entity column.",
        "Always convert edge lists into adjacency matrices using dynamic JSON functions.",
        "Undirected graphs can only be represented using recursive CTEs.",
        "Filtering WHERE requester_id < accepter_id eliminates all connection duplicates in friend counts."
      ],
      "correct": 0,
      "explanation": "For undirected symmetric graphs, projecting both (A, B) and (B, A) via UNION ALL and grouping by the first column is the canonical O(N) pattern to compute total node degree without quadratic self-joins.",
      "isTrap": false
    }
  ],
  "drills": [
    {
      "id": 1001,
      "prompt": "[Drill #1001] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1002,
      "prompt": "[Drill #1002] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1003,
      "prompt": "[Drill #1003] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1004,
      "prompt": "[Drill #1004] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1005,
      "prompt": "[Drill #1005] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1006,
      "prompt": "[Drill #1006] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1007,
      "prompt": "[Drill #1007] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1008,
      "prompt": "[Drill #1008] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1009,
      "prompt": "[Drill #1009] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1010,
      "prompt": "[Drill #1010] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1011,
      "prompt": "[Drill #1011] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1012,
      "prompt": "[Drill #1012] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1013,
      "prompt": "[Drill #1013] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1014,
      "prompt": "[Drill #1014] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1015,
      "prompt": "[Drill #1015] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1016,
      "prompt": "[Drill #1016] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1017,
      "prompt": "[Drill #1017] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1018,
      "prompt": "[Drill #1018] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1019,
      "prompt": "[Drill #1019] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1020,
      "prompt": "[Drill #1020] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1021,
      "prompt": "[Drill #1021] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1022,
      "prompt": "[Drill #1022] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1023,
      "prompt": "[Drill #1023] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1024,
      "prompt": "[Drill #1024] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1025,
      "prompt": "[Drill #1025] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1026,
      "prompt": "[Drill #1026] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1027,
      "prompt": "[Drill #1027] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1028,
      "prompt": "[Drill #1028] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1029,
      "prompt": "[Drill #1029] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1030,
      "prompt": "[Drill #1030] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1031,
      "prompt": "[Drill #1031] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1032,
      "prompt": "[Drill #1032] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1033,
      "prompt": "[Drill #1033] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1034,
      "prompt": "[Drill #1034] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1035,
      "prompt": "[Drill #1035] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1036,
      "prompt": "[Drill #1036] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1037,
      "prompt": "[Drill #1037] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1038,
      "prompt": "[Drill #1038] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1039,
      "prompt": "[Drill #1039] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1040,
      "prompt": "[Drill #1040] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1041,
      "prompt": "[Drill #1041] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1042,
      "prompt": "[Drill #1042] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1043,
      "prompt": "[Drill #1043] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1044,
      "prompt": "[Drill #1044] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1045,
      "prompt": "[Drill #1045] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1046,
      "prompt": "[Drill #1046] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1047,
      "prompt": "[Drill #1047] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1048,
      "prompt": "[Drill #1048] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1049,
      "prompt": "[Drill #1049] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1050,
      "prompt": "[Drill #1050] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1051,
      "prompt": "[Drill #1051] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1052,
      "prompt": "[Drill #1052] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1053,
      "prompt": "[Drill #1053] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1054,
      "prompt": "[Drill #1054] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1055,
      "prompt": "[Drill #1055] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1056,
      "prompt": "[Drill #1056] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1057,
      "prompt": "[Drill #1057] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1058,
      "prompt": "[Drill #1058] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1059,
      "prompt": "[Drill #1059] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1060,
      "prompt": "[Drill #1060] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1061,
      "prompt": "[Drill #1061] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1062,
      "prompt": "[Drill #1062] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1063,
      "prompt": "[Drill #1063] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1064,
      "prompt": "[Drill #1064] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1065,
      "prompt": "[Drill #1065] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1066,
      "prompt": "[Drill #1066] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1067,
      "prompt": "[Drill #1067] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1068,
      "prompt": "[Drill #1068] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1069,
      "prompt": "[Drill #1069] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1070,
      "prompt": "[Drill #1070] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1071,
      "prompt": "[Drill #1071] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1072,
      "prompt": "[Drill #1072] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1073,
      "prompt": "[Drill #1073] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1074,
      "prompt": "[Drill #1074] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1075,
      "prompt": "[Drill #1075] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1076,
      "prompt": "[Drill #1076] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1077,
      "prompt": "[Drill #1077] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1078,
      "prompt": "[Drill #1078] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1079,
      "prompt": "[Drill #1079] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1080,
      "prompt": "[Drill #1080] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1081,
      "prompt": "[Drill #1081] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1082,
      "prompt": "[Drill #1082] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1083,
      "prompt": "[Drill #1083] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1084,
      "prompt": "[Drill #1084] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1085,
      "prompt": "[Drill #1085] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1086,
      "prompt": "[Drill #1086] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1087,
      "prompt": "[Drill #1087] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1088,
      "prompt": "[Drill #1088] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1089,
      "prompt": "[Drill #1089] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1090,
      "prompt": "[Drill #1090] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1091,
      "prompt": "[Drill #1091] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1092,
      "prompt": "[Drill #1092] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1093,
      "prompt": "[Drill #1093] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1094,
      "prompt": "[Drill #1094] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1095,
      "prompt": "[Drill #1095] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1096,
      "prompt": "[Drill #1096] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1097,
      "prompt": "[Drill #1097] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1098,
      "prompt": "[Drill #1098] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1099,
      "prompt": "[Drill #1099] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    },
    {
      "id": 1100,
      "prompt": "[Drill #1100] Write an optimized query to find the user with the most friends in an undirected friendship table.",
      "task": "Compute max friend degree across symmetric friendship requests.",
      "starterSQL": "SELECT requester_id, accepter_id FROM Friendship;",
      "solutionSQL": "WITH AllEdges AS (\n  SELECT requester_id AS person FROM Friendship\n  UNION ALL\n  SELECT accepter_id AS person FROM Friendship\n)\nSELECT person AS id, COUNT(*) AS num\nFROM AllEdges\nGROUP BY person\nORDER BY num DESC\nLIMIT 1;",
      "hints": [
        "Project both directions via UNION ALL",
        "Group by person",
        "Order by COUNT(*) DESC LIMIT 1"
      ]
    }
  ],
  "problems": [
    {
      "id": 574,
      "title": "Winning Candidate",
      "difficulty": "Medium",
      "acceptance": "60.4%",
      "interviewFreq": "High • Uber, Amazon",
      "companies": [
        "Uber",
        "Amazon"
      ],
      "prompt": "Write a solution to report the name of the winning candidate (i.e., the candidate who got the largest number of votes).\nIt is guaranteed that there is exactly one winning candidate.",
      "sampleInput": {
        "table": "Candidate",
        "columns": [
          "id",
          "name"
        ],
        "rows": [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ],
          [
            3,
            "C"
          ],
          [
            4,
            "D"
          ],
          [
            5,
            "E"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "name"
        ],
        "rows": [
          [
            "B"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #574: VOTE TALLY AGGREGATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Votes</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V1: Candidate 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V2: Candidate 4</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V3: Candidate 2</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY candidateId\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winner</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">name: B (2 votes)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group the Vote table by candidateId and order by COUNT(*) descending with LIMIT 1.",
        "Join the resulting candidateId back to the Candidate table to retrieve the candidate's name."
      ],
      "trapsAndEdgeCases": [
        "Candidate with 0 votes: Joining Candidate first requires LEFT JOIN, but querying Vote first is much faster."
      ],
      "solutionSQL": "SELECT c.name\nFROM Candidate c\nJOIN (\n    SELECT candidateId\n    FROM Vote\n    GROUP BY candidateId\n    ORDER BY COUNT(*) DESC\n    LIMIT 1\n) v ON c.id = v.candidateId;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT c.name",
          "exp": "Emits the winner's name."
        },
        {
          "clause": "FROM Candidate c",
          "exp": "Source candidates table."
        },
        {
          "clause": "JOIN (SELECT candidateId ... LIMIT 1) v",
          "exp": "Subquery identifying the candidate with maximum votes."
        },
        {
          "clause": "ON c.id = v.candidateId",
          "exp": "Matches winner's ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CTE with DENSE_RANK()",
          "complexity": "O(V log V)",
          "sql": "WITH Tally AS (\n  SELECT candidateId, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM Vote GROUP BY candidateId\n)\nSELECT name FROM Candidate c JOIN Tally t ON c.id = t.candidateId WHERE t.rnk = 1;",
          "explanation": "Window rank alternative handling potential multi-candidate ties."
        }
      ]
    },
    {
      "id": 586,
      "title": "Customer Placing the Largest Number of Orders",
      "difficulty": "Easy",
      "acceptance": "75.4%",
      "interviewFreq": "Very High • Twitter, Amazon",
      "companies": [
        "Twitter",
        "Amazon"
      ],
      "prompt": "Write a solution to find the customer_number for the customer who has placed the largest number of orders.\nThe test cases are generated so that exactly one customer will have placed more orders than any other customer.",
      "sampleInput": {
        "table": "orders",
        "columns": [
          "order_number",
          "customer_number"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            2,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_number"
        ],
        "rows": [
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #586: TOP ORDER FREQUENCY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: 1 order</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 2: 1 order</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 3: 2 orders</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY customer_number\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top Customer</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">customer_number: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group orders by customer_number.",
        "Sort by COUNT(*) descending to place the customer with the highest volume at the top.",
        "Use LIMIT 1 to return the winner."
      ],
      "trapsAndEdgeCases": [
        "Ties handling: The problem explicitly guarantees exactly one customer has the maximum order count."
      ],
      "solutionSQL": "SELECT customer_number\nFROM orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT customer_number",
          "exp": "Emits the customer identifier."
        },
        {
          "clause": "FROM orders GROUP BY customer_number",
          "exp": "Aggregates orders per customer."
        },
        {
          "clause": "ORDER BY COUNT(*) DESC LIMIT 1",
          "exp": "Extracts the customer with the highest order count."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window DENSE_RANK for Ties",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT customer_number, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM orders GROUP BY customer_number\n)\nSELECT customer_number FROM Ranked WHERE rnk = 1;",
          "explanation": "Handles potential ties by outputting all customers tied for first place."
        }
      ]
    },
    {
      "id": 602,
      "title": "Friend Requests II: Who Has the Most Friends",
      "difficulty": "Medium",
      "acceptance": "61.3%",
      "interviewFreq": "Very High • Meta, Amazon",
      "companies": [
        "Meta",
        "Amazon"
      ],
      "prompt": "Write a solution to find the people who have the most friends and the most friends number. The test cases are generated so that only one person has the most friends.",
      "sampleInput": {
        "table": "RequestAccepted",
        "columns": [
          "requester_id",
          "accepter_id",
          "accept_date"
        ],
        "rows": [
          [
            1,
            2,
            "2016/06/03"
          ],
          [
            1,
            3,
            "2016/06/08"
          ],
          [
            2,
            3,
            "2016/06/08"
          ],
          [
            3,
            4,
            "2016/06/09"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "num"
        ],
        "rows": [
          [
            3,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL DEGREE CENTRALITY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Friendships</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 3</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 - 3</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3 - 4</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">UNION ALL Projections\\nGROUP BY id ORDER BY COUNT(*) DESC</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Most Connected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">User 3: 3 friends (👑)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Friendship is bidirectional: being requester or accepter both count as 1 friend.",
        "Project requester_id AS id and accepter_id AS id using UNION ALL to preserve all occurrences.",
        "Group by id, count occurrences, and extract the top user with LIMIT 1."
      ],
      "trapsAndEdgeCases": [
        "UNION deduplication trap: Using UNION collapses duplicate entries, undercounting friends. Always use UNION ALL."
      ],
      "solutionSQL": "WITH AllFriends AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllFriends AS (SELECT requester_id AS id ... UNION ALL SELECT accepter_id AS id)",
          "exp": "Normalizes both endpoints into a single stream."
        },
        {
          "clause": "SELECT id, COUNT(*) AS num",
          "exp": "Counts total friend degree per user."
        },
        {
          "clause": "GROUP BY id ORDER BY num DESC LIMIT 1",
          "exp": "Ranks by degree and emits the top user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Inline Derivation",
          "complexity": "O(N log N)",
          "sql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
          "explanation": "Equivalent ANSI standard inline derived table."
        }
      ]
    },
    {
      "id": 612,
      "title": "Shortest Distance in a Plane",
      "difficulty": "Medium",
      "acceptance": "60.9%",
      "interviewFreq": "High • Twitter, Uber",
      "companies": [
        "Twitter",
        "Uber"
      ],
      "prompt": "Write a solution to report the shortest distance between any two points from the Point2D table. Round the distance to 2 decimal places.",
      "sampleInput": {
        "table": "Point2D",
        "columns": [
          "x",
          "y"
        ],
        "rows": [
          [
            -1,
            -1
          ],
          [
            0,
            0
          ],
          [
            -1,
            -2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "shortest"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #612: 2D EUCLIDEAN DISTANCE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Point2D</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: (-1, -1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: (0, 0)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: (-1, -2)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SQRT((p1.x-p2.x)^2 +\\n(p1.y-p2.y)^2)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Shortest Distance</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">shortest: 1.00 (between P1 & P3)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Point2D with itself where points are distinct (p1.x, p1.y) != (p2.x, p2.y).",
        "Calculate 2D Euclidean distance: SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2)).",
        "Enforce non-symmetric pairing (e.g. p1.x < p2.x OR (p1.x = p2.x AND p1.y < p2.y)) to avoid comparing a point with itself.",
        "Round the minimum distance to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Zero distance self-comparison: Comparing a point to itself yields 0.00; inequality join condition is required."
      ],
      "solutionSQL": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2\n  ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ROUND(MIN(SQRT(...)), 2) AS shortest",
          "exp": "Computes minimum Euclidean distance rounded to 2 decimal places."
        },
        {
          "clause": "FROM Point2D p1 JOIN Point2D p2",
          "exp": "Self-joins Cartesian coordinates."
        },
        {
          "clause": "ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y)",
          "exp": "Strictly pairs unique distinct coordinate pairs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Standard Inequality Self-Join",
          "complexity": "O(N^2)",
          "sql": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2 ON NOT (p1.x = p2.x AND p1.y = p2.y);",
          "explanation": "Simple != inequality across coordinates."
        }
      ]
    },
    {
      "id": 614,
      "title": "Second Degree Follower",
      "difficulty": "Medium",
      "acceptance": "37.5%",
      "interviewFreq": "High • Twitter, Meta",
      "companies": [
        "Twitter",
        "Meta"
      ],
      "prompt": "In social networks, a second-degree follower is a user who:\n- follows at least one user, and\n- has at least one follower.\nWrite a solution to report the second-degree followers and the number of their followers. Return the result table ordered by follower in alphabetical order.",
      "sampleInput": {
        "table": "Follow",
        "columns": [
          "followee",
          "follower"
        ],
        "rows": [
          [
            "Alice",
            "Bob"
          ],
          [
            "Bob",
            "Cena"
          ],
          [
            "Bob",
            "Dan"
          ],
          [
            "Bob",
            "Alice"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "follower",
          "num"
        ],
        "rows": [
          [
            "Bob",
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #614: SECOND DEGREE FOLLOWER GRAPH FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Follow Edges</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Bob follows Cena</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Alice follows Bob</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dan follows Bob</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">followee IN (followers)\\nGROUP BY followee</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Second Degree</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">follower: Bob, num: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A second degree follower is someone who is BOTH followed by others (acts as followee) AND follows someone else (acts as follower).",
        "Filter for followees who exist in the follower column.",
        "Count distinct followers for each such followee.",
        "Order by follower name alphabetically."
      ],
      "trapsAndEdgeCases": [
        "Column renaming trap: The problem asks to alias the person being followed as 'follower' in the final output column header."
      ],
      "solutionSQL": "SELECT followee AS follower,\n       COUNT(DISTINCT follower) AS num\nFROM Follow\nWHERE followee IN (\n    SELECT follower\n    FROM Follow\n)\nGROUP BY followee\nORDER BY follower ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT followee AS follower, COUNT(DISTINCT follower) AS num",
          "exp": "Counts followers for each user, aliasing column as requested."
        },
        {
          "clause": "FROM Follow",
          "exp": "Source social graph table."
        },
        {
          "clause": "WHERE followee IN (SELECT follower FROM Follow)",
          "exp": "Restricts to users who themselves follow at least one person."
        },
        {
          "clause": "GROUP BY followee ORDER BY follower ASC",
          "exp": "Aggregates per user and sorts alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN Filter",
          "complexity": "O(N log N)",
          "sql": "SELECT f1.followee AS follower, COUNT(DISTINCT f1.follower) AS num\nFROM Follow f1\nJOIN Follow f2 ON f1.followee = f2.follower\nGROUP BY f1.followee\nORDER BY follower ASC;",
          "explanation": "Inner join between followee and follower roles."
        }
      ]
    },
    {
      "id": 1077,
      "title": "Project Employees III",
      "difficulty": "Medium",
      "acceptance": "75.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the most experienced employee in each project. In case of a tie, report all employees with the maximum number of experience years.",
      "sampleInput": {
        "table": "Project / Employee",
        "columns": [
          "project_id",
          "employee_id",
          "experience_years"
        ],
        "rows": [
          [
            1,
            1,
            3
          ],
          [
            1,
            2,
            2
          ],
          [
            1,
            3,
            3
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            4,
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "project_id",
          "employee_id"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            1,
            3
          ],
          [
            2,
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1077: MOST EXPERIENCED PROJECT MEMBERS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Project 1</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 1: 3 yrs (Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 2: 2 yrs</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 3: 3 yrs (Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(PARTITION BY project_id ORDER BY yrs DESC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 3</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 2 -> Emp 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Project and Employee on employee_id.",
        "Partition by project_id and rank employees by experience_years descending using DENSE_RANK().",
        "Filter for rnk = 1 to capture all ties."
      ],
      "trapsAndEdgeCases": [
        "Ties must be included: Using ROW_NUMBER() would arbitrarily drop ties; DENSE_RANK() or RANK() is required."
      ],
      "solutionSQL": "WITH Ranked AS (\n    SELECT p.project_id,\n           p.employee_id,\n           DENSE_RANK() OVER (\n               PARTITION BY p.project_id\n               ORDER BY e.experience_years DESC\n           ) AS rnk\n    FROM Project p\n    JOIN Employee e ON p.employee_id = e.employee_id\n)\nSELECT project_id, employee_id\nFROM Ranked\nWHERE rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH Ranked AS (...)",
          "exp": "Ranks employees within each project by experience."
        },
        {
          "clause": "SELECT project_id, employee_id FROM Ranked WHERE rnk = 1",
          "exp": "Filters for top experience rank including ties."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery MAX",
          "complexity": "O(N^2)",
          "sql": "SELECT p.project_id, p.employee_id\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nWHERE (p.project_id, e.experience_years) IN (\n    SELECT p2.project_id, MAX(e2.experience_years)\n    FROM Project p2\n    JOIN Employee e2 ON p2.employee_id = e2.employee_id\n    GROUP BY p2.project_id\n);",
          "explanation": "Classic tuple IN filter against max experience years per project."
        }
      ]
    },
    {
      "id": 1083,
      "title": "Sales Analysis II",
      "difficulty": "Easy",
      "acceptance": "52.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the buyers who have bought S8 but not iPhone. Note that S8 and iPhone are products presented in the Product table.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "buyer_id"
        ],
        "rows": [
          [
            1,
            "S8",
            1
          ],
          [
            2,
            "G4",
            1
          ],
          [
            3,
            "iPhone",
            2
          ],
          [
            1,
            "S8",
            3
          ],
          [
            3,
            "iPhone",
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "buyer_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1083: SET DIFFERENCE: BOUGHT S8 BUT NOT IPHONE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Buyer History</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 1: S8, G4 (Valid ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 2: iPhone (No S8 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 3: S8, iPhone (Has iPhone ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(prod='S8') > 0 AND\\nSUM(prod='iPhone') = 0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Qualifying Buyers</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">buyer_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Sales with Product to get product_name per sale.",
        "Group by buyer_id.",
        "Apply HAVING filter: SUM(product_name = 'S8') > 0 AND SUM(product_name = 'iPhone') = 0."
      ],
      "trapsAndEdgeCases": [
        "Buyers who bought both: Buyer 3 bought both S8 and iPhone; they must be excluded."
      ],
      "solutionSQL": "SELECT s.buyer_id\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nGROUP BY s.buyer_id\nHAVING SUM(p.product_name = 'S8') > 0\n   AND SUM(p.product_name = 'iPhone') = 0;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT s.buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id",
          "exp": "Joins transactions with product catalog."
        },
        {
          "clause": "GROUP BY s.buyer_id",
          "exp": "Aggregates per buyer."
        },
        {
          "clause": "HAVING SUM(p.product_name = 'S8') > 0 AND SUM(p.product_name = 'iPhone') = 0",
          "exp": "Demands at least one S8 purchase and strictly zero iPhone purchases."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "EXCEPT / NOT IN",
          "complexity": "O(N log N)",
          "sql": "SELECT DISTINCT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'S8'\nAND buyer_id NOT IN (\n  SELECT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'iPhone'\n);",
          "explanation": "Set difference using NOT IN subquery."
        }
      ]
    },
    {
      "id": 1084,
      "title": "Sales Analysis III",
      "difficulty": "Easy",
      "acceptance": "44.9%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the products that were only sold in the first quarter of 2019. That is, between 2019-01-01 and 2019-03-31 inclusive.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "sale_date"
        ],
        "rows": [
          [
            1,
            "S8",
            "2019-01-21"
          ],
          [
            1,
            "S8",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-06-02"
          ],
          [
            3,
            "iPhone",
            "2019-05-13"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            "S8"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1084: STRICT DATE BOUNDARY CONTAINMENT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Dates</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: Jan 21, Feb 17 (Q1 only ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: Feb 17, Jun 02 (Crosses into Q2 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: May 13 (Q2 only ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">MIN(sale_date) >= '2019-01-01'\\nAND MAX(sale_date) <= '2019-03-31'</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Strict Q1 Only</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1: S8</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A product is sold 'only' in Q1 if its minimum sale date is >= 2019-01-01 AND its maximum sale date is <= 2019-03-31.",
        "Group Sales by product_id and enforce this min/max boundary in the HAVING clause.",
        "Join to Product to return product_id and product_name."
      ],
      "trapsAndEdgeCases": [
        "Partial Q1 sales: If a product was sold in Q1 and also in Q2 (like P2), it must be disqualified."
      ],
      "solutionSQL": "SELECT p.product_id, p.product_name\nFROM Product p\nJOIN Sales s ON p.product_id = s.product_id\nGROUP BY p.product_id, p.product_name\nHAVING MIN(s.sale_date) >= '2019-01-01'\n   AND MAX(s.sale_date) <= '2019-03-31';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p.product_id, p.product_name",
          "exp": "Projects product identifiers."
        },
        {
          "clause": "FROM Product p JOIN Sales s ON p.product_id = s.product_id",
          "exp": "Joins products with transactions."
        },
        {
          "clause": "GROUP BY p.product_id, p.product_name",
          "exp": "Aggregates dates per product."
        },
        {
          "clause": "HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31'",
          "exp": "Ensures all sales fall exclusively within Q1 2019."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "NOT IN Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT product_id, product_name FROM Product\nWHERE product_id IN (SELECT product_id FROM Sales WHERE sale_date BETWEEN '2019-01-01' AND '2019-03-31')\n  AND product_id NOT IN (SELECT product_id FROM Sales WHERE sale_date < '2019-01-01' OR sale_date > '2019-03-31');",
          "explanation": "Set exclusion checking for any sales outside the target window."
        }
      ]
    },
    {
      "id": 1098,
      "title": "Unpopular Books",
      "difficulty": "Medium",
      "acceptance": "44.7%",
      "interviewFreq": "High • Bloomberg, Amazon",
      "companies": [
        "Bloomberg",
        "Amazon"
      ],
      "prompt": "Write a solution to report the books that have sold less than 10 copies in the last year, excluding books that have been available for less than one month from today (assume today is 2019-06-23).",
      "sampleInput": {
        "table": "Books / Orders",
        "columns": [
          "book_id",
          "name",
          "available_from",
          "quantity",
          "dispatch_date"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna",
            "2010-01-01",
            2,
            "2018-07-26"
          ],
          [
            2,
            "28 Letters",
            "2012-05-12",
            8,
            "2019-06-01"
          ],
          [
            3,
            "The Hobbit",
            "2019-06-10",
            0,
            null
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "book_id",
          "name"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1098: RECENT AVAILABILITY & LOW VOLUME FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Books & 1-Yr Sales</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: Sold 2 in past yr (Unpopular ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B2: Sold 28 in past yr (Popular ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B3: Avail June 10 (< 1 mo ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">available_from < '2019-05-23'\\nAND SUM(past_yr_qty) < 10</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Unpopular</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">book_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Availability threshold: Exclude books available less than 1 month before 2019-06-23 -> available_from < '2019-05-23'.",
        "Sales window: Only count orders placed in the last year: dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'.",
        "LEFT JOIN Books with the filtered orders and group by book_id.",
        "HAVING IFNULL(SUM(quantity), 0) < 10."
      ],
      "trapsAndEdgeCases": [
        "Join predicate placement: Date filtering for orders must be in the ON clause, NOT the WHERE clause, otherwise books with 0 sales are improperly filtered out."
      ],
      "solutionSQL": "SELECT b.book_id, b.name\nFROM Books b\nLEFT JOIN Orders o\n  ON b.book_id = o.book_id\n AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\nWHERE b.available_from < '2019-05-23'\nGROUP BY b.book_id, b.name\nHAVING IFNULL(SUM(o.quantity), 0) < 10;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT b.book_id, b.name",
          "exp": "Projects book details."
        },
        {
          "clause": "FROM Books b LEFT JOIN Orders o ON ... AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'",
          "exp": "Preserves books with zero orders in the past year."
        },
        {
          "clause": "WHERE b.available_from < '2019-05-23'",
          "exp": "Filters out books launched less than a month ago."
        },
        {
          "clause": "GROUP BY b.book_id, b.name HAVING IFNULL(SUM(o.quantity), 0) < 10",
          "exp": "Filters for books with fewer than 10 copies sold."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT book_id, name FROM Books\nWHERE available_from < '2019-05-23'\n  AND book_id NOT IN (\n    SELECT book_id FROM Orders\n    WHERE dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\n    GROUP BY book_id HAVING SUM(quantity) >= 10\n);",
          "explanation": "Subquery identifying books with >= 10 sales and excluding them."
        }
      ]
    },
    {
      "id": 1112,
      "title": "Highest Grade For Each Student",
      "difficulty": "Medium",
      "acceptance": "71.6%",
      "interviewFreq": "High • Coursera, Amazon",
      "companies": [
        "Coursera",
        "Amazon"
      ],
      "prompt": "Write a solution to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest course_id. Return the result table ordered by student_id in ascending order.",
      "sampleInput": {
        "table": "Enrollments",
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            2,
            2,
            95
          ],
          [
            2,
            3,
            95
          ],
          [
            1,
            1,
            90
          ],
          [
            1,
            2,
            99
          ],
          [
            3,
            1,
            80
          ],
          [
            3,
            2,
            75
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            1,
            2,
            99
          ],
          [
            2,
            2,
            95
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1112: TIE-BREAKING ON LOWEST COURSE ID</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Enrollments</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95), C3 (95) (Tie)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S1: C1 (90), C2 (99)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY student\\nORDER BY grade DESC, course_id ASC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S1: C2 (99)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95) (Lower course_id)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Partition by student_id.",
        "Order by grade DESC to find the highest score.",
        "Order by course_id ASC to break ties by lowest course number.",
        "Assign ROW_NUMBER() and filter WHERE rnk = 1."
      ],
      "trapsAndEdgeCases": [
        "DENSE_RANK() trap: Using DENSE_RANK() returns both courses in a tie; ROW_NUMBER() is required to strictly pick one course."
      ],
      "solutionSQL": "WITH RankedCourses AS (\n    SELECT student_id,\n           course_id,\n           grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rnk\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM RankedCourses\nWHERE rnk = 1\nORDER BY student_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedCourses AS (...)",
          "exp": "Ranks courses per student by grade desc, course_id asc."
        },
        {
          "clause": "SELECT student_id, course_id, grade FROM RankedCourses WHERE rnk = 1",
          "exp": "Picks top course per student."
        },
        {
          "clause": "ORDER BY student_id ASC",
          "exp": "Sorts final output by student ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Tuple IN Subquery",
          "complexity": "O(N^2)",
          "sql": "SELECT student_id, MIN(course_id) AS course_id, grade\nFROM Enrollments\nWHERE (student_id, grade) IN (\n    SELECT student_id, MAX(grade) FROM Enrollments GROUP BY student_id\n)\nGROUP BY student_id, grade\nORDER BY student_id ASC;",
          "explanation": "Finds max grade per student and aggregates with MIN(course_id)."
        }
      ]
    },
    {
      "id": 1126,
      "title": "Active Businesses",
      "difficulty": "Medium",
      "acceptance": "68.2%",
      "interviewFreq": "High • Yelp, Google",
      "companies": [
        "Yelp",
        "Google"
      ],
      "prompt": "An active business is a business that has more than one event_type with occurrences greater than the average occurrences of that event_type among all businesses.\nWrite a solution to find all active businesses.",
      "sampleInput": {
        "table": "Events",
        "columns": [
          "business_id",
          "event_type",
          "occurences"
        ],
        "rows": [
          [
            1,
            "reviews",
            7
          ],
          [
            3,
            "reviews",
            3
          ],
          [
            1,
            "ads",
            11
          ],
          [
            2,
            "ads",
            7
          ],
          [
            3,
            "ads",
            6
          ],
          [
            1,
            "photo",
            3
          ],
          [
            2,
            "photo",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "business_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1126: MULTI-EVENT ABOVE-AVERAGE BENCHMARK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Events</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: reviews=7 (> avg 5)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: ads=11 (> avg 8)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1 has 2 above-average events</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(occurences) OVER(PARTITION BY type)\\nHAVING COUNT(*) > 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Active Business</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">business_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Calculate the average occurrences for each event_type across all businesses using AVG(occurences) OVER (PARTITION BY event_type).",
        "Filter for rows where occurrences > event_type average.",
        "Group by business_id and filter HAVING COUNT(*) > 1."
      ],
      "trapsAndEdgeCases": [
        "Strict inequality: Must be strictly greater than average (occurences > avg_occurences)."
      ],
      "solutionSQL": "WITH EventAverages AS (\n    SELECT business_id,\n           event_type,\n           occurences,\n           AVG(occurences) OVER (PARTITION BY event_type) AS avg_occ\n    FROM Events\n)\nSELECT business_id\nFROM EventAverages\nWHERE occurences > avg_occ\nGROUP BY business_id\nHAVING COUNT(*) > 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH EventAverages AS (...)",
          "exp": "Computes event category averages via window function."
        },
        {
          "clause": "SELECT business_id FROM EventAverages",
          "exp": "Source filtered events."
        },
        {
          "clause": "WHERE occurences > avg_occ",
          "exp": "Retains only above-average event records."
        },
        {
          "clause": "GROUP BY business_id HAVING COUNT(*) > 1",
          "exp": "Demands at least two distinct qualifying events."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with Grouped Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT e.business_id\nFROM Events e\nJOIN (\n    SELECT event_type, AVG(occurences) AS avg_occ\n    FROM Events\n    GROUP BY event_type\n) avg_t ON e.event_type = avg_t.event_type\nWHERE e.occurences > avg_t.avg_occ\nGROUP BY e.business_id\nHAVING COUNT(*) > 1;",
          "explanation": "Joins against subquery of category averages."
        }
      ]
    },
    {
      "id": 1127,
      "title": "User Purchase Platform",
      "difficulty": "Hard",
      "acceptance": "43.5%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the total number of users and the total amount spent using mobile only, desktop only, and both mobile and desktop together for each date.",
      "sampleInput": {
        "table": "Spending",
        "columns": [
          "user_id",
          "spend_date",
          "platform",
          "amount"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            1,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            2,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            2,
            "2019-07-02",
            "mobile",
            100
          ],
          [
            3,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            3,
            "2019-07-02",
            "desktop",
            100
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "spend_date",
          "platform",
          "total_amount",
          "total_users"
        ],
        "rows": [
          [
            "2019-07-01",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-01",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-01",
            "both",
            200,
            1
          ],
          [
            "2019-07-02",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-02",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-02",
            "both",
            0,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1127: CROSS JOIN PLATFORM GRID WITH ZERO-FILL</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">User Daily Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: Mobile & Desktop -> 'both'</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: Mobile only -> 'mobile'</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U3: Desktop only -> 'desktop'</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CROSS JOIN (desktop, mobile, both)\\nLEFT JOIN UserPlatformActivity</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">All Platforms</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">desktop: $100 (1 user)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">mobile: $100 (1 user)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">both: $200 (1 user)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Determine each user's platform per date: if COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform).",
        "Generate the full cartesian template grid: all distinct spend_date CROSS JOIN ('desktop', 'mobile', 'both').",
        "LEFT JOIN the template grid with the aggregated user activity.",
        "Aggregate with SUM(amount) and COUNT(user_id), coalescing nulls to 0."
      ],
      "trapsAndEdgeCases": [
        "Zero-spending platform categories: A date might have 0 'both' users; it must still emit a row with total_amount = 0 and total_users = 0."
      ],
      "solutionSQL": "WITH UserPlatform AS (\n    SELECT spend_date,\n           user_id,\n           CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform) END AS platform,\n           SUM(amount) AS amount\n    FROM Spending\n    GROUP BY spend_date, user_id\n),\nDatePlatformGrid AS (\n    SELECT DISTINCT spend_date, 'desktop' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'mobile' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'both' AS platform FROM Spending\n)\nSELECT g.spend_date,\n       g.platform,\n       IFNULL(SUM(u.amount), 0) AS total_amount,\n       COUNT(u.user_id) AS total_users\nFROM DatePlatformGrid g\nLEFT JOIN UserPlatform u\n  ON g.spend_date = u.spend_date\n AND g.platform = u.platform\nGROUP BY g.spend_date, g.platform;",
      "lineByLineExplanation": [
        {
          "clause": "WITH UserPlatform AS (...)",
          "exp": "Classifies each user on each date as 'mobile', 'desktop', or 'both'."
        },
        {
          "clause": "DatePlatformGrid AS (...)",
          "exp": "Creates full Cartesian template of all 3 platforms for every distinct date."
        },
        {
          "clause": "SELECT g.spend_date, g.platform, IFNULL(SUM(u.amount), 0) AS total_amount, COUNT(u.user_id) AS total_users",
          "exp": "Left joins and folds null totals into clean zero-counts."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Explicit CROSS JOIN",
          "complexity": "O(D * 3)",
          "sql": "WITH Platforms AS (SELECT 'desktop' AS platform UNION SELECT 'mobile' UNION SELECT 'both'),\nDates AS (SELECT DISTINCT spend_date FROM Spending),\nGrid AS (SELECT d.spend_date, p.platform FROM Dates d CROSS JOIN Platforms p)\nSELECT ... FROM Grid g LEFT JOIN ...;",
          "explanation": "Modular cross join separation between distinct dates and platform list."
        }
      ]
    },
    {
      "id": 1132,
      "title": "Reported Posts II",
      "difficulty": "Medium",
      "acceptance": "39.6%",
      "interviewFreq": "High • Meta",
      "companies": [
        "Meta"
      ],
      "prompt": "Write a solution to find the average daily percentage of posts that got removed after being reported as spam, rounded to 2 decimal places.",
      "sampleInput": {
        "table": "Actions / Removals",
        "columns": [
          "post_id",
          "action_date",
          "action",
          "extra",
          "remove_date"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "report",
            "spam",
            "2019-07-01"
          ],
          [
            2,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            3,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            4,
            "2019-07-02",
            "report",
            "spam",
            "2019-07-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "average_daily_percent"
        ],
        "rows": [
          [
            75
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1132: DAILY AVERAGE SPAM REMOVAL PERCENTAGE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Daily Spam Reports</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 01: 1 removed / 3 reported = 33.33%</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 02: 1 removed / 1 reported = 100.00%</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(daily_removed / daily_spam) * 100</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Average Rate</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">average_daily_percent: 66.67%</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Filter Actions for action = 'report' AND extra = 'spam'.",
        "For each action_date, count distinct post_ids reported as spam, and distinct post_ids present in Removals.",
        "Calculate daily_percent = (distinct removed / distinct reported) * 100.",
        "Compute AVG(daily_percent) across all qualifying dates and round to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Duplicate report actions: Users may report the same post multiple times on the same date; COUNT(DISTINCT post_id) is mandatory."
      ],
      "solutionSQL": "WITH DailySpam AS (\n    SELECT a.action_date,\n           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent\n    FROM Actions a\n    LEFT JOIN Removals r ON a.post_id = r.post_id\n    WHERE a.action = 'report' AND a.extra = 'spam'\n    GROUP BY a.action_date\n)\nSELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent\nFROM DailySpam;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DailySpam AS (SELECT a.action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent ...)",
          "exp": "Calculates the distinct spam removal ratio per date."
        },
        {
          "clause": "SELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent",
          "exp": "Averages daily percentages and rounds to 2 decimals."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Derived Table Inline Average",
          "complexity": "O(N log N)",
          "sql": "SELECT ROUND(AVG(daily_ratio) * 100, 2) AS average_daily_percent\nFROM (\n  SELECT action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS daily_ratio\n  FROM Actions a LEFT JOIN Removals r ON a.post_id = r.post_id\n  WHERE a.action = 'report' AND a.extra = 'spam' GROUP BY a.action_date\n) t;",
          "explanation": "Equivalent derived table formatting percentage at outer aggregation."
        }
      ]
    }
  ]
};
