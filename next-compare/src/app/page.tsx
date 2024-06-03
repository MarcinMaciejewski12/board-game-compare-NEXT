import MainBlob from "@/components/main-blob";
import mainPhoto from "../assets/mainPhoto.jpg";
import friendPlayingBoardgame from "../assets/2ndMainPhoto.jpg";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="flex">
        <div className="w-1/2 h-[700px] flex items-center justify-center">
          <h1 className="text-center font-poppins text-default text-[45px]">
            Keep tracks scores <br /> and compete with your friend
          </h1>
        </div>
        <div className="w-1/2 h-[700px]">
          <div className="absolute top-0 right-0">
            <MainBlob
              imageStyleProps="left-96 transform -translate-x-1/2 -translate-y-1/2 rotate-6"
              bgYellowStyleProps="top-0 right-0 transform translate-x-56 -translate-y-24 rotate-6 w-[1000px] h-[950px]"
              bgWhiteStyleProps="translate-x-4 translate-y-9 -rotate-12 w-[950px] h-[900px]"
              photoLink={mainPhoto}
              alt="friends playing boardgames on table"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <MainBlob
            photoLink={friendPlayingBoardgame}
            bgYellowStyleProps="-translate-x-56 w-[1200px] h-[1100px]"
            alt="friends playing boardgame"
            bgWhiteStyleProps="w-[1150px] h-[1000px] translate-y-9"
            imageStyleProps="right-96 transform translate-x-64  -translate-y-1/2"
          />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-center text-default text-[45px]">
            Share moments <br />
            with your community!
          </h1>
        </div>
      </div>
    </div>
  );
}
