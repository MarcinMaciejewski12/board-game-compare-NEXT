import MobileBottomNavigation from "@/components/mobile-bottom-navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:px-5">
      {children}
      <div className="w-full fixed bottom-0 z-20 bg-primary h-defaultHeaderHeight sm:hidden">
        <MobileBottomNavigation />
      </div>
    </div>
  );
}
