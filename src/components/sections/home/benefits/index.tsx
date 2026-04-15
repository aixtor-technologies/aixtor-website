import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const solutions = [
  {
    title: "Intranet Portal",
    description: "Enhance internal communication...",
  },
  { title: "Self-Service Portal", description: "Empower your users..." },
  { title: "Customer Portal", description: "Build deeper relationships..." },
  { title: "Partner Management Portal", description: "Streamline partners..." },
  { title: "Enterprise Website", description: "Create powerful websites..." },
  {
    title: "Supplier And Vendor Portal",
    description: "Optimize supply chain...",
  },
];

const Benefits = () => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="md:w-10/12 lg:w-9/12 mx-auto text-center mb-6 md:mb-8 lg:mb-10">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            Key Benefits that set AIXTOR apart
          </Typography>
          <Typography size="h6">
            Our key benefits are built to drive performance, streamline
            operations & support scalable growth ensuring your business stays
            ahead in a rapidly evolving digital landscape.
          </Typography>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 lg-gap-12 xl:gap-15 relative">
          <Image
            src="/images/logo-wave.svg"
            alt="Benefits Left"
            width={812}
            height={672}
            className="absolute left-0 hidden md:block object-contain w-full h-full "
            style={{ aspectRatio: "812/672" }}
          />
          {[0, 2, 4].map(start => (
            <Grid
              className={`relative z-2 gap-y-4 ${start === 2 ? "justify-between" : "justify-evenly"}`}
              key={start}
            >
              {solutions.slice(start, start + 2).map(solution => (
                <Grid.Col key={solution.title} className="md:w-4/12">
                  <div
                    key={solution.title}
                    className="gradient-card body-border py-3 lg:py-4 px-4 lg:px-6 border-2 rounded-xl"
                  >
                    <Image
                      src="/images/banking.svg"
                      alt={solution.title}
                      width={60}
                      height={60}
                      className="mb-4 size-15 p-2"
                    />
                    <Typography size="h5" className="font-semibold mb-1">
                      {solution.title}
                    </Typography>
                    <Typography>{solution.description}</Typography>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
