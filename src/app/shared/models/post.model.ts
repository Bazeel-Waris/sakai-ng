import { User } from "./user.model";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  User?: User; // Associated user from backend
}

export interface PaginatedPostsResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  posts: Post[];
}
