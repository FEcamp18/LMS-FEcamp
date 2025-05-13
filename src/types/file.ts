export interface File {
  fileId: string
  subjectId: string
  fileTitle: string
  fileLocation: string
  fileDescription: string
  fileUploadTime: Date
}

export interface FileBySubjectIdResponse {
  message: string
  files: File[]
}
