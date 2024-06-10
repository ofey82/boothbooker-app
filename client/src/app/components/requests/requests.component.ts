import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { EventBoothService } from '../../services/event-booth.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  approvalRequests: Request[] = [];
  userId: number;

  constructor(
    private requestService: RequestService,
    private eventBoothService: EventBoothService
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = currentUser.id;
  }

  ngOnInit(): void {
    this.loadRequests();
    this.loadApprovalRequests();
  }

  loadRequests(): void {
    this.requestService
      .getRequestsByApplicantId(this.userId)
      .subscribe((requests: Request[]) => {
        this.requests = this.sortRequests(requests);
      });
  }

  loadApprovalRequests(): void {
    this.requestService
      .getRequestsForEventsCreatedByUser(this.userId)
      .subscribe((requests: Request[]) => {
        this.approvalRequests = requests;
      });
  }

  sortRequests(requests: Request[]): Request[] {
    return requests.sort((a, b) => {
      const statusOrder = { O: 0, A: 1, D: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return (
        new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
      );
    });
  }

  approveRequest(requestId: number): void {
    this.requestService.approveRequest(requestId).subscribe(() => {
      this.requestService.getRequestById(requestId).subscribe((request) => {
        const { eventBoothId, applicantId } = request;
        this.eventBoothService
          .updateEventBoothExhibitor(eventBoothId, applicantId)
          .subscribe(() => {
            this.loadRequests();
            this.loadApprovalRequests();
          });
      });
    });
  }

  declineRequest(requestId: number): void {
    this.requestService.declineRequest(requestId).subscribe(() => {
      this.loadRequests();
      this.loadApprovalRequests();
    });
  }

  deleteRequest(id: number): void {
    this.requestService.deleteRequest(id).subscribe(() => {
      this.loadRequests();
      this.loadApprovalRequests();
    });
  }
}
