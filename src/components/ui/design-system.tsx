import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

export default function DesignSystem() {
  return (
    <div className="container">
      <Typography variant="h1" size="h1">Header typography 1</Typography>
      <Typography variant="h2" size="h2">Header typography 2</Typography>
      <Typography variant="h2" size="h2" isTitle>Header typography 2</Typography>
      <div className="text-center">
        <Typography variant="h2" size="h2" isTitle isCenter>Header typography 2</Typography>
      </div>
      <Typography variant="h3" size="h3">Header typography 3</Typography>
      <Typography variant="h4" size="h4">Header typography 4</Typography>
      <Typography variant="h5" size="h5">Header typography 5</Typography>
      <Typography variant="h6" size="h6">Header typography 6</Typography>
      <Button variant="default" size="default">Default Button</Button>
      <div className="bg-linear-to-r from-primary to-secondary p-4 my-2 text-center text-white">
        bg gradient primary
      </div>
      <Button href="/">Link Button</Button>
    </div>
  );
}
