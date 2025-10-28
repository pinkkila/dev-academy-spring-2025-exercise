import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TPage } from "@/lib/types.ts";
import { useDSParams } from "@/lib/hooks.ts";

export default function PageSelector({ page }: { page: TPage }) {
  const { setPageNumber, setPageSize } = useDSParams();

  return (
    <div className="flex w-full items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page" className="text-sm font-medium">
          Rows per page
        </Label>
        <Select
          value={`${page.size}`}
          onValueChange={(value) => {
            setPageSize(Number(value));
          }}
        >
          <SelectTrigger size="sm" className="w-20" id="rows-per-page">
            <SelectValue placeholder={page.size} />
          </SelectTrigger>
          <SelectContent side="top">
            {[20, 30, 40, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm font-medium">
        Page {page.number + 1} of {page.totalPages}
      </div>

      <div className=" flex items-center gap-2">
        <Button
          variant="outline"
          className=" h-8 w-8 p-0"
          onClick={() => setPageNumber(0)}
          disabled={page.number === 0}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => setPageNumber(page.number - 1)}
          disabled={page.number === 0}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => setPageNumber(page.number + 1)}
          disabled={page.number === page.totalPages - 1}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => setPageNumber(page.totalPages - 1)}
          disabled={page.number === page.totalPages - 1}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
