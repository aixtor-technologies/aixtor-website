import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/assets/css//theme.css";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

const gilroy = localFont({
  src: [
    {
      path: "../assets/fonts/Gilroy-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-Medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "../assets/fonts/Gilroy-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Aixtor Technologies",
  description:
    "Customized solution for Digital Transformation of your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.className} h-full antialiased`}>
      <body className="">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
