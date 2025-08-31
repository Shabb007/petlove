import React from "react";
import {
  Heart,
  Star,
  Trash2,
  MapPin,
  Calendar,
  User2,
  PawPrint,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";

const NoticesItem = ({
  notice,
  onFavoriteToggle,
  showTrash = false,
  onRemove,
  onLearnMore,
}) => {
  const { user } = useAuth();

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Please login or register to add favorites");
      return;
    }
    onFavoriteToggle(notice.id);
  };

  const handleLearnMore = () => {
    if (!user) {
      alert("Please login or register to view details");
      return;
    }
    if (onLearnMore) {
      onLearnMore(notice);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "sell":
        return "bg-green-500";
      case "lost-found":
        return "bg-red-500";
      case "in-good-hands":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case "sell":
        return "For Sale";
      case "lost-found":
        return "Lost & Found";
      case "in-good-hands":
        return "Free to Good Home";
      default:
        return category;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={notice.image}
          alt={notice.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all duration-200 ${
              notice.isFavorite
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
            } hover:scale-110`}
            title={
              notice.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart size={16} fill={notice.isFavorite ? "white" : "none"} />
          </button>

          {showTrash && (
            <button
              onClick={() => onRemove(notice.id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-lg"
              title="Remove from favorites"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Category badge */}
        <div
          className={`absolute top-3 left-3 ${getCategoryColor(
            notice.category
          )} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
        >
          {getCategoryText(notice.category)}
        </div>

        {/* Popularity badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-sm">
          <Star className="text-yellow-400 fill-current" size={14} />
          <span>{notice.popularity}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
            {notice.title}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <PawPrint size={16} className="text-orange-500 flex-shrink-0" />
            <span>
              <strong>Name:</strong> {notice.name}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-orange-500 flex-shrink-0" />
            <span>
              <strong>Birthday:</strong> {formatDate(notice.birthday)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <User2 size={16} className="text-orange-500 flex-shrink-0" />
            <span>
              <strong>Sex:</strong> {notice.sex}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <PawPrint size={16} className="text-orange-500 flex-shrink-0" />
            <span>
              <strong>Species:</strong> {notice.species}
            </span>
          </div>

          {notice.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-orange-500 flex-shrink-0" />
              <span>
                <strong>Location:</strong> {notice.location}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">
          {notice.comment}
        </p>

        {notice.price > 0 && (
          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${notice.price}
            </span>
          </div>
        )}

        <button
          onClick={handleLearnMore}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium hover:shadow-md"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default NoticesItem;
