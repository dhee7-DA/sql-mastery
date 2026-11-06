/**
 * SQL MASTERY - RELATIONAL PARTICLE COLLIDER DATA
 * ------------------------------------------------------------------------
 * Curated query execution scenarios with structured row streams,
 * predicate evaluations, collision mechanics, and accumulator buckets.
 */

(function(window) {
  'use strict';

  const COLLIDER_SCENARIOS = [
    {
      id: 'scenario_filter_laser',
      title: 'WHERE Predicate Laser Gate',
      category: 'Filter Physics',
      sql: 'SELECT order_id, customer, amount\nFROM orders\nWHERE amount >= 150 AND status = \'PAID\';',
      relationalAlgebra: 'σ (amount ≥ 150 ∧ status = \'PAID\') (Orders)',
      description: 'Physical tuples stream from heap storage into a high-voltage predicate laser beam. Passing tuples accelerate forward; failing tuples are deflected into the reject bin.',
      chambers: ['emitter', 'filter_laser', 'collector'],
      tuples: [
        { id: '101', cols: { order_id: 101, customer: 'Stripe_EU', amount: 320, status: 'PAID' }, passes: true, reason: 'Amount $320 ≥ 150 & PAID' },
        { id: '102', cols: { order_id: 102, customer: 'Uber_HQ', amount: 85, status: 'PAID' }, passes: false, reason: 'Amount $85 < 150 (Failed filter)' },
        { id: '103', cols: { order_id: 103, customer: 'Airbnb_US', amount: 450, status: 'PENDING' }, passes: false, reason: 'Status PENDING != PAID' },
        { id: '104', cols: { order_id: 104, customer: 'Netflix_CDN', amount: 780, status: 'PAID' }, passes: true, reason: 'Amount $780 ≥ 150 & PAID' },
        { id: '105', cols: { order_id: 105, customer: 'Spotify_AB', amount: 120, status: 'PAID' }, passes: false, reason: 'Amount $120 < 150' },
        { id: '106', cols: { order_id: 106, customer: 'DoorDash_Ops', amount: 210, status: 'PAID' }, passes: true, reason: 'Amount $210 ≥ 150 & PAID' },
        { id: '107', cols: { order_id: 107, customer: 'Square_Inc', amount: 950, status: 'CANCELLED' }, passes: false, reason: 'Status CANCELLED' },
        { id: '108', cols: { order_id: 108, customer: 'Amazon_SCOT', amount: 1420, status: 'PAID' }, passes: true, reason: 'Amount $1,420 ≥ 150 & PAID' }
      ]
    },

    {
      id: 'scenario_groupby_cylinder',
      title: 'GROUP BY Volumetric Glass Accumulators',
      category: 'Aggregation Centrifuge',
      sql: 'SELECT department, COUNT(*) AS head_count, SUM(salary) AS total_payroll\nFROM employees\nGROUP BY department;',
      relationalAlgebra: 'γ department, COUNT(*)->head_count, SUM(salary)->total_payroll (Employees)',
      description: 'Incoming employee tuples are dynamically centrifuged into dedicated glass volumetric cylinders based on department hash keys. Liquid levels rise with running SUM and COUNT counters.',
      chambers: ['emitter', 'accumulator_cylinders'],
      buckets: [
        { key: 'Engineering', color: '#10b981', label: 'Eng' },
        { key: 'Product', color: '#6366f1', label: 'Prod' },
        { key: 'Design', color: '#06b6d4', label: 'Design' }
      ],
      tuples: [
        { id: 'e1', cols: { name: 'Alex K.', department: 'Engineering', salary: 180000 }, bucket: 'Engineering' },
        { id: 'e2', cols: { name: 'Sarah M.', department: 'Product', salary: 165000 }, bucket: 'Product' },
        { id: 'e3', cols: { name: 'Liam T.', department: 'Engineering', salary: 210000 }, bucket: 'Engineering' },
        { id: 'e4', cols: { name: 'Elena R.', department: 'Design', salary: 140000 }, bucket: 'Design' },
        { id: 'e5', cols: { name: 'Chen W.', department: 'Engineering', salary: 195000 }, bucket: 'Engineering' },
        { id: 'e6', cols: { name: 'Maya P.', department: 'Product', salary: 175000 }, bucket: 'Product' },
        { id: 'e7', cols: { name: 'David B.', department: 'Design', salary: 155000 }, bucket: 'Design' },
        { id: 'e8', cols: { name: 'Jessica L.', department: 'Engineering', salary: 240000 }, bucket: 'Engineering' }
      ]
    },

    {
      id: 'scenario_hash_join_vortex',
      title: 'Hash Join Magnetic Vortex Collision',
      category: 'Join Dynamics',
      sql: 'SELECT c.customer_name, o.amount\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;',
      relationalAlgebra: 'Customers ⨝ c.id = o.customer_id Orders',
      description: 'Dual particle pipelines stream simultaneously: Build table (Customers) primes the magnetic vortex bucket slots. Probe table (Orders) collides at high velocity, fusing matching tuples into wide result pairs.',
      chambers: ['dual_emitter', 'join_vortex', 'collector'],
      buildTuples: [
        { id: 'c1', key: 1, label: 'Cust 1: Stripe' },
        { id: 'c2', key: 2, label: 'Cust 2: Uber' },
        { id: 'c3', key: 3, label: 'Cust 3: Airbnb' },
        { id: 'c4', key: 4, label: 'Cust 4: Netflix' }
      ],
      probeTuples: [
        { id: 'o1', key: 1, amount: 450, matches: true, partner: 'c1' },
        { id: 'o2', key: 2, amount: 120, matches: true, partner: 'c2' },
        { id: 'o3', key: 9, amount: 90, matches: false, partner: null }, // Orphan probe
        { id: 'o4', key: 3, amount: 830, matches: true, partner: 'c3' },
        { id: 'o5', key: 1, amount: 620, matches: true, partner: 'c1' },
        { id: 'o6', key: 8, amount: 310, matches: false, partner: null }
      ]
    },

    {
      id: 'scenario_three_valued_null',
      title: '3-Valued Logic NULL Deflection Gate',
      category: 'Defensive SQL',
      sql: 'SELECT emp_id, bonus\nFROM compensation\nWHERE bonus > 0 OR bonus <= 0;',
      relationalAlgebra: 'σ (bonus > 0 ∨ bonus ≤ 0) (Compensation)',
      description: 'The famous NULL paradox! Many engineers assume (x > 0 OR x <= 0) matches all rows. Watch NULL tuples evaluate to UNKNOWN, deflecting into the NULL singularity trap instead of matching TRUE!',
      chambers: ['emitter', 'null_laser', 'collector'],
      tuples: [
        { id: 'n1', cols: { emp_id: 'E10', bonus: 2500 }, outcome: 'TRUE', color: '#10b981', note: '2500 > 0 -> TRUE (Passed)' },
        { id: 'n2', cols: { emp_id: 'E11', bonus: 0 }, outcome: 'TRUE', color: '#10b981', note: '0 <= 0 -> TRUE (Passed)' },
        { id: 'n3', cols: { emp_id: 'E12', bonus: null }, outcome: 'UNKNOWN', color: '#ef4444', note: 'NULL > 0 is UNKNOWN! Deflected!' },
        { id: 'n4', cols: { emp_id: 'E13', bonus: 5000 }, outcome: 'TRUE', color: '#10b981', note: '5000 > 0 -> TRUE (Passed)' },
        { id: 'n5', cols: { emp_id: 'E14', bonus: null }, outcome: 'UNKNOWN', color: '#ef4444', note: 'NULL <= 0 is UNKNOWN! Deflected!' },
        { id: 'n6', cols: { emp_id: 'E15', bonus: -100 }, outcome: 'TRUE', color: '#10b981', note: '-100 <= 0 -> TRUE (Passed)' }
      ]
    }
  ];

  window.COLLIDER_SCENARIOS = COLLIDER_SCENARIOS;

})(window);
