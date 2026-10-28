export interface RoomDTO {
  id: number;
  name: string;
  floor: number;
  category: string;
  price: number;
  renter: string | null;
  status: 'occupied' | 'vacant';
}
