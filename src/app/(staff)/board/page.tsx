"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { type WebphaseAPIResponse } from "@/types/api/webphase";
import WebsiteLink from "@/components/board/WebsiteLink";

export default function BoardPage() {
  const [webPhase, setWebPhase] = useState("");
  const [selectPhase, setSelectPhase] = useState<string | null>(null);

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

  const handleSetPhase = async () => {
    if (!selectPhase) {
      alert("Please select a phase before setting it.");
      return;
    }

    try {
      const response = await axios.patch<{ error?: string }>("/api/web/phase", {
        phase: selectPhase,
      });
      if (response.status === 200) {
        alert("Web phase updated successfully!");
        setWebPhase(selectPhase);
      } else {
        alert(
          `Failed to update phase: ${response.data.error ?? "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error updating phase:", error);
      alert("An error occurred while updating the phase.");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-zinc-900 p-10 text-white">
      <h1 className="mb-3 text-2xl font-semibold sm:text-5xl">
        This is Board Page
      </h1>

      <WebsiteLink />
      <div className="my-3 flex flex-row items-center justify-center space-x-5 border-y-2 py-2">
        <p>current web phase is</p>
        <h1 className="text-3xl font-bold">{webPhase}</h1>
      </div>
      <div className="mt-10 grid w-[80%] grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2">
        {Object.keys(PHASE).map((key) => (
          <button
            onClick={() => setSelectPhase(key)}
            key={key}
            className={`flex w-72 cursor-pointer flex-col items-center justify-center rounded-lg p-2 text-lg sm:w-96 ${
              selectPhase === key ? "bg-zinc-500" : "bg-black hover:bg-zinc-800"
            }`}
          >
            <p>{PHASE[key as keyof typeof PHASE]}</p>
            <p className="text-sm">
              {descriptions[key as keyof typeof descriptions]}
            </p>
          </button>
        ))}
      </div>
      <button
        onClick={handleSetPhase}
        className="mt-5 rounded-lg bg-white px-4 py-2 text-lg text-black hover:bg-slate-200"
      >
        Set Web Phase
      </button>
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
