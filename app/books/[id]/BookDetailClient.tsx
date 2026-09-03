"use client";

import Link from "next/link";
import { useState } from "react";
import { Book } from "@/lib/types";

export function BookDetailClient({ book }: { book: Book }) {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(book.rating);
  const [message, setMessage] = useState("");

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
                <p className="text-zinc-500 dark:text-zinc-400">{book.author}</p>
              )}
              <span className="text-xl text-zinc-900 dark:text-zinc-50">
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

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-full border border-zinc-900 px-5 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-black"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => setMessage("아직 데이터베이스가 연결되지 않아서 삭제되지는 않아요.")}
                className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
              >
                삭제
              </button>
            </div>

            {message && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
            )}
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage("아직 데이터베이스가 연결되지 않아서 실제로 저장되지는 않아요.");
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                제목
              </label>
              <input
                id="title"
                defaultValue={book.title}
                className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="author" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                저자
              </label>
              <input
                id="author"
                defaultValue={book.author}
                className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
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
                      n <= rating
                        ? "text-zinc-900 dark:text-zinc-50"
                        : "text-zinc-300 dark:text-zinc-700"
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
                rows={3}
                defaultValue={book.review}
                className="resize-none rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-50"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="w-fit rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-fit rounded-full border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50"
              >
                취소
              </button>
            </div>

            {message && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
