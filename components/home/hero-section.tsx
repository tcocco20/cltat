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
      <h2 className="text-xl font-medium px-2 md:px-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, odit!
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Button className="w-full md:w-auto">Sign Up for Class</Button>
        <Button className="w-full md:w-auto">Request More Information</Button>
      </div>
    </section>
  );
};

export default HeroSection;
