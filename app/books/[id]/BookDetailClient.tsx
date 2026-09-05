"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function BookDetailClient({ book }: { book: Book }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(book.rating);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  const isOwner = currentUserId !== null && currentUserId === book.userId;

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("별점을 선택해주세요.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    setSaving(true);
    const { error } = await supabase
      .from("books")
      .update({
        title: formData.get("title"),
        author: formData.get("author") || null,
        rating,
        review: formData.get("review") || null,
      })
      .eq("id", book.id);
    setSaving(false);

    if (error) {
      setError(`저장에 실패했어요: ${error.message}`);
      return;
    }

    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!window.confirm("정말 삭제할까요? 되돌릴 수 없어요.")) return;

    setError("");
    setDeleting(true);
    const { error } = await supabase.from("books").delete().eq("id", book.id);
    setDeleting(false);

    if (error) {
      setError(`삭제에 실패했어요: ${error.message}`);
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 dark:bg-black sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <Link
          href="/"
          className="w-fit text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 목록으로
        </Link>

        {!editing ? (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {book.title}
              </h1>
              {book.author && (
                <p className="text-base text-zinc-500 dark:text-zinc-400">{book.author}</p>
              )}
              <span className="text-xl text-accent">
                {"★".repeat(book.rating)}
                <span className="text-zinc-300 dark:text-zinc-700">
                  {"★".repeat(5 - book.rating)}
                </span>
              </span>
            </div>

            {book.review && (
              <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                {book.review}
              </p>
            )}

            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              기록일 {book.createdAt}
            </p>

            {isOwner && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
                >
                  {deleting ? "삭제 중..." : "삭제"}
                </button>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                제목
              </label>
              <input
                id="title"
                name="title"
                defaultValue={book.title}
                className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-accent dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="author" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                저자
              </label>
              <input
                id="author"
                name="author"
                defaultValue={book.author}
                className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-accent dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">별점</span>
              <div className="flex gap-1 text-2xl">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`별점 ${n}점`}
                    onClick={() => setRating(n)}
                    className={
                      n <= rating ? "text-accent" : "text-zinc-300 dark:text-zinc-700"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="review" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                한줄평
              </label>
              <textarea
                id="review"
                name="review"
                rows={3}
                defaultValue={book.review}
                className="resize-none rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-accent dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-accent"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="w-fit rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "저장 중..." : "저장"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setRating(book.rating);
                  setError("");
                }}
                className="w-fit rounded-full border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
              >
                취소
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
