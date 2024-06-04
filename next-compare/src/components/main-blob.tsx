import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface MainBlobProps {
  photoLink?: StaticImageData;
  bgYellowStyleProps: string;
  alt?: string;
  bgWhiteStyleProps: string;
  imageStyleProps?: string;
}

export default function MainBlob({
  photoLink,
  alt,
  bgYellowStyleProps,
  bgWhiteStyleProps,
  imageStyleProps,
}: Readonly<MainBlobProps>) {
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      <div
        className={cn(
          "absolute rounded-full bg-buttonAndShadowColor",
          bgYellowStyleProps,
        )}
      >
        <div
          className={cn("transform rounded-full bg-white", bgWhiteStyleProps)}
        >
          <div className={cn("absolute top-1/2", imageStyleProps)}>
            <Image
              src={photoLink?.src as string}
              alt={alt as string}
              width={photoLink?.width}
              height={photoLink?.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
