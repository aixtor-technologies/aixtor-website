import Link from "next/link";
import Typography from "@/components/ui/typography";

type MenuItem = {
  title: string;
  url: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type FooterMenuSectionProps = {
  title?: string; // ✅ NEW
  groups: MenuGroup[];
};

export default function FooterMenuSection({
  title,
  groups,
}: FooterMenuSectionProps) {
  if (!groups.length) return null;

  return (
    <div>
      {/* ✅ Section Title */}
      {title && (
        <Typography variant="h4" size="h5" className="mb-4 font-bold">
          {title}
        </Typography>
      )}

      {groups.map(group => (
        <div key={group.title} className="mb-4">
          {group.title && (
            <Typography variant="h4" size="h6" className="mb-3 font-bold">
              {group.title}
            </Typography>
          )}

          <ul className="flex flex-col gap-1 md:gap-2">
            {group.items.map(item => (
              <li key={item.title}>
                <Link href={item.url} title={item.title}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
