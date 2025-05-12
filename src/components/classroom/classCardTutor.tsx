import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ClassCardProps {
  subjectId: string;
  subjectName: string;
  subjectTopic: string;
  subjectDescription: string;
  subjectPicture: string;
}

const ClassCardTutor: React.FC<{ subject: ClassCardProps }> = ({ subject }) => {
  // Map subjectName to corresponding background image
  const BGimageMap: Record<string, string> = {
    MATHS: "/image/subject-picture/Math.png",
    CHEMISTRY: "/image/subject-picture/Chem.png",
    PHYSICS: "/image/subject-picture/Physic.png",
    TPAT3: "/image/subject-picture/TPAT.png",
  };

  const BGimage =
    BGimageMap[subject.subjectName] ??
    "/image/subject-picture/temp-subject-image.jpg";

  return (
    <>
      <Link
        href={`/tutor/${subject.subjectId}`}
        className="flex w-60 cursor-pointer flex-col space-y-0 bg-transparent transition-all hover:scale-105 sm:w-60"
      >
        <Image
          src="/image/subject-picture/SVG-Bottom.svg"
          alt="zigzag-edge"
          width={300}
          height={20}
          className="w-full rotate-180"
        />

        {/* Top Section */}
        <div className="relative flex h-60 w-60 items-end justify-center sm:w-60">
          <Image
            src={BGimage}
            alt={subject.subjectName}
            fill
            className="object-cover"
          />
          <p className="absolute bottom-0 z-20 flex h-12 w-full items-center justify-center bg-white/80 text-center text-xl font-bold text-dark-brown">
            {subject.subjectTopic}
          </p>
        </div>
        {/* Bottom Section */}
        <div className="flex min-h-24 w-full flex-col justify-between gap-3 bg-dark-brown p-4 text-cream">
          <p className="text-gray text-center text-xs lg:text-sm">
            {subject.subjectDescription}
          </p>
        </div>

        <Image
          src="/image/subject-picture/SVG-Bottom.svg"
          alt="zigzag-edge"
          width={2000}
          height={200}
          className="w-full"
        />
      </Link>
    </>
  );
};

export { ClassCardTutor };
