import ClassTypesShowcaseSection from "@/components/home/class-types-showcase-section";
import HeroSection from "@/components/home/hero-section";
import { getClassTypes } from "@/lib/actions/wordpress.actions";

export default async function Home() {
  const classTypes = await getClassTypes();

  return (
    <>
      <HeroSection />
      <ClassTypesShowcaseSection classTypes={classTypes} />
    </>
  );
}
