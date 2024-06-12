export interface Request {
  id: number;
  eventBoothId: number;
  applicantId: number;
  status: 'O' | 'A' | 'D';
}

export interface PublicRequest {
  id: number;
  eventBoothId: number;
  applicantId: number;
  status: 'O' | 'A' | 'D';
}

export interface EventRequest {
  id: number;
  eventBoothId: number;
  applicantId: number;
  status: 'O' | 'A' | 'D';
  event: {
    id: number;
    name: string;
    date: Date;
    local: string;
    description: string;
  };
}

export const isValidRequest = (request: any): request is Request => {
  return (
    typeof request.id === 'number' &&
    typeof request.eventBoothId === 'number' &&
    typeof request.applicantId === 'number' &&
    (request.status === 'O' || request.status === 'A' || request.status === 'D')
  );
};
