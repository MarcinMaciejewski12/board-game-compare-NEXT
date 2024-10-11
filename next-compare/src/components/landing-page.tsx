"use client";
import mainPhoto from "@/assets/mainPhoto.jpg";
import friendPlayingBoardgame from "@/assets/2ndMainPhoto.jpg";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/dashboard");
  }

  return (
    <div className="overflow-hidden -z-10">
      <section className="min-w-full h-[80vh] flex">
        <div className="w-1/2 h-full flex justify-center items-center">
          <h1 className="text-center text-default font-poppins font-bold text-4xl">
            Keep track scores <br />
            and compete with friends
          </h1>
        </div>
        <div className="w-1/2 h-full  flex justify-end">
          <div className="bg-buttonAndShadowColor w-11/12 h-[100%] rounded-bl-[350px] rounded-tl-[400px] rounded-br-[300px] rounded-tr-[200px] -translate-y-10 translate-x-14 -rotate-6">
            <div className="bg-white w-[90%] h-[90%] m-10 rounded-tl-[300px] rounded-bl-[250px] rounded-br-[200px]  rounded-tr-[120px] flex items-center justify-center rotate-6">
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
      <section>
        <div className="min-w-full h-[80vh] max-w-11/12 flex">
          <div className="w-1/2 h-full">
            <div className=" bg-buttonAndShadowColor w-full  flex items-center h-[110%] rounded-tr-[500px] rounded-br-[400px] rounded-bl-[300px] rounded-tl-[350px] transform -translate-y-10 -translate-x-32 -rotate-12">
              <div className=" bg-white w-[90%] h-[95%] m-10 rounded-tl-[350px] rounded-bl-[250px] rounded-br-[400px] rounded-tr-[500px] flex items-center justify-center rotate-6">
                <div className="rounded-3xl w-[70%]">
                  <Image
                    className="rounded-3xl rotate-6"
                    width={mainPhoto.width}
                    height={mainPhoto.height}
                    src={friendPlayingBoardgame}
                    alt={"asd"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <h1 className="text-center text-default font-poppins font-bold text-4xl">
              Share moments with <br />
              your community!
            </h1>
          </div>
        </div>
      </section>
      <div className="bg-buttonAndShadowColor w-full h-[50vh] rounded-tr-[1900px]">
        <div className="bg-white h-full translate-y-12 rounded-tr-[1900px] flex items-center justify-center">
          <h1>TO BE CONTINUED</h1>
        </div>
      </div>
    </div>
  );
}
