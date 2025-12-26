import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './events.html',
  styleUrls: ['./events.scss'],
  imports: [CommonModule, NgFor]
})
export class Events implements OnInit, OnDestroy {
  images = [
    { src: 'golden-4.JPG', alt: 'Golden Jubilee invitation' },
    { src: 'golden-1.JPG', alt: 'Golden Jubilee then and now' }
  ];

  currentIndex = 0;
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => this.next(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
