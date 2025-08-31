import React from "react";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";

const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: <Heart className="text-red-500" size={32} />,
      title: "Find Love",
      description:
        "Connect with pets who need loving homes and caring families.",
    },
    {
      icon: <Users className="text-blue-500" size={32} />,
      title: "Trusted Community",
      description:
        "Join thousands of pet lovers in our verified and safe community.",
    },
    {
      icon: <Shield className="text-green-500" size={32} />,
      title: "Safe & Secure",
      description:
        "All listings are verified to ensure the safety of both pets and families.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Happy Adoptions" },
    { number: "5,000+", label: "Active Members" },
    { number: "200+", label: "Partner Shelters" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                  Find Your Perfect
                  <span className="text-orange-500 block">Pet Companion</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with loving pets waiting for their forever homes.
                  Browse thousands of adoptable pets from trusted shelters and
                  rescues across Turkey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage("notices")}
                  className="inline-flex items-center justify-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <span>Find Pets</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={() => setCurrentPage("friends")}
                  className="inline-flex items-center justify-center space-x-2 border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  <span>Our Partners</span>
                </button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=500&fit=crop"
                alt="Happy pets"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose PetLove?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make pet adoption simple, safe, and rewarding for everyone
              involved.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your New Best Friend?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of happy pet owners who found their perfect
              companions through PetLove.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage("notices")}
                className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Pets
              </button>
              <button
                onClick={() => setCurrentPage("register")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-orange-500 transition-colors"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
