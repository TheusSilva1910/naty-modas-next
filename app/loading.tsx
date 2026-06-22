function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-naty-blush animate-pulse rounded ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Skeleton className="h-9 w-full rounded-none" />
      <Skeleton className="h-20 w-full rounded-none border-b" />
      <Skeleton className="h-[480px] w-full rounded-none" />
      <div className="px-4 md:px-14 py-14">
        <div className="flex flex-col items-center gap-3 mb-10">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
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
