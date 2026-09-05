export interface Book {
  id: string;
  title: string;
  author?: string;
  rating: number; // 1~5
  review?: string;
  createdAt: string; // YYYY-MM-DD
}

// Supabase의 books 테이블에서 그대로 내려오는 행 모양 (칼럼 이름이 snake_case)
export interface BookRow {
  id: number;
  title: string;
  author: string | null;
  rating: number;
  review: string | null;
  created_at: string;
}
