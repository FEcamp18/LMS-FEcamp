import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";


interface SessionGodInterface  {
  user: {
    roomNumber : number
  } 
}

const godMapping: Record<number, string> = {
  0: "Athena",
  1: "Athena",
  2: "Artemis",
  3: "Aphrodite",
  4: "Hermes",
  5: "Hades",
  6: "Apollo",
  7: "Poseidon",
  8: "Zeus",
};

export async function get_god_name() {
  try {
    // TODO : implement session here
    // const session = ((await getServerSession(authOptions));
    // const roomNumber = session?.user?.roomNumber ?? 0;
    const roomNumber = 1; 
    return godMapping[roomNumber] ??godMapping[1]  ;
  } catch (error) {
    console.error("Failed to get god name:", error);
    return "Athena"; // Default to Athena in case of error
  }
}

export async function get_god_statue_image_path() {
  try {
    const godName = await get_god_name();
    return `/image/god-room/statue/${godName?.toLowerCase()}_statue.webp`;
  } catch (error) {
    console.error("Failed to get god statue image path:", error);
    return "/image/god-room/statue/athena.png"; // Default to Athena's statue
  }
}

export async function get_god_schedule_image_path() {
  try {
    const godName = await get_god_name();
    return `/image/god-room/schedule/${godName?.toLowerCase()}.webp`;
  } catch (error) {
    console.error("Failed to get god schedule image path:", error);
    return "/image/god-room/schedule/athena.png"; // Default to Athena's schedule
  }
}