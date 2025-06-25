import type { Metadata } from 'next'
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { StructuredData, faqSchema } from "@/components/seo/structured-data"

export const metadata: Metadata = {
  title: 'Busy Accounting Excel Import - Convert Images to Busy-Ready Excel | SnapSheet',
  description: 'Learn how to convert images and documents to Busy accounting software compatible Excel format. Complete guide for GST invoice processing and data import.',
  keywords: ['Busy accounting Excel import', 'GST invoice OCR', 'Busy software CSV', 'accounting data extraction', 'invoice to Excel converter'],
  openGraph: {
    title: 'Busy Accounting Excel Import - Convert Images to Busy-Ready Excel',
    description: 'Convert images and documents to Busy accounting software compatible Excel format with SnapSheet.',
    url: 'https://snapsheet.heyadrsh.tech/busy-excel',
  },
}

export default function BusyExcelPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <StructuredData data={faqSchema} />
      
      <main className="pt-16 sm:pt-20">
        <div className="design-container py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-h1 mb-6">
              <span className="gradient-text-primary">Busy</span> Excel Integration
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Convert your invoices, receipts, and financial documents to Busy accounting software compatible Excel format. 
              Streamline your GST compliance and data entry with AI-powered OCR.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cursor-green bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cursor-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-h3 mb-3">GST Compliance</h3>
              <p className="text-body">Automatic GST number extraction and rate calculation for Indian tax compliance.</p>
            </div>
            
            <div className="glass-card text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cursor-blue bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cursor-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-h3 mb-3">Currency Formatting</h3>
              <p className="text-body">Proper Indian currency formatting with lakhs and crores notation support.</p>
            </div>
            
            <div className="glass-card text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cursor-purple bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cursor-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-h3 mb-3">Direct Import</h3>
              <p className="text-body">Excel format optimized for direct import into Busy accounting software.</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="glass-card mb-12">
            <h2 className="text-h2 mb-6">How to Convert Images for Busy Software</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-h3 mb-4">Step 1: Upload Your Document</h3>
                <p className="text-body mb-4">
                  Upload any image containing financial data - invoices, receipts, bank statements, or expense reports. 
                  SnapSheet supports all major image formats up to 10MB.
                </p>
                <ul className="text-body space-y-2">
                  <li>• GST invoices and bills</li>
                  <li>• Purchase receipts</li>
                  <li>• Bank statements</li>
                  <li>• Expense vouchers</li>
                  <li>• Inventory lists</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h3 mb-4">Step 2: Select Busy Excel Format</h3>
                <p className="text-body mb-4">
                  Choose "Convert to Excel (Busy)" option to get data formatted specifically for Busy accounting software 
                  with proper column headers and Indian accounting standards.
                </p>
                <div className="glass-feature-card">
                  <h4 className="text-h3 mb-2">Busy-Optimized Columns:</h4>
                  <p className="text-caption">Date, Bill No, Particulars, Account Name, Amount, GST Rate, GST Amount, Total Amount</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Document Types */}
          <div className="glass-card mb-12">
            <h2 className="text-h2 mb-6">Supported Document Types for Busy Import</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2">Sales Invoices</h3>
                <p className="text-caption">Extract customer details, items, GST rates, and totals</p>
              </div>
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2">Purchase Bills</h3>
                <p className="text-caption">Vendor information, purchase details, and tax calculations</p>
              </div>
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2">Expense Receipts</h3>
                <p className="text-caption">Expense categories, amounts, and reimbursement data</p>
              </div>
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2">Bank Statements</h3>
                <p className="text-caption">Transaction details, dates, and account reconciliation</p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="glass-card mb-12">
            <h2 className="text-h2 mb-6">Best Practices for Busy Excel Import</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-h3 mb-3">Image Quality Tips</h3>
                <ul className="text-body space-y-2">
                  <li>• Ensure good lighting and clear text visibility</li>
                  <li>• Avoid shadows and reflections on the document</li>
                  <li>• Keep the document flat and properly aligned</li>
                  <li>• Use high resolution (at least 300 DPI) for scanned documents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h3 mb-3">Data Accuracy</h3>
                <ul className="text-body space-y-2">
                  <li>• Review extracted data before importing to Busy</li>
                  <li>• Verify GST numbers and tax calculations</li>
                  <li>• Check date formats (DD/MM/YYYY or DD-MM-YYYY)</li>
                  <li>• Ensure account names match your Busy chart of accounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass-card">
            <h2 className="text-h2 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-h3 mb-2">Can I import the Excel file directly into Busy?</h3>
                <p className="text-body">Yes, the Excel format is specifically optimized for Busy accounting software with proper column headers and data formatting that matches Busy's import requirements.</p>
              </div>
              <div>
                <h3 className="text-h3 mb-2">Does SnapSheet handle GST calculations automatically?</h3>
                <p className="text-body">Yes, SnapSheet automatically extracts GST numbers, rates, and amounts from invoices and formats them according to Indian GST compliance requirements.</p>
              </div>
              <div>
                <h3 className="text-h3 mb-2">What if my document has multiple tables?</h3>
                <p className="text-body">SnapSheet intelligently identifies and extracts data from multiple tables, organizing them into a coherent Excel format suitable for Busy import.</p>
              </div>
              <div>
                <h3 className="text-h3 mb-2">Is there a limit on document size?</h3>
                <p className="text-body">You can upload images up to 10MB in size. For larger documents, consider splitting them into smaller sections or reducing the image resolution while maintaining readability.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
