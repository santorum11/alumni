import { Component } from '@angular/core';
import { Metrics } from '../metrics/metrics';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; 
import { faUserPlus, faPlay, faSchool, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Metrics, FontAwesomeModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  faUserPlus = faUserPlus;
  faPlay = faPlay;
  faSchool = faSchool;
  faTrophy = faTrophy;
}
