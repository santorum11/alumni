import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 // Create this service per Step 4

@Component({
  selector: 'app-blog-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './blog-forum.html',
  styleUrls: ['./blog-forum.scss'],
  providers: [BlogService]
})
export class BlogForum implements OnInit {
  blogs: any[] = [];
  newBlog = { title: '', content: '' };
  newComments: { [blogId: number]: string } = {};
  isAdmin = false;  // Set this from your auth

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.isAdmin = this.checkIfAdmin();
    this.loadBlogs();
  }

  checkIfAdmin(): boolean {
    // Implement your admin check logic here, e.g. inspect JWT token or stored role
    return !!localStorage.getItem('adminAuthToken');
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
    });
  }

  postNewBlog() {
    this.blogService.postBlog(this.newBlog).subscribe(() => {
      this.newBlog = { title: '', content: '' };
      this.loadBlogs();
    });
  }

  addComment(blogId: number) {
    const commentText = this.newComments[blogId];
    if (!commentText || !commentText.trim()) return;
    this.blogService.postComment(blogId, commentText).subscribe(() => {
      this.newComments[blogId] = '';
      this.loadBlogs();
    });
  }

  vote(postId: number, postType: 'blog' | 'comment', vote: 'like' | 'dislike') {
    this.blogService.vote({ postId, postType, vote }).subscribe(() => {
      this.loadBlogs();
    });
  }

  deleteBlog(blogId: number) {
    if (confirm('Delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe(() => this.loadBlogs());
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Delete this comment?')) {
      this.blogService.deleteComment(commentId).subscribe(() => this.loadBlogs());
    }
  }
}
