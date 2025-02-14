import React from 'react';

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
    }
    icon?: React.ReactElement;
    bgColor?: string;
    textColor?: string;
    descriptionLines?: number;
  }
}

const ClassCard: React.FC<ClassCardProps> = ({
  class: { 
    data, 
    icon, 
    bgColor = "#FFDDC1", 
    textColor = "#000000", 
    descriptionLines = 2 }
}) => {

  return (
    <>
      {data && data != null ? (
        <a
          href={`/classroom`} 
          className="flex flex-col bg-transparent hover:shadow-lg rounded-xl w-full max-w-sm cursor-pointer">
          <div
            className="relative flex rounded-t-xl w-full h-40"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className='flex flex-col justify-between gap-3 p-4 w-full'>
              <div className="text-center">
                <p className="font-bold text-xl lg:text-2xl">{data.subjectName ?? "Unknown Subject"}</p>
                <p className="text-base lg:text-lg">{data.subjectTopic}</p>
              </div>
              <div className="text-sm lg:text-base">
                <p>{data.location ?? "Location not specified"}</p>
                {data.time ? (
                  <p className="text-sm lg:text-base">
                    วันที่ {data.time.toLocaleDateString('en-US', { dateStyle: 'short' })} เวลา {data.time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})}
                  </p>
                ) : (
                  <p className="text-sm lg:text-base">Time not available</p>
                )}
              </div>
            </div>
            {icon && <div className="right-0 absolute flex justify-center items-end p-4 h-full">{icon}</div>}
          </div>
          <div className="flex flex-col justify-between gap-3 bg-neutral-200 p-4 rounded-b-xl w-full min-h-24">
            <p className={`line-clamp-${descriptionLines} text-neutral-700 text-sm lg:text-base`}>
              {data.description}
            </p>
            <p className="font-medium text-sm lg:text-base line-clamp-1">by {data.tutor?.join(', ') ?? "Unknown tutor"}</p>
          </div>
        </a>
      ) : (
        null
      )}
    </>
  );
};

export { ClassCard };
