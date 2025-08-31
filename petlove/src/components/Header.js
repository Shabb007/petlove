import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import "../styles/Header.css";

const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentPage("home");
    setIsMenuOpen(false);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo("home")}
            className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
          >
            🐾 PetLove
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => navigateTo("news")}
              className={`text-gray-700 hover:text-orange-500 transition-colors ${
                currentPage === "news" ? "text-orange-500 font-medium" : ""
              }`}
            >
              News
            </button>
            <button
              onClick={() => navigateTo("notices")}
              className={`text-gray-700 hover:text-orange-500 transition-colors ${
                currentPage === "notices" ? "text-orange-500 font-medium" : ""
              }`}
            >
              Notices
            </button>
            <button
              onClick={() => navigateTo("friends")}
              className={`text-gray-700 hover:text-orange-500 transition-colors ${
                currentPage === "friends" ? "text-orange-500 font-medium" : ""
              }`}
            >
              Our friends
            </button>
          </nav>

          {/* Auth Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigateTo("profile")}
                  className="flex items-center space-x-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <button
                  onClick={() => navigateTo("login")}
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo("register")}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 mt-4">
              <button
                onClick={() => navigateTo("news")}
                className={`text-left text-gray-700 hover:text-orange-500 py-2 transition-colors ${
                  currentPage === "news" ? "text-orange-500 font-medium" : ""
                }`}
              >
                News
              </button>
              <button
                onClick={() => navigateTo("notices")}
                className={`text-left text-gray-700 hover:text-orange-500 py-2 transition-colors ${
                  currentPage === "notices" ? "text-orange-500 font-medium" : ""
                }`}
              >
                Notices
              </button>
              <button
                onClick={() => navigateTo("friends")}
                className={`text-left text-gray-700 hover:text-orange-500 py-2 transition-colors ${
                  currentPage === "friends" ? "text-orange-500 font-medium" : ""
                }`}
              >
                Our friends
              </button>

              {user ? (
                <div className="pt-3 border-t">
                  <button
                    onClick={() => navigateTo("profile")}
                    className="flex items-center space-x-2 mb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors w-full"
                  >
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{user.name}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:text-red-600 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t space-y-2">
                  <button
                    onClick={() => navigateTo("login")}
                    className="block w-full text-left text-orange-500 hover:text-orange-600 py-2 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigateTo("register")}
                    className="block w-full text-left bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
