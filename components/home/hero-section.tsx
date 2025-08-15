import Image from "next/image";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="container mx-auto flex flex-col items-center gap-8">
      <Image
        src="/images/hero-image.jpeg"
        alt="Hero Image"
        className="w-full max-w-4xl mx-auto"
        width={1472}
        height={832}
      />
      <h2 className="text-xl font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, odit!
      </h2>
      <div className="flex items-center justify-center gap-4">
        <Button>Sign Up for Class</Button>
        <Button>Request More Information</Button>
      </div>
    </section>
  );
};

export default HeroSection;
