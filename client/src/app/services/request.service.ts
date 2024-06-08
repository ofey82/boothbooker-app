import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = `${environment.apiUrl}/requests`;

  constructor(private http: HttpClient) {}

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`);
  }

  createRequest(request: Partial<Request>): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  updateRequest(id: number, request: Partial<Request>): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRequestsByEventBoothId(eventBoothId: number): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.apiUrl}/eventBooth/${eventBoothId}`
    );
  }

  getRequestsByApplicantId(applicantId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/applicant/${applicantId}`);
  }
  getRequestsForEventsCreatedByUser(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/creator/${userId}`);
  }

  approveRequest(id: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/accept`, {});
  }

  declineRequest(requestId: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${requestId}/decline`, {});
  }
}
