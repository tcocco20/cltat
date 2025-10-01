import ClassTypesShowcaseSection from "@/components/home/class-types-showcase-section";
import HeroSection from "@/components/home/hero-section";
import InstructorInfoSection from "@/components/home/instructor-info-section";
import {
  getAllInstructors,
  getAllLicenses,
  getClassTypes,
} from "@/lib/actions/wordpress.actions";

export default async function Home() {
  const classTypes = await getClassTypes();
  const instructors = await getAllInstructors();
  const licenses = await getAllLicenses();

  return (
    <>
      <HeroSection />
      <ClassTypesShowcaseSection classTypes={classTypes} />
      <InstructorInfoSection instructors={instructors} licenses={licenses} />
    </>
  );
}
