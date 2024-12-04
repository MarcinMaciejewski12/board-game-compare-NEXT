"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";

interface AvatarProps {
  img: string;
}

export default function Avatar({ img }: AvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    async function downloadAvatar(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("bgc_test")
          .download(path);
        if (error) {
          console.error("Error downloading image:", error);
          return null;
        }

        const url = URL.createObjectURL(data);
        setAvatar(url);
      } catch (e) {
        console.error(e, "Error downloading image");
      }
    }

    downloadAvatar(img);
  }, [supabase]);

  if (!avatar) {
    return (
      <div className="w-full h-full bg-gray-400 flex items-center justify-center flex-col rounded">
        <span className="text-2xl text-white font-medium">BGC.</span>
        <p className="text-l text-white font-medium">No image</p>
      </div>
    );
  }

  return (
    <Image
      layout="fill"
      objectFit={"cover"}
      src={avatar}
      alt="Avatar"
      className="rounded"
    />
  );
}
