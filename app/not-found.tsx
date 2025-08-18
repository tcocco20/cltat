import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <section className="max-w-2xl mx-auto p-2 text-center space-y-4">
        <h1 className="text-2xl font-medium ">Page Not Found</h1>
        <p>
          We&apos;re sorry, but the page you were looking for could not be
          found. Please check the URL for any errors or return to the homepage.
        </p>
        <Button
          asChild
          size={"lg"}
          variant={"link"}
          className="text-blue-600 hover:underline text-lg"
        >
          <Link href="/">Go to Homepage</Link>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
