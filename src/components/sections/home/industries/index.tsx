import Link from "next/link";
import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const industries = [
  { img_url: "/images/banking.svg", name: "Banking" },
  { img_url: "/images/banking.svg", name: "Healthcare" },
  { img_url: "/images/banking.svg", name: "Transportation" },
  { img_url: "/images/banking.svg", name: "Government solution" },
  { img_url: "/images/banking.svg", name: "FMCG" },
  { img_url: "/images/banking.svg", name: "Insurance" },
  { img_url: "/images/banking.svg", name: "Manufacturing" },
  { img_url: "/images/banking.svg", name: "Telecommunication" },
];

const Industries = () => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-10/12">
            <div className="common-heading text-center">
              <Typography variant="h2" size="h3" isTitle isCenter>
                Industries We Cater
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                We cater to diverse industries with tailored technology
                solutions to empower efficient enterprise operations.
              </Typography>
            </div>
          </Grid.Col>
        </Grid>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 xl:gap-10">
          {industries.map(industry => (
            <Link
              href="#"
              key={industry.name}
              className="flex items-center gap-x-4 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 border border-dark-300 rounded-full hover:shadow-card"
            >
              <Image
                src={industry.img_url}
                alt={industry.name}
                width={32}
                height={32}
              />
              <Typography variant="span" size="h6" className="font-medium">
                {industry.name}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
