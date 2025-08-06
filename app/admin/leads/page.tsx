"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string;
  service: string;
  status: string;
  message: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  notes: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface LeadsData {
  leads: Lead[];
  pagination: PaginationInfo;
}

const BUSINESS_INFO = {
  phone: "(801) 555-0123",
  email: "admin@wildwestconstruction.com",
};

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

const SERVICE_OPTIONS = [
  { value: "", label: "All Services" },
  { value: "flooring", label: "Flooring" },
  { value: "demolition", label: "Demolition" },
  { value: "junk_removal", label: "Junk Removal" },
];

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

export default function LeadsManagement() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(serviceFilter && { service: serviceFilter }),
        ...(cityFilter && { city: cityFilter }),
      });

      const response = await fetch(`/api/admin/leads?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, serviceFilter, cityFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeads();
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchLeads();
  };

  const handleUpdateLead = async (
    leadId: string,
    updates: { status?: string; notes?: string },
  ) => {
    try {
      setUpdating(true);
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          ...updates,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Refresh leads data
      await fetchLeads();
      setEditingLead(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update lead");
    } finally {
      setUpdating(false);
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

  const getUniqueValues = (field: keyof Lead): string[] => {
    if (!data?.leads) return [];
    return Array.from(
      new Set(
        data.leads
          .map((lead) => lead[field])
          .filter((val): val is string => val !== null && val !== undefined),
      ),
    ).sort();
  };

  const uniqueCities = getUniqueValues("city");

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-600">Leads Management</p>
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
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/leads"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
            >
              Manage Leads
            </Link>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, email, or phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          {data && (
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Showing {data.leads.length} of {data.pagination.total} leads
              </span>
              <span>
                Page {data.pagination.page} of {data.pagination.totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading && (
            <div className="p-4 text-center text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              Loading...
            </div>
          )}

          {data && data.leads.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location & Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {lead.name}
                          </p>
                          <p className="text-sm text-blue-600">
                            <a href={`mailto:${lead.email}`}>{lead.email}</a>
                          </p>
                          <p className="text-sm text-blue-600">
                            {lead.phone ? (
                              <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                            ) : (
                              "No phone"
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900">{lead.city}</p>
                          <p className="text-sm text-gray-600">
                            {SERVICE_DISPLAY_NAMES[lead.service] ||
                              lead.service}
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
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="truncate" title={lead.message || ""}>
                          {lead.message || "No message"}
                        </div>
                        {lead.notes && (
                          <div
                            className="text-xs text-gray-500 mt-1 truncate"
                            title={lead.notes}
                          >
                            Note: {lead.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        {lead.source_url && (
                          <a
                            href={lead.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-900"
                          >
                            Source
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data && data.leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No leads found matching your criteria
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!data.pagination.hasPrev}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!data.pagination.hasNext}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Lead: {editingLead.name}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUpdateLead(editingLead.id, {
                    status: formData.get("status") as string,
                    notes: formData.get("notes") as string,
                  });
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingLead.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.slice(1).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    defaultValue={editingLead.notes || ""}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add notes about this lead..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingLead(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
