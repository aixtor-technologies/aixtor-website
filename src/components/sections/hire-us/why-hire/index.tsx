import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type WhyHireItem = {
  icon?: string;
  title: string;
  description?: string;
};

type WhyHireProps = {
  title: string;
  items?: WhyHireItem[];
  cta_title?: string;
};

const WhyHire = ({ title, items = [], cta_title = "Hire experts!" }: WhyHireProps) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="common-heading justify-center">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            {title}
          </Typography>
        </div>

        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          {items.map((item, index) => (
            <Grid.Col key={index} className="md:w-6/12 lg:w-4/12">
              <div className="group lg:min-h-52 hover:shadow-2xl bg-white p-3 lg:p-4 xl:p-5 rounded-2xl lg:rounded-3xl relative overflow-hidden">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="size-10 lg:size-12 xl:size-15"
                  />
                )}
                <Typography
                  size="h5"
                  className="font-semibold mt-1.5 md:mt-2 lg:mt-4 text-dark"
                >
                  {item.title}
                </Typography>
                {item.description && (
                  <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible size-full inset-0 text-white p-3 lg:p-4 xl:p-5 flex absolute bg-dark/80 backdrop-blur-xs z-1 transition-all duration-300">
                    <p className="m-auto w-full">{item.description}</p>
                  </div>
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

export default WhyHire;
