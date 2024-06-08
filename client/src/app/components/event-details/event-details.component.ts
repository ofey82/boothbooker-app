import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';
import { EventBoothService } from '../../services/event-booth.service';
import { RequestService } from '../../services/request.service';
import { Event } from '../../models/event.model';
import { EventBooth } from '../../models/event-booth.model';
import { Request } from '../../models/request.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null;
  availableBooths: EventBooth[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private eventBoothService: EventBoothService,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['id'];
    this.loadEventDetails(eventId);
    this.loadAvailableBooths(eventId);
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;
    });
  }

  loadAvailableBooths(eventId: number): void {
    this.eventBoothService
      .getEventBoothsByEventId(eventId)
      .subscribe((booths) => {
        this.availableBooths = booths.filter((booth) => booth.status === 'A');
      });
  }

  requestBooth(boothId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Do you want to request this booth?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const user = localStorage.getItem('currentUser');
        if (!user) {
          this.snackBar.open('User not logged in.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
          return;
        }

        const currentUser = JSON.parse(user);
        const applicantId = currentUser.id;

        const newRequest: Partial<Request> = {
          eventBoothId: boothId,
          applicantId: applicantId,
          status: 'O',
        };

        this.requestService.createRequest(newRequest).subscribe(() => {
          this.snackBar.open('Request created successfully!', 'Close', {
            duration: 3000,
          });
          this.loadAvailableBooths(this.event!.id);
        });
      }
    });
  }
}
