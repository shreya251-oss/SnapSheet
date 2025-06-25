import { NextRequest, NextResponse } from 'next/server';

// Configuration constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp'
];

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const format = formData.get('format') as string || 'csv';
    
    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided. Please upload an image.' }, 
        { status: 400 }
      );
    }

    // File type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, BMP, WebP).' },
        { status: 400 }
      );
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    // Format validation
    if (!['csv', 'excel'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Please specify either "csv" or "excel".' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    const isExcel = format === 'excel';
    
    // Enhanced prompts for better OCR results
    const prompt = isExcel ? 
      `You are a professional OCR and data extraction specialist specializing in Indian accounting software integration. Your task is to analyze the provided image and extract all text/data content, then convert it into a clean, well-structured Excel-compatible format optimized for Busy accounting software.

CRITICAL INSTRUCTIONS:
1. Carefully examine the image to identify all text, numbers, tables, forms, or structured data
2. Extract ALL visible text content, preserving relationships and hierarchical structure
3. Convert the extracted data into Excel-compatible CSV format with proper accounting structure
4. Use Indian accounting-specific column headers when applicable:
   - For Invoices/Bills: Date, Bill No, Particulars, Account Name, Amount, GST Rate, GST Amount, Total Amount
   - For Receipts: Date, Receipt No, Account Name, Particulars, Amount, Payment Mode
   - For Inventory: Item Code, Item Name, Quantity, Unit, Rate, Amount, GST Rate
   - For Ledger entries: Date, Particulars, Debit, Credit, Balance
5. Handle Indian currency formatting (₹ symbols, lakhs, crores notation)
6. Use proper date formats (DD/MM/YYYY or DD-MM-YYYY)
7. Format amounts as numbers without currency symbols in data cells
8. Include proper headers that match Busy software import requirements
9. If GST information is present, extract GST numbers, rates, and amounts separately
10. Ensure data is ready for direct import into Busy accounting software

For Busy Software Compatibility:
- Use standard Indian accounting field names
- Ensure numerical values are properly formatted
- Include all tax-related information in separate columns
- Maintain proper account classification (Assets, Liabilities, Income, Expenses)
- Handle multi-currency if present

RETURN ONLY THE CSV DATA - no explanations, no markdown formatting, just pure CSV that can be directly imported into Busy software.` 
      
      :
      
      `You are a professional OCR and data extraction specialist. Your task is to analyze the provided image and extract all text/data content, then convert it into a clean, well-structured CSV format suitable for data analysis and processing.

CRITICAL INSTRUCTIONS:
1. Carefully examine the image to identify all text, numbers, tables, forms, or structured data
2. Extract ALL visible text content, preserving relationships and logical structure
3. Convert the extracted data into a properly formatted CSV with clear column headers
4. If the image contains a table, preserve the exact table structure in CSV format
5. If the image contains forms or lists, organize them logically into appropriate CSV columns
6. Use descriptive column headers that clearly represent the data content
7. Ensure proper CSV formatting with commas as delimiters and quotes for text containing commas
8. Handle special characters and escape them properly for CSV compatibility
9. If there are multiple sections of data, organize them coherently with clear structure
10. For empty cells, use consistent representation (leave blank or use consistent placeholder)

Data Type Handling:
- Numbers: Extract as clean numerical values without formatting symbols
- Dates: Standardize to a consistent format (YYYY-MM-DD or DD/MM/YYYY)
- Text: Clean and normalize while preserving meaning
- Currency: Extract numerical values, note currency type in separate column if mixed
- Boolean values: Use consistent TRUE/FALSE or Yes/No format

For Different Content Types:
- Tables: Maintain exact row/column structure with proper headers
- Forms: Create columns for field names and corresponding values
- Lists: Organize into logical columns (Item, Description, Value, etc.)
- Mixed content: Structure logically with clear, descriptive headers
- Receipts/Invoices: Use columns like Date, Description, Quantity, Unit Price, Total, etc.
- Documents: Extract key information into relevant categorical columns

Quality Assurance:
- Ensure all visible text is captured
- Maintain data relationships and context
- Use consistent formatting throughout
- Verify column headers are descriptive and appropriate

RETURN ONLY THE CSV DATA - no explanations, no markdown formatting, no backticks, just pure CSV content that can be directly saved as a .csv file.`;

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' }, 
        { status: 500 }
      );
    }

    // Prepare Gemini API payload
    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: file.type,
                data: base64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 8192,
        topP: 0.8,
        topK: 40,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    };

    // Call Gemini API with timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Service is temporarily busy. Please try again in a moment.' },
            { status: 429 }
          );
        }
        
        return NextResponse.json(
          { error: 'Failed to process image. Please try again or contact support if the problem persists.' },
          { status: 500 }
        );
      }

      const data = await response.json();
      
      // Validate response structure
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!content) {
        console.error('Empty response from Gemini API:', data);
        return NextResponse.json(
          { error: 'No data could be extracted from the image. Please ensure the image contains readable text or data.' },
          { status: 422 }
        );
      }

      // Clean the response content
      const cleanedContent = content
        .replace(/```csv\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/^\n+|\n+$/g, '')
        .trim();

      if (!cleanedContent) {
        return NextResponse.json(
          { error: 'No readable data found in the image. Please try with a clearer image.' },
          { status: 422 }
        );
      }

      // Return appropriate response based on format
      if (isExcel) {
        return NextResponse.json({ 
          excel: cleanedContent,
          message: 'Excel (Busy) format conversion completed successfully'
        });
      } else {
        return NextResponse.json({ 
          csv: cleanedContent,
          message: 'CSV conversion completed successfully'
        });
      }

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try with a smaller image or try again.' },
          { status: 408 }
        );
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('Error processing image:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Failed to parse')) {
        return NextResponse.json(
          { error: 'Invalid request format. Please ensure you are uploading a valid image file.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your image. Please try again.' },
      { status: 500 }
    );
  }
} 