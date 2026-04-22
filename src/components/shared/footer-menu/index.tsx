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
  title?: string;
  groups: MenuGroup[];
};

function FooterMenuSection({ title, groups }: FooterMenuSectionProps) {
  const validGroups = groups?.filter(group => group.items?.length);

  if (!validGroups?.length) return null;

  return (
    <div>
      {title && (
        <Typography variant="h4" size="h5" className="mb-4 font-bold">
          {title}
        </Typography>
      )}

      {validGroups.map(({ title: groupTitle, items }, index) => (
        <div key={`${groupTitle}-${index}`} className="mb-4">
          {/* ✅ Group Title */}
          {groupTitle && (
            <Typography variant="h4" size="h6" className="mb-3 font-bold">
              {groupTitle}
            </Typography>
          )}

          {/* ✅ Menu Items */}
          <ul className="flex flex-col gap-1 md:gap-2" aria-label={groupTitle}>
            {items.map(({ title: itemTitle, url }, idx) => (
              <li key={`${itemTitle}-${idx}`}>
                <Link
                  href={url}
                  title={itemTitle}
                  className="hover:text-primary transition-colors"
                >
                  {itemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterMenuSection;
