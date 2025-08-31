import React, { useState, useEffect } from "react";
import SearchField from "../components/SearchField";
import NewsItem from "../components/NewsItem";
import Pagination from "../components/Pagination";
import { mockNews } from "../data/mockData";
import { Newspaper } from "lucide-react";

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const itemsPerPage = 6;

  useEffect(() => {
    // Filter news based on search query
    const filtered = mockNews.filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Newspaper className="text-orange-500 mr-3" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Latest Pet News
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest news, tips, and stories from the pet
          world.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <SearchField placeholder="Search news..." onSearch={handleSearch} />
      </div>

      {/* Results info */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredNews.length > 0
              ? `Found ${filteredNews.length} article${
                  filteredNews.length !== 1 ? "s" : ""
                } for "${searchQuery}"`
              : `No articles found for "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* News Grid */}
      {currentNews.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentNews.map((news) => (
              <NewsItem key={news.id} news={news} />
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
            <Newspaper size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchQuery ? "No articles found" : "No news available"}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try adjusting your search terms or browse all articles."
              : "Check back later for the latest pet news and updates."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
