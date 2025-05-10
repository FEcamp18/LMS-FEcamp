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
      if(camper?.examLocation){
        acc[camper?.examLocation]?.push(camper);}
      
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
