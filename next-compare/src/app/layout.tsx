import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { UserContextProvider } from "@/components/context/user-context/user-context";
import Sidebar from "@/components/sidebars/sidebar";
import HeaderArrow from "@/components/header-arrow";
import { Toaster } from "@/components/ui/toaster";
import MobileBottomNavigation from "@/components/mobile-bottom-navigation";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { auth } from "@clerk/nextjs/server";
import SvgWave from "@/components/landing-page/svg-wave";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardgame compare",
  description: "Compare with friends",
};

function AuthDependentLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { userId } = auth();
  console.log(userId);
  return (
    <>
      <Header />
      <SpeedInsights />
      {userId && (
        <div className="w-full fixed z-[-1] bottom-0">
          <SvgWave />
        </div>
      )}
      <div className={cn(className, userId && "px-5")}>{children}</div>
      <Toaster />
    </>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <UserContextProvider>
            {/* TODO: create layout for 2xl!! */}
            <AuthDependentLayout className={"h-[calc(100vh-4rem)]"}>
              {children}
            </AuthDependentLayout>
          </UserContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
