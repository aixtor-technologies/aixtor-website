import BannerDetails, {
  BannerSection,
} from "@/components/shared/banner-details";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ── TODO: replace with API call when ready ─────────────────────────────────
const STATIC_BLOG_BANNER: BannerSection = {
  title:
    "Digital DSA Onboarding for NBFCs: Streamlining Agent KYC, Verification, and Activation",
  side_image: {
    url: "/images/icons/blog-detail.webp",
    alt: "Digital DSA Onboarding for NBFCs",
  },
  author: {
    name: "Purvesh Kachhiya",
    avatar: "/images/icons/Purvesh-Kachhiya.webp",
    bio: "Expert in Liferay DXP, Java, and enterprise cloud solutions, delivering secure, scalable, high-performance platforms with a strong focus on quality and innovation.",
    linkedin_url: "https://linkedin.com/in/purvesh-kachhiya",
  },
  date: "April 23, 2026",
};

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: replace static data with API call
  // const blog = await fetchBlog(slug);
  // if (!blog?.acf_fields) return null;
  // const bannerData: BannerSection = { ...blog.acf_fields.banner_section };

  const bannerData = STATIC_BLOG_BANNER;
  const badge = "Blog";

  return (
    <>
      <BannerDetails badge={badge} banner_section={bannerData} />
      {/* other blog sections go here */}
    </>
  );
}
