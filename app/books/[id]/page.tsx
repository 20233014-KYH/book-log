import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Book, BookRow } from "@/lib/types";
import { BookDetailClient } from "./BookDetailClient";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: row } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .returns<BookRow[]>()
    .single();

  if (!row) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 dark:bg-black">
        <p className="text-zinc-500 dark:text-zinc-400">책을 찾을 수 없어요.</p>
        <Link href="/" className="text-sm underline text-zinc-900 dark:text-zinc-50">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const book: Book = {
    id: String(row.id),
    title: row.title,
    author: row.author ?? undefined,
    rating: row.rating,
    review: row.review ?? undefined,
    createdAt: row.created_at.slice(0, 10),
  };

  return <BookDetailClient book={book} />;
}
