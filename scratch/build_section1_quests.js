const fs = require('fs');

// Read syntax_gym_data.js
let code = fs.readFileSync('visualizer/syntax_gym_data.js', 'utf8');
code = code.replace('const SYNTAX_GYM_DRILLS = [', 'global.SYNTAX_GYM_DRILLS = [');
eval(code);

const drills = global.SYNTAX_GYM_DRILLS.slice(0, 100);

const OTHER_TABLES = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

const quests = drills.map((d, idx) => {
  const levelNum = idx + 1;
  const pad = levelNum < 10 ? '0' + levelNum : '' + levelNum;
  let cleanTitle = d.title.replace(/^Syntax #\d+:\s*/i, '');
  if (cleanTitle.length > 60) cleanTitle = cleanTitle.slice(0, 57) + '...';

  const q = d.targetQuery;
  let template = [];
  let slots = {};

  // Case A: Query contains DISTINCT
  if (q.includes('DISTINCT')) {
    const p1 = q.indexOf('DISTINCT');
    const p2 = q.indexOf('FROM');
    const beforeDistinct = q.slice(0, p1);
    const between = q.slice(p1 + 8, p2);
    const afterFrom = q.slice(p2 + 4);

    template = [
      { text: beforeDistinct, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: between, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: afterFrom, isBlank: false }
    ];
    slots = {
      slot1: {
        correct: 'DISTINCT',
        options: shuffle(['DISTINCT', 'UNIQUE', 'DIFFERENT', 'SOLO'])
      },
      slot2: {
        correct: 'FROM',
        options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
      }
    };
  }
  // Case B: Query contains CONCAT
  else if (q.includes('CONCAT')) {
    const p1 = q.indexOf('CONCAT');
    const p2 = q.indexOf(' AS ');
    const beforeConcat = q.slice(0, p1);

    if (p2 !== -1) {
      const between = q.slice(p1 + 6, p2);
      const afterAs = q.slice(p2 + 4);
      template = [
        { text: beforeConcat, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between + ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ' + afterAs, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: 'CONCAT',
          options: shuffle(['CONCAT', 'GLUE', 'JOIN_STR', 'COMBINE'])
        },
        slot2: {
          correct: 'AS',
          options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL'])
        }
      };
    } else {
      const pFrom = q.indexOf('FROM');
      const between = q.slice(p1 + 6, pFrom);
      const afterFrom = q.slice(pFrom + 4);
      template = [
        { text: beforeConcat, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: afterFrom, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: 'CONCAT',
          options: shuffle(['CONCAT', 'GLUE', 'JOIN_STR', 'COMBINE'])
        },
        slot2: {
          correct: 'FROM',
          options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
        }
      };
    }
  }
  // Case C: Query contains ROUND
  else if (q.includes('ROUND')) {
    const p1 = q.indexOf('ROUND');
    const p2 = q.indexOf(' AS ');
    const beforeRound = q.slice(0, p1);

    if (p2 !== -1) {
      const between = q.slice(p1 + 5, p2);
      const afterAs = q.slice(p2 + 4);
      template = [
        { text: beforeRound, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between + ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ' + afterAs, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: 'ROUND',
          options: shuffle(['ROUND', 'TRUNC', 'APPROX', 'FIXED'])
        },
        slot2: {
          correct: 'AS',
          options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL'])
        }
      };
    } else {
      const pFrom = q.indexOf('FROM');
      const between = q.slice(p1 + 5, pFrom);
      const afterFrom = q.slice(pFrom + 4);
      template = [
        { text: beforeRound, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: afterFrom, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: 'ROUND',
          options: shuffle(['ROUND', 'TRUNC', 'APPROX', 'FIXED'])
        },
        slot2: {
          correct: 'FROM',
          options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
        }
      };
    }
  }
  // Case D: Query contains YEAR or MONTH or DAY
  else if (q.includes('YEAR(') || q.includes('MONTH(') || q.includes('DAY(')) {
    const fnName = q.includes('YEAR(') ? 'YEAR' : q.includes('MONTH(') ? 'MONTH' : 'DAY';
    const p1 = q.indexOf(fnName);
    const p2 = q.indexOf(' AS ');
    const beforeFn = q.slice(0, p1);

    if (p2 !== -1) {
      const between = q.slice(p1 + fnName.length, p2);
      const afterAs = q.slice(p2 + 4);
      template = [
        { text: beforeFn, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between + ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ' + afterAs, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: fnName,
          options: shuffle([fnName, 'DATE_' + fnName, 'GET_' + fnName, 'EXTRACT_' + fnName.slice(0, 2)])
        },
        slot2: {
          correct: 'AS',
          options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL'])
        }
      };
    } else {
      const pFrom = q.indexOf('FROM');
      const between = q.slice(p1 + fnName.length, pFrom);
      const afterFrom = q.slice(pFrom + 4);
      template = [
        { text: beforeFn, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: between, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: afterFrom, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: fnName,
          options: shuffle([fnName, 'DATE_' + fnName, 'GET_' + fnName, 'EXTRACT_' + fnName.slice(0, 2)])
        },
        slot2: {
          correct: 'FROM',
          options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
        }
      };
    }
  }
  // Case E: Query contains AS alias
  else if (q.includes(' AS ')) {
    const p1 = q.indexOf(' AS ');
    const p2 = q.indexOf('FROM');
    const beforeAs = q.slice(0, p1);
    const between = q.slice(p1 + 4, p2);
    const afterFrom = q.slice(p2 + 4);

    template = [
      { text: beforeAs + ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' ' + between, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: afterFrom, isBlank: false }
    ];
    slots = {
      slot1: {
        correct: 'AS',
        options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL'])
      },
      slot2: {
        correct: 'FROM',
        options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
      }
    };
  }
  // Case F: Default SELECT ... FROM table;
  else {
    const pSelect = q.indexOf('SELECT');
    const pFrom = q.indexOf('FROM');
    const selectPrefix = q.slice(0, pSelect);
    const colPart = q.slice(pSelect + 6, pFrom);
    const afterFrom = q.slice(pFrom + 4);

    template = [
      { text: selectPrefix, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: colPart, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: afterFrom, isBlank: false }
    ];
    slots = {
      slot1: {
        correct: 'SELECT',
        options: shuffle(['SELECT', 'EXTRACT', 'GET', 'CHOOSE'])
      },
      slot2: {
        correct: 'FROM',
        options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE'])
      }
    };
  }

  return {
    id: levelNum,
    levelDisplay: `Level ${pad}`,
    title: `Level ${pad}: ${cleanTitle}`,
    subtitle: d.scenario,
    type: 'fill_blank',
    category: 'Section 01: Foundations & Projections',
    subcluster: d.subcluster || '1.1 Basic Projections',
    task: d.businessObjective,
    table: d.table,
    schemaSnippet: d.schemaSnippet,
    targetQuery: d.targetQuery,
    template,
    slots,
    explanation: `${d.syntaxRule} 💡 Pro-Tip / Trap: ${d.syntaxTrap}`,
    commonMistakes: d.commonMistakes
  };
});

const output = `// =============================================================================
// SECTION 01: FOUNDATIONS & PROJECTIONS (100 INTERACTIVE DUOLINGO-STYLE QUESTS)
// Generated from Section 0 Syntax Gym Drills #001 through #100
// =============================================================================

window.QUESTS_SECTION_1 = ${JSON.stringify(quests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section1_data.js', output, 'utf8');
console.log('Successfully written visualizer/quests_section1_data.js with', quests.length, 'quests!');
