import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";

const finnishDateFormatter = new Intl.DateTimeFormat("fi-FI");

type SingleDayDatePickerProps = {
  selectedDay: Date | undefined;
  setSelectedDay: (date: Date | undefined) => void;
}

export default function SingleDayDatePicker({selectedDay, setSelectedDay}: SingleDayDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Selected date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {selectedDay
              ? finnishDateFormatter.format(selectedDay)
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDay}
            captionLayout="dropdown"
            onSelect={(date) => {
              setSelectedDay(date);
              setOpen(false);
            }}
            disabled={{
              before: new Date(2020, 11, 31),
              after: new Date(2024, 9, 1),
            }}
            weekStartsOn={1}
            showOutsideDays={false}
            defaultMonth={selectedDay ? selectedDay : new Date(2024, 9, 1)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
