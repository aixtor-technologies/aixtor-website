import Banner from "@/components/shared/banner";
import BlogList from "@/components/sections/blog/blog-list";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

const PER_PAGE = 9;

async function fetchBlogsPage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `blogs?page=1&per_page=${PER_PAGE}`,
      { method: "GET" }
    );
    return res || null;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return null;
  }
}

export default async function BlogPage() {
  const blogData = await fetchBlogsPage();
  return (
    <>
      <Banner
        title={blogData?.page_header?.banner_section?.title}
        description={blogData?.page_header?.banner_section?.description}
        imgUrl={blogData?.page_header?.banner_section?.side_image}
      />
      <BlogList
        title={blogData?.page_header?.related?.title}
        description={blogData?.page_header?.related?.description}
        initialItems={Array.isArray(blogData?.data) ? blogData.data : []}
        perPage={PER_PAGE}
      />
      <StartConversation />
    </>
  );
}
