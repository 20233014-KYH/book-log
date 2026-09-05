"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewBookPage() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-6"
        >
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
            className="w-fit rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            저장
          </button>

          {submitted && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              아직 데이터베이스를 연결하지 않아서 실제로 저장되지는 않아요. (다음 단계에서 연결할 예정)
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
