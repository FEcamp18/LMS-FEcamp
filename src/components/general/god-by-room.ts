const godMapping: Record<number, string> = {
  0: "Olympus",
  1: "Athena",
  2: "Artemis",
  3: "Aphrodite",
  4: "Hermes",
  5: "Hades",
  6: "Apollo",
  7: "Poseidon",
  8: "Zeus",
};

export function get_god_name(roomNumber:number) {
  try {
    return godMapping[roomNumber] ?? godMapping[0]  ;
  } catch (error) {
    console.error("Failed to get god name:", error);
    return "Athena"; // Default to Athena in case of error
  }
}

export async function get_god_statue_image_path(roomNumber:number) {
  try {
    const godName =  get_god_name(roomNumber);
    return `/image/god-room/statue/${godName?.toLowerCase()}_statue.webp`;
  } catch (error) {
    console.error("Failed to get god statue image path:", error);
    return "/image/god-room/statue/athena.png"; // Default to Athena's statue
  }
}

export async function get_god_schedule_image_path(roomNumber:number) {
  try {
    const godName =  get_god_name(roomNumber);
    return `/image/god-room/schedule/${godName?.toLowerCase()}.webp`;
  } catch (error) {
    console.error("Failed to get god schedule image path:", error);
    return "/image/god-room/schedule/athena.png"; // Default to Athena's schedule
  }
}
