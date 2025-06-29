import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = () => {
    if (croppedAreaPixels) {
      onCropComplete(croppedAreaPixels); // send the actual cropped area to parent
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-xl">
        {/* Cropper container with fixed height */}
        <div className="relative w-full h-[300px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="mt-4 flex justify-between">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleDone} className="bg-purple-600 text-white px-4 py-2 rounded">
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
