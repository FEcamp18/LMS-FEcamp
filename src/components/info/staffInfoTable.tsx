import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Staff = {
  staffId: string
  name: string
  surname: string
  nickname: string
  staffDepartment: string[]
  contactTel: string
}

type StaffInfoTableProps = {
  staff: Staff[]
}

export default function StaffInfoTable({ staff }: StaffInfoTableProps) {
  return (
    <Table>
      <TableCaption>ข้อมูลส่วนตัวน้องค่าย</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="border px-2 py-1">ชื่อ</TableHead>
          <TableHead className="border px-2 py-1">นามสกุล</TableHead>
          <TableHead className="border px-2 py-1">ชื่อเล่น</TableHead>
          <TableHead className="border px-2 py-1">ฝ่าย</TableHead>
          <TableHead className="border px-2 py-1">เบอร์โทร</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((s) => (
          <TableRow key={s.staffId}>
            <TableCell className="border px-2 py-1">{s.name}</TableCell>
            <TableCell className="border px-2 py-1">{s.surname}</TableCell>
            <TableCell className="border px-2 py-1">{s.nickname}</TableCell>
            <TableCell className="border px-2 py-1">
              {s.staffDepartment.join(", ")}
            </TableCell>
            <TableCell className="border px-2 py-1">{s.contactTel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
