import Banner from "@/components/shared/banner";
import BlogList from "@/components/sections/blog/blog-list";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

type BlogItem = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  slug: string;
};

type BlogPageData = {
  status: string;
  page_header: {
    banner_section: {
      title: string;
      description: string;
      side_image: string;
    };
    related: {
      title: string;
      description: string;
    };
  };
  data: BlogItem[];
  pagination: any;
};
async function fetchBlogsPage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "blogs",
      { method: "GET" }
    );
    return res || null;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return null;
  }
}
async function fetchBlogsPage(): Promise<BlogPageData | null> {
  try {
    const res = await HttpService.nativeFetch<BlogPageData>("blogs", {
      method: "GET",
    });
    return res || null;
  } catch (error) {
    console.error("Failed to fetch blogs page:", error);
    return null;
  }
}
export default async function BlogPage() {
  const blogData = await fetchBlogsPage();

  if (!blogData) {
    return <div>Failed to load blogs</div>;
  }

  return (
    <>
      <Banner
        title={blogData.page_header.banner_section.title}
        description={blogData.page_header.banner_section.description}
        imgUrl={blogData.page_header.banner_section.side_image}
      />
      <BlogList
        title={blogData.page_header.related.title}
        description={blogData.page_header.related.description}
        items={blogData.data}
      />
      <StartConversation />
    </>
  );
}
