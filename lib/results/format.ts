export function formatOrdinal(n: number) {
  const remainder = n % 100;
  if (remainder >= 11 && remainder <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function formatClassPosition(
  position: number | null | undefined,
  classSize: number | null | undefined
) {
  if (position == null || classSize == null) return "—";
  return `${formatOrdinal(position)} / ${classSize}`;
}
