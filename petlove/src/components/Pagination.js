import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className={`flex justify-center items-center space-x-2 mt-8 ${className}`}
    >
      {/* First page button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-white transition-colors"
        title="First page"
      >
        <ChevronLeft size={16} />
        <ChevronLeft size={16} className="-ml-2" />
      </button>

      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-white transition-colors"
        title="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-2 rounded-lg border transition-all duration-200 min-w-[40px] ${
            page === currentPage
              ? "bg-orange-500 text-white border-orange-500 shadow-md"
              : page === "..."
              ? "cursor-default border-gray-300 text-gray-400"
              : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
          title={typeof page === "number" ? `Page ${page}` : ""}
        >
          {page}
        </button>
      ))}

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-white transition-colors"
        title="Next page"
      >
        <ChevronRight size={16} />
      </button>

      {/* Last page button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-white transition-colors"
        title="Last page"
      >
        <ChevronRight size={16} />
        <ChevronRight size={16} className="-ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
