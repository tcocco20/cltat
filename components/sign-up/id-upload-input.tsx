"use client";

import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const IdUploadInput = () => {
  const [photo, setPhoto] = useState<File | null>(null);

  const handleUploadImage = () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("file", photo);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Upload success:", data);
        toast.success("Upload successful!");
        // Handle success (e.g., show a message, store the uploaded file URL, etc.)
      })
      .catch((err) => {
        toast.error("Upload failed.");
        console.error("Upload error:", err);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <Card>
      <CardContent className="space-y-2">
        <CardHeader>Upload image of your ID</CardHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file?.type.startsWith("image/")) {
              setPhoto(file);
            }
          }}
        />
        <CardDescription>
          Please upload a clear image or PDF of your ID.
        </CardDescription>
        {photo && (
          <Image
            src={URL.createObjectURL(photo)}
            alt="Product Image"
            width={500}
            height={250}
            className="w-full object-cover rounded-sm object-center mx-auto"
          />
        )}

        <Button
          type="button"
          variant={"outline"}
          disabled={!photo}
          onClick={handleUploadImage}
        >
          Upload ID
        </Button>
      </CardContent>
    </Card>
  );
};

export default IdUploadInput;
