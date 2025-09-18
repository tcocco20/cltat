import ClassTypesShowcaseSection from "@/components/home/class-types-showcase-section";
import HeroSection from "@/components/home/hero-section";
import InstructorInfoSection from "@/components/home/instructor-info-section";
import { getClassTypes } from "@/lib/actions/wordpress.actions";

export default async function Home() {
  const classTypes = await getClassTypes();

  console.log(classTypes);
  return (
    <div className="container max-w-5xl mx-auto">
      <HeroSection />
      <ClassTypesShowcaseSection />
      <InstructorInfoSection />
    </div>
  );
}
