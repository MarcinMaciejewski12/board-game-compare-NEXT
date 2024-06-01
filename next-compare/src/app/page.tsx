import MainBlob from "@/components/main-blob";
import mainPhoto from "../assets/mainPhoto.jpg";
import friendPlayingBoardgame from "../assets/2ndMainPhoto.jpg";

export default function Home() {
  return (
    <div>
      <div className="overflow-hidden flex items-center px-16 h-[700px]">
        <div className="w-1/2 h-3/4 flex items-center justify-center">
          <div className="font-poppins text-[45px] text-center font-bold text-default w-full h-20">
            Keep track scores <br /> and compete with friends
          </div>
        </div>
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
      <div>
        <MainBlob
          photoLink={friendPlayingBoardgame}
          bgYellowStyleProps={"-translate-x-56 w-[1000px] h-[950px]"}
          alt={"friends playing boardgame"}
          bgWhiteStyleProps={"w-[950px] h-[900px] translate-y-9"}
          imageStyleProps={
            "right-96 transform translate-x-1/2 -translate-y-1/2"
          }
        />
      </div>
    </div>
  );
}
