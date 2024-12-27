export interface Furniture {
  id: string;
  name: string;
  category: string;
  image: string;
  model: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  price: number;
}

export interface RoomLayout {
  width: number;
  length: number;
  height: number;
  windows: Array<{
    wall: 'north' | 'south' | 'east' | 'west';
    position: number;
    width: number;
    height: number;
  }>;
  doors: Array<{
    wall: 'north' | 'south' | 'east' | 'west';
    position: number;
    width: number;
    height: number;
  }>;
}