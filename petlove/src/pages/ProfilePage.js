import React, { useState } from "react";
import {
  User,
  Plus,
  Heart,
  Eye,
  Trash2,
  Edit3,
  Phone,
  Mail,
} from "lucide-react";
import NoticesItem from "../components/NoticesItem";
import { useAuth } from "../hooks/AuthContext";
import { mockNotices } from "../data/mockData";

const ProfilePage = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("favorites");
  const [userPets, setUserPets] = useState([
    {
      id: 1,
      name: "Charlie",
      title: "My Golden Retriever",
      species: "Dog",
      sex: "Male",
      birthday: "2020-05-15",
      imgUrl:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
    },
  ]);

  // Mock favorite notices
  const favoriteNotices = mockNotices.filter((notice) => notice.isFavorite);
  const viewedNotices = mockNotices.slice(0, 2); // Mock viewed notices

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setCurrentPage("home");
    }
  };

  const handleRemovePet = (petId) => {
    if (window.confirm("Are you sure you want to remove this pet?")) {
      setUserPets((prev) => prev.filter((pet) => pet.id !== petId));
    }
  };

  const handleRemoveFromFavorites = (noticeId) => {
    // This would normally update the backend
    console.log(`Remove notice ${noticeId} from favorites`);
  };

  const handleEditProfile = () => {
    alert("Edit profile modal would open here");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please login to view your profile
        </h2>
        <button
          onClick={() => setCurrentPage("login")}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* User Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            {/* User Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-orange-100"
                />
                <button
                  onClick={handleEditProfile}
                  className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md"
                  title="Edit profile"
                >
                  <Edit3 size={16} />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {user.name}
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center justify-center space-x-2">
                    <Phone size={16} />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* My Pets Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">My Pets</h3>
                <button
                  onClick={() => setCurrentPage("add-pet")}
                  className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Add new pet"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {userPets.length > 0 ? (
                  userPets.map((pet) => (
                    <div
                      key={pet.id}
                      className="bg-gray-50 rounded-lg p-3 group"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={pet.imgUrl}
                          alt={pet.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {pet.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {pet.species} • {pet.sex}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemovePet(pet.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                          title="Remove pet"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No pets added yet
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage("add-pet")}
                className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus size={18} />
                <span>Add Pet</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-red-500 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "favorites"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Heart size={16} />
                    <span>My Favorite Pets ({favoriteNotices.length})</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("viewed")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "viewed"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Recently Viewed ({viewedNotices.length})</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "favorites" && (
                <div>
                  {favoriteNotices.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {favoriteNotices.map((notice) => (
                        <NoticesItem
                          key={notice.id}
                          notice={notice}
                          onFavoriteToggle={() => {}}
                          showTrash={true}
                          onRemove={handleRemoveFromFavorites}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="text-gray-400 mx-auto mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        No favorite pets yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start exploring and add pets to your favorites!
                      </p>
                      <button
                        onClick={() => setCurrentPage("notices")}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Browse Pets
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "viewed" && (
                <div>
                  {viewedNotices.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {viewedNotices.map((notice) => (
                        <NoticesItem
                          key={notice.id}
                          notice={notice}
                          onFavoriteToggle={() => {}}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Eye className="text-gray-400 mx-auto mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        No recently viewed pets
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Pets you view will appear here for easy access.
                      </p>
                      <button
                        onClick={() => setCurrentPage("notices")}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Start Browsing
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
