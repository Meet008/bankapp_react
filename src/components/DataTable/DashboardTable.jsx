// components/DataTable/DashboardTable.jsx
import React, { useState, useMemo } from "react";

export default function DashboardTable({ columns, data, rowsPerPage = 5 }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) =>
        row[col.accessor]
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [data, columns, search]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="p-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(col.accessor)}
                >
                  {col.header}{" "}
                  {sortConfig.key === col.accessor
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
