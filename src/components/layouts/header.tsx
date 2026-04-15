import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/button";
import HeaderNav from "@/components/shared/header-nav";
import HireDropdown from "@/components/shared/hire-btn";

export default function Header() {
  return (
    <header className="py-4 md:py-0 bg-white/10 text-white absolute top-0 inset-s-0 w-full z-10">
      <div className="container">
        <div className="flex gap-2 items-center justify-between">
          <Link href="/">
            <Image
              src="./images/logo-light.svg"
              alt="Aixtor Logo"
              width={157}
              height={36}
            />
          </Link>
          <HeaderNav />
          <HireDropdown />
          <Button href="/contact" variant="light">
            Let’s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
