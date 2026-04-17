import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import StatCard from "./Statcard";


const stats = [
  { value: "45+", label: "Finished Projects" },
  { value: "15+", label: "Experience Years" },
  { value: "55+", label: "Skilled Experts" },
  { value: "30+", label: "Happy Clients" },
];

const WhyChoose = () => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-10/12">
            <div className="common-heading text-center">
              <Typography variant="h2" size="h3" isTitle isCenter>
                Why Choose Aixtor for Your Next Project?
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                With a team of certified expert developers, we ensure optimal
                outcomes and client satisfaction by conceptualizing, designing,
                and executing solutions as per specific requirements.
              </Typography>
            </div>
          </Grid.Col>
        </Grid>
        <Grid className="justify-center">
          <Grid.Col className="md:w-11/12">
            <Grid className="gap-y-4">
              {stats.map(stat => (
                <Grid.Col key={stat.label} className="w-6/12! md:w-3/12!">
                  <StatCard value={stat.value} label={stat.label} />
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default WhyChoose;
