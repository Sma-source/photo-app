"use client";
import Image from "next/image";
import { useState } from "react";
import PhotoModal from "./PhotoModal";
import { Star, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePhoto } from "@/lib/actions/deletePhoto";
import { addOrRemoveFromFavorites } from "@/lib/actions/addRemoveFavorites";

const Photo = ({ src, alt, width, height, photoName, isFavorited = false }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div
        style={{ width, height }}
        className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
      >
        <form action={deletePhoto} className="absolute bottom-1 right-1 z-10">
          <input type="hidden" name="photoPath" value={src} />
          <button
            type="submit"
            className="bg-transparent border-none text-red-500 cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </form>
        <form
          action={addOrRemoveFromFavorites}
          className="absolute bottom-1 right-9 z-10"
        >
          <input type="hidden" name="photoName" value={photoName} />
          <input type="hidden" name="isFavorited" value={isFavorited} />
          <button
            type="submit"
            className="bg-transparent border-none text-red-500 cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
          >
            {isFavorited ? (
              <Star className="w-6 h-6 fill-red-500" />
            ) : (
              <Star className="w-6 h-6 fill-none" />
            )}
          </button>
        </form>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit: "cover", objectPosition: "center" }}
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
    </>
  );
};

export default Photo;
