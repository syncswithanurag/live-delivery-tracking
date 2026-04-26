type ETATimerProps = {
  etaSeconds: number;
};

const formatEta = (etaSeconds: number) => {
  const minutes = Math.floor(etaSeconds / 60);
  const seconds = etaSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const ETATimer = ({ etaSeconds }: ETATimerProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-base font-semibold text-slate-900">ETA</h3>
    <p className="mt-2 text-3xl font-bold text-brand-600">{formatEta(Math.max(0, etaSeconds))}</p>
    <p className="mt-1 text-xs text-slate-500">Estimated arrival countdown</p>
  </div>
);
