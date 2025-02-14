// write your code here
import AnnouncementCard from "@/components/classroom/announcementCard";

export default function page() {
  return (
    <AnnouncementCard
      annoTitle="หัวข้อประกาศสั้นๆ"
      annoText="ข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆข้อความยาวๆ....."
      annoTime={new Date("2568-06-10 10:10:00")}
    />
  );
}
