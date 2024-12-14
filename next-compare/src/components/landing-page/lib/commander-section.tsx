import { Fragment } from "react";
import { ChewIconSVG, StarSVG, TrooperSVG, VaderSVG } from "../icons";

const commanderCards = [
  {
    svg: <ChewIconSVG />,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde repudiandae necessitatibus repellat laudantium, omnis adipisci placeat, doloremque debitis itaque hic libero",
  },
  {
    svg: <VaderSVG />,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde repudiandae necessitatibus repellat laudantium, omnis adipisci placeat, doloremque debitis itaque hic libero",
  },
  {
    svg: <TrooperSVG />,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde repudiandae necessitatibus repellat laudantium, omnis adipisci placeat, doloremque debitis itaque hic libero",
  },
];

export default function CommanderSection() {
  return (
    <div className="bg-[#3F3A3A] px-24 w-full h-5/6">
      <div className=" w-full flex items-center justify-center h-[20%]">
        <h6 className="text-4xl text-white font-bold">Command corner</h6>
      </div>
      <div className="w-full h-[80%] justify-between flex">
        {commanderCards.map((card, index) => (
          <Fragment key={index}>
            <div className="bg-white h-[60vh] p-10 w-96 rounded-xl border-b-4 border-black border-2">
              <div className="w-full h-[50%] bg-[#F0D050] rounded-tl-2xl rounded-tr-2xl flex items-center justify-center">
                {card.svg}
              </div>
              <div className="w-full flex gap-2 items-center justify-center h-16">
                <StarSVG />
                <StarSVG />
                <StarSVG />
                <StarSVG />
                <StarSVG />
              </div>
              <div className="w-full h-[40] text-center font-medium">
                {card.description}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
