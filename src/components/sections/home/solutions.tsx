import { Button } from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const Solutions = () => {
  return (
    <section className="">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>
                Aixtor’s Powerful Enterprise Solutions
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                Aixtor is focused on developing innovative, intuitive and
                scalable software solution. We develop solutions which includes
                digital experience platforms, mobile and web solutions.
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="">View all solutions</Button>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
