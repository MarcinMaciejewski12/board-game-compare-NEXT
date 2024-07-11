'use client'
import LandingPage from "@/components/landing-page";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  if (!!user) redirect("/dashboard");
  return <LandingPage />;
}
