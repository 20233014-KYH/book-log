export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        책갈피
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        읽은 책을 기록하고 별점을 매기는 공간
      </p>
    </div>
  );
}
