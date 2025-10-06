import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://localhost:3000/api'; // Modify if your backend base changes
  private tokenKey = 'adminAuthToken';

  constructor(private http: HttpClient) {}

  // post(endpoint: string, data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  // }

  post(endpoint: string, data: any): Observable<any> {
  // Check if data is FormData
  if (data instanceof FormData) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }
  // For JSON
  return this.http.post(`${this.baseUrl}/${endpoint}`, data);
}

  get(endpoint: string, params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params });
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.post('admin-login', credentials);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getWithAuth(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }
}
