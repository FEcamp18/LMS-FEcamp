import React from "react"
import { type ExamDataInterface } from "./fetchPretestRoom"

interface RoomTableProps {
  location: string
  campers: ExamDataInterface[]
}

const RoomTable: React.FC<RoomTableProps> = ({ location, campers }) => {
  return (
    <div className="mt-3 flex flex-col space-y-2">
      <div className="bg-dark-brown px-4 py-2 text-center text-lg font-bold text-cream">
        {location}
      </div>

      <div className="mb-8 rounded-lg border bg-white p-4 shadow-lg">
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Camper ID</th>
              <th className="border p-2">ชื่อ-นามสกุล</th>
              <th className="border p-2">Seat</th>
            </tr>
          </thead>
          <tbody className="max-h-[200px] overflow-scroll text-center">
            {campers.map((camper) => (
              <tr key={camper.camperId} className="overflow-scroll">
                <td className="w-[30%] border p-2">{camper.camperId}</td>
                <td className="border p-2">
                  {camper.camper.name} {camper.camper.surname} (
                  {camper.camper.nickname})
                </td>
                <td className="w-[10%] border p-2">{camper.seatNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoomTable
