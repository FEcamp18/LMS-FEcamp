<<<<<<< HEAD
=======
// write your code here
import AnnouncementCard from "@/components/classroom/announcementCard";
import FileCard from "@/components/classroom/fileCard";

export default function page() {
  return (
    <>
      <AnnouncementCard
        annoTitle="หัวข้อประกาศสั้นๆ"
        annoText="ข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆ....."
        annoTime={new Date("2568-06-10 10:10:00")}
      />

      <FileCard
        fileTitle="ชื่อไฟล์"
        fileLocation="ที่อยู่ไฟล์"
        fileDescription="คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์คำอธิบายไฟล์......"
        fileUploadTime="2568-06-10 10:10:00"
        isTutor={true}
      />
    </>
  );
}
>>>>>>> main
