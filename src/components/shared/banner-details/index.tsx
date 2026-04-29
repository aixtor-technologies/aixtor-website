"use client";

import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

export type DescriptionItem = {
  description: string;
};

export type SideImage = {
  url: string;
  alt?: string;
};

export type Author = {
  name: string;
  avatar: string;
  bio: string;
  linkedin_url?: string;
};

export type BannerSection = {
  title: string;
  side_image: SideImage | string;
  // Solution / service variant
  cta_title?: string;
  description_list?: DescriptionItem[];
  // Blog variant
  author?: Author;
  date?: string;
};

export type BannerDetailsProps = {
  badge?: string;
  banner_section: BannerSection;
};

export default function BannerDetails({
  badge,
  banner_section,
}: BannerDetailsProps) {
  const { title, side_image, cta_title, description_list, author, date } =
    banner_section;

  const imageSrc = typeof side_image === "string" ? side_image : side_image.url;
  const imageAlt =
    typeof side_image === "string" ? title : side_image.alt || title;

  const isBlogVariant = !!author;

  return (
    <section className="banner-details bg-dark-200 pt-20 pb-15 lg:pt-24 lg:pb-18">
      <div className="container">
        <Grid className="items-center">
          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <Grid.Col className="w-full md:w-5/12 flex flex-col gap-6">
            {/* Badge */}
            {badge && (
              <span className="inline-flex items-center w-fit px-4 py-1.5 rounded-lg bg-(--pale_pink) text-(--purplecolor) text-sm font-semibold">
                {badge}
              </span>
            )}

            {/* Title */}
            <Typography variant="h1" size="h2" className="text-dark">
              {title}
            </Typography>

            {/* ── Blog variant ── */}
            {isBlogVariant && (
              <>
                <div className="border-t border-dark-300 pt-5 flex flex-col gap-4">
                  <Typography
                    variant="h2"
                    size="h5"
                    className="text-dark font-bold"
                  >
                    About Author
                  </Typography>

                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-dark-300">
                      <Image
                        src={author!.avatar}
                        alt={author!.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name */}
                    <Typography
                      variant="p"
                      size="p"
                      className="text-dark font-semibold flex-1"
                    >
                      {author!.name}
                    </Typography>

                    {/* LinkedIn */}
                    {author!.linkedin_url && (
                      <a
                        href={author!.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${author!.name} on LinkedIn`}
                        className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Bio */}
                  <Typography
                    size="p"
                    className="text-dark-400 leading-relaxed"
                  >
                    {author!.bio}
                  </Typography>
                </div>

                {/* Date */}
                {date && (
                  <Typography size="p" className="text-dark font-semibold">
                    {date}
                  </Typography>
                )}
              </>
            )}

            {/* ── Solution / service variant ── */}
            {!isBlogVariant && (
              <>
                {description_list && description_list.length > 0 && (
                  <ul className="flex flex-col gap-3">
                    {description_list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Image
                          src="/images/icons/Group.svg"
                          alt=""
                          width={18}
                          height={18}
                          className="mt-1 shrink-0"
                        />
                        <Typography size="p" className="text-dark-400">
                          {item.description.trim()}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                )}

                {cta_title && (
                  <div>
                    <Button href="/contact" className="mt-2">
                      {cta_title}
                    </Button>
                  </div>
                )}
              </>
            )}
          </Grid.Col>

          {/* ── RIGHT ─────────────────────────────────────────────────── */}
          <Grid.Col className="w-full md:w-7/12 flex justify-center md:justify-end mt-10 md:mt-0">
            <div className="w-full max-w-140 rounded-xl border-2 border-dark-300 p-3">
              <div className="w-full rounded-xl border-2 border-dark-300 p-3">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={560}
                  height={420}
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="w-full h-auto object-contain rounded-lg shadow-card-xl"
                  priority
                />
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
}
