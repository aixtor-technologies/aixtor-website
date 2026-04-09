
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const solutions = [
  { title: "Intranet Portal", description: "Enhance internal communication..." },
  { title: "Self-Service Portal", description: "Empower your users..." },
  { title: "Customer Portal", description: "Build deeper relationships..." },
  { title: "Partner Management Portal", description: "Streamline partners..." },
  { title: "Enterprise Website", description: "Create powerful websites..." },
  { title: "Supplier And Vendor Portal", description: "Optimize supply chain..." },
  { title: "B2B & B2C E-Commerce Portal Development Services", description: "Launch platforms..." },
];

const ListAnimation2 = () => {
  return (
    <section className="">
      <div className="container">
        <Typography size="h2" className="common-section !pb-0 font-semibold mb-6 text-center top-0 sticky bg-body z-2">
          Option 2
        </Typography>
        <div className=" top-40 sticky">
          <Grid className="justify-center pt-14">
            <Grid.Col className="md:w-6/12">
              {solutions.map((solution, index) => (
                <div
                  key={solution.title}
                  data-index={index}
                  className={"p-4 mb-6 border-2 rounded-xl transition-all duration-300 bg-white top-40 sticky"}
                // ${activeIndex === index ? "border-primary scale-105 shadow-lg opacity-100" : "border-transparent opacity-50 scale-95"
                //   }`}
                >
                  <Typography size="h5" className="font-semibold mb-1">
                    {solution.title}
                  </Typography>
                  <Typography>{solution.description}</Typography>
                </div>
              ))}
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default ListAnimation2;
