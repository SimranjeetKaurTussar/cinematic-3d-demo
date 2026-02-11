import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nocturne Studio — Cinematic 3D Demo",
  description: "Premium creative studio concept with cinematic scroll, 3D hero, and motion storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#06070b] text-[#f8f6f1] antialiased">{children}</body>
    </html>
  );
}
