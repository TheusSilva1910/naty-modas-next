const steps = [
  { id: 1, label: "Sacola" },
  { id: 2, label: "Entrega" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Confirmação" },
];

interface CheckoutStepsProps {
  current: number;
}

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <div className="bg-naty-blush py-6 px-4 md:px-14 hidden md:block">
      <div className="flex justify-center items-center gap-6 text-[11px] tracking-[0.22em] uppercase">
        {steps.map((s, i) => {
          const isCurrent = s.id === current;
          const isPast = s.id < current;
          return (
            <div key={s.id} className="flex items-center gap-6">
              <span
                className={`flex items-center gap-2.5 ${
                  isCurrent
                    ? "text-naty-rose-deep"
                    : isPast
                    ? "text-naty-gold"
                    : "text-naty-muted"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] ${
                    isCurrent
                      ? "bg-naty-rose-deep text-white"
                      : isPast
                      ? "border border-naty-gold text-naty-gold"
                      : "border border-naty-line text-naty-line"
                  }`}
                >
                  {s.id}
                </span>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={`h-px w-12 ${isPast ? "bg-naty-gold" : "bg-naty-line"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
