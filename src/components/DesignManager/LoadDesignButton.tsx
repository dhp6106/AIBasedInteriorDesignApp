import { useState } from 'react';
import { FolderOpen } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { loadDesigns } from '../../services/designs';
import { Design } from '../../types/design';

export const LoadDesignButton = () => {
  const { setRoomLayout, setSelectedFurniture, setFurnitureArrangement } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);

  const handleOpen = async () => {
    try {
      setIsLoading(true);
      const loadedDesigns = await loadDesigns();
      setDesigns(loadedDesigns);
      setShowModal(true);
    } catch (error) {
      console.error('Error loading designs:', error);
      alert('Failed to load designs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (design: Design) => {
    setRoomLayout(design.room_layout);
    setSelectedFurniture(design.selected_furniture);
    setFurnitureArrangement(design.furniture_arrangement);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={isLoading}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
      >
        <FolderOpen className="w-4 h-4" />
        <span>{isLoading ? 'Loading...' : 'Load Design'}</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Designs</h2>
            {designs.length === 0 ? (
              <p className="text-gray-500">No saved designs found</p>
            ) : (
              <div className="space-y-2">
                {designs.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => handleSelect(design)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="font-medium">{design.name}</div>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(design.updated_at).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};