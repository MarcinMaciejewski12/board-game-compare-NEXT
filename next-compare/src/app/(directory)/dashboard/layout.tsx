export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full relative 2xl:max-w-[1440px]">
      <div>{children}</div>
    </div>
  );
}
