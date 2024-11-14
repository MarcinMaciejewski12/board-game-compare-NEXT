export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-5 max-h-[100%]">{children}</div>;
}
