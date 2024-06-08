export interface Event {
  id: number;
  name: string;
  date: Date;
  local: string;
  description: string;
  creatorId: number;
  status: 'O' | 'C';
  availableBooths: number;
}
