"use client";

import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface IdUploadInputProps {
  defaultValue?: {
    id: number;
    sourceUrl: string;
    width: number;
    height: number;
  };
  onUploadComplete: ({
    id,
    sourceUrl,
    width,
    height,
  }: {
    id: number;
    sourceUrl: string;
    width: number;
    height: number;
  }) => void;
}

const IdUploadInput = ({
  onUploadComplete,
  defaultValue,
}: IdUploadInputProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<{
    id: number;
    sourceUrl: string;
    width: number;
    height: number;
  } | null>(defaultValue || null);
  const [isPending, startTransition] = useTransition();

  const handleUploadImage = async () => {
    if (!photo) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", photo);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setUploadedPhoto({
          id: data.media.id,
          sourceUrl: data.media.source_url,
          width: data.media.media_details.width,
          height: data.media.media_details.height,
        });
        onUploadComplete({
          id: data.media.id,
          sourceUrl: data.media.source_url,
          width: data.media.media_details.width,
          height: data.media.media_details.height,
        });
        toast.success("Upload successful!");
      } else {
        toast.error("Upload failed.");
        console.error("Upload error:", data);
      }
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
          Please upload a clear image of your ID.
        </CardDescription>
        {uploadedPhoto && (
          <Image
            src={uploadedPhoto.sourceUrl}
            alt="Product Image"
            width={uploadedPhoto.width}
            height={uploadedPhoto.height}
            className="w-full object-cover rounded-sm object-center mx-auto"
          />
        )}

        <Button
          type="button"
          variant={"outline"}
          disabled={!photo || isPending}
          onClick={handleUploadImage}
        >
          {isPending ? "Uploading..." : "Upload ID"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IdUploadInput;
