"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardData {
  totalLeads: number;
  totalPages: number;
  recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    city: string;
    service: string;
    status: string;
    created_at: string;
    message?: string | null;
  }>;
  conversionMetrics: Record<string, number>;
  conversionRate: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string;
  service: string;
  status: string;
  created_at: string;
  message?: string | null;
}

const BUSINESS_INFO = {
  phone: "(801) 555-0123",
  email: "admin@wildwestconstruction.com",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const SERVICE_DISPLAY_NAMES: Record<string, string> = {
  flooring: "Flooring",
  demolition: "Demolition",
  junk_removal: "Junk Removal",
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportLeads = async () => {
    try {
      setExporting(true);
      const response = await fetch("/api/admin/leads/export?format=csv");

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      alert("Failed to export leads");
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Wild West Construction
              </h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Business Phone: {BUSINESS_INFO.phone}</p>
              <p>Business Email: {BUSINESS_INFO.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/leads"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
            >
              Manage Leads
            </Link>
          </nav>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total Leads
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {data.totalLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Published Pages
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {data.totalPages}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conversion Rate
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {data.conversionRate}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              New Leads
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {data.conversionMetrics.new || 0}
            </p>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Lead Status Distribution
            </h3>
            <button
              onClick={handleExportLeads}
              disabled={exporting}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {exporting ? "Exporting..." : "Export to CSV"}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(data.conversionMetrics).map(([status, count]) => (
              <div
                key={status}
                className="text-center p-3 rounded-lg bg-gray-50"
              >
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600 capitalize">{status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Leads
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.recentLeads.map((lead: Lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-600">
                          {lead.phone || "No phone"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{lead.city}</p>
                        <p className="text-sm text-gray-600">
                          {SERVICE_DISPLAY_NAMES[lead.service] || lead.service}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {capitalizeStatus(lead.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      <div className="truncate" title={lead.message || ""}>
                        {lead.message || "No message"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.recentLeads.length === 0 && (
            <div className="text-center py-8 text-gray-500">No leads found</div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <Link
            href="/admin/leads"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Leads
          </Link>
        </div>
      </div>
    </div>
  );
}
