"use client";

import Typography from "@/components/ui/typography";
import CustomSlider from "@/components/ui/custom-slider";
import BlogCard from "../../blog/blog-card";

type Blog = {
  title: string;
  image: string;
  description: string;
  slug: string;
};

const blogs: Blog[] = [
  {
    title: "How Intranet Portals Improve Employee Engagement",
    image: "/images/dummy/blog1.webp",
    description:
      "Discover how a modern intranet portal can transform employee engagement and boost productivity across your organization.",
    slug: "/blog/intranet-portals-improve-employee-engagement",
  },
  {
    title: "Top Features to Look for in an Enterprise Intranet",
    image: "/images/dummy/blog2.webp",
    description:
      "Explore the must-have features that make enterprise intranet solutions effective for large-scale organizations.",
    slug: "/blog/top-features-enterprise-intranet",
  },
  {
    title: "Liferay DXP vs SharePoint: Which is Right for You?",
    image: "/images/dummy/blog1.webp",
    description:
      "A detailed comparison of Liferay DXP and SharePoint to help you choose the best platform for your business needs.",
    slug: "/blog/liferay-dxp-vs-sharepoint",
  },
  {
    title: "How to Successfully Migrate to Liferay DXP",
    image: "/images/dummy/blog2.webp",
    description:
      "Step-by-step guide on migrating your legacy portal to Liferay DXP without disrupting your day-to-day operations.",
    slug: "/blog/migrate-to-liferay-dxp",
  },
  {
    title: "Building a Knowledge Hub with Intranet Solutions",
    image: "/images/dummy/blog1.webp",
    description:
      "Learn how to create a centralized knowledge hub using intranet tools to improve information sharing across departments.",
    slug: "/blog/knowledge-hub-intranet-solutions",
  },
];

const BlogSlider = () => {
  return (
    <section className="common-section">
      <div className="container">
        <div className="text-center common-heading">
          <Typography variant="h2" size="h2" isTitle isCenter className="text-dark mb-5">
            Latest Blogs
          </Typography>
          <Typography variant="p" size="p" className="text-dark-400 max-w-3xl mx-auto">
            Stay up to date with the latest insights, trends, and best practices
            in enterprise portal development and digital transformation.
          </Typography>
        </div>

        <CustomSlider
          arrow
          infinite={false}
          itemClassName="px-2 lg:px-3 py-10"
          className="-my-10"
        >
          {blogs.map((blog, index) => (
            <div key={index} className="w-72 sm:w-80 md:w-96 h-full">
              <BlogCard
                title={blog.title}
                image={blog.image}
                description={blog.description}
                slug={blog.slug}
              />
            </div>
          ))}
        </CustomSlider>
      </div>
    </section>
  );
};

export default BlogSlider;
