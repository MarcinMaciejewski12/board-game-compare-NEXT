import { Button } from "../ui/button";
import AccordionSection from "./lib/accordion-section";
import CommanderSection from "./lib/commander-section";
import Footer from "./lib/footer";
import HowItWorksSection from "./lib/how-it-works-section";
import SvgWave from "./svg-wave";

export default function LandingPage() {
  return (
    <div className="w-full h-screen">
      <div className="h-[55vh] text-6xl text-white flex items-end ml-40">
        <div>
          <h1>Board</h1>
          <h2>Game</h2>
          <h3>Compare.</h3>

          <h4 className="text-[#3F3A3A] text-4xl py-4">
            Keep track Your score
          </h4>
          <h5 className="text-[#3F3A3A] text-2xl py-21 py-4">
            Show them... who set the rules.
          </h5>
          <div className="flex gap-7">
            <Button variant="signup" size="default">
              Sign up
            </Button>
            <Button
              className="cursor-pointer rounded-md bg-[#F0D050] text-[#3F3A3A] w-32 border-[#3F3A3A] border-2 hover:bg-[#F0D050]/90"
              size="default"
              variant="default"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
      <div className="translate-y-0.5">
        <SvgWave />
      </div>
      <HowItWorksSection />
      <AccordionSection />
      <CommanderSection />
      <Footer />
    </div>
  );
}
