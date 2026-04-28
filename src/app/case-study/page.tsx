import BlogSlider from "@/components/sections/resources/blogs-slider";
import SuccessStories from "@/components/sections/resources/success-stories";
import Banner from "@/components/shared/banner";
import StartConversation from "@/components/shared/start-conversation";

export default function ResourcesPage() {
  return (
    <>
      <Banner
        title={"Case Studies"}
        imgUrl={"/images/dummy/service_banner.png.webp"}
        description={
          "Read through our case studies to know how our solutions and services are driving growth in businesses like yours!"
        }
      />
      <SuccessStories />
      <BlogSlider />
      <StartConversation />
    </>
  );
}
