import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/button";
import HeaderNav from "@/components/shared/header-nav";
import HireDropdown from "@/components/shared/hire-btn";
import HttpService from "@/shared/services/http.service";

async function fetchMenu(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "menu/desktop-menu",
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Menu content:", error);
    return null; // Return fallback so UI can handle it
  }
}

export default async function Header() {
  const menuList = await fetchMenu();
  console.log("menu", menuList);
  return (
    <header
      id="site-header"
      className="py-4 md:py-0 fixed top-0 inset-s-0 w-full z-50 backdrop-blur-lg transition-all duration-200"
    >
      <div className="container">
        <div className="flex gap-2 items-center justify-between">
          <Link href="/" className="logo">
            <Image
              src="./images/logo.svg"
              alt="Aixtor Logo"
              width={157}
              height={36}
            />
          </Link>
          <HeaderNav />
          <HireDropdown />
          <Button href="/contact" variant="outline" className="outlineBtn">
            Let’s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
