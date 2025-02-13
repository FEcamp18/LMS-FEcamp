import React from "react";

type announcementCard = {
  annoTime: Date;
  annoTitle: string;
  annoText: string;
};

export default function AnnouncementCard({
  annoTime,
  annoTitle,
  annoText,
}: announcementCard) {
  return (
    <div className="max-h-30 m-3 grid max-w-2xl grid-cols-5 gap-3 rounded-2xl border-2 border-black bg-gray-100 p-3 pl-5">
      <div className="border-b border-gray-400 sm:border-b-0 sm:border-r-4">
        <p className="p-2 align-middle text-gray-600">
          {`${annoTime.getDate()}/${annoTime.getMonth() + 1}/${annoTime.getFullYear().toString().substr(-2)}`}{" "}
          <br /> {`${annoTime.getHours()}:${annoTime.getMinutes()}`}
        </p>
      </div>
      <div className="col-span-4">
        <h3 className="font-bold">{annoTitle}</h3>
        <p className="text-sm font-light">{annoText}</p>
      </div>
    </div>
  );
}
