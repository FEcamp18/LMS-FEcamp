"use client"

export async function sendAnnouncement(message: string) {
  await fetch("/api/proxy/send-announcement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
}