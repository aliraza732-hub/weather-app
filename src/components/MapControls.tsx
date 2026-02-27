// src/components/MapControls.tsx
import { useState } from 'react';

interface MapControlsProps {
  onLayerChange: (layer: string) => void;
}

function MapControls({ onLayerChange }: MapControlsProps) {
  const [activeLayer, setActiveLayer] = useState('temp');

  const layers = [
    { id: 'temp', name: 'Temperature', icon: '🌡️' },
    { id: 'clouds', name: 'Clouds', icon: '☁️' },
    { id: 'precipitation', name: 'Rain', icon: '🌧️' },
    { id: 'wind', name: 'Wind', icon: '💨' },
  ];

  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
    onLayerChange(layerId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 mb-4">
      <p className="text-gray-600 text-sm font-semibold mb-2">
        Map Layer:
      </p>
      <div className="flex gap-2">
        {layers.map(layer => (
          <button
            key={layer.id}
            onClick={() => handleLayerChange(layer.id)}
            className={`
              flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-all
              ${activeLayer === layer.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <span className="mr-1">{layer.icon}</span>
            {layer.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MapControls;