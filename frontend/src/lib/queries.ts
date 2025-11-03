import type {
  TDailyDataResponse,
  TSingleDayData,
} from "@/lib/types.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDailyData(
  searchParams: string,
): Promise<TDailyDataResponse> {

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetch(`${API_URL}/api/electricity?${searchParams}`);
  if (!response.ok) {
    throw new Error("Error when fetching daily data: " + response.statusText);
  }
  return await response.json();
}

export async function getSingleDayData(
  selectedDay: string | null,
): Promise<TSingleDayData> {

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetch(`${API_URL}/api/electricity/day/${selectedDay}`);
  if (!response.ok) {
    throw new Error(
      "Error when fetching single day data: " + response.statusText,
    );
  }
  return await response.json();
}
