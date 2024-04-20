"use client";

import { CrossIcon, X } from "lucide-react";
import Image from "next/image";

const PhotoModal = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600">
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white mb-2 flex"
        >
          <X /> Close
        </button>
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
