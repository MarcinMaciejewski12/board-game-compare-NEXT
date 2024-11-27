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
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardgame compare",
  description: "Compare with friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} overflow-hidden`}>
          <UserContextProvider>
            <Header />
            <div className="flex w-full h-full">
              <div
                className="min-w-[4.375rem] sticky top-0 w-defaultSidebarWidth hidden sm:flex"
                style={{ height: "calc(100vh - var(--default-header-height))" }}
              >
                <Sidebar />
              </div>

              <div
                style={{ height: "calc(100vh - var(--default-header-height))" }}
                className={cn(
                  "sm:max-w-[calc(100vw-90px)] overflow-auto bg-secondary h-full w-full sm:rounded-tl-[1rem] sm:rounded-tr-sm",
                )}
              >
                <div>
                  <HeaderArrow />
                </div>
                <SpeedInsights />
                {children}
              </div>
              <div className="hidden sm:block min-w-[20px]" />
            </div>
            <div className="w-full fixed bottom-0 z-20 bg-primary h-defaultHeaderHeight sm:hidden">
              <MobileBottomNavigation />
            </div>
            <Toaster />
          </UserContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
