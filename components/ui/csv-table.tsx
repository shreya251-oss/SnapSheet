"use client";

import React, { useState, useMemo } from 'react';
import { motion } from "motion/react";

interface CSVTableProps {
  csvData: string;
}

export function CSVTable({ csvData }: CSVTableProps) {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);

  // Enhanced CSV parsing with better handling
  const parseCSV = (csv: string) => {
    if (!csv.trim()) return [];
    
    const lines = csv.trim().split('\n');
    return lines.map(line => {
      const cells = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cells.push(current.trim().replace(/^"|"$/g, '')); // Remove surrounding quotes
          current = '';
        } else {
          current += char;
        }
      }
      
      cells.push(current.trim().replace(/^"|"$/g, ''));
      return cells;
    });
  };

  const rows = useMemo(() => parseCSV(csvData), [csvData]);
  
  if (rows.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <svg 
            className="w-8 h-8 sm:w-12 sm:h-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-body">No data to display</p>
        </div>
      </motion.div>
    );
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);
  const maxColumns = Math.max(...rows.map(row => row.length));

  // Detect data types for better styling
  const getDataType = (value: string) => {
    if (!value || value === '—') return 'empty';
    if (/^\d+$/.test(value)) return 'integer';
    if (/^\d*\.?\d+$/.test(value)) return 'number';
    if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}$/.test(value)) return 'date';
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') return 'boolean';
    return 'text';
  };

  const getCellClass = (type: string, isHeader = false) => {
    if (isHeader) return 'font-semibold';
    
    switch (type) {
      case 'integer':
      case 'number':
        return 'text-cursor-green font-mono text-right';
      case 'date':
        return 'text-cursor-blue font-mono';
      case 'boolean':
        return 'text-cursor-orange font-medium';
      case 'empty':
        return '';
      default:
        return '';
    }
  };

  const getCellStyle = (type: string, isHeader = false): React.CSSProperties => {
    if (isHeader) return { color: 'var(--text-primary)' };
    
    switch (type) {
      case 'empty':
        return { color: 'var(--text-tertiary)' };
      default:
        return { color: 'var(--text-secondary)' };
    }
  };

  const getTypeIndicator = (type: string) => {
    switch (type) {
      case 'integer':
      case 'number':
        return <span className="text-cursor-green text-xs hidden sm:inline">123</span>;
      case 'date':
        return <span className="text-cursor-blue text-xs hidden sm:inline">📅</span>;
      case 'boolean':
        return <span className="text-cursor-orange text-xs hidden sm:inline">⚡</span>;
      case 'text':
        return <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>Aa</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Table Header - Mobile Optimized */}
      <div 
        className="glass-nav px-4 sm:px-6 py-3 sm:py-4 border-b"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cursor-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-h3">Data Preview</h3>
          </div>
          <div className="text-caption">
            {dataRows.length} rows × {maxColumns} columns
          </div>
        </div>
      </div>

      {/* Mobile Table Notice */}
      <div 
        className="block sm:hidden px-4 py-2 border-b"
        style={{ 
          backgroundColor: 'var(--glass-bg)', 
          borderColor: 'var(--border-primary)' 
        }}
      >
        <p className="text-caption text-center">
          Swipe horizontally to view all columns
        </p>
      </div>

      {/* Table Container with Enhanced Mobile Scrolling */}
      <div className="overflow-auto max-h-80 sm:max-h-96 relative scroll-container" style={{ WebkitOverflowScrolling: 'touch' }}>
        <table className="w-full border-collapse min-w-full">
          {/* Enhanced Table Headers - Mobile Responsive */}
          <thead className="sticky top-0 z-20">
            <tr>
              {/* Row Number Header */}
              <th 
                className="sticky left-0 z-30 w-12 sm:w-16 px-2 sm:px-3 py-2 sm:py-3 text-center border-r text-xs sm:text-sm"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  borderColor: 'var(--border-primary)' 
                }}
              >
                <span className="text-caption font-medium" style={{ color: 'var(--text-tertiary)' }}>#</span>
              </th>
              {Array.from({ length: maxColumns }).map((_, index) => {
                const header = headers[index] || `Col ${index + 1}`;
                const sampleValue = dataRows[0]?.[index] || '';
                const dataType = getDataType(sampleValue);
                
                return (
                  <th
                    key={index}
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left border-r min-w-24 sm:min-w-32 max-w-32 sm:max-w-48"
                    style={{ 
                      backgroundColor: 'var(--bg-tertiary)', 
                      borderColor: 'var(--border-primary)' 
                    }}
                  >
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                      <span 
                        className={`text-xs sm:text-sm font-semibold truncate pr-1 sm:pr-2 ${getCellClass(dataType, true)}`}
                        style={getCellStyle(dataType, true)}
                      >
                        {header}
                      </span>
                      {getTypeIndicator(dataType)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Enhanced Table Body - Mobile Responsive */}
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b transition-all duration-200 group hover:bg-opacity-50"
                style={{ 
                  borderColor: 'var(--border-primary)',
                  '--hover-bg': 'var(--glass-bg)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--glass-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Row Number with Sticky Position */}
                <td 
                  className="sticky left-0 z-10 w-12 sm:w-16 px-2 sm:px-3 py-2 sm:py-3 text-center border-r transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)' 
                  }}
                >
                  <span 
                    className="text-caption font-medium text-xs sm:text-sm"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {rowIndex + 1}
                  </span>
                </td>
                
                {Array.from({ length: maxColumns }).map((_, cellIndex) => {
                  const cellValue = row[cellIndex] || '';
                  const dataType = getDataType(cellValue);
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === cellIndex;
                  
                  return (
                    <td
                      key={cellIndex}
                      className={`px-2 sm:px-4 py-2 sm:py-3 border-r min-w-24 sm:min-w-32 max-w-32 sm:max-w-48 cursor-pointer transition-all duration-200 touch-action-manipulation ${
                        isSelected 
                          ? 'bg-cursor-purple bg-opacity-20 border-cursor-purple border-opacity-50' 
                          : ''
                      }`}
                      style={{ 
                        borderColor: 'var(--border-primary)',
                        backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.2)' : undefined
                      }}
                      title={cellValue}
                      onClick={() => setSelectedCell({row: rowIndex, col: cellIndex})}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'var(--glass-bg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span 
                          className={`text-xs sm:text-sm truncate transition-colors ${getCellClass(dataType)}`}
                          style={getCellStyle(dataType)}
                        >
                          {cellValue || '—'}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-1 sm:ml-2 flex-shrink-0"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cursor-purple rounded-full"></div>
                          </motion.div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Table Footer with Statistics - Mobile Responsive */}
      <div 
        className="glass-nav px-4 sm:px-6 py-3 sm:py-4 border-t"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-caption">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--text-tertiary)' }}>Rows:</span>
              <span className="text-cursor-green font-medium">{dataRows.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--text-tertiary)' }}>Columns:</span>
              <span className="text-cursor-blue font-medium">{maxColumns}</span>
            </div>
            {selectedCell && (
              <div className="flex items-center gap-2">
                <span style={{ color: 'var(--text-tertiary)' }}>Selected:</span>
                <span className="text-cursor-purple font-medium">
                  R{selectedCell.row + 1}, C{selectedCell.col + 1}
                </span>
              </div>
            )}
          </div>
          
          {/* Data Type Legend - Hidden on mobile to save space */}
          <div className="hidden lg:flex items-center gap-4 text-caption">
            <div className="flex items-center gap-1">
              <span className="text-cursor-green text-xs">123</span>
              <span style={{ color: 'var(--text-tertiary)' }}>Number</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-cursor-blue text-xs">📅</span>
              <span style={{ color: 'var(--text-tertiary)' }}>Date</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Aa</span>
              <span style={{ color: 'var(--text-tertiary)' }}>Text</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 