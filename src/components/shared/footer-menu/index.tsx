import Link from "next/link";

import Typography from "@/components/ui/typography";

type MenuItem = {
  title: string;
  url: string;
};

type FooterMenuSectionProps = {
  title: string;
  items: MenuItem[];
};

function FooterMenuSection({ title, items }: FooterMenuSectionProps) {
  if (!title || !items?.length) return null;

  return (
    <div>
      <Typography variant="h4" size="h5" className="mb-4 font-bold">
        {title}
      </Typography>
      <ul className="flex flex-col gap-1 md:gap-2" aria-label={title}>
        {items.map(({ title: itemTitle, url }, idx) => (
          <li key={`${itemTitle}-${idx}`}>
            <Link
              href={url || "/"}
              title={itemTitle}
              className="relative transition-all duration-500 hover:text-dark after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-linear-to-r after:from-primary after:to-secondary after:transition-all after:duration-500 hover:after:w-full"
            >
              {itemTitle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterMenuSection;
