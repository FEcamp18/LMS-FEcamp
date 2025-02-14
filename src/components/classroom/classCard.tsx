import React from "react";

interface ClassCardProps {
  class: {
    data: {
      classId: string;
      subjectName: string;
      subjectTopic: string;
      description: string;
      tutor: string[];
      location: string;
      time: Date;
    };
    icon?: React.ReactElement;
    bgColor?: string;
    textColor?: string;
    descriptionLines?: number;
  };
}

const ClassCard: React.FC<ClassCardProps> = ({
  class: {
    data,
    icon,
    bgColor = "#FFDDC1",
    textColor = "#000000",
    descriptionLines = 2,
  },
}) => {
  return (
    <>
      {data && data != null ? (
        <a
          href={`/classroom/${data.classId}`}
          className="flex w-full max-w-sm cursor-pointer flex-col rounded-xl bg-transparent hover:shadow-lg"
        >
          <div
            className="relative flex h-40 w-full rounded-t-xl"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className="flex w-full flex-col justify-between gap-3 p-4">
              <div className="text-center">
                <p className="text-xl font-bold lg:text-2xl">
                  {data.subjectName ?? "Unknown Subject"}
                </p>
                <p className="text-base lg:text-lg">{data.subjectTopic}</p>
              </div>
              <div className="text-sm lg:text-base">
                <p>{data.location ?? "Location not specified"}</p>
                {data.time ? (
                  <p className="text-sm lg:text-base">
                    วันที่{" "}
                    {data.time.toLocaleDateString("en-US", {
                      dateStyle: "short",
                    })}{" "}
                    เวลา{" "}
                    {data.time.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                ) : (
                  <p className="text-sm lg:text-base">Time not available</p>
                )}
              </div>
            </div>
            {icon && (
              <div className="absolute right-0 flex h-full items-end justify-center p-4">
                {icon}
              </div>
            )}
          </div>
          <div className="flex min-h-24 w-full flex-col justify-between gap-3 rounded-b-xl bg-neutral-200 p-4">
            <p
              className={`line-clamp-${descriptionLines} text-sm text-neutral-700 lg:text-base`}
            >
              {data.description}
            </p>
            <p className="line-clamp-1 text-sm font-medium lg:text-base">
              by {data.tutor?.join(", ") ?? "Unknown tutor"}
            </p>
          </div>
        </a>
      ) : null}
    </>
  );
};

export { ClassCard };
