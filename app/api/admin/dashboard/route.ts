import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Get total leads count
    const { count: totalLeads } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    // Get recent leads (last 10)
    const { data: recentLeads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (leadsError) throw leadsError;

    // Get total published pages count
    const { count: totalPages } = await supabase
      .from("pages")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // Get lead conversion metrics
    const { data: leadsConversion, error: conversionError } = await supabase
      .from("leads")
      .select("status");

    if (conversionError) throw conversionError;

    const conversionMetrics =
      leadsConversion?.reduce(
        (acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    const conversionRate =
      totalLeads && totalLeads > 0
        ? (((conversionMetrics.converted || 0) / totalLeads) * 100).toFixed(1)
        : "0.0";

    return NextResponse.json({
      success: true,
      data: {
        totalLeads: totalLeads || 0,
        totalPages: totalPages || 0,
        recentLeads: recentLeads || [],
        conversionMetrics,
        conversionRate: parseFloat(conversionRate),
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
