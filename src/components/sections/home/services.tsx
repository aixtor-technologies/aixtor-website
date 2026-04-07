import Typography from "@/components/ui/typography";
import Image from "next/image";

const Services = () => {
  return (
    <section className="large-section">
      <div className="container">
        <div className="common-heading text-center">
          <Typography variant="h2" size="h3" isTitle isCenter>Innovative Services for Your Enterprise</Typography>
          <Typography variant="p" size="h5" className="mt-4">Unlock the full potential of your business with our comprehensive range of expert services.</Typography>
        </div>
        <div className="flex">
          <div className="p-px bg-white hover:bg-linear-to-r from-primary to-secondary rounded shadow-card w-96">
            <div className="px-2.5 md:px-4 lg:px-6 xl:px-8 py-3 md:py-5 lg:py-8 xl:py-10 bg-white rounded">
              <Image src="/images/liferay.svg" alt="Case Study 1" width={60} height={60} className="size-15 mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
              <div className="">
                <Typography variant="h3" size="h5" className="mb-2 md:mb-2.5 font-semibold">Liferay consulting & development service</Typography>
                <Typography variant="p" size="p" className="">Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
