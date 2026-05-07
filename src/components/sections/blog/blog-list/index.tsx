"use client";

import { useState } from "react";

import BlogCard from "../blog-card";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type ListItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
};

type BlogListProps = {
  title: string;
  description: string;
  initialItems: ListItem[];
  perPage: number;
};

const BlogList = ({ title, description, initialItems, perPage }: BlogListProps) => {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length >= perPage);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await HttpService.nativeFetch<TApiResponse<any>>(
        `blogs?page=${nextPage}&per_page=${perPage}`,
        { method: "GET" }
      );
      const newItems: ListItem[] = Array.isArray(res?.data) ? res.data : [];
      setItems(prev => [...prev, ...newItems]);
      setPage(nextPage);
      if (newItems.length < perPage) setHasMore(false);
    } catch {
      // silently fail — existing items remain
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* Heading */}
        <div className="common-heading">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            {title}
          </Typography>
          <Typography size="h6" className="text-center">
            {description}
          </Typography>
        </div>

        {/* List */}
        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          {items.map(item => (
            <Grid.Col key={item.id} className="md:w-6/12 lg:w-4/12">
              <BlogCard
                title={item.title}
                description={item.description}
                image={item.image}
                slug={item.slug}
              />
            </Grid.Col>
          ))}
        </Grid>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-8 md:mt-10">
            <Button variant="outline" onClick={loadMore} isLoading={loading}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
