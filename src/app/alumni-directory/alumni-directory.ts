import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumni-directory',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './alumni-directory.html',
  styleUrls: ['./alumni-directory.scss'],
  
})
export class AlumniDirectory implements OnInit {
  alumniList: any[] = [];
  // Set your deployed base API URL:
  readonly apiUrl = 'https://api.mlhsalumni.in/api/users'; // or prod backend

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => { this.alumniList = data; },
      error: () => { alert('Could not load alumni directory.'); }
    });
  }
}
