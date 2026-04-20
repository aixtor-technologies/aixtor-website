import Button from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";

export default function InquireNow() {
  return (
    <section className="bg-white py-16 px-12">

      {/* Header */}
      <div className="text-center mb-10">
        <Typography variant="h2" size="h2" isTitle isCenter>
          Inquire Now
        </Typography>
        <Typography variant="p" size="p" className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Thank you for showing an interest. Please fill in the form below we will get in touch with you soon.
        </Typography>
      </div>

      {/* Form */}
      <div className="max-w-275 mx-auto">
        <Grid>
          <Grid.Col className="lg:w-1/2">
            <Input placeholder="Full name *" />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input placeholder="Company/organization*" />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input type="email" placeholder="Email*" />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input type="tel" placeholder="Phone number*" />
          </Grid.Col>
          <Grid.Col className="w-full">
            <Textarea
              placeholder="What you are looking for"
            />
          </Grid.Col>
        </Grid>

        <div className="flex justify-end">
          <Button variant="default" size="default" rounded="default">
            Send Inquiry
          </Button>
        </div>
      </div>

    </section>
  );
}
