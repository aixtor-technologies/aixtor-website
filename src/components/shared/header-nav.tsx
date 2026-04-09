import Link from "next/link";


const navLinks = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Solution", href: "/solution", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: false },
  { label: "Company", href: "/company", hasDropdown: true },
  { label: "Blog", href: "/blog", hasDropdown: false },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

export default function HeaderNav() {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {
        navLinks.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-sm lg:text-base font-semibold hover:text-white/80 transition-colors flex items-center gap-1"
          >
            {link.label}
            {link.hasDropdown && (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </Link>
        ))
      }
    </nav>
  );
}
