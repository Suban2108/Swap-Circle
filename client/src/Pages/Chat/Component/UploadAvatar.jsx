"use client";

import React,{ useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";

const AvatarUpload = ({
  currentAvatar,
  onAvatarChange,
  onAvatarRemove,
  size = "md",
  isUploading = false,
  canEdit = true,
}) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(file);

    onAvatarChange(file);
  };

  const handleRemoveAvatar = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onAvatarRemove) {
      onAvatarRemove();
    }
  };

  const displayAvatar = preview || currentAvatar;

  return (
    <div className="relative">
      <div
        className={`${
          sizeClasses[size]
        } rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center relative group`}
      >
        {displayAvatar ? (
          <img
            src={displayAvatar || "/placeholder.svg"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className={`${iconSizes[size]} text-white`} />
        )}

        {canEdit && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              {isUploading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Upload className="w-4 h-4 text-white" />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </>
        )}
      </div>

      {displayAvatar && canEdit && (
        <button
          onClick={handleRemoveAvatar}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
          disabled={isUploading}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
