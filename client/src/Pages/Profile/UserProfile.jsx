import React, { useEffect, useState } from "react"
import {
  User, Mail, MapPin, Calendar, Star, Package, Award,
  Clock, Settings, Camera, Save, X, Edit, Share2, Upload,
  CheckCircle, Globe, Instagram, Twitter, Facebook,
  LayoutDashboard, ShieldUser
} from "lucide-react"
import { Skeleton } from "../../Components/ui/skeleton"
import SettingFeatures from "./UserComponent/Settings"
import Achievements from "./UserComponent/Achievements"
import Reviews from "./UserComponent/Reviews"
import Activity from "./UserComponent/Activity"
import Overview from "./UserComponent/Overview"
import Items from "./UserComponent/Items"
import { useAuth } from "../../context/authContext"
import axios from "axios"
import toast from "react-hot-toast"
import ImageCropper from "../../Components/shared/ImageCropper"
import default_user_image from "../../assets/Default_user_image.jpeg"
import default_banner_image from "../../assets/default_cover_banner_image.webp"

import cropImageHelper from '../../Components/shared/cropImageLayout.js'
import { Link } from "react-router-dom"

// Helper function to crop image
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => (image.onload = resolve))

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], "cropped.jpeg", { type: "image/jpeg" })
      resolve(file)
    }, "image/jpeg")
  })
}

// Skeleton component for profile loading
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Cover Image Skeleton */}
    <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-600">
      <Skeleton className="w-full h-full opacity-50" />
    </div>

    {/* Profile Card Skeleton */}
    <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start space-x-6">
          {/* Avatar Skeleton */}
          <div className="relative">
            <Skeleton className="w-32 h-32 rounded-full border-4 border-purple-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
            <div className="flex flex-wrap gap-4 mt-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex space-x-3 mt-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="w-12 h-10 rounded" />
            <Skeleton className="w-12 h-10 rounded" />
            <Skeleton className="w-12 h-10 rounded" />
          </div>
        </div>
      </div>
    </div>

    {/* Tabs Skeleton */}
    <div className="px-4 mt-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-1">
        <nav className="flex space-x-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-lg" />
          ))}
        </nav>
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("items")
  const [isEditing, setIsEditing] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showCropper, setShowCropper] = useState(false)
  const [imageToCrop, setImageToCrop] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)

  const { PORT, userId } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${PORT}/api/users/${userId}`, {
          withCredentials: true,
        })

        setUserData({
          ...data,
          avatar: data.avatar || default_user_image,
          coverImage: data.coverImage || default_banner_image,
          socialLinks: data.socialLinks || {
            instagram: "",
            twitter: "",
            facebook: "",
          },
        })
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [PORT, userId])

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageToCrop(reader.result)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = async (croppedAreaPixels) => {
    const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels)
    setSelectedFile(croppedFile)
    setShowCropper(false)
  }

  const handleUploadImage = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      const { data } = await axios.post(`${PORT}/api/users/${userId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })

      setUserData((prev) => ({ ...prev, avatar: data.avatar }))
      setShowImageUpload(false)
      setSelectedFile(null)
      toast.success("Image Updated!")

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }


  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`${PORT}/api/users/${userId}`, userData, {
        withCredentials: true,
      })

      setUserData(response.data)
      setIsEditing(false)
      toast.success("Profile Updated")
    } catch (error) {
      console.error("Update error:", error)
    }
  }


  const tabItems = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "items", label: "My Items", icon: <Package className="w-4 h-4" /> },
    { id: "activity", label: "Activity", icon: <Clock className="w-4 h-4" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview />
      case "items": return <Items />
      case "activity": return <Activity />
      case "reviews": return <Reviews />
      case "achievements": return <Achievements />
      case "settings": return <SettingFeatures />
      default: return <Overview />
    }
  }

  // Show skeleton loading while data is being fetched
  if (loading || !userData) {
    return <ProfileSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-600">
        <img src={default_banner_image} alt="Cover" className="w-full h-full object-cover opacity-50" />
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start space-x-6">
            {/* Avatar and Admin Badge */}
            <div className="relative">
              <img
                src={`${PORT}${userData.avatar}`}
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-full border-4 border-purple-500 shadow-md"
              />
              {userData.role === 'admin' && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md" title="Admin">
                  <ShieldUser className="w-5 h-5" />
                </div>
              )}
              <button
                onClick={() => setShowImageUpload(true)}
                className="absolute bottom-0 left-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center"
              >
                <Camera className="w-3 h-3" />
              </button>
              {userData.verified && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                      className="w-full border rounded p-2 mt-1"
                      value={userData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      className="w-full border rounded p-2 mt-1"
                      value={userData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Website</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Instagram</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.socialLinks.instagram}
                        onChange={(e) => handleSocialChange("instagram", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Twitter</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.socialLinks.twitter}
                        onChange={(e) => handleSocialChange("twitter", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Facebook</label>
                      <input
                        className="w-full border rounded p-2 mt-1"
                        value={userData.socialLinks.facebook}
                        onChange={(e) => handleSocialChange("facebook", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-gray-600">{userData.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {userData.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {new Date(userData.joinDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {userData.email}
                    </span>
                  </div>
                  <div className="flex space-x-3 mt-2">
                    {userData.socialLinks.instagram && (
                      <a href={`https://instagram.com/${userData.socialLinks.instagram}`} className="text-gray-400 hover:text-pink-500">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {userData.socialLinks.twitter && (
                      <a href={`https://twitter.com/${userData.socialLinks.twitter}`} className="text-gray-400 hover:text-blue-500">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {userData.socialLinks.facebook && (
                      <a href={`https://facebook.com/${userData.socialLinks.facebook}`} className="text-gray-400 hover:text-blue-700">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {userData.website && (
                      <a href={userData.website} className="text-gray-400 hover:text-green-600">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
                    title="Edit profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <Link to="/dashboard">
                    <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 flex items-center gap-2" title="Back to Dashboard">
                      <LayoutDashboard className="w-4 h-4 text-white" />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-1">
          <nav className="flex space-x-1">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </div>

      {/* Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload Profile Picture</h2>
            <div onClick={() => document.getElementById("fileUpload").click()} className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <p className="text-gray-600 mt-2">
                {selectedFile ? selectedFile.name : "Click to select a file"}
              </p>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setShowImageUpload(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleUploadImage} className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={!selectedFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cropper Modal */}
      {showCropper && imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  )
}