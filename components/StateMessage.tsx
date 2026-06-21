interface StateMessageProps {
  title: string;
  description?: string;
}

export function StateMessage({ title, description }: StateMessageProps) {
  return (
    <div className="bg-naty-blushSoft border border-naty-line px-6 py-10 text-center">
      <div className="eyebrow">Naty Modas</div>
      <h2 className="font-display text-[24px] md:text-[30px] text-naty-text mt-2 font-medium">
        {title}
      </h2>
      {description && (
        <p className="text-[13px] leading-relaxed text-naty-muted max-w-[520px] mx-auto mt-3">
          {description}
        </p>
      )}
    </div>
  );
}
