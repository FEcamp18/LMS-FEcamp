export type ClassData = {
  classId: string;
  staffName: string;
  subjectId: string;
  roomId: number;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
};

export type MergeClassData = {
  classId: string;
  subjectId: string;
  roomId: number;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
  topic?: string;
};

export type ClassResponse = {
  message: string;
  courses: MergeClassData[];
}