"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewBookPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setCheckingAuth(false);
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    setSuccess(false);

    if (rating === 0) {
      setError("별점을 선택해주세요.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    const formData = new FormData(form);

    setSubmitting(true);
    const { error } = await supabase.from("books").insert({
      title: formData.get("title"),
      author: formData.get("author") || null,
      rating,
      review: formData.get("review") || null,
      user_id: user.id,
    });
    setSubmitting(false);

    if (error) {
      setError(`저장에 실패했어요: ${error.message}`);
      return;
    }

    form.reset();
    setRating(0);
    setSuccess(true);
  }

  if (checkingAuth) {
    return null;
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

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          책 추가
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="책 제목"
              className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-accent dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="author" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              저자 (선택)
            </label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="지은이"
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
              한줄평 (선택)
            </label>
            <textarea
              id="review"
              name="review"
              rows={3}
              placeholder="이 책에 대한 짧은 생각"
              className="resize-none rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-accent dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "저장 중..." : "저장"}
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {success && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              저장됐어요. Supabase 대시보드의 Table Editor에서 확인해보세요.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
