import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../news';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news.html',
  styleUrls: ['./news.scss'],
  providers: [NewsService]
})
export class News implements OnInit {
  newsList: any[] = [];
  loading = true;
  selectedNews: any = null;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsList = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.loading = false;
      },
      error: () => {
        alert('Failed to load news');
        this.loading = false;
      }
    });
  }

  selectNews(news: any) {
    this.selectedNews = news;
  }

  closeDetail() {
    this.selectedNews = null;
  }
}
