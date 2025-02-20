export interface Class {
  classId: string;
  subjectId: string;
  room: number;
  location: string;
  startTime: Date;
  endTime: Date;
}

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
  tutors: string[];
  subjectId: string;
  roomId: number;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
};