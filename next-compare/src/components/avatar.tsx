"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";

interface AvatarProps {
  img: string;
  size: {
    w: string;
    h: string;
  };
}

export default function Avatar({ img, size }: AvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  console.log(img);
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
  return (
    <>
      {avatar ? (
        <Image
          width={200}
          height={200}
          src={avatar}
          alt="Avatar"
          className="avatar image"
          style={{ height: 200, width: 200 }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: 200, width: 200 }} />
      )}
    </>
  );
}
