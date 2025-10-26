import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TPage } from "@/lib/types.ts";

export default function PageSelector({page}: {page: TPage}) {
  return (
    <div className="flex items-center justify-between px-4">
      {/*<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">*/}
      {/*  {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
      {/*  {table.getFilteredRowModel().rows.length} row(s) selected.*/}
      {/*</div>*/}
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${page.size}`}
            // onValueChange={(value) => {
            //   table.setPageSize(Number(value))
            // }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue
                placeholder={page.size}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {page.number + 1} of{" "}
            {page.totalPages}
          </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            // onClick={() => table.setPageIndex(0)}
            // disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            // onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
