export default function AmbientBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
      <svg
        className="absolute -right-32 -top-32 w-[680px] h-[680px] text-surface-container-high"
        fill="currentColor"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" fill="none" r="180" stroke="currentColor" strokeDasharray="8 8" strokeWidth="2" />
        <circle cx="200" cy="200" fill="none" r="140" stroke="currentColor" strokeWidth="1.5" />
        <path d="M200 40 L200 360 M40 200 L360 200" stroke="currentColor" strokeWidth="1.5" />
        <polygon fill="none" points="200,80 304,140 304,260 200,320 96,260 96,140" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="absolute -left-20 bottom-0 w-[520px] h-[520px] text-surface-container"
        fill="none"
        viewBox="0 0 300 300"
      >
        <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="1" />
        <circle cx="150" cy="150" r="80" stroke="currentColor" strokeDasharray="4 4" strokeWidth="0.75" />
      </svg>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl" />
      <div className="absolute -bottom-10 left-1/3 w-[30rem] h-[30rem] rounded-full bg-primary-fixed/30 blur-3xl" />
    </div>
  );
}