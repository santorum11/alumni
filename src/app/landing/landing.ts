import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationDetailsDialog } from '../registration-details-dialog/registration-details-dialog';
import { BlogService } from '../blog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    NgIf,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  providers: [Api, BlogService]
})
export class Landing implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['profilePic', 'fullName', 'emailId', 'batch', 'contactNumber', 'yearOfPassing'];
  // For admin check and image upload
  isAdmin: boolean = false;
  selectedFiles: File[] = [];
  uploadProgress = 0;

  blogs: any[] = [];
  loadingBlogs = true;
  searchTerm = '';

  newsList: any[] = [];
  loadingNews = true;
  showNewsForm = false;
  editingNews: any = null;
  newNews = {
    title: '',
    category: 'General',
    content: '',
    image_url: '',
    published: false,
  };
  categories = ['General', 'Event', 'Achievement', 'Announcement', 'Update'];

  constructor(private api: Api, private http: HttpClient, private dialog: MatDialog, private blogService: BlogService, 
    private router: Router) {}

  ngOnInit() {
    this.api.getWithAuth('users').subscribe({
      next: (users) => this.users = users,
      error: () => alert('Unauthorized')
    });
    this.isAdmin = !!this.api.getToken();
    if (!this.isAdmin) {
      this.router.navigate(['/']);   // <--- Redirect to home page
      return;
    }
    if (this.isAdmin) {
      this.loadBlogs();
      this.loadNews();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.selectedFiles = Array.from(input.files);
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      alert('Select files first');
      return;
    }
    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('images', file, file.name));
    this.http.post('http://localhost:3000/api/upload-images', formData, {
      reportProgress: true,
      observe: 'events',
      headers: { Authorization: `Bearer ${this.api.getToken()}` }
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        alert('Upload successful');
        this.uploadProgress = 0;
        this.selectedFiles = [];
      }
    }, () => {
      alert('Upload failed');
      this.uploadProgress = 0;
    });
  }

  openDetails(user: any) {
    this.dialog.open(RegistrationDetailsDialog, {
      width: '700px',           // Desktop: fixed 700px
      maxWidth: '95vw',         // Mobile: shrinks to 95% of viewport width
      maxHeight: '90vh', 
      data: user
    });
  }

  loadBlogs() {
    this.loadingBlogs = true;
    this.blogService.getAdminBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loadingBlogs = false;
      },
      error: () => {
        alert('Failed to load blogs');
        this.loadingBlogs = false;
      }
    });
  }

  deleteBlog(blogId: number) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlog(blogId).subscribe({
        next: () => {
          alert('Blog deleted successfully');
          this.loadBlogs();
        },
        error: () => {
          alert('Failed to delete blog');
        }
      });
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.blogService.deleteComment(commentId).subscribe({
        next: () => {
          alert('Comment deleted successfully');
          this.loadBlogs();
        },
        error: () => {
          alert('Failed to delete comment');
        }
      });
    }
  }

  approveBlog(blogId: number) {
    if (confirm('Approve this blog post?')) {
      this.blogService.approveBlog(blogId).subscribe({
        next: () => {
          alert('Blog approved successfully');
          this.loadBlogs();
        },
        error: () => {
          alert('Failed to approve blog');
        }
      });
    }
  }

  get filteredBlogs() {
    return this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // News management

  loadNews() {
    this.loadingNews = true;
    this.http.get<any[]>('http://localhost:3000/api/admin/news', {
      headers: { Authorization: `Bearer ${this.api.getToken()}` },
    }).subscribe({
      next: (data) => {
        this.newsList = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.loadingNews = false;
      },
      error: () => {
        alert('Failed to load news');
        this.loadingNews = false;
      }
    });
  }

  openNewsForm() {
    this.showNewsForm = true;
    this.editingNews = null;
    this.newNews = { title: '', category: 'General', content: '', image_url: '', published: false };
  }
  
  editNews(news: any) {
    this.editingNews = news;
    this.newNews = { ...news };
    this.showNewsForm = true;
  }

  saveNews() {
    if (!this.newNews.title || !this.newNews.content) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingNews) {
      this.http.put(`http://localhost:3000/api/news/${this.editingNews.id}`, this.newNews, {
        headers: { Authorization: `Bearer ${this.api.getToken()}`}
      }).subscribe({
        next: () => {
          alert('News updated successfully');
          this.loadNews();
          this.showNewsForm = false;
        },
        error: () => alert('Failed to update news')
      });
    } else {
      this.http.post(`http://localhost:3000/api/news`, this.newNews, {
        headers: { Authorization: `Bearer ${this.api.getToken()}` }
      }).subscribe({
        next: () => {
          alert('News created successfully');
          this.loadNews();
          this.showNewsForm = false;
        },
        error: () => alert('Failed to create news')
      });
    }
  }

  togglePublish(news: any) {
    this.http.patch(`http://localhost:3000/api/news/${news.id}/publish`, { published: !news.published }, {
      headers: { Authorization: `Bearer ${this.api.getToken()}` }
    }).subscribe({
      next: () => {
        alert('News status updated');
        this.loadNews();
      },
      error: () => alert('Failed to update status')
    });
  }

  deleteNews(id: number) {
    if (confirm('Delete this news post?')) {
      this.http.delete(`http://localhost:3000/api/news/${id}`, {
        headers: { Authorization: `Bearer ${this.api.getToken()}` }
      }).subscribe({
        next: () => {
          alert('News deleted successfully');
          this.loadNews();
        },
        error: () => alert('Failed to delete news')
      });
    }
  }

  closeNewsForm() {
    this.showNewsForm = false;
  }
}


