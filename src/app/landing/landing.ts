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

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule,
    MatTabsModule, MatTableModule, MatButtonModule, MatProgressBarModule, NgIf, MatDialogModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  providers: [Api]
})
export class Landing implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['profilePic', 'fullName', 'emailId', 'batch', 'contactNumber', 'yearOfPassing'];
  // For admin check and image upload
  isAdmin: boolean = false;
  selectedFiles: File[] = [];
  uploadProgress = 0;

  constructor(private api: Api, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.api.getWithAuth('users').subscribe({
      next: (users) => this.users = users,
      error: () => alert('Unauthorized')
    });
    this.isAdmin = !!this.api.getToken();
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
      width: '600px',
      data: user
    });
  }
}


