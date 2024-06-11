export interface Event {
  id: number;
  name: string;
  date: Date;
  local: string;
  description: string;
  imageUrl: string;
  creatorId: number;
  status: 'O' | 'C';
  availableBooths: number;
}
