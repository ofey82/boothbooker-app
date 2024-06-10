import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Event } from '../models/event.model';
import { EventBooth } from '../models/event-booth.model';
import { EventService } from '../services/event.service';
import { EventBoothService } from '../services/event-booth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  booths: FormArray;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private eventBoothService: EventBoothService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      local: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      booths: this.fb.array([]),
    });

    this.booths = this.eventForm.get('booths') as FormArray;
  }

  ngOnInit(): void {
    this.addBooth();
  }

  addBooth(): void {
    this.booths.push(
      this.fb.group({
        name: ['', Validators.required],
        size: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        status: ['A'],
      })
    );
  }

  removeBooth(index: number): void {
    if (this.booths.length > 1) {
      this.booths.removeAt(index);
    }
  }

  submitForm(stepper: MatStepper): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.eventForm.valid) {
      const eventData: Event = {
        ...this.eventForm.value,
        creatorId: currentUser.id,
        status: 'O',
        availableBooths: this.booths.length,
      };

      this.eventService.createEvent(eventData).subscribe((event) => {
        this.booths.controls.forEach((boothControl, index) => {
          const boothData: EventBooth = {
            ...boothControl.value,
            eventId: event.id,
            exhibitorId: null,
          };
          this.eventBoothService.createEventBooth(boothData).subscribe();
        });
        stepper.reset();
        this.addBooth();
      });
    }
  }
}
