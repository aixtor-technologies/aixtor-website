"use client";

import { useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <Image
        src="/images/404-error.svg"
        alt="Something went wrong"
        width={400}
        height={300}
        className="w-full max-w-sm mb-8"
        priority
      />
      <h1 className="text-3xl md:text-4xl font-bold text-dark-400 mb-3 text-center">
        Something went wrong!
      </h1>
      <p className="text-gray-500 text-base text-center max-w-md mb-8">
        An unexpected error occurred. Please try again or go back to the home page.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="default" size="default" rounded="default" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="outline" size="default" rounded="default">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
