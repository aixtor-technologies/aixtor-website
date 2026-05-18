import Image from "next/image";
import Link from "next/link";

import Grid from "@/components/ui/grid";
import FooterMenuSection from "@/components/shared/footer-menu";

import HttpService from "@/shared/services/http.service";

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
      footer_menu_item: {
        menu_title: string;
        menu_list: {
          field_69fdc14ea7ea3: string;
          field_69fdc14ea7ea4: string;
        }[];
      }[];
    };
  };
};

export default async function Footer() {
  const footerRes = await HttpService.nativeFetch<FooterApiResponse>(
    "common-options/footer",
    { method: "GET" }
  ).catch(() => null);

  const footer = footerRes?.data?.footer ?? null;

  const indiaAddress = footer?.india_address ?? "";
  const usAddress = footer?.us_address ?? "";
  const email = footer?.email ?? "";
  const phone = footer?.phone ?? "";
  const copyrights = footer?.copyrights ?? "";
  const certificates = footer?.certificates ?? [];
  const socialIcons = footer?.social_icons ?? [];
  const menuItems = footer?.footer_menu_item ?? [];

  const [liferayServices, websiteServices, solution, company] = menuItems;

  const toItems = (group: (typeof menuItems)[0] | undefined) =>
    (group?.menu_list ?? []).map(item => ({
      title: item.field_69fdc14ea7ea3,
      url: item.field_69fdc14ea7ea4 ? `/${item.field_69fdc14ea7ea4}` : "/",
    }));

  return (
    <footer className="pt-8 lg:pt-10 xl:pt-12 pb-2 bg-white">
      <div className="container">
        <Grid className="gap-y-6">
          <Grid.Col className="md:w-4/12 flex flex-col gap-3 md:gap-6 lg:gap-8">
            <Link href="/" className="block w-40" title="Aixtor Technologies">
              <Image
                src="/images/logo.svg"
                alt="Aixtor Technologies"
                width="143"
                height="65"
                className="w-full"
              />
            </Link>
            <address className="flex items-start gap-2 not-italic text-base">
              <Image
                src="/images/ind-flag.svg"
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
                src="/images/usa-flag.svg"
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
                    src={social.icon || "/images/placeholder/placeholder.jpg"}
                    alt={social.label || "social-icon"}
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
              <Grid.Col className="sm:w-6/12 md:w-4/12 flex flex-col gap-8">
                <FooterMenuSection
                  title={liferayServices?.menu_title ?? ""}
                  items={toItems(liferayServices)}
                />
                <FooterMenuSection
                  title={company?.menu_title ?? ""}
                  items={toItems(company)}
                />
              </Grid.Col>
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title={websiteServices?.menu_title ?? ""}
                  items={toItems(websiteServices)}
                />
              </Grid.Col>
              <Grid.Col className="sm:w-6/12 md:w-4/12">
                <FooterMenuSection
                  title={solution?.menu_title ?? ""}
                  items={toItems(solution)}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className="flex flex-wrap gap-y-2 gap-x-4 md:gap-x-6 lg:gap-x-7 items-center justify-center border-t border-t-dark-300 py-4 md:py-6 lg:py-8 mt-4 md:mt-8 lg:mt-10 xl:mt-12 text-center">
          {certificates.map(cert => (
            <Image
              key={cert.label}
              src={cert.image || "/images/placeholder/placeholder.jpg"}
              alt={cert.label || "certificate"}
              width={70}
              height={70}
              className="h-12 md:h-16 lg:h-18 w-auto max-w-40 md:max-w-52 lg:max-w-80"
            />
          ))}
        </div>
        {/** privacy policy and cookies policy */}
        <div className="border-t border-t-dark-300 py-3 md:py-4 text-center">
          <div
            className="[&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-primary"
            dangerouslySetInnerHTML={{ __html: copyrights }}
          />
        </div>
      </div>
    </footer>
  );
}
