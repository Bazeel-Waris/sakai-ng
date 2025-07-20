import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PaginatedPostsResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getPosts(page: number = 1): Observable<PaginatedPostsResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedPostsResponse>(`${this.apiUrl}/posts`, { params });
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  createPost(post: { title: string; body: string }): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/create-post`, post);
  }
}
