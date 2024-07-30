import type { GetServerSideProps, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { UserContextProvider } from "@/components/context/user-context/user-context";
import Sidebar from "@/components/sidebar";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import HeaderArrow from "@/components/header-arrow";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardgame compare",
  description: "Compare with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: refactor needed: UGLY CODE
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserContextProvider>
            <Header />
            <div className="flex">
              <div
                className="w-defaultSidebarWidth"
                style={{ height: "calc(100vh - var(--default-header-height))" }}
              >
                <Sidebar />
              </div>
              <div className="py-5 px-2 rounded-tl-[1rem] overflow-hidden rounded-tr-[1rem] bg-secondary w-full">
                <HeaderArrow />
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
