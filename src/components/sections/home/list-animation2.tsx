import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

type SolutionItem = {
  title: string;
  description: string;
};

type Props = {
  items?: SolutionItem[];
};

const ListAnimation2 = ({ items = [] }: Props) => {
  if (!items.length) return null;

  return (
    <section className="">
      <div className="container">
        <Typography
          size="h2"
          className="common-section pb-0! font-semibold mb-6 text-center top-0 sticky bg-dark-200 z-2"
        >
          Option 2
        </Typography>
        <div className="top-40 sticky">
          <Grid className="justify-center pt-14">
            <Grid.Col className="md:w-6/12">
              {items.map((item, index) => (
                <div
                  key={item.title}
                  data-index={index}
                  className="p-4 mb-6 border-2 rounded-xl transition-all duration-300 bg-white top-40 sticky"
                >
                  <Typography size="h5" className="font-semibold mb-1">{item.title}</Typography>
                  <Typography>{item.description}</Typography>
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
