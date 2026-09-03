import Link from "next/link";
import { mockBooks } from "@/lib/mock-books";
import { BookDetailClient } from "./BookDetailClient";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 dark:bg-black">
        <p className="text-zinc-500 dark:text-zinc-400">책을 찾을 수 없어요.</p>
        <Link href="/" className="text-sm underline text-zinc-900 dark:text-zinc-50">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return <BookDetailClient book={book} />;
}
