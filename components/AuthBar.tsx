"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function AuthBar() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return <div className="h-9" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex w-fit items-center rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        로그인 / 회원가입
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="/books/new"
        className="inline-flex w-fit items-center rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        + 책 추가
      </Link>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</span>
      <button
        type="button"
        onClick={() => supabase.auth.signOut()}
        className="text-sm text-zinc-500 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        로그아웃
      </button>
    </div>
  );
}
