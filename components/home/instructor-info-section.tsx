import InstructorCard from "./instructor-card";
import InstructorCarousel from "./instructor-carousel";
import ShowLicenseButton from "./show-license-button";

const InstructorInfoSection = () => {
  const instructors = [
    {
      name: "John Doe",
      bio: "Expert in mental health first aid with over 10 years of experience.",
      certifications: [
        {
          title: "Mental Health First Aid",
          pdf: null,
          slug: "mental-health-first-aid",
        },
      ],
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-2 md:px-0">
      <h2 className="text-2xl font-bold my-4">
        Instructor and Licensing Information
      </h2>
      <article className="w-full flex flex-col md:flex-row md:justify-center md:items-center gap-4">
        {instructors.length > 1 ? (
          <InstructorCarousel />
        ) : (
          <InstructorCard instructor={instructors[0]} />
        )}
        <div className="flex flex-col md:flex-row items-center gap-4">
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
