import MainBlob from "@/components/main-blob";
import mainPhoto from "../assets/mainPhoto.jpg";
export default function Home() {
  console.log(mainPhoto);
  return (
    <div className="absolute top-0 right-0">
      <MainBlob
        photoLink={mainPhoto}
        alt="friends playing boardgames on table"
      />
    </div>
  );
}
