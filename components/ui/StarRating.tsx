import { Star } from "lucide-react";

type StarRatingProps = {
  count?: number;
};

export default function StarRating({ count = 5 }: StarRatingProps) {
  return (
    <div className="flex text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
      ))}
    </div>
  );
}