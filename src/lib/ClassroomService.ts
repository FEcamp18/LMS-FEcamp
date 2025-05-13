import type { ClassResponse } from "@/types/class";

class ClassroomService {
  static async getClassroomsByRoomId(roomId: string): Promise<ClassResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classroom/${roomId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = (await response.json()) as ClassResponse;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ClassroomService;