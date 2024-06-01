import Image, { StaticImageData } from "next/image";

interface MainBlobProps {
  photoLink: StaticImageData;
  alt: string;
}

export default function MainBlob({ photoLink, alt }: Readonly<MainBlobProps>) {
  console.log(photoLink);
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      <div className="absolute top-0 right-0 transform translate-x-56 -translate-y-24 rotate-6 w-[1000px] h-[950px] rounded-full bg-buttonAndShadowColor">
        <div className="transform translate-x-4 translate-y-9 -rotate-12 w-[950px] h-[900px] rounded-full bg-white">
          <div className="absolute top-1/2 left-96 transform -translate-x-1/2 -translate-y-1/2 rotate-6">
            <Image
              src={photoLink.src}
              alt={alt}
              width={photoLink.width}
              height={photoLink.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
