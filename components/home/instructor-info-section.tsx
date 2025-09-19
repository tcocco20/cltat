import { InstructorData } from "@/lib/types";
import InstructorCard from "./instructor-card";
import InstructorCarousel from "./instructor-carousel";
import ShowLicenseButton from "./show-license-button";

interface InstructorInfoSectionProps {
  instructors: InstructorData[];
}

const InstructorInfoSection = ({ instructors }: InstructorInfoSectionProps) => {
  return (
    <section className="container max-w-5xl mx-auto px-2 md:px-0">
      <h2 className="text-2xl font-bold my-4">
        Instructor and Licensing Information
      </h2>
      <article className="w-full flex flex-col md:flex-row md:justify-center md:items-center gap-4">
        {instructors.length > 1 ? (
          <InstructorCarousel instructors={instructors} />
        ) : (
          <InstructorCard instructor={instructors[0]} />
        )}
        <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
          <ShowLicenseButton licenses={[]} />
          <p className="flex-1">
            Click here to view certifications and licenses. All licensing
            attained in the state of Oregon.
          </p>
        </div>
      </article>
    </section>
  );
};

export default InstructorInfoSection;
