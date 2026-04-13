import Image from "next/image";
import Link from "next/link";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import FooterMenuSection from "@/components/shared/footer-menu";

import { companyMenuItems, liferayMenuItems } from "./data";

export default function Footer() {
  return (
    <footer className="pt-4 md:pt-6 lg:pt-8 xl:pt-12 pb-2 bg-white">
      <div className="container">
        <Grid>
          <Grid.Col className="md:w-4/12 flex flex-col gap-4 md:gap-6 lg:gap-8">
            <Link href="/" className="block w-40" title="Aixtor Technologies">
              <Image
                src="./images/logo.svg"
                alt="Aixtor Technologies"
                width="143"
                height="65"
                className="w-full"
              />
            </Link>
            <address className="flex items-start gap-2 not-italic text-base">
              <Image
                src="./images/ind-flag.svg"
                className="mt-0.5"
                alt="Flag-India"
                width={24}
                height={24}
              />
              <div>
                D 1006-1012, Swati Clover, Near Shilaj Circle, SP Ring Road,
                Shilaj, Ahmedabad, Gujarat 380059
              </div>
            </address>
            <address className="flex items-start gap-2 not-italic text-base">
              <Image
                loading="eager"
                src="./images/usa-flag.svg"
                className="mt-0.5"
                alt="UsFlag"
                width={24}
                height={24}
              />
              <div>Silicon Valley, California - 94542, USA</div>
            </address>
            <div className="flex flex-col gap-2">
              <div>
                <Link
                  href="mailto:connect@aixtor.com"
                  target="_blank"
                  title="Mail"
                >
                  connect@aixtor.com
                </Link>
              </div>
              <div>
                <a href="tel:+91 7948940009" target="_blank" title="Tel">
                  +91 7948940009
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="/"
                className="size-6 md:size-8"
                target="_blank"
                title="LinkedIn"
              >
                <Image
                  src="./images/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="size-full"
                />
              </a>
              <a
                href="/"
                className="size-6 md:size-8"
                target="_blank"
                title="Twitter"
              >
                <Image
                  src="./images/twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="size-full"
                />
              </a>

              <a
                href="/"
                className="size-6 md:size-8"
                target="_blank"
                title="Instagram"
              >
                <Image
                  src="./images/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="size-full"
                />
              </a>
              <a
                href="/"
                className="size-6 md:size-8"
                target="_blank"
                title="Facebook"
              >
                <Image
                  src="./images/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="size-full"
                />
              </a>
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-8/12">
            <Grid>
              <Grid.Col className="md:w-4/12 flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                <FooterMenuSection
                  title="Liferay Services"
                  items={liferayMenuItems}
                />
                <FooterMenuSection title="Company" items={companyMenuItems} />
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                <FooterMenuSection
                  title="Liferay Services"
                  items={liferayMenuItems}
                />
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                <FooterMenuSection
                  title="Liferay Services"
                  items={liferayMenuItems}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-7 items-center justify-center border-t border-t-body py-4 md:py-6 lg:py-8 mt-4 md:mt-8 lg:mt-10 xl:mt-12 text-center">
          <Image
            src="./images/iso-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
          <Image
            src="./images/iso-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
          <Image
            src="./images/iso-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
          <Image
            src="./images/iso-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
          <Image
            src="./images/iso-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
          <Image
            src="./images/liferay-partner-logo.svg"
            alt="Aixtor Technologies"
            width="70"
            height="70"
            className="h-14 md:h-16 lg:h-18 w-auto max-w-80"
          />
        </div>
        <div className="border-t border-t-body py-3 md:py-4 text-center">
          <Typography>© 2023 Aixtor.com, All rights reserved</Typography>
        </div>
      </div>
    </footer>
  );
}
