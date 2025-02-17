export interface Announcement {
  annoId: string;
  subjectId: string;
  annoTitle: string;
  annoText: string;
  annoTime: string;
}

export interface AnnouncementsBySubjectIdResponse {
  message: string;
  announcements: Announcement[];
}
