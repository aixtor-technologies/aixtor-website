import Link from "next/link";
import Image from "next/image";

import Button from "@/components/ui/button";
import HeaderNav from "@/components/shared/header-nav";
import HireDropdown from "@/components/shared/hire-btn";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

async function fetchMenu(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>("menu", {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch Menu content:", error);
    return null;
  }
}

export default async function Header() {
  const menuList = await fetchMenu();

  const allItems = menuList?.data?.[0]?.items ?? [];

  const hireItem = allItems.find((item: any) => item.is_button === true);
  const hireOptions = (hireItem?.children ?? []).map((child: any) => ({
    label: child.title,
    href: child.url,
  }));

  return (
    <header
      id="site-header"
      className="py-4 md:py-0 fixed top-0 inset-s-0 w-full z-50 backdrop-blur-lg transition-all duration-200"
    >
      <div className="container">
        <div className="flex gap-2 items-center justify-between">
          <Link href="/" className="logo w-32 md:w-36 xl:w-40 shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Aixtor Logo"
              width={135}
              height={29}
            />
          </Link>
          <HeaderNav data={menuList} />

          <Button href="/contact" variant="outline" className="outlineBtn">
            Let&apos;s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
