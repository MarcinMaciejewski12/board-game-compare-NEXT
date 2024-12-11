export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full items-center justify-center flex">
      {children}
    </div>
  );
}
