import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import BlogList from "@/components/sections/blog/blog-list";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

async function fetchBlogs(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "services?page=1&per_page=20",
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
export default async function BlogPage() {
  const blogs = await fetchBlogs();
  return (
    <>
      <Banner
        title="Blogs"
        description="Find answers, inspiration, and expert advice in our comprehensive blogs along with staying updated with industry trends, exploring new perspectives, and innovative solutions."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <BlogList
        title="Related Blog Posts"
        description="We offer a wide range of Digital Solutions that are flexible to client demands and feature many options to choose from in order to really get the most out of your organization’s resources."
        items={blogs.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
