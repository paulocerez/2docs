import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoadingScreen() {
  return (
    <div className="flex flex-col items-center space-y-3 px-4">
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
