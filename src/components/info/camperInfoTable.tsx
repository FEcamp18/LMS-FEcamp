import * as React from "react"
import { type Camper } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import CamperInfoPopup from "./ui/camperInfoPopup"

type CamperInfoTableProps = {
  camper: Camper[]
  infoPrio: boolean
}

export default function CamperInfoTable({
  camper,
  infoPrio,
}: CamperInfoTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      <Table>
        <TableCaption>ข้อมูลส่วนตัวน้องค่าย</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>ชื่อ</TableHead>
            <TableHead>นามสกุล</TableHead>
            <TableHead>ชื่อเล่น</TableHead>
            <TableHead>หนังสือ</TableHead>
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
              <TableCell>
                {
                  camper.miscellaneous
                    ?.replace("Book: Hardcopy (รูปเล่ม)", "Hardcopy")
                    .replace("Book: PDF File", "PDF")
                    .split(";")[0]
                }
              </TableCell>
              <TableCell>
                {infoPrio ? (
                  <button
                    onClick={() => setSelectedId(camper.camperId)}
                    className="w-16 rounded-lg bg-light-gray text-white hover:bg-dark-brown"
                  >
                    ดู
                  </button>
                ) : (
                  <div className="w-16 rounded-lg bg-light-gray text-center text-white hover:cursor-not-allowed">
                    -
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedId && (
        <CamperInfoPopup
          camperId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  )
}
