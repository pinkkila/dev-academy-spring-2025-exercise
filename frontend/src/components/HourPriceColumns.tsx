import { type ColumnDef } from "@tanstack/react-table"
import type { THourlyPrice } from "@/lib/types.ts";
import { ArrowUpDown } from "lucide-react"
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
        >
          Hour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      return <div className="text-center">{formatHour(row.getValue("startTime"))}</div>
    }
  },
  {
    accessorKey: "hourlyPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      return <div className="text-center">{formatPrice(row.getValue("hourlyPrice"))} €</div>
    }
  }
]


