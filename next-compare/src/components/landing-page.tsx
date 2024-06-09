import MainBlob from "@/components/main-blob";
import mainPhoto from "@/assets/mainPhoto.jpg";
import friendPlayingBoardgame from "@/assets/2ndMainPhoto.jpg";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="min-w-full top-0 flex absolute h-5/6 overflow-hidden">
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="text-center text-default font-poppins font-bold text-4xl">
            Keep track scores <br />
            and compete with friends
          </h1>
        </div>
        <MainBlob
          imageStyleProps="left-96 transform -translate-x-1/2 -translate-y-1/2 rotate-6"
          bgYellowStyleProps="top-0 right-0 transform translate-x-56 -translate-y-24 rotate-6 w-[950px] h-[900px]"
          bgWhiteStyleProps="translate-x-4 translate-y-9 -rotate-12 w-[900px] h-[850px]"
          photoLink={mainPhoto}
          alt="friends playing boardgames on table"
        />
      </section>
      {/*TODO: ADD SECOND SECTION TO LANDING PAGE!*/}
      <section></section>
    </div>
  );
}

// return (
//   <div className="overflow-hidden z-0">
//     <div className="flex">
//       <div className="w-1/2 h-[700px] flex items-center justify-center">
//         <h1 className="text-center font-poppins text-default text-[45px]">
//           Keep tracks scores <br /> and compete with your friend
//         </h1>
//       </div>
//       <div className="w-1/2 h-[700px]">
//         <div className="absolute top-0 right-0">
//           <MainBlob
//             imageStyleProps="left-96 transform -translate-x-1/2 -translate-y-1/2 rotate-6"
//             bgYellowStyleProps="top-0 right-0 transform translate-x-56 -translate-y-24 rotate-6 w-[1000px] h-[950px]"
//             bgWhiteStyleProps="translate-x-4 translate-y-9 -rotate-12 w-[950px] h-[900px]"
//             photoLink={mainPhoto}
//             alt="friends playing boardgames on table"
//           />
//         </div>
//       </div>
//     </div>
//     <div className="flex">
//       <div className="w-1/2">
//         <MainBlob
//           photoLink={friendPlayingBoardgame}
//           bgYellowStyleProps="-translate-x-56 w-[1200px] h-[1100px]"
//           alt="friends playing boardgame"
//           bgWhiteStyleProps="w-[1150px] h-[1100px] translate-y-9"
//           imageStyleProps="right-96 transform translate-x-64 -translate-y-1/2"
//         />
//       </div>
//       <div className="w-1/2 flex items-center justify-center">
//         <h1 className="text-center text-default text-[45px]">
//           Share moments <br />
//           with your community!
//         </h1>
//       </div>
//     </div>
//     {/*TODO: finish landing page!*/}
//     <div className="w-full">
//       <div className="h-[300px]  w-3/5 flex justify-end">
//         <div className="relative w-full h-[300px]">
//           <MainBlob
//             withoutRoundedCorners={true}
//             bgYellowStyleProps="h-full w-full rounded-tr-[600px]"
//             bgWhiteStyleProps=" h-full w-full rounded-tr-[800px]"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );
