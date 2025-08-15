import InstructorCard from "./instructor-card";
import InstructorCarousel from "./instructor-carousel";

const InstructorInfoSection = () => {
  const instructors = [
    {
      name: "John Doe",
      bio: "Expert in mental health first aid with over 10 years of experience.",
      certifications: [{ title: "Mental Health First Aid", pdf: null }],
    },
  ];

  return (
    <section className="container mx-auto px-2 md:px-0">
      <h2 className="text-2xl font-bold my-4">Instructor Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructors.length > 1 ? (
          <InstructorCarousel />
        ) : (
          <InstructorCard instructor={instructors[0]} />
        )}
      </div>
    </section>
  );
};

export default InstructorInfoSection;
