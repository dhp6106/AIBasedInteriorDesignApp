import React from 'react';
import { useStore } from '../../store/useStore';
import { NumericInput } from '../ui/NumericInput';

export const DimensionsInput: React.FC = () => {
  const { roomLayout, setRoomLayout } = useStore();

  const handleDimensionChange = (dimension: 'width' | 'length' | 'height', value: number) => {
    setRoomLayout({
      ...roomLayout || { windows: [], doors: [] },
      [dimension]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Room Dimensions (feet)</h3>
      <div className="grid grid-cols-3 gap-4">
        <NumericInput
          label="Width"
          value={roomLayout?.width || 12}
          onChange={(value) => handleDimensionChange('width', value)}
          min={6}
          max={50}
        />
        <NumericInput
          label="Length"
          value={roomLayout?.length || 12}
          onChange={(value) => handleDimensionChange('length', value)}
          min={6}
          max={50}
        />
        <NumericInput
          label="Height"
          value={roomLayout?.height || 8}
          onChange={(value) => handleDimensionChange('height', value)}
          min={7}
          max={20}
        />
      </div>
    </div>
  );
};