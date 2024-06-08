import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  context: 'main' | 'userEvents' = 'main';
  events: Event[] = [];
  createdEvents: Event[] = [];
  attendingEvents: Event[] = [];
  userId: number;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = currentUser.id;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.context = data['context'] || 'main';
      this.loadEvents();
    });
  }

  loadEvents(): void {
    if (this.context === 'main') {
      this.eventService.getEvents().subscribe((events: Event[]) => {
        this.events = events;
      });
    } else if (this.context === 'userEvents') {
      this.eventService
        .getEventsByCreator(this.userId)
        .subscribe((events: Event[]) => {
          this.createdEvents = events;
          console.log('this.createdEvents', this.createdEvents);
        });
      this.eventService
        .getEventsForUser(this.userId)
        .subscribe((events: Event[]) => {
          this.attendingEvents = events;
        });
    }
  }

  // ngOnInit(): void {
  //   console.log(this.context);
  //   if (this.context === 'main') {
  //     this.eventService.getEvents().subscribe((events: Event[]) => {
  //       this.events = events;
  //       console.log('this.events', this.events);
  //     });
  //   } else if (this.context === 'userEvents') {
  //     this.eventService
  //       .getEventsByCreator(this.userId)
  //       .subscribe((events: Event[]) => {
  //         this.createdEvents = events;
  //         console.log('this.createdEvents', this.createdEvents);
  //       });
  //     this.eventService
  //       .getEventsForUser(this.userId)
  //       .subscribe((events: Event[]) => {
  //         this.attendingEvents = events;
  //       });
  //   }
  // }
}
