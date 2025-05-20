import React from "react"
import { type PostExamDataInterface } from "./fetchPretestRoom"
import { get_god_name } from "../general/god-by-room"

interface RoomTableProps {
  location: string
  campers: PostExamDataInterface[]
}

const PostRoomTable: React.FC<RoomTableProps> = ({ location, campers }) => {
  if (location == "0") return <></>
  return (
    <div className="mt-3 flex flex-col space-y-2">
      <div className="bg-dark-brown px-4 py-2 text-center text-lg font-bold text-cream">
        {get_god_name(parseInt(location))}
      </div>

      <div className="mb-8 rounded-lg border bg-white p-4 shadow-lg">
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ชื่อ-นามสกุล</th>
              <th className="border p-2">Seat</th>
            </tr>
          </thead>
          <tbody className="max-h-[200px] overflow-scroll text-center">
            {campers.map((camper, index) => (
              <tr key={index} className="overflow-scroll">
                <td className="border p-2">
                  {camper.name} {camper.surname} ({camper.nickname})
                </td>
                <td className="w-[10%] border p-2">{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostRoomTable
