import { CreateSVG, IdeaSVG, WinSVG } from "../icons";

const howItWorksCards = [
  {
    title: "Idea",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae dolorem exercitationem ex vel ab velit amet esse eius, aperiam porro. Eum et id adipisci tenetur non labore odit a nam.",
    svg: IdeaSVG,
  },
  {
    title: "Create",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae dolorem exercitationem ex vel ab velit amet esse eius, aperiam porro. Eum et id adipisci tenetur non labore odit a nam.",
    svg: CreateSVG,
  },
  {
    title: "Win",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae dolorem exercitationem ex vel ab velit amet esse eius, aperiam porro. Eum et id adipisci tenetur non labore odit a nam.",
    svg: WinSVG,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F0D050]">
      <div className="w-full flex h-32  justify-center">
        <h6 className="text-5xl text-[#3F3A3A] font-extrabold">How it works</h6>
      </div>
      <div className="w-full h-3/5 flex items-center justify-between px-40 gap-10">
        {howItWorksCards.map((card, index) => (
          <div
            className="h-full bg-white w-96 gap-2 rounded-lg flex flex-col items-center border-b-4 border-2 border-black border-b-black p-10"
            key={index}
          >
            <div className=" h-52 w-full rounded-tl-[20px] flex items-center justify-center rounded-tr-[20px] bg-[#FF8BEA]">
              {card.svg()}
            </div>
            <p className="text-[#3F3A3A] font-extrabold text-5xl">
              {card.title}
            </p>
            <p className="text-[#3F3A3A] font-medium flex items-cente w-full justify-center text-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
