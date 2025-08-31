import React, { useState, useEffect } from "react";
import NoticesFilters from "../components/NoticesFilters";
import NoticesItem from "../components/NoticesItem";
import Pagination from "../components/Pagination";
import { mockNotices } from "../data/mockData";
import { PawPrint } from "lucide-react";

const NoticesPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sex: "",
    species: "",
    location: "",
    sortBy: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNotices, setFilteredNotices] = useState(mockNotices);
  const [notices, setNotices] = useState(mockNotices);
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = notices.filter((notice) => {
      const matchesSearch =
        !filters.search ||
        notice.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        notice.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        notice.comment.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category || notice.category === filters.category;
      const matchesSex = !filters.sex || notice.sex === filters.sex;
      const matchesSpecies =
        !filters.species || notice.species === filters.species;
      const matchesLocation =
        !filters.location || notice.location === filters.location;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSex &&
        matchesSpecies &&
        matchesLocation
      );
    });

    // Apply sorting
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case "popular":
            return b.popularity - a.popularity;
          case "price":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "newest":
            return new Date(b.birthday) - new Date(a.birthday);
          default:
            return 0;
        }
      });
    }

    setFilteredNotices(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, notices]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoriteToggle = (noticeId) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.id === noticeId
          ? { ...notice, isFavorite: !notice.isFavorite }
          : notice
      )
    );
  };

  const handleLearnMore = (notice) => {
    // Mock modal functionality
    alert(
      `Learning more about ${notice.name}!\n\nThis would open a detailed modal with:\n- Full description\n- Contact information\n- Additional photos\n- Adoption process details`
    );
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <PawPrint className="text-orange-500 mr-3" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Pet Notices
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find your perfect companion from our collection of loving pets looking
          for homes.
        </p>
      </div>

      {/* Filters */}
      <NoticesFilters onFiltersChange={handleFiltersChange} />

      {/* Results info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <p className="text-gray-600">
            {filteredNotices.length > 0
              ? `Showing ${currentNotices.length} of ${
                  filteredNotices.length
                } pet${filteredNotices.length !== 1 ? "s" : ""}`
              : "No pets found matching your criteria"}
          </p>
          {hasActiveFilters && (
            <p className="text-sm text-orange-600">
              Filters are active -{" "}
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    sex: "",
                    species: "",
                    location: "",
                    sortBy: "",
                  })
                }
                className="underline hover:no-underline"
              >
                clear all filters
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Notices Grid */}
      {currentNotices.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentNotices.map((notice) => (
              <NoticesItem
                key={notice.id}
                notice={notice}
                onFavoriteToggle={handleFavoriteToggle}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <PawPrint size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No pets found
          </h3>
          <p className="text-gray-500 mb-4">
            {hasActiveFilters
              ? "Try adjusting your filters to see more results."
              : "Check back later for new pet listings."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  category: "",
                  sex: "",
                  species: "",
                  location: "",
                  sortBy: "",
                })
              }
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticesPage;
