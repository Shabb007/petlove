import React from "react";

const PetBlock = ({ className = "" }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=600&fit=crop"
        alt="Happy pets"
        className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
      />
    </div>
  );
};

export default PetBlock;
