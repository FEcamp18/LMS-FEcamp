import React from "react";
import RoomTable from "./roomTable";

interface ExamData {
  camperId: string;
  camperName: string;
  examLocation: string;
  examSeat: string;
}

const examData: ExamData[] = [
  {
    camperId: "001",
    camperName: "น้องน่ารัก จริงนะจริงๆ",
    examLocation: "ห้อง 306 ชั้น 3 ตึก 1",
    examSeat: "1",
  },
  {
    camperId: "002",
    camperName: "น้องคนนี้ พี่คนไหน",
    examLocation: "ห้อง 306 ชั้น 3 ตึก 1",
    examSeat: "2",
  },
  {
    camperId: "003",
    camperName: "ชื่อน้อง นามสกุลน้อง",
    examLocation: "ห้อง 415 ชั้น 4 ตึก 3",
    examSeat: "1",
  },
  {
    camperId: "004",
    camperName: "ชื่อน้อง นามสกุลน้อง",
    examLocation: "ห้อง 415 ชั้น 4 ตึก 3",
    examSeat: "23",
  },
  {
    camperId: "005",
    camperName: "ชื่อน้อง นามสกุลน้อง",
    examLocation: "ห้อง 415 ชั้น 4 ตึก 3",
    examSeat: "35",
  },
];

const ExamList: React.FC = () => {
  // Group campers by exam location
  const groupedData = examData.reduce(
    (acc, camper) => {
      if (!acc[camper.examLocation]) {
        acc[camper.examLocation] = [];
      }
      if (camper) {
        acc[camper.examLocation]?.push(camper);
      }
      return acc;
    },
    {} as Record<string, ExamData[]>,
  );

  return (
    <div className="m-2">
      {Object.entries(groupedData).map(([location, campers]) => (
        <RoomTable key={location} location={location} campers={campers} />
      ))}
    </div>
  );
};

export default ExamList;
