// import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import RequestInfoButton from "../general/request-info-button";

const HeroSection = () => {
  return (
    <section className="w-full min-h-80 sm:min-h-[60vh] md:min-h-[75vh] lg:min-h-screen flex flex-col justify-center items-center gap-4 bg-[url('/images/hero-image.png')] bg-cover bg-center px-4 sm:px-0">
      <div className="bg-image-background/50 rounded text-center tracking-wider uppercase">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:var(--font-branding)]">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            C
          </span>
          ornerstone{" "}
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            L
          </span>
          egacy
        </h1>
        <h2 className="sm:text-lg md:text-xl lg:text-2xl font-light">
          Training and Advisory Team LLC
        </h2>
      </div>
      <p>
        We offer training and certification for security professionals in the
        state of Oregon.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Button className="w-full md:w-auto" asChild>
          <Link href="/sign-up">Sign Up for Classes</Link>
        </Button>
        <RequestInfoButton>Request More Information</RequestInfoButton>
      </div>
    </section>
  );
};

export default HeroSection;
