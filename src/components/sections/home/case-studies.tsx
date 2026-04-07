import { Button } from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const CaseStudies = () => {
  return (
    <section className="common-section">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>Case-studies</Typography>
              <Typography variant="p" size="h5" className="mt-4">Explore our case studies to see how we&apos;ve helped organizations across industries solve complex challenges, drive growth, and achieve their goals with our technology solutions.</Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="">View all case studies</Button>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
