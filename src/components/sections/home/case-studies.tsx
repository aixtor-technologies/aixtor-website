import { Button } from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Image from "next/image";

const CaseStudies = () => {
  return (
    <section className="common-section">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>
                Case-studies
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                Explore our case studies to see how we&apos;ve helped
                organizations across industries solve complex challenges, drive
                growth, and achieve their goals with our technology solutions.
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="">View all case studies</Button>
            </Grid.Col>
          </Grid>
        </div>
        <div>
          <div className="p-2.5 bg-white shadow-card w-80 md:w-96 lg:w-120 xl:w-140 rounded-xs">
            <Image
              src="/images/case-study-1.jpg"
              alt="Case Study 1"
              width={600}
              height={400}
              className="w-full h-auto mb-3 md:mb-4 lg:mb-5"
            />
            <div className="px-3 md:px-4">
              <Typography variant="h3" size="h5" className="mb-2 font-semibold">
                Intranet portal for a semi government organization based in
                Saudi Arabia
              </Typography>
              <Typography variant="p" size="p" className="mb-2.5">
                Employee Engagement Portal for a Semi Government Organization
                based in Saudi Arabia Aixtor helped a Saudi Arabia-based
                government body to develop an employee engagement based intranet
                portal, with exclusive features.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
