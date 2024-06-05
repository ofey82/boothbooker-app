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

export const isValidRequest = (request: any): request is Request => {
  return (
    typeof request.id === 'number' &&
    typeof request.eventBoothId === 'number' &&
    typeof request.applicantId === 'number' &&
    (request.status === 'O' || request.status === 'A' || request.status === 'D')
  );
};
