import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function SingleDayStatisticsSkeleton() {
  return (
    <div className="flex items-center gap-9 pl-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[115px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[85px]" />
        <Skeleton className="h-4 w-[40px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[40px]" />
      </div>
      <Skeleton className="h-8 w-[110px]" />
    </div>
  );
}
