import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  @Input() event!: Event;

  constructor(private router: Router) {}

  navigateToEventDetails(): void {
    this.router.navigate(['/event', this.event.id]);
  }
}
