import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Api } from '../api';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, HttpClientModule],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.scss'],
  providers: [Api]
})
export class ImageUpload {
  selectedFiles: File[] = [];
  uploadProgress = 0;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  uploadFiles() {
    if(this.selectedFiles.length === 0) {
      alert('Select files first');
      return;
    }
    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('images', file, file.name));
    this.http.post('http://localhost:3000/api/upload-images', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      } else if(event.type === HttpEventType.Response) {
        alert('Upload successful');
        this.uploadProgress = 0;
        this.selectedFiles = [];
      }
    }, error => {
      alert('Upload failed');
      this.uploadProgress = 0;
    });
  }
}
