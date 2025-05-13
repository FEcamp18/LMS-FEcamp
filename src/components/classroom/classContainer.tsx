import {
  AudioLines,
  ChartLine,
  FlaskConical,
  Biohazard,
  Laptop,
} from "lucide-react";
import { ClassCardTutor } from "./classCardTutor";

const ClassContainer: React.FC = () => {
  const mockClasses = [
    {
      data: {
        subjectId: "MATH101",
        subjectName: "Mathematics",
        subjectTopic: "Linear Algebra",
        subjectDescription:
          "Introduction to vectors, matrices, and linear transformations.",
        tutor: ["Dr. Smith", "Prof. Johnson"],
        location: "Room 205",
        time: new Date("2023-10-15T10:00:00Z"),
      },
      icon: <ChartLine size={120} strokeWidth={2.5} opacity={0.05} />,
      bgColor: "#FFDDC1",
    },
    {
      data: {
        subjectId: "PHYS202",
        subjectName: "Physics",
        subjectTopic: "Quantum Mechanics",
        subjectDescription:
          "Exploring the fundamentals of quantum theory and its applications.",
        tutor: ["Dr. Brown"],
        location: "Lab 3",
        time: new Date("2023-10-16T14:00:00Z"),
      },
      icon: <AudioLines size={120} strokeWidth={2.5} opacity={0.08} />,
      bgColor: "#C1FFC1",
    },
    {
      data: {
        subjectId: "CHEM303",
        subjectName: "CHEMISTRY",
        subjectTopic: "Organic Chemistry",
        subjectDescription:
          "Study of the structure, properties, and reactions of organic compounds.",
        tutor: ["Prof. Davis"],
        location: "Room 101",
        time: new Date("2023-10-17T09:00:00Z"),
      },
      icon: <FlaskConical size={120} strokeWidth={2.5} opacity={0.05} />,
      bgColor: "#C1D1FF",
    },
    {
      data: {
        subjectId: "BIOL404",
        subjectName: "Biology",
        subjectTopic: "Genetics",
        subjectDescription:
          "Understanding the principles of heredity and variation in organisms.",
        tutor: ["Dr. White", "Prof. Green"],
        location: "Room 304",
        time: new Date("2023-10-18T11:00:00Z"),
      },
      icon: <Biohazard size={120} strokeWidth={2.5} opacity={0.05} />,
      bgColor: "#FFC1FF",
    },
    {
      data: {
        subjectId: "COMP505",
        subjectName: "Computer Science",
        subjectTopic: "Machine Learning",
        subjectDescription:
          "Introduction to algorithms and models for machine learning.",
        tutor: ["Prof. Black"],
        location: "Lab 5",
        time: new Date("2023-10-19T13:00:00Z"),
      },
      icon: <Laptop size={120} strokeWidth={2.5} opacity={0.05} />,
      bgColor: "#D1C1FF",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockClasses.map((classData, index) => (
        <div key={index} className="flex items-start justify-center">
          <ClassCardTutor class={classData} />
        </div>
      ))}
    </div>
  );
};

export { ClassContainer };
