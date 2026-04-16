import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/assets/css//common.css";
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
  title: "Enterprise Software, Liferay Development & Migration Company",
  description:
    "Aixtor is a trusted enterprise software and Liferay portal development company delivering scalable intranet, customer, partner, and digital experience platforms for global enterprises.",
  icons: {
    icon: "./images/AX-logo.svg",
    apple: "./images/AX-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gilroy.className} h-full text-dark-400 bg-dark-200 antialiased`}
    >
      <body className="">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
