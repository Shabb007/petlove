import React from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const FriendsItem = ({ friend }) => {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getCurrentDayStatus = () => {
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to Saturday (6)
    const todaySchedule = friend.workDays[todayIndex];

    if (!todaySchedule.isOpen) {
      return { isOpen: false, text: "Closed today" };
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = todaySchedule.from.split(":").map(Number);
    const [closeHour, closeMin] = todaySchedule.to.split(":").map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    if (currentTime >= openTime && currentTime <= closeTime) {
      return { isOpen: true, text: `Open until ${todaySchedule.to}` };
    } else if (currentTime < openTime) {
      return { isOpen: false, text: `Opens at ${todaySchedule.from}` };
    } else {
      return { isOpen: false, text: "Closed for today" };
    }
  };

  const currentStatus = getCurrentDayStatus();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Logo */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={friend.imageUrl}
            alt={friend.title}
            className="w-20 h-20 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          {/* Title */}
          <h3 className="font-semibold text-xl mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
            {friend.title}
          </h3>

          {/* Contact Information */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
              <MapPin size={16} className="text-orange-500 flex-shrink-0" />
              <a
                href={`https://maps.google.com/search/${encodeURIComponent(
                  friend.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                {friend.address}
              </a>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
              <Mail size={16} className="text-orange-500 flex-shrink-0" />
              <a
                href={`mailto:${friend.email}`}
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                {friend.email}
              </a>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
              <Phone size={16} className="text-orange-500 flex-shrink-0" />
              <a
                href={`tel:${friend.phone}`}
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                {friend.phone}
              </a>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-4">
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentStatus.isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <Clock size={14} />
              <span>{currentStatus.text}</span>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center">
              <Clock size={16} className="mr-2 text-orange-500" />
              Working Hours
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {friend.workDays.map((day, index) => {
                const isToday = (() => {
                  const today = new Date().getDay();
                  const todayIndex = today === 0 ? 6 : today - 1;
                  return index === todayIndex;
                })();

                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-1 px-2 rounded ${
                      isToday
                        ? "bg-orange-100 font-medium text-orange-800"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="font-medium">{dayNames[index]}:</span>
                    <span>
                      {day.isOpen ? `${day.from} - ${day.to}` : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsItem;
