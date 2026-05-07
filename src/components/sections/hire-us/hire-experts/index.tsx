import Image from "next/image";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

const HireExperts = ({
  title,
  description,
  imgUrl,
}: {
  title: string;
  description: string;
  imgUrl: string;
}) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          <Grid.Col className="md:w-6/12">
            <Image src={imgUrl || "/images/placeholder/placeholder.jpg"} alt={title || "hire-experts-img"} width={621} height={407} />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <Typography size="h2" isTitle className="font-semibold mb-4">
              {title}
            </Typography>
            <Typography size="h6" className="my-5 md:my-6 xl:my-7">
              {description}
            </Typography>
            <Button variant="outline">Hire Experts Now</Button>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default HireExperts;
