import React, { useEffect, useState } from "react"
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
import { useAuth } from "../../context/authContext"
import axios from "axios"


export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("items")
 const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [loading, setLoading] = useState(true);


  const USER_ID = localStorage.getItem('userId')
  const { PORT } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${PORT}/api/users/${USER_ID}`);
        setUserData({
          ...data,
          avatar: data.avatar || "https://i.pravatar.cc/150?img=5",
          coverImage: data.coverImage || "https://i.pravatar.cc/150?img=4",
          socialLinks: data.socialLinks || {
            instagram: "",
            twitter: "",
            facebook: "",
          },
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`${PORT}/api/users/${USER_ID}`, userData);
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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

    if (loading || !userData) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-blue-600 opacity-60" />
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
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
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </>
              )}
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

      {/* Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload Profile Picture</h2>
            <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <p className="text-gray-600 mt-2">Drag and drop or click to upload</p>
              <input type="file" className="hidden" />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowImageUpload(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
