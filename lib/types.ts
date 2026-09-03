export interface Book {
  id: string;
  title: string;
  author?: string;
  rating: number; // 1~5
  review?: string;
  createdAt: string; // YYYY-MM-DD
}
