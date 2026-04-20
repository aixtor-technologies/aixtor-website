import Image from "next/image";
import Link from "next/link";

import {
  companyMenuItems,
  solutionsMenuItems,
  servicesMenuItems,
  liferayMenuItems,
} from "./data";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import FooterMenuSection from "@/components/shared/footer-menu";
import HttpService from "@/shared/services/http.service";

// ─── Types ────────────────────────────────────────────────────────────────────

type FooterApiResponse = {
  status: string;
  data: {
    footer: {
      india_address: string;
      us_address: string;
      email: string;
      phone: string;
      copyrights: string;
      certificates: { label: string; image: string; redirect_url: string }[];
      social_icons: {
        label: string;
        icon: string | null;
        redirect_url: string;
      }[];
    };
  };
};

type MenuApiResponse = {
  status: string;
  data: {
    items: {
      title: string;
      children: { title: string; url: string }[];
    }[];
  };
};

export default async function Footer() {
  // ─── Fetch both APIs in parallel ─────────────────────────────────────────

  const [footerRes, menuRes] = await Promise.allSettled([
    HttpService.nativeFetch<FooterApiResponse>("common-options/footer", {
      method: "GET",
    }),
    HttpService.nativeFetch<MenuApiResponse>("menu/footer-menu", {
      method: "GET",
    }),
  ]);

  const footer =
    footerRes.status === "fulfilled" ? footerRes.value?.data?.footer : null;
  const menuItems =
    menuRes.status === "fulfilled" ? (menuRes.value?.data?.items ?? []) : [];

  const indiaAddress = footer?.india_address ?? "";
  const usAddress = footer?.us_address ?? "";
  const email = footer?.email ?? "";
  const phone = footer?.phone ?? "";
  const copyrights = footer?.copyrights ?? "";
  const certificates = footer?.certificates ?? [];
  const socialIcons = footer?.social_icons ?? [];
  const menuGroups = menuItems
    .filter(item => item.children?.length > 0)
    .map(item => ({ title: item.title, items: item.children }));

  return (
    <footer className="pt-8 lg:pt-10 xl:pt-12 pb-2 bg-white">
      <div className="container">
        <Grid className="gap-y-6">
          <Grid.Col className="md:w-4/12 flex flex-col gap-3 md:gap-6 lg:gap-8">
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
              <div>{indiaAddress}</div>
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
              <div>{usAddress}</div>
            </address>
            <div className="flex flex-col gap-2">
              <div>
                <Link href={`mailto:${email}`} target="_blank" title="Mail">
                  {email}
                </Link>
              </div>
              <div>
                <a href={`tel:${phone}`} target="_blank" title="Tel">
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              {socialIcons.map(social => (
                <a
                  key={social.label}
                  href={social.redirect_url || "/"}
                  className="size-6 md:size-8"
                  target="_blank"
                  title={social.label}
                >
                  <Image
                    src={social.icon!}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="size-full"
                  />
                </a>
              ))}
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-8/12">
            <Grid>
              {/* Company */}
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title="Company"
                  groups={[{ title: "", items: companyMenuItems }]}
                />
              </Grid.Col>

              {/* Solutions */}
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title="Solutions"
                  groups={[{ title: "", items: solutionsMenuItems }]}
                />
              </Grid.Col>

              {/* Services */}
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title="Services"
                  groups={[{ title: "", items: servicesMenuItems }]}
                />
              </Grid.Col>

              {/* Liferay */}
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title="Liferay"
                  groups={[{ title: "", items: liferayMenuItems }]}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className="flex flex-wrap gap-y-2 gap-x-4 md:gap-x-6 lg:gap-x-7 items-center justify-center border-t border-t-dark-300 py-4 md:py-6 lg:py-8 mt-4 md:mt-8 lg:mt-10 xl:mt-12 text-center">
          {certificates.map(cert => (
            <Image
              key={cert.label}
              src={cert.image}
              alt={cert.label}
              width={70}
              height={70}
              className="h-12 md:h-16 lg:h-18 w-auto max-w-40 md:max-w-52 lg:max-w-80"
            />
          ))}
        </div>
        <div className="border-t border-t-dark-300 py-3 md:py-4 text-center">
          <div dangerouslySetInnerHTML={{ __html: copyrights }} />
        </div>
      </div>
    </footer>
  );
}
