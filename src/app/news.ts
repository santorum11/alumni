import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('adminAuthToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Get all published news
  getNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/news`);
  }

  // Get all news (admin - including drafts)
  getAdminNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/news`, this.getAuthHeaders());
  }

  // Create news
  createNews(news: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/news`, news, this.getAuthHeaders());
  }

  // Update news
  updateNews(id: number, news: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/news/${id}`, news, this.getAuthHeaders());
  }

  // Publish/unpublish news
  publishNews(id: number, published: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/news/${id}/publish`, { published }, this.getAuthHeaders());
  }

  // Delete news
  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/news/${id}`, this.getAuthHeaders());
  }
}
