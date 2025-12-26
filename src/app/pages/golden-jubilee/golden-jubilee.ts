import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-golden-jubilee',
  standalone: true,
  templateUrl: './golden-jubilee.html',
  styleUrls: ['./golden-jubilee.scss'],
  imports: [CommonModule, NgFor],
})
export class GoldenJubilee implements OnInit, OnDestroy {
  images = [
    { src: 'golden-3.JPG', alt: 'Golden Jubilee main invitation' },
    { src: 'golden-2.JPG', alt: 'Inauguration ceremony' },
    { src: 'golden-4.JPG', alt: 'Closing ceremony' },
    { src: 'golden-1.JPG', alt: 'Then and now poster' }
  ];

  pdfUrl = 'SWARNA_PADMA_ PDF.pdf';

  currentIndex = 0;
  private timer: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startAutoSlide() {
    this.timer = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
