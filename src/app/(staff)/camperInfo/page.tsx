"use client";

import { useEffect, useState } from "react";
import CamperInfoTable from "../../../components/info/camperInfoTable";
import { type Camper } from "@prisma/client";
import axios from "axios";

export default function ClassroomPage() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const response = await axios.get("/api/allcamper");
        setCampers(response.data.data);
      } catch (err) {
        console.error("Error fetching campers:", err);
        setError("Failed to get data");
      }
    };

    void fetchCampers();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const filteredCampers = campers.filter(
    (camper) => camper.room === selectedRoom,
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 p-4">
        <h2 className="mb-4 text-xl font-bold">Rooms</h2>
        <ul className="space-y-2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((room) => (
            <li key={room}>
              <button
                onClick={() => setSelectedRoom(room)}
                className={`w-full rounded-lg p-2 text-left ${
                  selectedRoom === room ? "bg-gray-100" : "hover:bg-gray-300"
                }`}
              >
                Room {room}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4">
        <h1 className="mb-4 text-2xl font-bold">Camper Information</h1>
        <CamperInfoTable camper={filteredCampers} />
      </main>
    </div>
  );
}
