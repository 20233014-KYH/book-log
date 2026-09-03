import { Book } from "@/lib/types";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "미드나잇 라이브러리",
    author: "매트 헤이그",
    rating: 5,
    review: "다른 삶을 살아볼 수 있다면, 이라는 상상을 아름답게 풀어냈다.",
    createdAt: "2026-08-02",
  },
  {
    id: "2",
    title: "사피엔스",
    author: "유발 하라리",
    rating: 4,
    review: "인류 역사를 새로운 관점에서 보게 해준 책.",
    createdAt: "2026-08-15",
  },
  {
    id: "3",
    title: "아몬드",
    author: "손원평",
    rating: 4,
    review: "담담한 문장인데 오래 여운이 남았다.",
    createdAt: "2026-08-28",
  },
  {
    id: "4",
    title: "코스모스",
    author: "칼 세이건",
    rating: 3,
    review: "천천히 읽어야 하는 책. 아직 완독 못함.",
    createdAt: "2026-09-01",
  },
];
