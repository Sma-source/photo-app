import PhotoGrid from "@/components/PhotoGrid";
import SignOutButton from "@/components/SignOutButton";
import React from "react";

const Favorites = () => {
  return (
    <main className="min-h-screen bg-gray-800 text-white relative p-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-bold mb-4">Favorites</h1>
        </div>
        <PhotoGrid favorites={true} />
      </div>
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>
    </main>
  );
};

export default Favorites;
