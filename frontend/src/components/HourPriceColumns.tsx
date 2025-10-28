import { type ColumnDef } from "@tanstack/react-table";
import type { THourlyPrice } from "@/lib/types.ts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const formatHour = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatPrice = (value: number): string => value.toFixed(2);

export const HourPriceColumns: ColumnDef<THourlyPrice>[] = [
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full hover:cursor-pointer relative"
        >
          Hour
          <span className="w-4 absolute right-4">
            {(column.getIsSorted() === "asc" && (
              <ChevronDown className="h-4 w-4" />
            )) ||
              (column.getIsSorted() === "desc" && (
                <ChevronUp className="h-4 w-4" />
              ))}
          </span>
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {formatHour(row.getValue("startTime"))}
        </div>
      );
    },
  },
  {
    accessorKey: "hourlyPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full hover:cursor-pointer relative"
        >
          Price
          <span className="w-4 absolute right-4">
            {(column.getIsSorted() === "asc" && (
              <ChevronDown className="h-4 w-4" />
            )) ||
              (column.getIsSorted() === "desc" && (
                <ChevronUp className="h-4 w-4" />
              ))}
          </span>
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("hourlyPrice") === null ? "No data" : `${formatPrice(row.getValue("hourlyPrice"))} €`}
        </div>
      );
    },
  },
];
