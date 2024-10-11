import LandingPage from "@/components/landing-page";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function Home() {
  return <LandingPage />;
}
