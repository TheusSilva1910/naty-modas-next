function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-naty-blush animate-pulse rounded ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-naty-blushSoft py-8 md:py-10 px-4 md:px-14">
        <Skeleton className="h-4 w-48 mb-5" />
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 px-4 md:px-14 py-10">
        <div className="hidden lg:flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-[3/4]" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
