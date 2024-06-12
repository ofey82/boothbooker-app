export interface EventBooth {
  id: number;
  eventId: number;
  name: string;
  size: string;
  price: number;
  status: 'A' | 'B';
  exhibitorId?: number | null;
}

export interface PublicEventBooth {
  id: number;
  eventId: number;
  name: string;
  size: string;
  price: number;
  status: 'A' | 'B';
  exhibitorId?: number | null;
}

export const isValidEventBooth = (booth: any): booth is EventBooth => {
  return (
    typeof booth.id === 'number' &&
    typeof booth.eventId === 'number' &&
    typeof booth.name === 'string' &&
    typeof booth.size === 'string' &&
    typeof booth.price === 'number' &&
    (booth.status === 'A' || booth.status === 'B') &&
    (typeof booth.exhibitorId === 'number' ||
      booth.exhibitorId === null ||
      booth.exhibitorId === undefined)
  );
};
