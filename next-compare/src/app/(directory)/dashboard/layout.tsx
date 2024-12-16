import SvgWave from "@/components/landing-page/svg-wave";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-[100%] h-full relative">
      <div>{children}</div>
    </div>
  );
}
