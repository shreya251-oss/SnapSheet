"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { CSVTable } from "@/components/ui/csv-table";
import { Toast } from "@/components/ui/toast";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { motion } from "motion/react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [csvData, setCsvData] = useState<string>("");
  const [excelData, setExcelData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [processingType, setProcessingType] = useState<'csv' | 'excel' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const handleFileUpload = (newFiles: File[]) => {
    setFiles(newFiles);
    setCsvData("");
    setExcelData("");
    setError("");
    setProcessingType(null);
  };

  const resetProcess = () => {
    setFiles([]);
    setCsvData("");
    setExcelData("");
    setError("");
    setIsProcessing(false);
    setProcessingType(null);
  };

  const showToastMessage = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const processImage = async (type: 'csv' | 'excel') => {
    if (files.length === 0) {
      setError("Please upload an image first");
      showToastMessage("Please upload an image first", "error");
      return;
    }

    const file = files[0];
    
    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file");
      showToastMessage("Please upload a valid image file", "error");
      return;
    }

    setIsProcessing(true);
    setProcessingType(type);
    setError("");

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('format', type);

      const response = await fetch('/api/convert-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      if (type === 'csv') {
        setCsvData(data.csv);
        showToastMessage("CSV conversion completed successfully!", "success");
      } else {
        setExcelData(data.excel);
        showToastMessage("Excel (Busy) conversion completed successfully!", "success");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      showToastMessage(errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCsvProcess = () => processImage('csv');
  const handleExcelProcess = () => processImage('excel');

  const downloadFile = () => {
    const data = csvData || excelData;
    const isExcel = !!excelData;
    
    if (!data) return;

    const blob = new Blob([data], { 
      type: isExcel ? 'application/vnd.ms-excel' : 'text/csv' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted_data_${new Date().toISOString().split('T')[0]}.${isExcel ? 'xlsx' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showToastMessage(`${isExcel ? 'Excel' : 'CSV'} file downloaded successfully!`, "success");
  };

  const copyToClipboard = async () => {
    try {
      const data = csvData || excelData;
      if (!data) return;
      
      await navigator.clipboard.writeText(data);
      showToastMessage(`${csvData ? 'CSV' : 'Excel'} data copied to clipboard!`, "success");
    } catch (err) {
      showToastMessage("Failed to copy to clipboard", "error");
    }
  };

  const hasData = !!(csvData || excelData);
  const hasFiles = files.length > 0;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        <div className="design-container py-4 sm:py-8">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-16"
          >
            <h1 className="text-hero mb-4 sm:mb-6 px-4">
              <span className="gradient-text-primary">Snap</span>Sheet
            </h1>
            <p className="text-body max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Transform images into structured spreadsheets using Gemini AI.
              Convert screenshots, documents, and images to CSV or Excel format for Busy accounting software with 97%+ accuracy.
              Free OCR table converter for GST invoices, receipts, and financial documents.
            </p>
            
            {/* Feature Pills - Mobile Optimized */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
              <div className="glass-feature-card px-3 py-2 sm:px-4 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cursor-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-caption whitespace-nowrap">Image Recognition</span>
              </div>
              <div className="glass-feature-card px-3 py-2 sm:px-4 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cursor-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-caption whitespace-nowrap">CSV & Excel</span>
              </div>
              <div className="glass-feature-card px-3 py-2 sm:px-4 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cursor-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-caption whitespace-nowrap">Fast Processing</span>
              </div>
              <div className="glass-feature-card px-3 py-2 sm:px-4 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cursor-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                <span className="text-caption whitespace-nowrap">Busy Ready</span>
              </div>
            </div>
          </motion.section>

          {/* File Upload Section */}
          {!hasData && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <FileUpload files={files} onChange={handleFileUpload} />
            </motion.section>
          )}

          {/* Processing Buttons - Mobile Optimized */}
          {hasFiles && !hasData && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card mb-6 sm:mb-8 text-center"
            >
              <h3 className="text-h3 mb-4 sm:mb-6">Choose Your Format</h3>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center max-w-md mx-auto">
                {/* CSV Button - Hide when Excel is processing */}
                {!(processingType === 'excel' && isProcessing) && (
                  <motion.button
                    onClick={handleCsvProcess}
                    disabled={isProcessing}
                    className={`btn-green flex items-center justify-center gap-3 flex-1 ${
                      processingType === 'csv' && isProcessing ? 'opacity-80' : ''
                    }`}
                    initial={{ opacity: 1, scale: 1, x: 0 }}
                    animate={{
                      opacity: processingType === 'excel' && isProcessing ? 0 : 1,
                      scale: processingType === 'excel' && isProcessing ? 0.8 : 1,
                      x: processingType === 'excel' && isProcessing ? -20 : 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      x: -20
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {processingType === 'csv' && isProcessing ? (
                      <>
                        <div className="loading-spinner w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full"></div>
                        <span className="text-sm sm:text-base">Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm sm:text-base">Convert to CSV</span>
                      </>
                    )}
                  </motion.button>
                )}
                
                {/* Excel Button - Hide when CSV is processing */}
                {!(processingType === 'csv' && isProcessing) && (
                  <motion.button
                    onClick={handleExcelProcess}
                    disabled={isProcessing}
                    className={`btn-blue flex items-center justify-center gap-3 flex-1 ${
                      processingType === 'excel' && isProcessing ? 'opacity-80' : ''
                    }`}
                    initial={{ opacity: 1, scale: 1, x: 0 }}
                    animate={{
                      opacity: processingType === 'csv' && isProcessing ? 0 : 1,
                      scale: processingType === 'csv' && isProcessing ? 0.8 : 1,
                      x: processingType === 'csv' && isProcessing ? 20 : 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      x: 20
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {processingType === 'excel' && isProcessing ? (
                      <>
                        <div className="loading-spinner w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span className="text-sm sm:text-base">Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm sm:text-base">Convert to Excel (Busy)</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
              
              {isProcessing && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-caption mt-4 px-4"
                >
                  Analyzing your image and extracting data...
                </motion.p>
              )}
            </motion.section>
          )}

          {/* Error Display - Mobile Optimized */}
          {error && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card mb-6 sm:mb-8 text-center border-red-400 border-opacity-30 bg-red-400 bg-opacity-10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-body text-red-300 text-center">{error}</p>
              </div>
            </motion.section>
          )}

          {/* Results Section - Mobile Optimized */}
          {hasData && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Success Message */}
              <div className="glass-card text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-cursor-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-h3">Conversion Complete!</h3>
                </div>
                <p className="text-body mb-6 px-4">
                  Your image has been successfully converted to {csvData ? 'CSV' : 'Excel (Busy)'} format.
                </p>
                
                {/* Action Buttons - Mobile Stack */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
                  <button
                    onClick={downloadFile}
                    className="btn-green flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm sm:text-base">Download File</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm sm:text-base">Copy Data</span>
                  </button>
                  <button
                    onClick={resetProcess}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-sm sm:text-base">Process Another Image</span>
                  </button>
                </div>
              </div>
              
              {/* Data Table */}
              <CSVTable csvData={csvData || excelData} />
            </motion.section>
          )}

          {/* Use Cases Section */}
          {!hasFiles && !hasData && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 sm:mt-16"
            >
              <h2 className="text-h2 text-center mb-8 sm:mb-12 px-4">Perfect for Every Business Need</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-green">GST Invoice Processing</h3>
                  <p className="text-body">Convert GST invoices to Excel format for Busy accounting software. Automatic tax calculation and compliance formatting.</p>
                </div>
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-blue">Bank Statement Conversion</h3>
                  <p className="text-body">Transform bank statement images to CSV for easy reconciliation and financial analysis.</p>
                </div>
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-purple">Receipt & Bill Management</h3>
                  <p className="text-body">Digitize receipts and bills into structured Excel data for expense tracking and reimbursements.</p>
                </div>
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-green">Inventory Lists</h3>
                  <p className="text-body">Convert product catalogs and inventory sheets from images to editable CSV format.</p>
                </div>
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-blue">Financial Reports</h3>
                  <p className="text-body">Extract data from financial statements and reports for analysis and record keeping.</p>
                </div>
                <div className="glass-card text-center">
                  <h3 className="text-h3 mb-3 text-cursor-purple">Data Entry Automation</h3>
                  <p className="text-body">Eliminate manual data entry by converting any tabular image to structured spreadsheet format.</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* Features Section - Mobile Optimized */}
          {!hasFiles && !hasData && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16"
            >
              <h2 className="text-h2 text-center mb-8 sm:mb-12 px-4">Why Choose SnapSheet OCR Table Converter?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="glass-card text-center hover-lift">
                  <div className="w-12 h-12 mx-auto mb-4 bg-cursor-green bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-cursor-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-h3 mb-3">Lightning Fast</h3>
                  <p className="text-body">Process your images in seconds with our optimized OCR table converter engine.</p>
                </div>
                
                <div className="glass-card text-center hover-lift">
                  <div className="w-12 h-12 mx-auto mb-4 bg-cursor-blue bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-cursor-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-h3 mb-3">High Accuracy</h3>
                  <p className="text-body">Advanced technology ensures precise text extraction and data formatting.</p>
                </div>
                
                <div className="glass-card text-center hover-lift sm:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 mx-auto mb-4 bg-cursor-purple bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-cursor-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-h3 mb-3">Multiple Formats</h3>
                  <p className="text-body">Export to CSV or <a href="/busy-excel" className="text-cursor-blue hover:underline">Busy accounting Excel format</a> for seamless integration.</p>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        type={toastType}
      />
    </div>
  );
} 