import Grid from "@/components/ui/grid";
import Card from "@/components/shared/card";
import Typography from "@/components/ui/typography";

type ListItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
};

type ListSectionProps = {
  title: string;
  description: string;
  items: ListItem[];
};

const ListSection = ({ title, description, items }: ListSectionProps) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* Heading */}
        <div className="common-heading">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            {title}
          </Typography>
          <Typography size="h6" className="text-center">
            {description}
          </Typography>
        </div>

        {/* List */}
        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          {items?.map(item => (
            <Grid.Col key={item.id} className="md:w-6/12 lg:w-4/12">
              <Card
                title={item.title}
                description={item.description}
                image={item.image}
                slug={item.slug}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default ListSection;
