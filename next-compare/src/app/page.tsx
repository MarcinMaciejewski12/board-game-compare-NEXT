"use client";
import LandingPage from "@/components/landing-page";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  if (isSignedIn) {
    router.push("/dashboard");
  }

  return <LandingPage />;
}
