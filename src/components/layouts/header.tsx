import Image from "next/image";
import Link from "next/link";

import HeaderNav from "../shared/header-nav";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="py-4 md:py-0 bg-white/10 text-white absolute top-0 inset-s-0 w-full z-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="./images/logo-light.svg"
              alt="Aixtor Logo"
              width={157}
              height={36}
            />
          </Link>
          <HeaderNav />
          <Button href="/contact" variant="light">
            Let’s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
