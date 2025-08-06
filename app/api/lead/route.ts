import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  service?: string;
  city?: string;
  source?: string;
}

// Validation schema
function validateLeadData(data: unknown): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Type guard to ensure data is an object
  if (!data || typeof data !== "object") {
    errors.push("Invalid data format");
    return { isValid: false, errors };
  }

  const leadData = data as Record<string, unknown>;

  // Required fields validation
  if (
    !leadData.name ||
    typeof leadData.name !== "string" ||
    leadData.name.trim().length === 0
  ) {
    errors.push("Name is required and must be a non-empty string");
  }

  if (!leadData.email || typeof leadData.email !== "string") {
    errors.push("Email is required");
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      errors.push("Please provide a valid email address");
    }
  }

  if (
    !leadData.phone ||
    typeof leadData.phone !== "string" ||
    leadData.phone.trim().length === 0
  ) {
    errors.push("Phone number is required");
  } else {
    // Basic phone validation (removes non-digits and checks length)
    const cleanPhone = leadData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errors.push("Please provide a valid phone number");
    }
  }

  // Optional field validation
  if (leadData.message && typeof leadData.message !== "string") {
    errors.push("Message must be a string");
  }

  if (leadData.service && typeof leadData.service !== "string") {
    errors.push("Service must be a string");
  }

  if (leadData.city && typeof leadData.city !== "string") {
    errors.push("City must be a string");
  }

  if (leadData.source && typeof leadData.source !== "string") {
    errors.push("Source must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Service configuration error",
        },
        { status: 503 },
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    const body = await request.json();

    // Validate input data
    const { isValid, errors } = validateLeadData(body);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    // Clean and prepare lead data
    const leadData: LeadData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      message: body.message?.trim() || null,
      service: body.service?.trim() || null,
      city: body.city?.trim() || null,
      source: body.source?.trim() || "website",
    };

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          ...leadData,
          created_at: new Date().toISOString(),
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save lead. Please try again.",
        },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: data[0]?.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission error:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit leads." },
    { status: 405 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit leads." },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit leads." },
    { status: 405 },
  );
}
