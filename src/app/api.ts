import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://localhost:3000/api'; // Modify if your backend base changes

  constructor(private http: HttpClient) {}

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  get(endpoint: string, params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params });
  }
}
