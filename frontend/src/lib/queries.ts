const API_URL = import.meta.env.VITE_API_URL;

type TGetDAilyStatisticsParams = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
};

export async function getDailyStatistics({
  pageNumber,
  pageSize,
  sortBy,
}: TGetDAilyStatisticsParams) {

  const params = new URLSearchParams();

  params.set("page", pageNumber.toString());
  params.set("size", pageSize.toString());
  params.set("sort", sortBy);

  const response = await fetch(
    `${API_URL}/api/electricity/${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
