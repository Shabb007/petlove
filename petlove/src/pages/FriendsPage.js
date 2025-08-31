import React from "react";
import FriendsItem from "../components/FriendsItem";
import { mockFriends } from "../data/mockData";
import { Users, Heart } from "lucide-react";

const FriendsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Users className="text-orange-500 mr-3" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Friends
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our trusted partners who share our mission of connecting pets
          with loving families. These verified organizations provide essential
          services for pet care and adoption.
        </p>
      </div>

      {/* Partners introduction */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-8 mb-8">
        <div className="text-center">
          <Heart className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trusted Pet Care Network
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our carefully selected partners include veterinary clinics, pet
            stores, and animal shelters that meet our high standards for pet
            care and customer service. Each partner is verified and committed to
            animal welfare.
          </p>
        </div>
      </div>

      {/* Friends List */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {mockFriends.map((friend) => (
          <FriendsItem key={friend.id} friend={friend} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Want to become our partner?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          If you're a veterinary clinic, pet store, or animal shelter interested
          in joining our network, we'd love to hear from you. Together, we can
          help more pets find their perfect homes.
        </p>
        <div className="space-x-4">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            Contact Us
          </button>
          <button className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
