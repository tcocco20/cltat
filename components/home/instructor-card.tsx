import { User } from "lucide-react";

interface InstructorCardProps {
  instructor: {
    name: string;
    bio: string;
  };
}

const InstructorCard = ({ instructor }: InstructorCardProps) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 flex-1">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center">
          <User height={48} width={48} />
        </div>
        <h3 className="text-center text-xl font-semibold whitespace-nowrap">{instructor.name}</h3>
      </div>
      <p className="text-center">{instructor.bio}</p>
    </div>
  );
};

export default InstructorCard;
