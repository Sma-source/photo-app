"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PhotoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated for upload photo");
      }

      const filePath = `user_uploads/${user.id}/${fileName}`;
      const { error } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: "/photos" }),
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">
        {uploading ? "Uploading..." : "Upload Photo"}
      </Label>
      <Input
        id="picture"
        type="file"
        className="text-primary cursor-pointer file:border file:border-solid file:border-black file:rounded-md"
        onChange={handleFileUpload}
        disabled={uploading}
      />
    </div>
  );
};

export default PhotoUploader;
