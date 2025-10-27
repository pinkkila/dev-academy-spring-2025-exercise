import { ThemeModeToggle } from "@/components/ThemeModeToggle.tsx";
import Container from "@/components/Container.tsx";
import DailyStatisticsTable from "@/components/DailyStatisticsTable.tsx";
import PriceFilter from "@/components/PriceFilter.tsx";
import DateFilter from "@/components/DateFilter.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import NegativePeriodFilter from "@/components/NegativePeriodFilter.tsx";
import ConsumptionFilter from "@/components/ConsumptionFilter.tsx";

export default function App() {
  return (
    <Container>
      <div className="flex justify-end">
        <ThemeModeToggle />
      </div>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Daily statistics list</h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col lg:w-1/3 gap-6 ">
            <h3 className="text-2xl font-bold">Filters:</h3>

            <div className="w-full flex flex-col gap-8">
              <DateFilter />
              <Separator />
              <PriceFilter />
              <Separator />
              <NegativePeriodFilter />
              <Separator />
              <ConsumptionFilter />
            </div>
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
