export interface EventBooth {
  id: number;
  eventId: number;
  name: string;
  size: string;
  price: number;
  status: 'A' | 'B';
  exhibitorId?: number | null;
}
