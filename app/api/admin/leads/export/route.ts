import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";
    const status = searchParams.get("status") || "";
    const service = searchParams.get("service") || "";
    const city = searchParams.get("city") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const supabase = createAdminClient();

    let query = supabase.from("leads").select("*");

    // Apply filters
    if (status) {
      query = query.eq("status", status);
    }

    if (service) {
      query = query.eq("service", service);
    }

    if (city) {
      query = query.eq("city", city);
    }

    if (startDate) {
      query = query.gte("created_at", startDate);
    }

    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: leads, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    if (format === "csv") {
      // Generate CSV
      const csvHeaders = [
        "ID",
        "Name",
        "Email",
        "Phone",
        "City",
        "Service",
        "Status",
        "Message",
        "Source URL",
        "Created At",
        "Updated At",
        "Notes",
      ];

      const csvRows =
        leads?.map((lead) => [
          lead.id,
          lead.name,
          lead.email,
          lead.phone || "",
          lead.city,
          lead.service,
          lead.status,
          (lead.message || "").replace(/"/g, '""'), // Escape quotes
          lead.source_url || "",
          lead.created_at,
          lead.updated_at,
          (lead.notes || "").replace(/"/g, '""'), // Escape quotes
        ]) || [];

      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map((row) =>
          row
            .map((field) =>
              typeof field === "string" &&
              (field.includes(",") ||
                field.includes('"') ||
                field.includes("\n"))
                ? `"${field}"`
                : field,
            )
            .join(","),
        ),
      ].join("\n");

      const filename = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // Return JSON format
    return NextResponse.json({
      success: true,
      data: leads || [],
    });
  } catch (error) {
    console.error("Leads export error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to export leads" },
      { status: 500 },
    );
  }
}
