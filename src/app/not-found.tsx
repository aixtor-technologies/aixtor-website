import Image from "next/image";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <Image
        src="/404-error.svg"
        alt="Page not found"
        width={400}
        height={300}
        className="w-full max-w-sm mb-8"
        priority
      />
      <p className="text-gray-500 text-base text-center max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" variant="default" size="default" rounded="default">
        Go to Home
      </Button>
    </div>
  );
}
