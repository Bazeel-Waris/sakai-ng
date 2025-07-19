import { User } from "./user.model";

export interface Post {
  id: number;
  title: string;
  body: string;
  author: User;
  publishedDate: string;
}
