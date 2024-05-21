import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Sidebar from "./Components/Sidebar/Sidebar";
import layoutstyle from "./layout.module.css";
import Header from "./Components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={layoutstyle.container}>
          <aside className={layoutstyle.sideBar}>
            <Sidebar />
          </aside>
          <main className={layoutstyle.content}>{children}</main>
          <aside className={layoutstyle.header}>
            <Header />
          </aside>
          <aside>{/* update header and footer after*/}</aside>
        </div>
      </body>
    </html>
  );
}
