import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mega Mall - Sale is Live ! | Shop Now !",
  description: "Created with love by Vinayak Gore",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-zinc-800 dark:text-zinc-200 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <ReduxProvider>
            {" "}
            {/* Wrap with ReduxProvider */}
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
