import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionSection() {
  return (
    <div className="h-[90vh] bg-[#F0D050] border-b-4 border-black flex items-center justify-center px-40">
      <div className="bg-white p-20 h-4/6 wf-full rounded-xl border-2 border-b-4 border-black flex items-center w-full  2xl:max-w-[1440px] justify-center">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-5xl text-[#3F3A3A] font-extrabold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-[#3F3A3A] font-medium">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-5xl text-[#3F3A3A] font-extrabold">
              Is it styled?
            </AccordionTrigger>
            <AccordionContent className="text-[#3F3A3A] font-medium">
              Yes. It comes with default styles that matches the otherYes. It
              comes with default styles that matches the otheYes. It comes with
              default styles that matches the othe components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-5xl text-[#3F3A3A] font-extrabold">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="text-[#3F3A3A] font-medium">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.Yes. It&apos;s animated by default, but you can disable it
              if you prefer.Yes. It&apos;s animated by default, but you can
              disable it if you prefer.Yes. It&apos;s animated by default, but
              you can disable it if you prefer.Yes. It&apos;s animated by
              default, but you can disable it if you prefer.Yes. It&apos;s
              animated by default, but you can disable it if you prefer.Yes.
              It&apos;s animated by default, but you can disable it if you
              prefer.Yes. It&apos;s animated by default, but you can disable it
              if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
