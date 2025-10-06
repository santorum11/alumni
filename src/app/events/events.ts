import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EventDetail {
  name: string;
  date: string;
  time: string;
  venue: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events {
  events: EventDetail[] = [
    {
      name: 'Alumni Opening Ceremony',
      date: 'December 15, 2025',
      time: '10:00 AM – 12:00 PM',
      venue: 'Main Auditorium, Mahalakshmi Nodal High School'
    },
    {
      name: 'Panel Discussion: Education & Careers',
      date: 'December 16, 2025',
      time: '2:00 PM – 4:00 PM',
      venue: 'Conference Hall, School Premises'
    },
    {
      name: 'Sports Meet & Cultural Program',
      date: 'December 17, 2025',
      time: '8:30 AM – 1:00 PM',
      venue: 'School Ground'
    },
    {
      name: 'Alumni Networking Evening',
      date: 'December 18, 2025',
      time: '5:30 PM – 8:00 PM',
      venue: 'Alumni Lounge, School'
    },
    {
      name: 'Reunion Banquet & Awards',
      date: 'December 19, 2025',
      time: '6:00 PM – 9:00 PM',
      venue: 'Banquet Hall, City Center'
    },
    {
      name: 'Family Day, Community Activities',
      date: 'December 20, 2025',
      time: '10:00 AM – 2:00 PM',
      venue: 'School Campus – Outdoor Area'
    }
  ];
}
