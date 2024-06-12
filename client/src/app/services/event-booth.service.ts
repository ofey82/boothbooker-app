import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { EventBooth } from '../models/event-booth.model';

@Injectable({
  providedIn: 'root',
})
export class EventBoothService {
  private apiUrl = `${environment.apiUrl}/event-booths`;

  constructor(private http: HttpClient) {}

  getEventBooths(): Observable<EventBooth[]> {
    return this.http.get<EventBooth[]>(this.apiUrl);
  }

  getEventBoothById(id: number): Observable<EventBooth> {
    return this.http.get<EventBooth>(`${this.apiUrl}/${id}`);
  }

  createEventBooth(eventBooth: Partial<EventBooth>): Observable<EventBooth> {
    return this.http.post<EventBooth>(this.apiUrl, eventBooth);
  }

  updateEventBooth(
    id: number,
    eventBooth: Partial<EventBooth>
  ): Observable<EventBooth> {
    return this.http.put<EventBooth>(`${this.apiUrl}/${id}`, eventBooth);
  }

  deleteEventBooth(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEventBoothsByEventId(eventId: number): Observable<EventBooth[]> {
    return this.http.get<EventBooth[]>(`${this.apiUrl}/event/${eventId}`);
  }

  getEventBoothsByStatus(status: 'A' | 'B'): Observable<EventBooth[]> {
    return this.http.get<EventBooth[]>(`${this.apiUrl}/status/${status}`);
  }

  getEventBoothsByExhibitor(exhibitorId: number): Observable<EventBooth[]> {
    return this.http.get<EventBooth[]>(
      `${this.apiUrl}/exhibitor/${exhibitorId}`
    );
  }

  updateEventBoothExhibitor(
    id: number,
    exhibitorId: number
  ): Observable<EventBooth> {
    return this.http.put<EventBooth>(`${this.apiUrl}/book/${id}`, {
      exhibitorId,
    });
  }
}
