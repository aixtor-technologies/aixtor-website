import Image from "next/image";

import Typography from "@/components/ui/typography";

import IconStarFill from "@/components/shared/icons/star-fill";

type ReviewItem = {
  review_image: string | null;
  review_rating: string | null;
  review_description: string | null;
  review_label?: string | null;
};

type ReviewHighlight = {
  review_items?: ReviewItem[];
};

type Props = {
  review_highlight?: ReviewHighlight;
};

const RatingSection = ({ review_highlight }: Props) => {
  const items =
    review_highlight?.review_items?.filter(
      item => item.review_image || item.review_rating || item.review_description
    ) ?? [];

  if (!items.length) return null;

  return (
    <div className="w-full pt-6 lg:pt-16 xl:pt-24 pb-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex text-center px-6 xl:px-10 border-s-2 border-white first:border-0"
          >
            <div className="-my-4">
              {item.review_image && (
                <Image
                  src={item.review_image || "/images/placeholder/placeholder.jpg"}
                  alt={item.review_label || "review-img"}
                  width={122}
                  height={40}
                  className="h-10 w-auto inline-flex"
                />
              )}
              <div className="flex justify-center items-center gap-px my-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="size-5">
                    <IconStarFill />
                  </span>
                ))}
              </div>
              {item.review_rating && (
                <Typography size="h5" className="font-bold">
                  {item.review_rating}
                </Typography>
              )}

              {item.review_description && (
                <Typography size="h5" className="mt-3 md:mt-4 xl:mt-5">
                  {item.review_description}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSection;
