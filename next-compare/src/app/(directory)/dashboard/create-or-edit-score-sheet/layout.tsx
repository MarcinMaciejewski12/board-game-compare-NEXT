export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex item-center justify-center">{children}</div>;
}
