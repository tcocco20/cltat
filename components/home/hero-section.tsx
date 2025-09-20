import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import RequestInfoButton from "../general/request-info-button";

const HeroSection = () => {
  return (
    <section className="mx-auto flex flex-col items-center gap-8">
      <Image
        src="/images/hero-image.jpeg"
        alt="Hero Image"
        className="w-full mx-auto"
        width={1472}
        height={832}
      />
      <h2 className="text-xl font-medium px-2 md:px-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, odit!
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Button className="w-full md:w-auto" asChild>
          <Link href="/signup">Sign Up for Classes</Link>
        </Button>
        <RequestInfoButton>Request More Information</RequestInfoButton>
      </div>
    </section>
  );
};

export default HeroSection;
