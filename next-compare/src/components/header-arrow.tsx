"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderArrow() {
  const pathnameLength = usePathname().split("/").length;
  const router = useRouter();
  return (
    <>
      {pathnameLength > 2 && (
        <div className="px-2">
          <ArrowLeft
            color={"white"}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
      )}
    </>
  );
}
