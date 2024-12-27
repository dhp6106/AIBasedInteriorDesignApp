import { RoomLayout, Furniture, FurniturePosition } from './furniture';

export interface Design {
  id: string;
  user_id: string;
  name: string;
  room_layout: RoomLayout;
  selected_furniture: Furniture[];
  furniture_arrangement: FurniturePosition[];
  created_at: string;
  updated_at: string;
}