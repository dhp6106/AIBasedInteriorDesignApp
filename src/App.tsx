import React from 'react';
import { FurnitureCatalog } from './components/FurnitureCatalog';
import { RoomLayout } from './components/RoomLayout';
import { RoomLayoutInput } from './components/RoomLayoutInput';
import { FurnitureRecommendations } from './components/FurnitureRecommendations';
import { DesignManager } from './components/DesignManager';
import { LayoutGrid, Sofa, Box } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">AI Interior Designer</h1>
            </div>
            <DesignManager />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sofa className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Select Furniture</h2>
              </div>
              <FurnitureCatalog />
              <FurnitureRecommendations />
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Box className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Room Layout</h2>
              </div>
              <RoomLayoutInput />
            </section>
          </div>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">3D Preview</h2>
            <RoomLayout />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;