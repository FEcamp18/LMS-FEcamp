const cleanPretestRoom = (
  examData: ExamDataInterface[],
): Record<string, ExamDataInterface[]> => {
  const groupedData = examData.reduce(
    (acc, camper) => {
      // Initialize the array for this location if it doesn't exist
      if (!acc[camper?.examLocation]) {
        acc[camper.examLocation] = [];
      }

      // Add the camper to the array for their exam location
      if (camper?.examLocation) {
        acc[camper?.examLocation]?.push(camper);
      }

      return acc;
    },
    {} as Record<string, ExamDataInterface[]>,
  );

  return groupedData;
};

export const cleanPosttestRoom = (
  examData: PostExamDataInterface[],
): Record<string, PostExamDataInterface[]> => {
  const groupedData = examData.reduce(
    (acc, camper) => {
      
      const room = camper.room ?? "ไม่ระบุ";
      acc[room] ??= [];
      acc[room].push(camper);
      return acc;
    },
    {} as Record<string, PostExamDataInterface[]>,
  );

  return groupedData;
};
export default cleanPretestRoom;

export interface PostExamDataInterface {
  name: string;
  surname: string;
  nickname: string;
  room: string;
}
export interface ExamDataInterface {
  camper: {
    name: string;
    surname: string;
    nickname: string;
    room?: string;
  };
  camperId: string;
  camperName: string;
  seatNumber: string;
  examLocation: string;
}
