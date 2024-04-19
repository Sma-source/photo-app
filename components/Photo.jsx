"use client";
import Image from "next/image";

const Photo = ({ src, alt, width, height, photoName }) => {
  return (
    <>
      <div
        style={{ width, height }}
        className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    </>
  );
};

export default Photo;
