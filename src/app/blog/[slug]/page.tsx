import BlogDetail from "@/components/sections/blog/blog-details";
import BlogSlider from "@/components/sections/resources/blogs-slider";
import BannerDetails, {
  BannerSection,
} from "@/components/shared/banner-details";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type BlogAcfFields = {
  category_name: boolean | string;
  title: string;
  blog_image: boolean | string;
  blog_post_date: string;
  author_name: string;
  author_image: boolean | string;
  author_description: string;
  author_linkedin_url: string;
  content: string;
  faq_section: boolean | string;
};

type BlogApiResponse = {
  id: number;
  title: string;
  description: string;
  slug: string;
  acf_fields: BlogAcfFields;
  seo: any;
};

async function fetchBlog(slug: string): Promise<BlogApiResponse | null> {
  try {
    const res = await HttpService.nativeFetch<BlogApiResponse>(
      `blogs/${slug}`,
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Blog content:", error);
    return null; // Return fallback so UI can handle it
  }
}

function mapBlogToBannerSection(blog: BlogApiResponse): BannerSection {
  const { acf_fields, title } = blog;

  return {
    title: acf_fields.title || title,
    side_image: {
      url:
        typeof acf_fields.blog_image === "string"
          ? acf_fields.blog_image
          : "/images/icons/blog-detail.webp",
      alt: acf_fields.title || title,
    },
    ...(acf_fields.author_name && {
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
    ...(acf_fields.blog_post_date && {
      date: acf_fields.blog_post_date,
    }),
  };
}
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return <div>Failed to load blog</div>;
  }

  const bannerData = mapBlogToBannerSection(blog);
  const badge = "Blog";
  const blogContent = blog.acf_fields.content || blog.description;
  // TODO: Fetch content_blocks and recent_blogs from API when available
  const contentBlocks: any[] = [];
  const recentBlogs: any[] = [];

  return (
    <>
      <BannerDetails badge={badge} banner_section={bannerData} />
      <BlogDetail
        content={blogContent}
        content_blocks={contentBlocks}
        recent_blogs={recentBlogs}
      />
      <BlogSlider blogs={[]} />
      {/* other blog sections go here */}
    </>
  );
}
