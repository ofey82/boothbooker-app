import { TestBed } from '@angular/core/testing';

import { EventBoothService } from './event-booth.service';

describe('EventBoothService', () => {
  let service: EventBoothService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBoothService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
