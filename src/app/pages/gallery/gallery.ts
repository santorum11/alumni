import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  providers: []
})
export class Gallery implements OnInit {
  images: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<string[]>('http://localhost:3000/api/gallery-images')
      .subscribe(list => this.images = list);
  }

}
