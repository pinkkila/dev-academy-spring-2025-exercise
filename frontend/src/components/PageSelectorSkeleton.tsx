import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function PageSelectorSkeleton() {
  return (
    <div className="flex w-full items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-[89px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
      <div>
        <Skeleton className="h-4 w-[110px]" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
