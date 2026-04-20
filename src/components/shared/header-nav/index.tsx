
import HeaderNavClient from "./header-nav-client";


// ─── Types ────────────────────────────────────────────────────────────────────

export type MenuItem = {
  title: string;
  items: DropdownItem[];
};

export type DropdownItem = {
  label: string;
  href: string;
  icon?: string;
};

export type NavLink = {
  label: string;
  href: string;
  megamenu?: boolean;
  dropdown?: MenuItem[] | DropdownItem[];
  /** Pre-computed layout class — calculated once on the server, never on client */
  megaMenuGridClass?: string;
  useSplitMegaLayout?: boolean;
};

// ─── API Types ────────────────────────────────────────────────────────────────

type ApiChild = {
  title: string;
  url: string;
  icon: string | false;
  children: ApiChild[];
};

type ApiItem = {
  title: string;
  url: string;
  icon: string | false;
  is_mega_menu: boolean;
  children: ApiChild[];
};

type ApiResponse = {
  status: string;
  data: {
    menu_id: number;
    menu_slug: string;
    menu_title: string;
    items: ApiItem[];
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Transforms API response AND pre-computes all layout classes server-side.
 * This means zero layout calculations happen during client renders.
 */
function transformNavLinks(response: ApiResponse): NavLink[] {
  return response.data.items.map(item => {
    if (!item.children || item.children.length === 0) {
      return { label: item.title, href: item.url };
    }

    if (item.is_mega_menu) {
      const groups: MenuItem[] = chunkArray(item.children, 7).map(
        (chunk, i) => ({
          title: i === 0 ? item.title : "",
          items: chunk.map(child => ({
            label: child.title,
            href: child.url,
            icon: child.icon || undefined,
          })),
        })
      );

      // ✅ Pre-compute layout classes here once — never recalculated on client
      const hasLargeGroup = groups.some(g => g.items.length > 6);
      const useSplitMegaLayout = groups.length === 2 && hasLargeGroup;
      let megaMenuGridClass = "grid-cols-1";
      if (useSplitMegaLayout) megaMenuGridClass = "grid-cols-3";
      else if (groups.length === 2) megaMenuGridClass = "grid-cols-2";

      return {
        label: item.title,
        href: item.url,
        megamenu: true,
        dropdown: groups,
        megaMenuGridClass,
        useSplitMegaLayout,
      };
    }

    return {
      label: item.title,
      href: item.url,
      megamenu: false,
      dropdown: item.children.map(child => ({
        label: child.title,
        href: child.url,
        icon: child.icon || undefined,
      })),
    };
  });
}

// ─── Server Component ─────────────────────────────────────────────────────────

export default  function HeaderNav({ data }: { data: ApiResponse }) {
  let navLinks: NavLink[] = [];
  console.log("Raw API response for menu:", data);
  try {
    navLinks = transformNavLinks(data);
  } catch (err) {
    console.error("Failed to load navigation:", err);
    return null;
  }

  return <HeaderNavClient navLinks={navLinks} />;
}
