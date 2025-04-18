import type { ClassResponse } from "@/types/class";

export async function getClassrooms() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classroom`,
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
