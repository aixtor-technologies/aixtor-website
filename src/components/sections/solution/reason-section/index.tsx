import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";



type ReasonItem = {
  reason: string;
};

type ReasonsSectionData = {
  title: string;
  reasons_list: ReasonItem[];
};

type Props = {
  reasons_section: ReasonsSectionData;
};

const CheckIcon = () => (
  <Image
    src="/images/icons/Group.svg"
    alt="icon"
    width={18}
    height={18}
    className="mt-1 shrink-0"
  />
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <CheckIcon />
    <Typography variant="p" size="h5" className="text-dark-400 font-bold">
      {text}
    </Typography>
  </li>
);

const ReasonsSection = ({ reasons_section }: Props) => {
  const { title, reasons_list } = reasons_section;

  return (
    <section className="py-12 lg:py-16 px-4 bg-dark-200">
      <div className="container">
        <div className="text-center mb-10 lg:mb-14">
          <Typography
            variant="h2"
            size="h3"
            isTitle
            isCenter
            className="text-dark"
          >
            {title}
          </Typography>
        </div>

        <Grid size="md" className="gap-y-5 px-7 lg:px-24">
          {reasons_list.map((item, index) => (
            <Grid.Col key={index} className="w-full md:w-1/2">
              <FeatureItem text={item.reason} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default ReasonsSection;
