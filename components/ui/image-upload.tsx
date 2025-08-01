"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import { ImageIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { deleteFiles } from "@/actions/deleteFiles";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ImagesValues {
  key: string;
  url: string;
}

interface ImageUploadProps {
  value: ImagesValues[];
  onChange: (url: ImagesValues[]) => void;
  onRemove: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (result: any[]) => {
    const formattedResult = result.map((res) => ({
      key: res.key,
      url: res.ufsUrl,
    }));

    onChange(formattedResult);
  };

  const handleDelete = async (image: any) => {
    try {
      setIsLoading(true);
      await deleteFiles([image]);
      onRemove(image.key);
    } catch (error: unknown) {
      toast.error("Failed to delete image");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col space-y-2">
      {value.length < 1 ? (
        <div className="relative md:w-[150px] flex items-center h-[90px] w-[90px] justify-center 
        md:h-[150px] border-2 rounded-lg">
          <ImageIcon className="opacity-35 md:scale-[300%] scale-150" />
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-4">
          {value.map((image) => (
            <div
              key={image.key}
              className={cn(
                "relative w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-lg border overflow-hidden",
                isLoading ? "opacity-80" : "opacity-100"
              )}
            >
              <Image
                src={image.url}
                alt="Image"
                fill
                className="object-cover"
              />
              <div className="absolute top-1 right-1">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(image)}
                  disabled={isLoading}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {value.length < 1 && (
        <main className="flex items-center">
          <UploadButton
            disabled={disabled}
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {

              if (res.length > 4) {
                toast.error("Cannot upload more than 4 images!");
                await deleteFiles(res.map((item) => item.key));
                onChange([]);
              } else {
                handleChange(res);
              }
            }}
            onUploadError={(error: Error) => {
              toast.error("Cannot upload more than 4 images!");
            }}
            appearance={{
              allowedContent: "hidden",
              button({ isUploading }) {
                return {
                  backgroundColor: "whitesmoke",
                  ...(isUploading && { backgroundColor: "whitesmoke" }),
                };
              },
            }}
            className="text-xs md:text-sm max-md:ut-button:w-[120px] ut-uploading:!bg-neutral-100 ut-button:ring-0 ut-button:text-black ut-button:border-2"
          />
        </main>
      )}
    </div>
  );
}
