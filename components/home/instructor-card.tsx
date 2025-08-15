interface InstructorCardProps {
  instructor: {
    name: string;
    bio: string;
    certifications?: { title: string; pdf: string | null }[];
  };
}

const InstructorCard = ({ instructor }: InstructorCardProps) => {
  return (
    <article className="flex flex-col md:flex-row md:justify-center md:items-center">
      {instructor.name}
    </article>
  );
};

export default InstructorCard;
