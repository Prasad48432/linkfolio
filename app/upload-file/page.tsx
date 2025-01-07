"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const supabase = createClient();

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const fileExt = image.name.split(".").pop();
      const filePath = `userimages/${Date.now()}.${fileExt}`;

      // Upload the image to the "userimages" bucket
      const { error } = await supabase.storage
        .from("userimages")
        .upload(filePath, image);

      if (error) throw error;

      // Get the public URL of the uploaded image
      const { data } = supabase.storage
        .from("userimages")
        .getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <Image src={imageUrl} alt="Uploaded" width={200} height={200} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
