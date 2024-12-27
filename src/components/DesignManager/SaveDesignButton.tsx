import { useState } from 'react';
import { Save } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { saveDesign } from '../../services/designs';
import { supabase } from '../../services/supabase';

export const SaveDesignButton = () => {
  const { roomLayout, selectedFurniture, furnitureArrangement } = useStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please sign in to save designs');
        return;
      }

      if (!roomLayout || selectedFurniture.length === 0) {
        alert('Please add room layout and furniture before saving');
        return;
      }

      const name = prompt('Enter a name for your design:');
      if (!name) return;

      await saveDesign({
        user_id: user.id,
        name,
        room_layout: roomLayout,
        selected_furniture: selectedFurniture,
        furniture_arrangement: furnitureArrangement
      });

      alert('Design saved successfully!');
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
    >
      <Save className="w-4 h-4" />
      <span>{isSaving ? 'Saving...' : 'Save Design'}</span>
    </button>
  );
};