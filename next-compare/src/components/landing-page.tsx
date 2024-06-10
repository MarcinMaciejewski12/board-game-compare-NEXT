import MainBlob from "@/components/main-blob";
import mainPhoto from "@/assets/mainPhoto.jpg";
import friendPlayingBoardgame from "@/assets/2ndMainPhoto.jpg";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="min-w-full h-[80vh] flex">
        <div className="w-1/2 h-full flex justify-center items-center">
          <h1 className="text-center text-default font-poppins font-bold text-4xl">
            Keep track scores <br />
            and compete with friends
          </h1>
        </div>
        <div className="w-1/2 h-full  flex justify-end">
          <div className="bg-buttonAndShadowColor w-11/12 h-[100%] rounded-bl-[350px] rounded-tl-[400px] rounded-br-[300px] rounded-tr-[200px] -translate-y-10 translate-x-14 -rotate-6">
            <div className="bg-white w-11/12 h-[90%] m-10 rounded-tl-[300px] rounded-bl-[250px] rounded-br-[200px]  rounded-tr-[120px] flex items-center justify-center rotate-6">
              <div className="rounded-3xl w-[80%] -rotate-6">
                <Image
                  className="rounded-3xl rotate-6"
                  width={mainPhoto.width}
                  height={mainPhoto.height}
                  src={mainPhoto}
                  alt={"asd"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-red-500 min-w-full h-[70vh] flex">
        <div className="w-1/2 bg-orange-700 h-full"></div>
        <div className="w-1/2 bg-blue-600 h-full"></div>
      </section>
      {/*TODO: add last part of landing page*/}
      <section className='className="bg-red-500 min-w-full h-[70vh] flex'>
        <div className="w-1/2 bg-red-700 h-full"></div>
        <div className="w-1/2 bg-orange-600 h-full"></div>
      </section>
    </div>
  );
}
