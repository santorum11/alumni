import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<any[]>(`${this.baseUrl}/blogs`);
  }

  postBlog(blog: {title: string, content: string}) {
    return this.http.post(`${this.baseUrl}/blogs`, blog);
  }

  postComment(blogId: number, comment: string) {
    return this.http.post(`${this.baseUrl}/blogs/${blogId}/comments`, { comment });
  }

  vote(vote: { postId: number; postType: 'blog' | 'comment'; vote: 'like' | 'dislike' }) {
    return this.http.post(`${this.baseUrl}/vote`, vote);
  }

  deleteBlog(blogId: number) {
    return this.http.delete(`${this.baseUrl}/blogs/${blogId}`);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`);
  }
}
