import { ThemeModeToggle } from "@/components/ThemeModeToggle.tsx";
import Container from "@/components/Container.tsx";
import DailyStatisticsTable from "@/components/DailyStatisticsTable.tsx";

export default function App() {
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
            <DailyStatisticsTable />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Single day view</h2>
      </section>
    </Container>
  );
}
