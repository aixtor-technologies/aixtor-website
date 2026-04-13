import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

const solutions = [
  {
    title: "Intranet Portal",
    description:
      "Enhance internal communication, foster collaboration, and improve employee engagement with our customizable intranet portal solutions. From document management to employee directories, our intranet portals are designed to centralize information, streamline processes, and create a more connected workplace.",
  },
  {
    title: "Self-Service Portal",
    description:
      "Empower your users with intuitive self-service portals that reduce support costs and improve satisfaction through automated workflows and knowledge bases.",
  },
  {
    title: "Customer Portal",
    description:
      "Build deeper customer relationships with personalized portals offering account management, support ticketing, and seamless communication channels.",
  },
  {
    title: "Partner Management Portal",
    description:
      "Streamline partner relationships with dedicated portals for deal registration, resource sharing, and collaborative opportunity management.",
  },
];

const SectionAnimation = () => {
  return (
    <section className="common-section text-white" style={{
      background:
        "radial-gradient(76.97% 91.99% at 50% 105.22%, #0150FF 0%, #0E4ACD 13.9%, #0E3997 49.16%, #092971 69.05%, #010F2E 100%)",
    }}>
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-6/12">
            <div className="sticky top-12">
              <Typography variant="h2" size="h3" isTitle>
                Aixtor’s Powerful Enterprise Solutions
              </Typography>
              <Typography variant="p" size="h5" className="my-6">
                Aixtor is focused on developing innovative, intuitive and
                scalable software solution. We develop solutions which includes
                digital experience platforms, mobile and web solutions.
              </Typography>
              <Button href="">View all solutions</Button>
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <div className="">
              {solutions.map((solution, index) => (
                <div key={index} className={"p-4 transition-all duration-300 border-2 border-white rounded-xl mb-6 "}
                >
                  <Typography size="h5" className="font-semibold mb-1">
                    {solution.title}
                  </Typography>
                  <Typography>
                    {solution.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default SectionAnimation;
