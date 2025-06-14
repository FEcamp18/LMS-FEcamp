import type { ClassResponse } from "@/types/class";

export async function getClassroomsByRoomId({ roomId }: { roomId: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classroom/${roomId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return {
        message: "course not found",
        courses: [],
      };
    }

    const data = (await response.json()) as ClassResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
