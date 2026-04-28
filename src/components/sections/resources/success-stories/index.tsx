import Image from "next/image";
import Link from "next/link";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

interface StoryCard {
  image: string;
  imageAlt: string;
  href: string;
  linkTitle: string;
  description: string;
}

const stories: StoryCard[] = [
  {
    image: "/images/dummy/service_banner.png.webp",
    imageAlt:
      "Intranet Portal For A Semi Government Organization Based In Saudi Arabia",

    href: "/case-study/intranet-portal-for-a-semi-government-organization-based-in-saudi-arabia/",
    linkTitle:
      "Empowered Seamless Collaboration with Intranet Portal for a Semi-Government Transportation Body",
    description:
      "Employee Engagement Portal for a Semi Government Organization based in Saudi Arabia Aixtor helped a Saudi Arabia-based government body.",
  },
  {
    image: "/images/dummy/service_banner.png.webp",
    imageAlt:
      "Intranet Portal For A Semi Government Organization Based In Saudi Arabia",

    href: "/case-study/intranet-portal-for-a-semi-government-organization-based-in-saudi-arabia/",
    linkTitle:
      "Empowered Seamless Collaboration with Intranet Portal for a Semi-Government Transportation Body",
    description:
      "Employee Engagement Portal for a Semi Government Organization based in Saudi Arabia Aixtor helped a Saudi Arabia-based government body.",
  },
  {
    image: "/images/dummy/service_banner.png.webp",
    imageAlt:
      "Intranet Portal For A Semi Government Organization Based In Saudi Arabia",

    href: "/case-study/intranet-portal-for-a-semi-government-organization-based-in-saudi-arabia/",
    linkTitle:
      "Empowered Seamless Collaboration with Intranet Portal for a Semi-Government Transportation Body",
    description:
      "Employee Engagement Portal for a Semi Government Organization based in Saudi Arabia Aixtor helped a Saudi Arabia-based government body.",
  },
  {
    image: "/images/dummy/service_banner.png.webp",
    imageAlt: "Liferay Upgrade From 6.0 To DXP",

    href: "/case-study/liferay-upgrade-from-6-0-to-liferay-dxp/",
    linkTitle:
      "Powering the Future of Medical Education of a US Organization with Liferay DXP Upgrade",
    description:
      "Aixtor partnered with a top medical education organization in the USA to upgrade their student service portal from Liferay 6.0 to DXP 7.1, enhancing operational agility and user experience.",
  },
];

const StoryCard = ({
  image,
  imageAlt,

  href,
  linkTitle,
  description,
}: StoryCard) => (
  <Link href={href} className="group block h-full">
    <div
      className="flex flex-col h-full rounded-2xl p-4
             transition-all duration-700 ease-in-out
             group-hover:-translate-y-1 group-hover:shadow-card-xl"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-dark-200">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
        {/* Right-side Overlay Title */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 pl-[42%]"></div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-5 px-2 pb-2">
        <Typography
          variant="h3"
          size="h6"
          className="font-semibold leading-snug text-dark
                     transition-all duration-200
                     group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-secondary
                     group-hover:bg-clip-text group-hover:text-transparent"
        >
          {linkTitle}
        </Typography>

        <Typography variant="p" size="p" className="text-dark-400">
          {description}
        </Typography>
      </div>
    </div>
  </Link>
);

const SuccessStories = () => {
  return (
    <section className="bg-white common-section">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center common-heading">
          <Typography
            variant="h2"
            size="h3"
            isTitle
            isCenter
            className="text-dark mb-5"
          >
            Success Stories
          </Typography>
          <Typography
            variant="p"
            size="p"
            className="text-dark-400 max-w-4xl mx-auto text-center"
          >
            We offer a wide range of Digital Solutions that are flexible to
            client demands and feature many options to choose from in order to
            really get the most out of your organization&apos;s resources.
          </Typography>
        </div>

        {/* Stories Grid */}
        <Grid size="lg">
          {stories.map((story, index) => (
            <Grid.Col key={index} className="w-full md:w-1/2 mb-6">
              <StoryCard {...story} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default SuccessStories;
