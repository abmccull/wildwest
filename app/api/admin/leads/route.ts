import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { LeadUpdate } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const service = searchParams.get("service") || "";
    const city = searchParams.get("city") || "";

    const supabase = createAdminClient();

    let query = supabase.from("leads").select("*", { count: "exact" });

    // Apply filters
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
      );
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (service) {
      query = query.eq("service", service);
    }

    if (city) {
      query = query.eq("city", city);
    }

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
      data: leads,
      error,
      count,
    } = await query.range(from, to).order("created_at", { ascending: false });

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      success: true,
      data: {
        leads: leads || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Admin leads fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status, notes } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const updateData: LeadUpdate = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const { data, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", leadId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 },
    );
  }
}
