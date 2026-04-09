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

export default function FooterMenuSection({
  title,
  items,
}: FooterMenuSectionProps) {
  return (
    <div>
      <Typography variant="h6" size="h6" className="mb-3 font-bold">
        {title}
      </Typography>
      <ul className="flex flex-col gap-1 md:gap-2">
        {items.map(item => (
          <li key={item.title}>
            <Link href={item.url} title={item.title}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
