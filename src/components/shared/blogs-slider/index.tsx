"use client";

import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";
import CustomSlider from "@/components/ui/custom-slider";
import BlogCard from "../../sections/blog/blog-card";

type Blog = {
  title: string;
  image: string;
  description: string;
  slug: string;
};

type BlogSliderProps = {
  blogs?: Blog[];
};

const BlogSlider = ({ blogs = [] }: BlogSliderProps) => {
  return (
    <section className="common-section">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 p-3">
          <div className="max-w-xl">
            <Typography
              variant="h2"
              size="h2"
              isTitle
              className="text-dark mb-4"
            >
              Latest Blogs
            </Typography>
            <Typography variant="p" size="p" className="text-dark-400">
              Stay up to date with the latest insights, trends, and best
              practices in enterprise portal development and digital
              transformation.
            </Typography>
          </div>

          {/* Right: CTA — aligned to the first line of the title */}
          <div className="shrink-0 pt-2">
            <Button href="/blog" variant="default">
              View all blogs
            </Button>
          </div>
        </div>

        {/* ── Slider ── */}
        <CustomSlider
          arrow
          infinite={false}
          itemClassName="px-2 lg:px-3"
          className=""
        >
          {blogs.map((blog, index) => (
            <div key={index} className="w-72 sm:w-80 md:w-96 h-full flex">
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
