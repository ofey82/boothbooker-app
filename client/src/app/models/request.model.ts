export interface Request {
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
