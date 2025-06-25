import type { Metadata } from 'next'
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"

export const metadata: Metadata = {
  title: 'SnapSheet API Documentation - OCR API for Developers',
  description: 'Complete API documentation for SnapSheet OCR service. Learn how to integrate image to CSV and Excel conversion into your applications with our REST API.',
  keywords: ['SnapSheet API', 'OCR API', 'REST API documentation', 'image to CSV API', 'OCR integration', 'developer API'],
  openGraph: {
    title: 'SnapSheet API Documentation - OCR API for Developers',
    description: 'Complete API documentation for SnapSheet OCR service. Integrate image to CSV and Excel conversion into your applications.',
    url: 'https://snapsheet.heyadrsh.tech/api-docs',
  },
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16 sm:pt-20">
        <div className="design-container py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-h1 mb-6">
              <span className="gradient-text-primary">SnapSheet</span> API Documentation
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Integrate powerful OCR capabilities into your applications with our simple REST API. 
              Convert images to structured CSV and Excel data programmatically.
            </p>
          </div>

          {/* API Overview */}
          <div className="glass-card mb-8">
            <h2 className="text-h2 mb-4">API Overview</h2>
            <p className="text-body mb-4">
              The SnapSheet API provides a single endpoint for converting images to structured data formats. 
              Our API is built on Google's Gemini 2.5 Flash model for high-accuracy OCR processing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2 text-cursor-green">97%+ Accuracy</h3>
                <p className="text-caption">Industry-leading OCR accuracy</p>
              </div>
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2 text-cursor-blue">30s Timeout</h3>
                <p className="text-caption">Fast processing with timeout protection</p>
              </div>
              <div className="glass-feature-card text-center">
                <h3 className="text-h3 mb-2 text-cursor-purple">10MB Limit</h3>
                <p className="text-caption">Support for large document images</p>
              </div>
            </div>
          </div>

          {/* Endpoint Documentation */}
          <div className="glass-card mb-8">
            <h2 className="text-h2 mb-4">Convert Image Endpoint</h2>
            <div className="code-block mb-4">
              <code>POST /api/convert-image</code>
            </div>
            
            <h3 className="text-h3 mb-3">Request Parameters</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 p-3 text-left">Parameter</th>
                    <th className="border border-gray-300 p-3 text-left">Type</th>
                    <th className="border border-gray-300 p-3 text-left">Required</th>
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>image</code></td>
                    <td className="border border-gray-300 p-3">File</td>
                    <td className="border border-gray-300 p-3">Yes</td>
                    <td className="border border-gray-300 p-3">Image file (JPEG, PNG, GIF, BMP, WebP)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>format</code></td>
                    <td className="border border-gray-300 p-3">String</td>
                    <td className="border border-gray-300 p-3">Yes</td>
                    <td className="border border-gray-300 p-3">"csv" or "excel" for output format</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-h3 mb-3">Response Format</h3>
            <div className="code-block mb-4">
              <pre>{`{
  "csv": "Name,Age,City\\nJohn,25,New York\\nJane,30,London",
  "message": "CSV conversion completed successfully"
}

// OR for Excel format

{
  "excel": "Date,Bill No,Particulars,Amount\\n01/01/2024,INV001,Services,1000",
  "message": "Excel (Busy) conversion completed successfully"
}`}</pre>
            </div>
          </div>

          {/* Code Examples */}
          <div className="glass-card mb-8">
            <h2 className="text-h2 mb-4">Code Examples</h2>
            
            <h3 className="text-h3 mb-3">JavaScript/Node.js</h3>
            <div className="code-block mb-6">
              <pre>{`const formData = new FormData();
formData.append('image', imageFile);
formData.append('format', 'csv');

const response = await fetch('/api/convert-image', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log(data.csv);`}</pre>
            </div>

            <h3 className="text-h3 mb-3">Python</h3>
            <div className="code-block mb-6">
              <pre>{`import requests

files = {'image': open('document.jpg', 'rb')}
data = {'format': 'csv'}

response = requests.post(
    'https://snapsheet.heyadrsh.tech/api/convert-image',
    files=files,
    data=data
)

result = response.json()
print(result['csv'])`}</pre>
            </div>

            <h3 className="text-h3 mb-3">cURL</h3>
            <div className="code-block">
              <pre>{`curl -X POST https://snapsheet.heyadrsh.tech/api/convert-image \\
  -F "image=@document.jpg" \\
  -F "format=csv"`}</pre>
            </div>
          </div>

          {/* Error Handling */}
          <div className="glass-card">
            <h2 className="text-h2 mb-4">Error Handling</h2>
            <p className="text-body mb-4">
              The API returns appropriate HTTP status codes and error messages for different scenarios:
            </p>
            <div className="space-y-4">
              <div className="glass-feature-card">
                <h3 className="text-h3 mb-2">400 Bad Request</h3>
                <p className="text-body">Invalid file type, missing parameters, or file too large</p>
              </div>
              <div className="glass-feature-card">
                <h3 className="text-h3 mb-2">408 Request Timeout</h3>
                <p className="text-body">Processing took longer than 30 seconds</p>
              </div>
              <div className="glass-feature-card">
                <h3 className="text-h3 mb-2">422 Unprocessable Entity</h3>
                <p className="text-body">No readable data found in the image</p>
              </div>
              <div className="glass-feature-card">
                <h3 className="text-h3 mb-2">429 Too Many Requests</h3>
                <p className="text-body">Rate limit exceeded, please try again later</p>
              </div>
              <div className="glass-feature-card">
                <h3 className="text-h3 mb-2">500 Internal Server Error</h3>
                <p className="text-body">Unexpected server error occurred</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
