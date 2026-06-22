function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-naty-blush animate-pulse rounded ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 md:px-14 py-6">
      <Skeleton className="h-4 w-56 mb-8" />
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 pb-12">
        <Skeleton className="aspect-[3/4]" />
        <div className="flex flex-col gap-5 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-px w-full" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-8" />)}
          </div>
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-16" />)}
          </div>
          <Skeleton className="h-12 w-full mt-4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
