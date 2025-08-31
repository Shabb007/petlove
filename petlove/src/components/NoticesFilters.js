import React, { useState } from "react";
import { RotateCcw, Filter } from "lucide-react";
import SearchField from "./SearchField";
import {
  categories,
  sexOptions,
  speciesOptions,
  cities,
} from "../data/mockData";

const NoticesFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sex: "",
    species: "",
    location: "",
    sortBy: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const sortOptions = [
    { value: "popular", label: "Popular" },
    { value: "price", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: "",
      category: "",
      sex: "",
      species: "",
      location: "",
      sortBy: "",
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Header with toggle button for mobile */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="text-orange-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">
            Filter Notices
          </h3>
          {hasActiveFilters && (
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Filter
            size={20}
            className={`transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filters content */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
        {/* Search field */}
        <div className="mb-4">
          <SearchField
            placeholder="Search notices..."
            onSearch={(query) => handleFilterChange("search", query)}
            className="w-full"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "sell"
                    ? "For Sale"
                    : cat === "lost-found"
                    ? "Lost & Found"
                    : cat === "in-good-hands"
                    ? "Free to Good Home"
                    : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={filters.sex}
              onChange={(e) => handleFilterChange("sex", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">All Genders</option>
              {sexOptions.map((sex) => (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Species
            </label>
            <select
              value={filters.species}
              onChange={(e) => handleFilterChange("species", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">All Species</option>
              {speciesOptions.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">All Locations</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex flex-wrap gap-3">
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticesFilters;
