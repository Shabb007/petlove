import React, { useState } from "react";
import { ArrowLeft, Upload, Calendar, User2, PawPrint } from "lucide-react";
import PetBlock from "../components/PetBlock";
import { useAuth } from "../hooks/AuthContext";
import { speciesOptions } from "../data/mockData";

const AddPetPage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    imgUrl: "",
    species: "",
    birthday: "",
    sex: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Pet name is required";
    }

    // Image URL validation
    const urlPattern = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i;
    if (!formData.imgUrl) {
      newErrors.imgUrl = "Photo URL is required";
    } else if (!urlPattern.test(formData.imgUrl)) {
      newErrors.imgUrl =
        "Please enter a valid image URL (png, jpg, jpeg, gif, bmp, webp)";
    }

    // Species validation
    if (!formData.species) {
      newErrors.species = "Species is required";
    }

    // Birthday validation
    const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else if (!birthdayPattern.test(formData.birthday)) {
      newErrors.birthday = "Please enter a valid date";
    } else {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthday = "Birthday cannot be in the future";
      }
    }

    // Sex validation
    if (!formData.sex) {
      newErrors.sex = "Sex is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful pet addition
      alert("Pet added successfully!");
      setCurrentPage("profile");
    } catch (error) {
      setErrors({ submit: "Failed to add pet. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (Object.values(formData).some((value) => value !== "")) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to go back?"
        )
      ) {
        setCurrentPage("profile");
      }
    } else {
      setCurrentPage("profile");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please login to add a pet
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
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={handleBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Add New Pet</h1>
          <p className="text-gray-600">
            Share your pet with the PetLove community
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="order-2 md:order-1">
          <div className="sticky top-8">
            <PetBlock />
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">
                Photo Guidelines
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Use high-quality, clear photos</li>
                <li>• Show your pet's face clearly</li>
                <li>• Ensure good lighting</li>
                <li>• Supported formats: JPG, PNG, GIF, BMP, WebP</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="order-1 md:order-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Upload size={16} />
                    <span>Photo URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.imgUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/photo.jpg"
                />
                {errors.imgUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.imgUrl}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Adorable Golden Retriever"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Pet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <PawPrint size={16} />
                    <span>Pet Name</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Buddy"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Birthday</span>
                  </div>
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.birthday ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>
                )}
              </div>

              {/* Species */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species
                </label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white ${
                    errors.species ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select species</option>
                  {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
                {errors.species && (
                  <p className="mt-1 text-sm text-red-600">{errors.species}</p>
                )}
              </div>

              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <User2 size={16} />
                    <span>Sex</span>
                  </div>
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === "Male"}
                      onChange={handleInputChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === "Female"}
                      onChange={handleInputChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
                {errors.sex && (
                  <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Add Pet"
                  )}
                </button>
              </div>

              {errors.submit && (
                <p className="text-sm text-red-600 text-center">
                  {errors.submit}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
