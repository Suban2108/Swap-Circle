import React, { useState } from "react"
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Package,
  Gift,
  Award,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  Camera,
  Save,
  X,
  Clock,
  TrendingUp,
  Share2,
  Upload,
  CheckCircle,
  Globe,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react"
import SettingFeatures from "./UserComponent/Settings"
import Achievements from "./UserComponent/Achievements"
import Reviews from "./UserComponent/Reviews"
import Activity from "./UserComponent/Activity"
import Overview from "./UserComponent/Overview"
import Items from "./UserComponent/Items"


export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("items")
  const [isEditing, setIsEditing] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  // Sample user data
  const [userData, setUserData] = useState({
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about sustainable living and community sharing. Love finding new homes for items I no longer need!",
    website: "https://sarahchen.dev",
    joinDate: "2024-01-15",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverImage: "https://i.pravatar.cc/150?img=4",
    verified: true,
    socialLinks: {
      instagram: "@sarahchen",
      twitter: "@sarahc_dev",
      facebook: "sarah.chen.dev",
    },
  })

  const tabItems = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "items", label: "My Items", icon: <Package className="w-4 h-4" /> },
    { id: "activity", label: "Activity", icon: <Clock className="w-4 h-4" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", userData)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview/>
      case "items":
        return <Items/>
      case "activity":
        return <Activity/>
      case "reviews":
        return <Reviews/>
      case "achievements":
        return <Achievements/>
      case "settings":
        return <SettingFeatures/>
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
        <img
          src={userData.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-blue-600"></div>
      </div>

      {/* Profile Header */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative -mt-16 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {userData.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="absolute -bottom-1 -left-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-purple-600 outline-none bg-transparent"
                    />
                    <textarea
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      className="w-full text-gray-600 border border-gray-300 rounded-lg p-2 focus:border-purple-600 outline-none resize-none"
                      rows={2}
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <span>{userData.name}</span>
                      {userData.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </h1>
                    <p className="text-gray-600 mt-1">{userData.bio}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
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

                {/* Social Links */}
                <div className="flex items-center space-x-3 mt-3">
                  {userData.socialLinks.instagram && (
                    <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {userData.socialLinks.facebook && (
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {userData.website && (
                    <a href={userData.website} className="text-gray-400 hover:text-purple-500 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
            <nav className="flex space-x-1">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Update Profile Picture</h3>
              <button onClick={() => setShowImageUpload(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Drag and drop your image here, or click to browse</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
