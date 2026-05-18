import BlogDetail from "@/components/sections/blog/blog-details";
import BlogSlider from "@/components/shared/blogs-slider";
import FaqSection from "@/components/shared/faq";
import BannerDetails, {
  BannerSection,
} from "@/components/shared/banner-details";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function fetchBlog(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `blogs/${slug}`,
      { method: "GET" }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Blog content:", error);
    return null;
  }
}

async function fetchBlogs(): Promise<any[]> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "blogs?page=1&per_page=6",
      { method: "GET" }
    );
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function fetchBlogImage(slug: string): Promise<string> {
  try {
    const res = await HttpService.nativeFetch<any>(`blogs/${slug}`, { method: "GET" });
    const img = res?.acf_fields?.blog_image;
    return typeof img === "string" ? img : typeof img === "object" && img?.url ? img.url : "";
  } catch {
    return "";
  }
}

function mapBlogToBannerSection(blog: any): BannerSection {
  const { acf_fields, title } = blog;

  return {
    title: acf_fields?.title || title,
    side_image: {
      url:
        typeof acf_fields?.blog_image === "string"
          ? acf_fields.blog_image
          : "/images/icons/blog-detail.webp",
      alt: acf_fields?.title || title,
    },
    ...(acf_fields?.author_name && {
      author: {
        name: acf_fields.author_name,
        avatar:
          typeof acf_fields.author_image === "string"
            ? acf_fields.author_image
            : "/images/icons/default-avatar.webp",
        bio: acf_fields.author_description,
        linkedin_url: acf_fields.author_linkedin_url,
      },
    }),
    ...(acf_fields?.blog_post_date && {
      date: acf_fields.blog_post_date,
    }),
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [blog, blogs] = await Promise.all([fetchBlog(slug), fetchBlogs()]);

  if (!blog) {
    return <div>Failed to load blog</div>;
  }

  const bannerData = mapBlogToBannerSection(blog);
  const blogContent = blog?.acf_fields?.content || blog?.description;
  const faqSection = { faq: blog?.acf_fields?.faq_section ?? [] };

  // List API returns image:null — fetch each blog individually to get the actual image
  const blogImages = await Promise.all(
    blogs.map((b: any) => fetchBlogImage(b.slug))
  );

  const recentBlogs = blogs.map((b: any, i: number) => ({
    id: b.id,
    title: b.title,
    image: blogImages[i],
    slug: b.slug,
  }));

  return (
    <>
      <BannerDetails badge="Blog" banner_section={bannerData} />
      <BlogDetail
        content={blogContent}
        recent_blogs={recentBlogs}
      />
      <FaqSection faq_section={faqSection} />
      <BlogSlider blogs={blogs} />
    </>
  );
}
