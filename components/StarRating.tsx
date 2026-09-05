export function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`별점 ${rating}점`} className="text-accent">
      {"★".repeat(rating)}
      <span className="text-zinc-300 dark:text-zinc-700">
        {"★".repeat(5 - rating)}
      </span>
    </span>
  );
}
