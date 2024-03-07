import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "800"] });

export const metadata: Metadata = {
  title: "Notification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen font-medium", sans.className)}>
        <div className="background-container min-h-screen bg-[#F9FAFD]">
          <div className="card-conainer flex items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
