'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Table as TableIcon,
  Key,
  Layers,
  Search,
  Eye,
  Terminal,
  ChevronDown,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { TableSchema } from '@/lib/useSqlWasm';

interface KobbeSchemaExplorerProps {
  schemas: TableSchema[];
  onSelectQuery?: (sql: string) => void;
  onPreviewTable?: (tableName: string) => void;
  previewData?: { table: string; columns: string[]; values: any[][] } | null;
  onClosePreview?: () => void;
}

export function KobbeSchemaExplorer({
  schemas,
  onSelectQuery,
  onPreviewTable,
  previewData,
  onClosePreview,
}: KobbeSchemaExplorerProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({
    Employees: true,
  });

  const toggleExpand = (tableName: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const filteredSchemas = schemas.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.columns.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-panel">
      {/* Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted-surface px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Database className="size-3.5 text-foreground" />
          <span className="text-xs font-mono font-bold text-foreground">RELATIONAL SCHEMA EXPLORER</span>
          <span className="rounded-full bg-border px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">
            {schemas.length} tables in memory
          </span>
        </div>

        {/* Quick Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-2 size-3 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter tables & columns..."
            className="rounded-md border border-border bg-surface pl-7 pr-2.5 py-1 text-xs font-mono text-foreground placeholder-muted-foreground outline-none focus:border-foreground/50 w-44 transition-all"
          />
        </div>
      </div>

      {/* Main Table List */}
      <div className="divide-y divide-border/60 max-h-[380px] overflow-y-auto">
        {filteredSchemas.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-muted-foreground">
            No tables matching "{searchTerm}"
          </div>
        ) : (
          filteredSchemas.map((table) => {
            const isExpanded = !!expandedTables[table.name];
            return (
              <div key={table.name} className="flex flex-col">
                {/* Table Header Bar */}
                <div
                  onClick={() => toggleExpand(table.name)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-muted-surface/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="size-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    )}
                    <TableIcon className="size-3.5 text-foreground/80" />
                    <span className="text-xs font-mono font-semibold text-foreground">{table.name}</span>
                    <span className="rounded-full bg-muted-surface border border-border px-1.5 py-0.2 text-[9px] font-mono text-muted-foreground">
                      {table.rowCount} rows
                    </span>
                    {table.indexes.length > 0 && (
                      <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 text-[9px] font-mono font-medium text-emerald-800 hidden sm:inline">
                        {table.indexes.length} {table.indexes.length === 1 ? 'index' : 'indexes'}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {onPreviewTable && (
                      <button
                        onClick={() => onPreviewTable(table.name)}
                        className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-0.8 text-[11px] font-mono text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                        title="Preview first 6 rows"
                      >
                        <Eye className="size-3" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                    )}
                    {onSelectQuery && (
                      <button
                        onClick={() => onSelectQuery(`SELECT * FROM ${table.name} LIMIT 10;`)}
                        className="flex items-center gap-1 rounded-md bg-dark-background text-surface px-2 py-0.8 text-[11px] font-mono hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
                        title="Query this table"
                      >
                        <Terminal className="size-3" />
                        <span className="hidden sm:inline">Query</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Column Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="bg-muted-surface/30 px-3.5 pb-3 pt-1 border-t border-border/40 text-xs font-mono overflow-hidden"
                    >
                      {/* Columns Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                        {table.columns.map((col) => (
                          <div
                            key={col.cid}
                            className="flex items-center justify-between rounded border border-border/70 bg-surface px-2 py-1 shadow-2xs"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              {col.pk ? (
                                <Key className="size-2.5 text-amber-600 shrink-0" />
                              ) : (
                                <span className="size-1 rounded-full bg-muted-foreground/60 shrink-0" />
                              )}
                              <span
                                className={`text-[11px] truncate ${
                                  col.pk ? 'font-bold text-foreground' : 'text-foreground/90'
                                }`}
                              >
                                {col.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 ml-1.5">
                              <span className="text-[9px] font-medium text-muted-foreground uppercase px-1 py-0.2 rounded bg-muted-surface">
                                {col.type}
                              </span>
                              {col.pk && (
                                <span className="text-[8px] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                                  PK
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Indexes List */}
                      {table.indexes.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-border/40 flex flex-wrap items-center gap-1.5 text-[10px]">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Layers className="size-3" />
                            Active Indexes:
                          </span>
                          {table.indexes.map((idx) => (
                            <span
                              key={idx.name}
                              className="rounded bg-surface border border-border px-1.5 py-0.5 text-foreground font-mono"
                            >
                              {idx.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Slide-over / Modal Live Data Preview Drawer */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-surface p-3.5 overflow-hidden shadow-inner"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-foreground" />
                <span className="text-xs font-mono font-bold text-foreground">
                  LIVE SAMPLE DATA PREVIEW: <strong className="underline">{previewData.table}</strong>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  ({previewData.values.length} sample rows)
                </span>
              </div>
              {onClosePreview && (
                <button
                  onClick={onClosePreview}
                  className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted-surface cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="mt-2 overflow-x-auto rounded border border-border max-h-48">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead className="bg-muted-surface text-muted-foreground text-[10px]">
                  <tr className="border-b border-border">
                    {previewData.columns.map((c) => (
                      <th key={c} className="py-1 px-2 font-semibold text-foreground">
                        {c.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface">
                  {previewData.values.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-muted-surface/40 transition-colors">
                      {row.map((val: any, cIdx: number) => (
                        <td key={cIdx} className="py-1 px-2 text-[11px] text-foreground">
                          {val === null ? <em className="text-muted-foreground">NULL</em> : String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
