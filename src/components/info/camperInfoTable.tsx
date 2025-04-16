import * as React from "react";
import { type Camper } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CamperInfoTableProps = {
  camper: Camper[];
};

export default function CamperInfoTable({ camper }: CamperInfoTableProps) {
  return (
    <Table>
      <TableCaption>Camper Information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead>นามสกุล</TableHead>
          <TableHead>ชื่อเล่น</TableHead>
          <TableHead>ห้อง</TableHead>
          <TableHead>เบอร์โทร</TableHead>
          <TableHead>อีเมล</TableHead>
          <TableHead>note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {camper.map((camper, index) => (
          <TableRow key={index}>
            <TableCell>{camper.camperId}</TableCell>
            <TableCell>{camper.name}</TableCell>
            <TableCell>{camper.surname}</TableCell>
            <TableCell>{camper.nickname}</TableCell>
            <TableCell>{camper.room}</TableCell>
            <TableCell>{camper.contactTel}</TableCell>
            <TableCell>{camper.contactEmail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
