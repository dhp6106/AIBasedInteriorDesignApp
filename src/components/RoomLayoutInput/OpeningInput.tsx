import React from 'react';
import { useStore } from '../../store/useStore';
import { NumericInput } from '../ui/NumericInput';
import { Plus, Trash2 } from 'lucide-react';

interface OpeningInputProps {
  type: 'windows' | 'doors';
}

export const OpeningInput: React.FC<OpeningInputProps> = ({ type }) => {
  const { roomLayout, setRoomLayout } = useStore();

  const handleAdd = () => {
    const newOpening = {
      wall: 'north' as const,
      position: 0,
      width: type === 'doors' ? 3 : 4,
      height: type === 'doors' ? 7 : 4
    };

    setRoomLayout({
      ...roomLayout || { width: 12, length: 12, height: 8, windows: [], doors: [] },
      [type]: [...(roomLayout?.[type] || []), newOpening]
    });
  };

  const handleRemove = (index: number) => {
    if (!roomLayout) return;
    const updatedOpenings = [...roomLayout[type]];
    updatedOpenings.splice(index, 1);
    setRoomLayout({ ...roomLayout, [type]: updatedOpenings });
  };

  const handleChange = (index: number, field: string, value: any) => {
    if (!roomLayout) return;
    const updatedOpenings = [...roomLayout[type]];
    updatedOpenings[index] = { ...updatedOpenings[index], [field]: value };
    setRoomLayout({ ...roomLayout, [type]: updatedOpenings });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-700">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
        >
          <Plus size={16} />
          <span>Add {type === 'doors' ? 'Door' : 'Window'}</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {roomLayout?.[type].map((opening, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                {type === 'doors' ? 'Door' : 'Window'} {index + 1}
              </span>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <select
                value={opening.wall}
                onChange={(e) => handleChange(index, 'wall', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="north">North Wall</option>
                <option value="south">South Wall</option>
                <option value="east">East Wall</option>
                <option value="west">West Wall</option>
              </select>
              
              <NumericInput
                label="Position"
                value={opening.position}
                onChange={(value) => handleChange(index, 'position', value)}
                min={0}
                max={roomLayout.width}
              />
              
              <NumericInput
                label="Width"
                value={opening.width}
                onChange={(value) => handleChange(index, 'width', value)}
                min={2}
                max={8}
              />
              
              <NumericInput
                label="Height"
                value={opening.height}
                onChange={(value) => handleChange(index, 'height', value)}
                min={2}
                max={8}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};