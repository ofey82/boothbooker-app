import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatDivider } from '@angular/material/divider';
import { Event as EventModel } from '../../models/event.model';
import { EventBooth } from '../../models/event-booth.model';
import { EventService } from '../../services/event.service';
import { EventBoothService } from '../../services/event-booth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  selectedFile: File | null = null;

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
  }

  ngOnInit(): void {
    this.addBooth();
  }

  get booths(): FormArray {
    return this.eventForm.get('booths') as FormArray;
  }

  addBooth(): void {
    this.booths.push(
      this.fb.group({
        name: ['', Validators.required],
        size: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(1)]],
        status: ['A'],
      })
    );
  }

  removeBooth(index: number): void {
    if (this.booths.length > 1) {
      this.booths.removeAt(index);
    }
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitForm(stepper: MatStepper): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.eventForm.valid) {
      const formData = new FormData();
      // Append event data to FormData
      formData.append('name', this.eventForm.get('name')?.value);
      formData.append('local', this.eventForm.get('local')?.value);
      formData.append('date', this.eventForm.get('date')?.value);
      formData.append('description', this.eventForm.get('description')?.value);
      formData.append('creatorId', currentUser.id);
      formData.append('status', 'O');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      } else {
      }

      this.eventService.createEvent(formData).subscribe({
        next: (event: EventModel) => {
          this.booths.controls.forEach((boothControl) => {
            const boothData: EventBooth = {
              ...boothControl.value,
              eventId: event.id,
              exhibitorId: null,
            };
            this.eventBoothService.createEventBooth(boothData).subscribe({
              next: () => console.log('Booth created:', boothData), // Debug log
              error: (error) => console.error('Error creating booth:', error), // Debug log
            });
          });
          stepper.reset();
          this.addBooth();
        },
        error: (error) => console.error('Error creating event:', error), // Debug log
      });
    } else {
      console.log('Form is invalid'); // Debug log
      console.log(this.eventForm); // Debug log to see invalid controls
    }
  }
}
