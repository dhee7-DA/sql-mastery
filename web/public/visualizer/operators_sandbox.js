// =============================================================================
// OPERATORS & 3-VALUED LOGIC SANDBOX ENGINE
// =============================================================================

window.OPERATORS_DATA = {
  likePresets: [
    { label: "'A%' (Starts with A)", pattern: "name LIKE 'A%'", filter: (r) => r.name.startsWith('A'), note: "% matches any characters after 'A'" },
    { label: "'%th' (Ends with th)", pattern: "name LIKE '%th'", filter: (r) => r.name.endsWith('th'), note: "Matches 'Alice Smith' and 'Evan Wright'" },
    { label: "'%a%' (Contains 'a')", pattern: "name LIKE '%a%'", filter: (r) => r.name.toLowerCase().includes('a'), note: "Matches names containing letter 'a'" },
    { label: "'B__' (Exactly 3 chars starting with B)", pattern: "name LIKE 'B__ %'", filter: (r) => /^B.. /.test(r.name), note: "_ matches exactly one character: matches 'Bob Jones'" }
  ],
  inPresets: [
    { label: "IN ('Engineering', 'Sales')", pattern: "department IN ('Engineering', 'Sales')", filter: (r) => ['Engineering', 'Sales'].includes(r.department), note: "Shorthand for (department = 'Engineering' OR department = 'Sales')" },
    { label: "NOT IN ('Marketing', 'Finance')", pattern: "department NOT IN ('Marketing', 'Finance')", filter: (r) => !['Marketing', 'Finance'].includes(r.department), note: "Filters out Marketing and Finance" }
  ],
  betweenPresets: [
    { label: "BETWEEN $70k AND $90k", pattern: "salary BETWEEN 70000 AND 90000", filter: (r) => r.salary >= 70000 && r.salary <= 90000, note: "INCLUSIVE: 70000 <= salary <= 90000" },
    { label: "BETWEEN $90k AND $100k", pattern: "salary BETWEEN 90000 AND 100000", filter: (r) => r.salary >= 90000 && r.salary <= 100000, note: "Picks high earners: Alice ($95k) and Evan ($95k)" }
  ],
  nullSemantics: {
    comparison: "salary = NULL",
    comparisonResult: "UNKNOWN",
    comparisonExplanation: "In SQL, NULL represents missing information. Does an unknown value equal an unknown value? The engine cannot know, so it evaluates to UNKNOWN. In WHERE clauses, UNKNOWN behaves as FALSE, so ALL rows are discarded!",
    correctSyntax: "salary IS NULL",
    correctResult: "TRUE / FALSE",
    correctExplanation: "IS NULL is an explicit unary operator that specifically checks whether the memory pointer points to a null bitmask."
  }
};
