import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label.tsx";
import { useState } from "react";
import { useDSParams } from "@/lib/hooks.ts";
import { formatLocalDate } from "@/lib/utils.ts";

const finnishDateFormatter = new Intl.DateTimeFormat("fi-FI");

export default function DateFilter() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const { startDate, setStartDate, endDate, setEndDate } = useDSParams();

  const startDateValue = startDate ? new Date(startDate) : undefined;
  const endDateValue = endDate ? new Date(endDate) : undefined;

  return (
    <div>
      {/*<h2>Date</h2>*/}
      <div className="flex gap-2">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">
            Start date:
          </Label>
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {startDate
                  ? finnishDateFormatter.format(startDateValue)
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDateValue}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) setStartDate(formatLocalDate(date));
                  setStartOpen(false);
                }}
                disabled={{
                  before: new Date(2020, 11, 31),
                  after: endDateValue ?? new Date(2024, 9, 1),
                }}
                weekStartsOn={1}
                showOutsideDays={false}
                defaultMonth={
                  startDateValue ? startDateValue : new Date(2020, 11, 31)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">
            End date:
          </Label>
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {endDate
                  ? finnishDateFormatter.format(endDateValue)
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={endDateValue}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) setEndDate(formatLocalDate(date));
                  setEndOpen(false);
                }}
                disabled={{
                  before: startDateValue ?? new Date(2020, 11, 31),
                  after: new Date(2024, 9, 1),
                }}
                weekStartsOn={1}
                showOutsideDays={false}
                defaultMonth={
                  endDateValue ? endDateValue : new Date(2024, 9, 1)
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
