import StatsSection from "./stat-card";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";

import { TApiResponse } from "@/shared/types";

async function fetchMenu(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "common-options",
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return null;
  }
}
const WhyChoose = async () => {
  const content = await fetchMenu();

  return (
    <section className="common-section bg-white">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-10/12">
            <div className="common-heading text-center">
              <Typography variant="h2" size="h3" isTitle isCenter>
                {content?.data?.statistics?.title}
              </Typography>

              <Typography variant="p" size="h5" className="mt-4">
                {content?.data?.statistics?.description}
              </Typography>
            </div>
          </Grid.Col>
        </Grid>

        <StatsSection stats={content?.data?.statistics?.stats} />
      </div>
    </section>
  );
};

export default WhyChoose;
