import Link from "next/link";
import { mockBooks } from "@/lib/mock-books";
import { StarRating } from "@/components/StarRating";

export default function Home() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 dark:bg-black sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            책갈피
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            읽은 책을 기록하고 별점을 매기는 공간
          </p>
        </header>

        <Link
          href="/books/new"
          className="inline-flex w-fit items-center rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          + 책 추가
        </Link>

        <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
          {mockBooks.map((book) => (
            <li key={book.id}>
              <Link
                href={`/books/${book.id}`}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    {book.title}
                  </span>
                  {book.author && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {book.author}
                    </span>
                  )}
                </div>
                <StarRating rating={book.rating} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
