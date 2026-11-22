import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Sayyad Malik — Captain Syndrome",
  description: "Research engineering portfolio spanning aerospace, autonomous systems, robotics, AI and intelligent sensing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
