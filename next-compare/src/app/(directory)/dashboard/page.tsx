"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/components/context/user-context/user-context";
import DashboardCard from "@/components/dashboard-card";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";

export default function Dashboard() {
  return <DashboardView />;
}
