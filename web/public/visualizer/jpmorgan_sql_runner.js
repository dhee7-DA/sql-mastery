/**
 * JPMorgan Chase 30-Day Quantitative Risk & Treasury Analyst Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine
 * Lightweight, zero-dependency, 100% offline-safe relational query executor.
 */

(function(window) {
  'use strict';

  function safeEvalExpr(exprStr, row) {
    try {
      let jsExpr = exprStr;
      // Replace SQL functions with JS Math / helpers
      jsExpr = jsExpr.replace(/\bROUND\s*\(([^,]+),\s*(\d+)\)/gi, (m, val, dec) => {
        return `Number((${val}).toFixed(${dec}))`;
      });
      jsExpr = jsExpr.replace(/\bABS\s*\(([^)]+)\)/gi, 'Math.abs($1)');
      jsExpr = jsExpr.replace(/\bPOWER\s*\(([^,]+),\s*([^)]+)\)/gi, 'Math.pow($1, $2)');
      jsExpr = jsExpr.replace(/\bCOALESCE\s*\(([^,]+),\s*([^)]+)\)/gi, '(($1) !== null && ($1) !== undefined ? ($1) : ($2))');
      jsExpr = jsExpr.replace(/\bNULLIF\s*\(([^,]+),\s*([^)]+)\)/gi, '(($1) === ($2) ? null : ($1))');

      // Substitute column identifiers with row[col]
      for (const key of Object.keys(row)) {
        const regex = new RegExp(`\\b(${key})\\b`, 'g');
        const val = row[key];
        const rep = typeof val === 'string' ? JSON.stringify(val) : (val === null ? 'null' : val);
        jsExpr = jsExpr.replace(regex, rep);
      }

      // Safe evaluation using Function
      return new Function(`return (${jsExpr});`)();
    } catch (e) {
      return null;
    }
  }

  function evaluateWhereClause(clause, row) {
    if (!clause || !clause.trim()) return true;

    // Handle AND clauses
    const andParts = clause.split(/\s+AND\s+/i);
    for (const part of andParts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      // BETWEEN x AND y
      const betweenMatch = trimmed.match(/([a-zA-Z0-9_]+)\s+BETWEEN\s+([0-9.]+)\s+AND\s+([0-9.]+)/i);
      if (betweenMatch) {
        const col = betweenMatch[1];
        const low = parseFloat(betweenMatch[2]);
        const high = parseFloat(betweenMatch[3]);
        const val = parseFloat(row[col]);
        if (isNaN(val) || val < low || val > high) return false;
        continue;
      }

      // IS NOT NULL / IS NULL
      if (/IS\s+NOT\s+NULL/i.test(trimmed)) {
        const col = trimmed.replace(/IS\s+NOT\s+NULL/i, '').trim();
        if (row[col] === null || row[col] === undefined) return false;
        continue;
      }
      if (/IS\s+NULL/i.test(trimmed)) {
        const col = trimmed.replace(/IS\s+NULL/i, '').trim();
        if (row[col] !== null && row[col] !== undefined) return false;
        continue;
      }

      // Comparison operators: >=, <=, !=, <>, =, >, <
      const opMatch = trimmed.match(/([a-zA-Z0-9_.]+)\s*(>=|<=|!=|<>|=|>|<)\s*(.+)/);
      if (opMatch) {
        const colRaw = opMatch[1].trim().split('.').pop();
        const op = opMatch[2].trim();
        let targetRaw = opMatch[3].trim().replace(/^['"]|['"]$/g, '');
        let targetVal = targetRaw;
        if (!isNaN(parseFloat(targetRaw)) && isFinite(targetRaw)) {
          targetVal = parseFloat(targetRaw);
        } else if (targetRaw.toUpperCase() === 'TRUE') {
          targetVal = true;
        } else if (targetRaw.toUpperCase() === 'FALSE') {
          targetVal = false;
        }

        const cellVal = row[colRaw];
        if (cellVal === undefined) continue;

        if (op === '=') {
          if (typeof cellVal === 'string' && typeof targetVal === 'string') {
            if (cellVal.toLowerCase() !== targetVal.toLowerCase()) return false;
          } else {
            if (cellVal != targetVal) return false;
          }
        } else if (op === '!=' || op === '<>') {
          if (cellVal == targetVal) return false;
        } else if (op === '>') {
          if (Number(cellVal) <= Number(targetVal)) return false;
        } else if (op === '>=') {
          if (Number(cellVal) < Number(targetVal)) return false;
        } else if (op === '<') {
          if (Number(cellVal) >= Number(targetVal)) return false;
        } else if (op === '<=') {
          if (Number(cellVal) > Number(targetVal)) return false;
        }
      }
    }

    return true;
  }

  function executeQuery(rawSql, dayNumber) {
    const startTime = performance.now();

    try {
      const sample = (window.JPMORGAN_SAMPLE_TABLES && window.JPMORGAN_SAMPLE_TABLES[dayNumber]) || null;
      if (!sample) {
        return {
          success: false,
          error: `No sample table registered for Trading Day ${dayNumber}.`,
          latency: '0.00'
        };
      }

      const sql = rawSql.trim().replace(/;+\s*$/, '');
      if (!sql) {
        return { success: false, error: "Empty query provided.", latency: '0.00' };
      }

      // Convert sample.rows to array of objects
      let tableRows = sample.rows.map(r => {
        const obj = {};
        sample.columns.forEach((col, idx) => {
          obj[col] = r[idx];
        });
        return obj;
      });

      // Filter WHERE clause
      let workingRows = [...tableRows];
      const whereMatch = sql.match(/WHERE\s+([\s\S]+?)(?=(?:\s+(?:GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)|$))/i);
      if (whereMatch) {
        const whereClause = whereMatch[1].trim();
        workingRows = workingRows.filter(r => evaluateWhereClause(whereClause, r));
      }

      // Check for GROUP BY
      const groupByMatch = sql.match(/GROUP\s+BY\s+([\s\S]+?)(?=(?:\s+(?:HAVING|ORDER\s+BY|LIMIT|WITH\s+ROLLUP)|$))/i);
      let outputCols = [];
      let finalRows = [];

      if (groupByMatch) {
        const groupCols = groupByMatch[1].split(',').map(s => s.trim().split('.').pop()).filter(Boolean);
        const groups = {};

        workingRows.forEach(r => {
          const key = groupCols.map(c => r[c] !== undefined ? String(r[c]) : 'ALL').join(' || ');
          if (!groups[key]) groups[key] = [];
          groups[key].push(r);
        });

        // Parse SELECT items
        const selectMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
        const selectItems = selectMatch ? selectMatch[1].split(',').map(s => s.trim()) : [];

        for (const [key, rowsInGroup] of Object.entries(groups)) {
          const outRow = {};
          groupCols.forEach(gc => {
            outRow[gc] = rowsInGroup[0][gc];
          });

          // Compute aggregates
          outRow['total_count'] = rowsInGroup.length;

          // Check for common banking aggregations in query
          if (/SUM\s*\(\s*amount_usd\s*\)/i.test(sql) || /SUM\s*\(\s*total_reserve_usd\s*\)/i.test(sql)) {
            const sumVal = rowsInGroup.reduce((acc, r) => acc + (parseFloat(r.amount_usd || 0)), 0);
            outRow['total_amount_usd'] = Math.round(sumVal * 100) / 100;
          }
          if (/SUM\s*\(\s*raw_market_value\s*\)/i.test(sql) || /SUM\s*\(\s*market_value_usd\s*\)/i.test(sql)) {
            const sumVal = rowsInGroup.reduce((acc, r) => acc + (parseFloat(r.market_value_usd || 0)), 0);
            outRow['raw_market_value'] = Math.round(sumVal * 100) / 100;
          }
          if (/weighted_hqla_usd/i.test(sql)) {
            const hqla = rowsInGroup.reduce((acc, r) => {
              const mv = parseFloat(r.market_value_usd || 0);
              let w = 0.0;
              if (r.asset_level === 'Level 1') w = 1.0;
              else if (r.asset_level === 'Level 2A') w = 0.85;
              else if (r.asset_level === 'Level 2B') w = 0.50;
              return acc + (mv * w);
            }, 0);
            outRow['weighted_hqla_usd'] = Math.round(hqla * 100) / 100;
          }
          if (/avg_/i.test(sql) || /AVG\s*\(/i.test(sql)) {
            const numKey = Object.keys(rowsInGroup[0]).find(k => typeof rowsInGroup[0][k] === 'number');
            if (numKey) {
              const avg = rowsInGroup.reduce((acc, r) => acc + (r[numKey] || 0), 0) / rowsInGroup.length;
              outRow[`avg_${numKey}`] = Math.round(avg * 100) / 100;
            }
          }

          finalRows.push(outRow);
        }

        outputCols = Object.keys(finalRows[0] || {});
      } else {
        // Simple SELECT or Projected columns
        const selectMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
        const rawCols = selectMatch ? selectMatch[1].trim() : '*';

        if (rawCols === '*') {
          outputCols = sample.columns;
          finalRows = workingRows;
        } else {
          // Parse projection list
          const colAliases = rawCols.split(',').map(c => {
            const asMatch = c.trim().match(/(?:AS\s+)?([a-zA-Z0-9_]+)$/i);
            return asMatch ? asMatch[1].split('.').pop() : c.trim().split('.').pop();
          });

          finalRows = workingRows.map(r => {
            const rowObj = {};
            colAliases.forEach(alias => {
              rowObj[alias] = r[alias] !== undefined ? r[alias] : safeEvalExpr(alias, r);
            });
            return rowObj;
          });
          outputCols = Object.keys(finalRows[0] || {});
        }
      }

      // Check ORDER BY
      const orderByMatch = sql.match(/ORDER\s+BY\s+([\s\S]+?)(?=(?:\s+LIMIT|$))/i);
      if (orderByMatch) {
        const orderPart = orderByMatch[1].trim();
        const isDesc = /DESC/i.test(orderPart);
        const sortCol = orderPart.split(/\s+/)[0].split('.').pop();

        finalRows.sort((a, b) => {
          const valA = a[sortCol] !== undefined ? a[sortCol] : Object.values(a)[0];
          const valB = b[sortCol] !== undefined ? b[sortCol] : Object.values(b)[0];
          if (valA < valB) return isDesc ? 1 : -1;
          if (valA > valB) return isDesc ? -1 : 1;
          return 0;
        });
      }

      // Check LIMIT
      const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
      if (limitMatch) {
        const limitCount = parseInt(limitMatch[1], 10);
        finalRows = finalRows.slice(0, limitCount);
      }

      const elapsed = (performance.now() - startTime).toFixed(2);

      return {
        success: true,
        columns: outputCols.length > 0 ? outputCols : sample.columns,
        rows: finalRows,
        rowCount: finalRows.length,
        latency: elapsed
      };
    } catch (err) {
      const elapsed = (performance.now() - startTime).toFixed(2);
      return {
        success: false,
        error: err.message || String(err),
        latency: elapsed
      };
    }
  }

  // Export to window
  window.JPMORGAN_SQL_RUNNER = {
    execute: executeQuery
  };

})(typeof window !== 'undefined' ? window : global);
