"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { type WebphaseAPIResponse } from "@/types/api/webphase";

export default function BoardPage() {
  const [webPhase, setWebPhase] = useState("");

  useEffect(() => {
    const fetchWebPhase = async () => {
      try {
        const response: WebphaseAPIResponse = await axios.get("/api/web/phase");
        setWebPhase(response.data.phase);
      } catch (error) {
        console.error("Error fetching web phase:", error);
      }
    };

    void fetchWebPhase();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-900 p-10 text-white">
      <div className="flex flex-row items-center justify-center space-x-5">
        <p>phase is</p>
        <h1 className="text-3xl font-bold">{webPhase}</h1>
      </div>
      <div className="mt-10 grid w-[80%] grid-cols-2 items-center justify-items-center gap-5">
        {Object.keys(PHASE).map((key) => (
          <button
            key={key}
            className="flex w-96 cursor-pointer flex-col items-center justify-center rounded-lg bg-black p-2 text-lg hover:bg-zinc-800"
          >
            <p>{PHASE[key as keyof typeof PHASE]}</p>
            <p className="text-sm">
              {descriptions[key as keyof typeof descriptions]}
            </p>
          </button>
        ))}
      </div>
    </main>
  );
}

const PHASE = {
  CLOSED: "Closed",
  BEFORE_CAMP: "Before Camp",
  PRETEST: "Pretest",
  CAMP: "Camp",
  CERTIFICATE: "Certificate",
  POSTTEST: "Posttest",
  ARCHIVE: "Archive",
};

const descriptions = {
  CLOSED: "The phase is currently closed.",
  BEFORE_CAMP: "Preparations before the camp start.",
  PRETEST: "Initial testing phase before the main event.",
  CAMP: "The main camp event is ongoing.",
  CERTIFICATE: "Certificates are being issued.",
  POSTTEST: "Post-event testing phase.",
  ARCHIVE: "The phase is archived.",
};
