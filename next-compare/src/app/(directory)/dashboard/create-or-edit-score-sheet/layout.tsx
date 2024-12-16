export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      {children}
    </div>
  );
}
