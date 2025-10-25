import { ThemeModeToggle } from "@/components/ThemeModeToggle.tsx";
import Container from "@/components/Container.tsx";
import { useEffect, useState } from "react";
import type { TDailyData } from "@/lib/types.ts";

export default function App() {
  const [dailyStatistics, setDailyStatistics] = useState<TDailyData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/electricity?page=0&size=10",
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data = await response.json();
      setDailyStatistics(data.content);
    };
    getData();
  }, []);

  return (
    <Container>
      <ThemeModeToggle />

      <section>
        <h2 className="text-3xl font-bold">Daily statistics list</h2>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-1/3 ">
            <h3>Filters</h3>
          </div>

          <div className="lg:w-2/3">
            <ul>
              {dailyStatistics.map((item: TDailyData) => (
                <li key={item.date}>
                  {item.date}, {item.averagePrice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Single day view</h2>
      </section>
    </Container>
  );
}
