import React from "react";

interface Camper {
  camperId: string;
  camperName: string;
  examSeat: string;
}

interface RoomTableProps {
  location: string;
  campers: Camper[];
}

const RoomTable: React.FC<RoomTableProps> = ({ location, campers }) => {
  return (
    <div className="mt-3 flex flex-col space-y-2">
      <div className="bg-dark-brown text-cream px-4 py-2 text-center text-lg font-bold">
        {location}
      </div>

      <div className="mb-8 rounded-lg border bg-white p-4 shadow-lg">
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Camper ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Seat</th>
            </tr>
          </thead>
          <tbody>
            {campers.map((camper) => (
              <tr key={camper.camperId} className="text-center">
                <td className="border p-2">{camper.camperId}</td>
                <td className="border p-2">{camper.camperName}</td>
                <td className="border p-2">{camper.examSeat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTable;
