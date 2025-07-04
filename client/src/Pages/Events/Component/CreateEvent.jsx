"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Loader2, Calendar, MapPin, Users, Award } from "lucide-react"
import { apiClient } from "@/lib/api/EventAPi"
import { useToast } from "@/Components/shared/Toast"

export function CreateEventModal({ isOpen, onClose, onEventCreated }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "other",
    maxParticipants: "",
    location: {
      type: "online",
      address: "",
    },
    badgeReward: "",
    requirements: [""],
    tags: [""],
    contactInfo: {
      email: "",
      phone: "",
      website: "",
    },
  })

  const categories = [
    { value: "donation", label: "Donation", icon: "💝" },
    { value: "volunteer", label: "Volunteer", icon: "🤝" },
    { value: "awareness", label: "Awareness", icon: "📢" },
    { value: "fundraising", label: "Fundraising", icon: "💰" },
    { value: "community", label: "Community", icon: "🏘️" },
    { value: "other", label: "Other", icon: "📋" },
  ]

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cleanedData = {
        ...formData,
        maxParticipants: formData.maxParticipants ? Number.parseInt(formData.maxParticipants) : undefined,
        requirements: formData.requirements.filter((req) => req.trim() !== ""),
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        contactInfo: {
          email: formData.contactInfo.email || undefined,
          phone: formData.contactInfo.phone || undefined,
          website: formData.contactInfo.website || undefined,
        },
      }

      const response = await apiClient.createEvent(cleanedData)

      if (response.success && response.data) {
        onEventCreated()
        // Reset form
        setFormData({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          category: "other",
          maxParticipants: "",
          location: { type: "online", address: "" },
          badgeReward: "",
          requirements: [""],
          tags: [""],
          contactInfo: { email: "", phone: "", website: "" },
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create event",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">Create New Event</h2>
              <p className="text-orange-100">Share your amazing event with the community</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-150px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
              </div>

              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Event Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter an exciting event name"
                  required
                  className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what makes your event special..."
                  rows={4}
                  required
                  className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-2 border-orange-200 focus:border-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxParticipants" className="text-gray-700 font-medium">
                    Max Participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="badgeReward" className="text-gray-700 font-medium">
                  Badge Reward
                </Label>
                <div className="relative mt-2">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                  <Input
                    id="badgeReward"
                    value={formData.badgeReward}
                    onChange={(e) => handleInputChange("badgeReward", e.target.value)}
                    placeholder="Badge name for participants"
                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate" className="text-gray-700 font-medium">
                    Start Date & Time *
                  </Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="endDate" className="text-gray-700 font-medium">
                    End Date & Time *
                  </Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    required
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Location Type *</Label>
                <Select
                  value={formData.location.type}
                  onValueChange={(value) => handleInputChange("location.type", value)}
                >
                  <SelectTrigger className="mt-2 border-orange-200 focus:border-orange-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">🌐 Online</SelectItem>
                    <SelectItem value="offline">📍 Offline</SelectItem>
                    <SelectItem value="hybrid">🔄 Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.location.type === "offline" || formData.location.type === "hybrid") && (
                <div>
                  <Label htmlFor="address" className="text-gray-700 font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.location.address}
                    onChange={(e) => handleInputChange("location.address", e.target.value)}
                    placeholder="Enter event address"
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Requirements</h3>
              </div>

              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      value={requirement}
                      onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                      placeholder="Enter requirement"
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("requirements")}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
              <div className="space-y-3">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      value={tag}
                      onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                      placeholder="Enter tag"
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                    {formData.tags.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("tags", index)}
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("tags")}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contactEmail" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleInputChange("contactInfo.email", e.target.value)}
                    placeholder="contact@example.com"
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone" className="text-gray-700 font-medium">
                    Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleInputChange("contactInfo.phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="contactWebsite" className="text-gray-700 font-medium">
                    Website
                  </Label>
                  <Input
                    id="contactWebsite"
                    type="url"
                    value={formData.contactInfo.website}
                    onChange={(e) => handleInputChange("contactInfo.website", e.target.value)}
                    placeholder="https://example.com"
                    className="mt-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Event
          </Button>
        </div>
      </div>
    </div>
  )
}
