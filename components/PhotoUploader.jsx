"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const PhotoUploader = () => {
  const [uploading, setUploading] = useState(false);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">
        {uploading ? "Uploading..." : "Upload Photo"}
      </Label>
      <Input
        id="picture"
        type="file"
        className="text-primary cursor-pointer file:border file:border-solid file:border-black file:rounded-md"
        disabled={uploading}
      />
    </div>
  );
};

export default PhotoUploader;
