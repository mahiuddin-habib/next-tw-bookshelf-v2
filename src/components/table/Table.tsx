'use client';
import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaSortDown, FaSortUp } from 'react-icons/fa6';
type IColumn<T> = {
  key: string;
  label: string;
  render?: (_item: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: IColumn<T>[];
  data: T[];
  itemsPerPageOptions?: number[];
  showSl?: boolean;
};

// Table component
const Table = <T extends Record<string, any>>({
  columns,
  data,
  itemsPerPageOptions = [5, 10, 15],
  showSl = false,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle sorting
  const handleSort = (key: any) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col text-gray-200">
      <div className="flex-grow rounded-t-lg bg-gray-800">
        <table className="w-full overflow-hidden rounded-lg">
          <thead>
            <tr className="border-b border-gray-600">
              {showSl && <th className="px-4 py-4">#</th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="group cursor-pointer px-4 py-4 text-left"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key === col.key ? (
                    sortConfig.direction === 'ascending' ? (
                      <FaSortUp className="ml-2 inline-block" />
                    ) : (
                      <FaSortDown className="ml-2 inline-block" />
                    )
                  ) : (
                    <FaSortUp className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-50" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-600">
                {showSl && (
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between rounded-b-lg border-t border-gray-600 bg-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded bg-gray-700 px-2 py-1 text-white outline-none"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span>
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of{' '}
            {data.length}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded px-3 py-1 ${
              currentPage === 1 ? 'text-gray-500' : 'text-white'
            }`}
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded px-3 py-1 ${
              currentPage === totalPages ? 'text-gray-500' : 'text-white'
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
