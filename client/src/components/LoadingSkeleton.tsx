export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-[380px] rounded-2xl bg-slate-200" />
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="h-28 rounded-2xl bg-slate-200" />
      <div className="h-28 rounded-2xl bg-slate-200" />
      <div className="h-28 rounded-2xl bg-slate-200" />
    </div>
  </div>
);
