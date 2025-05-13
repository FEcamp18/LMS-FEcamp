export interface Camper {
  camperId: string;
  name: string;
  surname: string;
  nickname: string;
  chatbotUserId: string;
  contactTel: string;
  parentTel: string;
  parentRelation: string;
  school: string;
  contactEmail: string;
  idLine: string;
  FEYear: number;
  room: number;
  healthInfo?: string | null;
  foodInfo?: string | null;
  certificate?: string | null;
  scorePostTest?: number[];
  miscellaneous?: string | null;
}
