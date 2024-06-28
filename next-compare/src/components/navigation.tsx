import Link from "next/link";
import { Button } from "@/components/button";

interface NavigationProps {
  isOpen: boolean;
}
export function Navigation({ isOpen }: Readonly<NavigationProps>) {
  return (
    <div
      className={`fixed top-0 w-full h-full z-10 inset-0 gap-28 bg-white transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } flex flex-col items-center justify-center`}
    >
      <h1 className="text-7xl text-default font-extrabold">
        Boardgame Compare
      </h1>
      <div className="flex flex-col gap-16">
        <nav className="flex flex-col gap-5 items-center justify-center text-default text-6xl">
          <Link href="/about-us" className="mb-4">
            About Us
          </Link>
          <Link href="/pricing" className="mb-4">
            Pricing
          </Link>
          <Link href="/contact" className="mb-4">
            Contact
          </Link>
        </nav>
        <div className="flex gap-5">
          <Link href={"login"}>
            <Button
              nameToDisplay="LogIn"
              variant="default"
              size="navigationSize"
            />
          </Link>
          <Button
            nameToDisplay="Page"
            variant="withoutBackground"
            size="navigationSize"
          />
        </div>
      </div>
    </div>
  );
}
