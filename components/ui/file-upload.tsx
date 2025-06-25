"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IconUpload, IconFile, IconPhoto } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 10,
    y: -10,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  files: externalFiles,
}: {
  onChange?: (files: File[]) => void;
  files?: File[];
}) => {
  const [files, setFiles] = useState<File[]>([]);
  
  // Sync with external files when provided
  useEffect(() => {
    if (externalFiles !== undefined) {
      setFiles(externalFiles);
    }
  }, [externalFiles]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <IconPhoto className="w-4 h-4 sm:w-5 sm:h-5 text-cursor-blue flex-shrink-0" />;
    }
    return <IconFile className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />;
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className={cn(
          "glass-card cursor-pointer w-full relative overflow-hidden transition-all duration-300 touch-action-manipulation",
          isDragActive ? "border-cursor-green border-2" : ""
        )}
        style={{
          backgroundColor: isDragActive ? 'var(--glass-bg)' : undefined,
          borderColor: isDragActive ? '#10B981' : undefined
        } as React.CSSProperties}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        
        {/* Background Pattern - Mobile Optimized */}
        <div className="absolute inset-0 opacity-10 sm:opacity-20">
          <GridPattern />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          {files.length === 0 && (
            <>
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 glass-feature-card flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4 sm:mb-6 transition-all duration-300",
                  isDragActive ? "scale-110" : "hover:scale-105 active:scale-95"
                )}
              >
                {isDragActive ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-cursor-green flex flex-col items-center gap-1 sm:gap-2"
                  >
                    <IconUpload className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-xs sm:text-sm font-medium">Drop it!</span>
                  </motion.div>
                ) : (
                  <IconUpload 
                    className="h-6 w-6 sm:h-8 sm:w-8 group-hover:text-cursor-green transition-colors duration-300" 
                    style={{ color: 'var(--text-tertiary)' }}
                  />
                )}
              </motion.div>
              
              <div className="text-center px-4">
                <h3 className="text-h3 mb-2">Upload Your Image</h3>
                <p className="text-body mb-3 sm:mb-4 max-w-md mx-auto">
                  Drag and drop your image here, or tap to browse files
                </p>
                <p className="text-caption">
                  Supports PNG, JPG, JPEG, GIF, BMP, WebP
                </p>
              </div>
            </>
          )}

          {files.length > 0 && (
            <div className="w-full">
              {files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-feature-card w-full"
                >
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getFileIcon(file)}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-h3 truncate" style={{ color: 'var(--text-primary)' }}>
                          {file.name}
                        </h4>
                        <p className="text-caption">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(idx);
                      }}
                      className="hover:text-red-400 transition-colors duration-300 p-2 sm:p-1 -mr-2 sm:-mr-1 touch-action-manipulation"
                      style={{ color: 'var(--text-tertiary)' }}
                      aria-label="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-caption">
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded-md border font-mono text-xs truncate max-w-32 sm:max-w-none"
                        style={{ 
                          backgroundColor: 'var(--glass-bg)', 
                          borderColor: 'var(--border-primary)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {file.type}
                      </span>
                    </div>
                    
                    <span className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Modified {new Date(file.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* File preview for images - Mobile Optimized */}
                  {file.type.startsWith('image/') && (
                    <div 
                      className="mt-4 rounded-lg overflow-hidden border"
                      style={{ 
                        backgroundColor: 'var(--bg-tertiary)',
                        borderColor: 'var(--border-primary)'
                      }}
                    >
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        className="w-full h-24 sm:h-32 lg:h-40 object-cover"
                        onLoad={(e) => {
                          URL.revokeObjectURL((e.target as HTMLImageElement).src);
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
              
              <div className="mt-4 sm:mt-6 text-center">
                <button
                  onClick={() => handleFileChange([])}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Upload Different Image
                </button>
              </div>
            </div>
          )}

          {!files.length && (
            <motion.div
              variants={secondaryVariant}
              className={cn(
                "absolute inset-0 z-30 border-2 border-dashed border-transparent rounded-xl transition-all duration-300",
                isDragActive ? "border-cursor-green" : ""
              )}
              style={{
                backgroundColor: isDragActive ? 'rgba(16, 185, 129, 0.05)' : undefined
              } as React.CSSProperties}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 20;
  const rows = 8;
  return (
    <div className="flex flex-wrap justify-center items-center gap-1 scale-105 opacity-30">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-sm transition-colors duration-500"
              )}
              style={{
                backgroundColor: index % 3 === 0
                  ? 'var(--border-primary)'
                  : index % 2 === 0
                  ? 'rgba(139, 92, 246, 0.1)'
                  : 'rgba(16, 185, 129, 0.05)'
              }}
            />
          );
        })
      )}
    </div>
  );
} 