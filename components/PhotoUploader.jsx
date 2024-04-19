"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PhotoUploader = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        className="text-primary cursor-pointer file:border file:border-solid file:border-black file:rounded-md"
      />
    </div>
  );
};

export default PhotoUploader;
