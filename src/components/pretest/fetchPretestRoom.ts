const cleanPretestRoom = (
  examData: ExamDataInterface[],
): Record<string, ExamDataInterface[]> => {
  const groupedData = examData.reduce(
    (acc, camper) => {
      if (acc[camper?.examLocation]) {
        acc[camper.examLocation] ??= [];
      }
      if (camper) {
        acc[camper.examLocation]?.push(camper);
      }
      return acc;
    },
    {} as Record<string, ExamDataInterface[]>,
  );
  return groupedData;
};

export default cleanPretestRoom;

export interface ExamDataInterface {
  camper: {
    name: string;
    surname: string;
    nickname: string;
  };
  camperId: string;
  camperName: string;
  seatNumber: string;
  examLocation: string;
}
