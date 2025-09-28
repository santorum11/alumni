import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Event {
  date: string;
  title: string;
  description: string;
  location?: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.html',
  styleUrls: ['./programs.scss']
})
export class Programs {
  events: Event[] = [
    {
      date: '2025-12-05',
      title: 'Alumni Annual Meet',
      description: 'Reconnect with old friends and relive your school days.',
      location: 'School Auditorium'
    },
    {
      date: '2025-12-12',
      title: 'Career Guidance Workshop',
      description: 'Expert speakers provide insights into emerging career paths.',
      location: 'Conference Hall'
    },
    {
      date: '2025-12-19',
      title: 'Charity Run for Education',
      description: 'Join us in supporting education for underprivileged children.',
      location: 'City Park'
    },
    {
      date: '2025-12-28',
      title: 'Cultural Night Gala',
      description: 'Celebrate talents with music, dance, and drama performances.',
      location: 'Open Ground'
    },
  ];
}
