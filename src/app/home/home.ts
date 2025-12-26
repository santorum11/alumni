import { Component, OnInit, OnDestroy } from '@angular/core';
import { Metrics } from '../metrics/metrics';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faPlay, faSchool, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import confetti from 'canvas-confetti';
  // npm install canvas-confetti [web:402]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Metrics, FontAwesomeModule, RouterModule, CommonModule, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  faUserPlus = faUserPlus;
  faPlay = faPlay;
  faSchool = faSchool;
  faTrophy = faTrophy;

  // inauguration overlay
  showInauguration = true;

  heroImages = [
    '2.jpg',
    '1.jpg',
    'golden-3.JPG',
    'golden-2.JPG',
    'golden-4.JPG',
    'golden-1.JPG',
  ];

  currentHeroIndex = 0;
  private heroTimer: any;

  ngOnInit() {
    this.heroTimer = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
    }, 5000); // 5 seconds [web:330]
  }

  ngOnDestroy() {
    clearInterval(this.heroTimer);
  }

  prevHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroImages.length) % this.heroImages.length;
  }

  nextHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex + 1) % this.heroImages.length;
  }

  // button click: confetti + hide banner
  launchInauguration() {
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        this.showInauguration = false;
      }
    };

    frame();
  }
}


