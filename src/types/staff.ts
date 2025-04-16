import { type ENGINEERINGDEPARTMENT } from "./ENGINEERINGDEPARTMENT";
import { type STAFFDEPARTMENT } from "./STAFFDEPARTMENT";

export interface Staff {
  staffId: string;
  name: string;
  surname: string;
  nickname: string;
  contactTel: string;
  contactEmail: string;
  FEYear: number;
  engineerDepartment: ENGINEERINGDEPARTMENT;
  staffDepartment: STAFFDEPARTMENT[];
  healthInfo?: string | null;
  foodInfo?: string | null;
  roomNumber: number;
}

export interface StaffsByClassIdResponse {
  message: string;
  staffs: Staff[];
}
