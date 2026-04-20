import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import ListSection from "@/components/shared/list-section";
import StartConversation from "@/components/shared/start-conversation";

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
      <ListSection
        title="Innovative Solutions Tailored to Your Business Needs"
        description="Aixtor offers a diverse range of solutions customized to meet your unique business needs. We provide transformative solutions to empower your business digitally. Our primary focus is on providing innovative solutions with a team of experts while partnering with you to unlock new opportunities for your business in the digital world."
        items={blogs.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
