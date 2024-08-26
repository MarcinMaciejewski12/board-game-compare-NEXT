import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { UserContextProvider } from "@/components/context/user-context/user-context";
import Sidebar from "@/components/sidebars/sidebar";
import HeaderArrow from "@/components/header-arrow";
import { currentUser } from "@clerk/nextjs/server";
import DefaultSidebar from "@/components/sidebars/default-sidebar";

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
  const user = await currentUser();

  //TODO: refactor needed: UGLY CODE
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} overflow-hidden`}>
          <UserContextProvider>
            <Header />
            <div className="flex">
              <div
                className="w-defaultSidebarWidth"
                style={{ height: "calc(100vh - var(--default-header-height))" }}
              >
                {user ? <Sidebar /> : <DefaultSidebar />}
              </div>
              <div
                style={{ height: "calc(100vh - var(--default-header-height))" }}
                className=" px-2 rounded-tl-[1rem] overflow-auto rounded-tr-[1rem] bg-secondary w-full"
              >
                <div>
                  <HeaderArrow />
                </div>
                {children}
              </div>
              <div className="w-[20px]" />
            </div>
          </UserContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
