import { create } from 'zustand';
import { Furniture, RoomLayout } from '../types/furniture';
import { FurniturePosition } from '../types/furniture';

interface State {
  selectedFurniture: Furniture[];
  roomLayout: RoomLayout | null;
  furnitureArrangement: FurniturePosition[];
  selectedFurnitureId: string | null;
  recommendations: Furniture[];
  setSelectedFurniture: (furniture: Furniture[]) => void;
  setRoomLayout: (layout: RoomLayout) => void;
  setFurnitureArrangement: (arrangement: FurniturePosition[]) => void;
  setSelectedFurnitureId: (id: string | null) => void;
  updateFurniturePosition: (id: string, x: number, y: number, rotation: number) => void;
  removeFurniture: (id: string) => void;
  addFurnitureToRoom: (furniture: Furniture) => void;
}

export const useStore = create<State>((set, get) => ({
  selectedFurniture: [],
  roomLayout: null,
  furnitureArrangement: [],
  selectedFurnitureId: null,
  recommendations: [],
  
  setSelectedFurniture: (furniture) => set({ selectedFurniture: furniture }),
  setRoomLayout: (layout) => set({ roomLayout: layout }),
  setFurnitureArrangement: (arrangement) => set({ furnitureArrangement: arrangement }),
  setSelectedFurnitureId: (id) => set({ selectedFurnitureId: id }),
  
  updateFurniturePosition: (id, x, y, rotation) => {
    const { furnitureArrangement } = get();
    const updatedArrangement = furnitureArrangement.map(pos => 
      pos.furniture.id === id ? { ...pos, x, y, rotation } : pos
    );
    set({ furnitureArrangement: updatedArrangement });
  },
  
  removeFurniture: (id) => {
    const { furnitureArrangement, selectedFurniture } = get();
    set({
      furnitureArrangement: furnitureArrangement.filter(pos => pos.furniture.id !== id),
      selectedFurniture: selectedFurniture.filter(f => f.id !== id),
      selectedFurnitureId: null
    });
  },
  
  addFurnitureToRoom: (furniture) => {
    const { roomLayout, furnitureArrangement, selectedFurniture } = get();
    if (!roomLayout) return;

    // Place new furniture in the center of the room
    const newPosition: FurniturePosition = {
      furniture,
      x: 0,
      y: 0,
      rotation: 0
    };

    set({
      furnitureArrangement: [...furnitureArrangement, newPosition],
      selectedFurniture: [...selectedFurniture, furniture]
    });
  }
}));