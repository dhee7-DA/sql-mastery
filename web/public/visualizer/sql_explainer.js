/**
 * SQL FOUNDRY - PLAIN-ENGLISH QUERY EXPLAINER
 * Translates any SQL query into clear, conversational, human language.
 * Designed for complete beginners to verify their understanding of SQL logic.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function friendlyName(name) {
    if (!name) return 'the table';
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function parseAndExplainSql(sql) {
    sql = String(sql || '').trim();
    const cleanSql = sql.replace(/--.*$/gm, '').trim();

    if (!cleanSql) {
      return {
        summary: 'The editor is empty. Type any SQL query above and click 💬 Explain Query to see what it does in plain English.',
        chips: {
          Status: 'Empty Query'
        }
      };
    }

    // 1. Table
    const fromMatch = cleanSql.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    const table = fromMatch ? fromMatch[1] : 'the table';
    const tableFriendly = friendlyName(table);

    // 2. Join
    const joinMatch = cleanSql.match(/\b(LEFT|RIGHT|INNER|FULL)?\s*JOIN\s+([a-zA-Z0-9_]+)/i);
    const joinType = joinMatch && joinMatch[1] ? joinMatch[1].toUpperCase() : (joinMatch ? 'INNER' : null);
    const joinTable = joinMatch ? joinMatch[2] : null;

    // 3. Projections / Columns
    const selectMatch = cleanSql.match(/\bSELECT\s+(DISTINCT\s+)?([\s\S]*?)\bFROM\b/i);
    const isDistinct = Boolean(selectMatch && selectMatch[1]);
    const rawCols = selectMatch ? selectMatch[2].trim() : '*';

    let colsSummary = 'all columns';
    if (rawCols !== '*') {
      const colList = rawCols.split(',').map(c => c.trim()).filter(Boolean);
      const cleanCols = colList.map(c => c.split(/\s+AS\s+|\s+/i)[0].replace(/^[a-zA-Z0-9_]+\./, ''));
      colsSummary = cleanCols.join(', ');
    }

    // 4. Filters (WHERE)
    const whereMatch = cleanSql.match(/\bWHERE\s+([\s\S]*?)(?=\bGROUP BY\b|\bORDER BY\b|\bHAVING\b|\bLIMIT\b|;|$)/i);
    const rawWhere = whereMatch ? whereMatch[1].trim() : null;

    let filterDesc = null;
    if (rawWhere) {
      let w = rawWhere.replace(/\s+/g, ' ');
      w = w.replace(/\bIS NULL\b/gi, 'is empty or unassigned');
      w = w.replace(/\bIS NOT NULL\b/gi, 'has a valid value');
      w = w.replace(/!=|<>/g, 'is not equal to');
      w = w.replace(/==/g, 'equals');
      w = w.replace(/=/g, 'equals');
      w = w.replace(/>=/g, 'is greater than or equal to');
      w = w.replace(/<=/g, 'is less than or equal to');
      w = w.replace(/>/g, 'is greater than');
      w = w.replace(/</g, 'is less than');
      w = w.replace(/\bAND\b/gi, 'and');
      w = w.replace(/\bOR\b/gi, 'or');
      filterDesc = w;
    }

    // 5. Grouping & Having
    const groupMatch = cleanSql.match(/\bGROUP BY\s+([\s\S]*?)(?=\bHAVING\b|\bORDER BY\b|\bLIMIT\b|;|$)/i);
    const groupDesc = groupMatch ? groupMatch[1].trim() : null;

    const havingMatch = cleanSql.match(/\bHAVING\s+([\s\S]*?)(?=\bORDER BY\b|\bLIMIT\b|;|$)/i);
    const havingDesc = havingMatch ? havingMatch[1].trim() : null;

    // 6. Sorting (ORDER BY)
    const orderMatch = cleanSql.match(/\bORDER BY\s+([\s\S]*?)(?=\bLIMIT\b|;|$)/i);
    const rawOrder = orderMatch ? orderMatch[1].trim() : null;
    let orderDesc = null;
    if (rawOrder) {
      const isDesc = /DESC/i.test(rawOrder);
      const col = rawOrder.replace(/\s+(ASC|DESC)/i, '').trim().replace(/^[a-zA-Z0-9_]+\./, '');
      orderDesc = `${col} (${isDesc ? 'highest to lowest' : 'lowest to highest'})`;
    }

    // 7. Limit
    const limitMatch = cleanSql.match(/\bLIMIT\s+(\d+)/i);
    const limitDesc = limitMatch ? `Top ${limitMatch[1]} rows` : null;

    // Compose cohesive plain-English sentences
    const parts = [];

    // Sentence 1: Data source
    if (joinTable) {
      if (joinTable === table) {
        parts.append ? parts.append() : parts.push(`This query checks the <strong>${tableFriendly}</strong> table against itself (self-join) to find related subsequent activity.`);
      } else {
        const jFriendly = friendlyName(joinTable);
        parts.push(`This query opens the <strong>${tableFriendly}</strong> table and connects it with <strong>${jFriendly}</strong> records.`);
      }
    } else {
      parts.push(`This query opens the <strong>${tableFriendly}</strong> table.`);
    }

    // Sentence 2: Filtering / Grouping
    if (filterDesc) {
      parts.push(`It looks specifically for rows where <em>${filterDesc}</em>.`);
    } else if (groupDesc) {
      parts.push(`It groups the rows together by <code>${groupDesc}</code> to calculate summary totals.`);
    } else {
      parts.push(`It inspects all records without filtering any rows out.`);
    }

    // Sentence 3: Output columns, sorting & bounds
    const outPhrase = isDistinct ? `unique values for <code>${colsSummary}</code>` : `<code>${colsSummary}</code>`;
    if (orderDesc && limitDesc) {
      parts.push(`Finally, it displays ${outPhrase}, sorted by ${orderDesc}, and limits the output to the ${limitDesc.toLowerCase()}.`);
    } else if (orderDesc) {
      parts.push(`Finally, it displays ${outPhrase}, sorted by ${orderDesc}.`);
    } else if (limitDesc) {
      parts.push(`Finally, it displays ${outPhrase}, stopping after the ${limitDesc.toLowerCase()}.`);
    } else {
      parts.push(`Finally, it outputs ${outPhrase}.`);
    }

    const chips = {
      '📂 Table': table,
      '📋 Output': colsSummary,
      '🔍 Filter': filterDesc ? rawWhere : 'None (All rows)',
      '⇅ Sorting': orderDesc || 'Default physical order',
      '🛑 Limit': limitDesc || 'All matching rows'
    };

    if (joinTable) chips['🔗 Link'] = `${joinType || 'LEFT'} JOIN on ${joinTable}`;
    if (groupDesc) chips['📦 Grouping'] = groupDesc;

    return {
      summary: parts.join(' '),
      chips: chips
    };
  }

  function renderExplainerCardHtml(result) {
    const summary = result.summary;
    const chips = result.chips || {};

    const chipKeys = Object.keys(chips);

    return `
      <div class="koma-explainer-card">
        <div class="koma-explainer-header">
          <div class="koma-explainer-badge-row">
            <span class="koma-explainer-badge">💬 Plain-English Translation</span>
            <span class="koma-explainer-sub">How SQL translates to human thoughts</span>
          </div>
          <button class="koma-explainer-close-btn" onclick="window.LANDING_PAGE_ENGINE.toggleQueryExplainer()" title="Close explanation">✕</button>
        </div>

        <div class="koma-explainer-body">
          <p class="koma-explainer-text">${summary}</p>
          <div class="koma-explainer-chips-row">
                        ${chipKeys.map(k => {
              let enterAttr = '';
              const leaveAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.clearClauseHighlight()';
              if (k.includes('Output')) {
                enterAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.highlightClause(\'SELECT\')';
              } else if (k.includes('Filter')) {
                enterAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.highlightClause(\'WHERE\', \'' + escapeHtml(chips[k]).replace(/'/g, "\\'") + '\')';
              } else if (k.includes('Table')) {
                enterAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.highlightClause(\'FROM\', \'' + escapeHtml(chips[k]).replace(/'/g, "\\'") + '\')';
              } else if (k.includes('Sorting')) {
                enterAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.highlightClause(\'ORDER_BY\')';
              } else if (k.includes('Limit')) {
                enterAttr = 'if(window.LANDING_PAGE_ENGINE) window.LANDING_PAGE_ENGINE.highlightClause(\'LIMIT\')';
              }

              return `
                <div class="koma-explainer-chip interactive-clause-chip" ${enterAttr ? `onmouseenter="${enterAttr}" onmouseleave="${leaveAttr}" title="Hover to highlight this clause in table"` : ''}>
                  <span class="chip-label">${escapeHtml(k)}:</span>
                  <span class="chip-val">${escapeHtml(chips[k])}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.SQL_EXPLAINER = {
    explain: parseAndExplainSql,
    renderExplainerCardHtml: renderExplainerCardHtml
  };

})(window);
