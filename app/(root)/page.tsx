import ClassTypesShowcaseSection from "@/components/home/class-types-showcase-section";
import HeroSection from "@/components/home/hero-section";
import InstructorInfoSection from "@/components/home/instructor-info-section";

export default function Home() {
  return (
    <div className="container max-w-5xl mx-auto">
      <HeroSection />
      <ClassTypesShowcaseSection />
      <InstructorInfoSection />
    </div>
  );
}
