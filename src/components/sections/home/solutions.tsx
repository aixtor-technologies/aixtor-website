"use client";
import Image from "next/image";
import { useState } from "react";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import IconUp from "@/components/shared/icons/up";

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
  {
    title: "Enterprise Website",
    description:
      "Create powerful enterprise websites that showcase your brand, drive engagement, and convert visitors into loyal customers.",
  },
  {
    title: "Supplier And Vendor Portal",
    description:
      "Optimize your supply chain with vendor portals that automate procurement, invoicing, and compliance management processes.",
  },
  {
    title: "B2B & B2C E-Commerce Portal Development Services",
    description:
      "Launch feature-rich e-commerce platforms that deliver exceptional shopping experiences and drive revenue growth across B2B and B2C channels.",
  },
];

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>
                Aixtor’s Powerful Enterprise Solutions
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                Aixtor is focused on developing innovative, intuitive and
                scalable software solution. We develop solutions which includes
                digital experience platforms, mobile and web solutions.
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="">View all solutions</Button>
            </Grid.Col>
          </Grid>
        </div>
        <Grid className="justify-between">
          <Grid.Col className="md:w-5/12">
            <div className="space-y-0 border-x border-t border-black/10 rounded">
              {solutions.map((solution, index) => (
                <div
                  key={solution.title}
                  className={`transition-all duration-300 border rounded
                      ${activeIndex === index ? " gradient-card active" : "border-t-body border-x-body border-b-black/10"}`}
                >
                  <button
                    className="w-full font-semibold flex items-center justify-between px-6 py-4 text-left"
                    onClick={() => setActiveIndex(index)}
                  >
                    <Typography variant="span" size="h6">
                      {solution.title}
                    </Typography>
                    <span
                      className={`flex size-8 rounded-full border  ${activeIndex === index ? "border-primary" : "border-black/10 rotate-180"} transition-transform duration-300`}
                    >
                      <span className="w-1/2 aspect-square m-auto">
                        <IconUp />
                      </span>
                    </span>
                  </button>

                  {activeIndex === index && (
                    <div className="px-6 pb-5">
                      <Typography size="p" className="">
                        {solution.description}
                      </Typography>
                      <button className="mt-3 text-sm text-primary border-b hover:text-secondary">
                        Know more
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <div className="lg:ps-6 xl:ps-8">
              <Image
                src="/images/intranet.jpg"
                alt="Solution Image"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default Solutions;
