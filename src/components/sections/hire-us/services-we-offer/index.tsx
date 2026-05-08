import Link from "next/link";
import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type ServiceItem = {
  icon?: string;
  title: string;
  description?: string;
  page_link?: string;
};

type ServicesWeOfferProps = {
  title: string;
  description: string;
  items?: ServiceItem[];
  cta_title?: string;
};

const ServicesWeOffer = ({
  title,
  description,
  items = [],
  cta_title = "Consult today",
}: ServicesWeOfferProps) => {
  return (
    <section className="common-section">
      <div className="container">
        <Grid className="common-heading justify-center">
          <Grid.Col className="md:w-10/12 lg:w-8/12">
            <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
              {title}
            </Typography>
            <Typography size="h6" className="text-center">
              {description}
            </Typography>
          </Grid.Col>
        </Grid>

        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          {items.map((item, index) => (
            <Grid.Col key={index} className="md:w-6/12">
              <div className="group gradient-card min-h-full body-border p-3 lg:p-4 xl:p-5 border rounded-md relative">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="size-8 lg:size-10 mb-3"
                  />
                )}
                <Typography
                  size="h5"
                  className="font-semibold my-1.5 md:my-2 lg:my-4 text-dark group-hover:text-primary"
                >
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography>{item.description}</Typography>
                )}
                {item.page_link && (
                  <Link href={item.page_link} className="inset-0 absolute z-1" />
                )}
              </div>
            </Grid.Col>
          ))}
        </Grid>

        <div className="text-center mt-6 md:mt-7 lg:mt-8 xl:mt-10">
          <Button href="/contact">{cta_title}</Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesWeOffer;
