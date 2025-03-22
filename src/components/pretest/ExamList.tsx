"use client";
import React, { useEffect, useState } from "react";
import RoomTable from "./roomTable";
import { type ExamDataInterface } from "./fetchPretestRoom";
import cleanPretestRoom from "./fetchPretestRoom";
import axios from "axios";

const ExamList: React.FC = () => {
  const [groupedData, setGroupedData] = useState<
    Record<string, ExamDataInterface[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<{ data: ExamDataInterface[] }>(
        "/api/pretest",
      );
      console.log(res);

      const uncleanData = res.data.data;
      if (!uncleanData) return;
      const examData = cleanPretestRoom(uncleanData);
      if (!examData) return;
      setGroupedData(examData);
    };
    void fetchData();
  }, []);

  return (
    <div className="m-2">
      {groupedData &&
        Object.entries(groupedData).map(([location, campers]) => (
          <RoomTable key={location} location={location} campers={campers} />
        ))}
    </div>
  );
};

export default ExamList;
