"use client";
import { useState } from "react";
import CamperInfoPopup from "@/components/info/ui/camperInfoPopup";

export default function page() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <button
        onClick={() => setShowPopup(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
      >
        Show Camper Info
      </button>

      {showPopup && (
        <CamperInfoPopup
          camperId="camper1"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
