import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/components/auth/UserProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Greatminds International School Lagos",
  description:
    "A loving, joyful haven where little learners from 18 months to 11 years master fluent early reading with Jolly Phonics, spark wonder with Lego STEM robotics, and grow into confident, kind young scholars.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-secondary selection:text-white`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}