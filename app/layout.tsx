import "./global.css";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body className="font-sans-brutal antialiased text-black">
        <RootProvider
          search={{
            links: [
              ["Home", "/"],
              ["Blogs", "/blog"],
            ],
          }}
          theme={{
            defaultTheme: "dark",
          }}
        >
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
