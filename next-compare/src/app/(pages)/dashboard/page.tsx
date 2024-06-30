"use client";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();

  return (
    <h1>{`Hello ${isSignedIn ? user?.username : "You are not authorized! please sign in!"}`}</h1>
  );
}
