"use client"

import { useState } from "react"
import { X, Upload, Plus, Trash2, AlertCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const CreateItemModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "barter",
    deliveryNotes: "",
    condition: "good",
    estimatedValue: "",
    tags: [],
  })
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState({})
  const [tagInput, setTagInput] = useState("")

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Music",
    "Fashion",
    "Books",
    "Toys",
    "Automotive",
    "Health & Beauty",
  ]

  const conditions = [
    { value: "new", label: "New" },
    { value: "like-new", label: "Like New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
  ]

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (imageFiles.length === 0) {
      newErrors.images = "At least one image is required"
    }

    if (formData.estimatedValue && isNaN(Number.parseFloat(formData.estimatedValue))) {
      newErrors.estimatedValue = "Value must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxFiles = 5
    const maxSize = 10 * 1024 * 1024 // 10MB

    // Validate file count
    if (imageFiles.length + files.length > maxFiles) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${maxFiles} images allowed`,
      }))
      return
    }

    // Validate file sizes and types
    const validFiles = []
    const validPreviews = []

    files.forEach((file) => {
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          images: `File ${file.name} is too large. Maximum size is 10MB.`,
        }))
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          images: `File ${file.name} is not an image.`,
        }))
        return
      }

      validFiles.push(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        validPreviews.push({
          file,
          url: e.target.result,
          name: file.name,
        })

        if (validPreviews.length === validFiles.length) {
          setImageFiles((prev) => [...prev, ...validFiles])
          setImagePreviews((prev) => [...prev, ...validPreviews])
        }
      }
      reader.readAsDataURL(file)
    })

    // Clear image errors if files are valid
    if (validFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: undefined,
      }))
    }
  }

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    const tag = tagInput.trim().toLowerCase()

    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Prepare data for submission
      const submissionData = {
        ...formData,
        estimatedValue: formData.estimatedValue ? Number.parseFloat(formData.estimatedValue) : undefined,
      }

      await onSubmit(submissionData, imageFiles)

      setUploadProgress(100)

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "barter",
        deliveryNotes: "",
        condition: "good",
        estimatedValue: "",
        tags: [],
      })
      setImageFiles([])
      setImagePreviews([])
      setErrors({})
      setTagInput("")

      setTimeout(() => {
        setUploadProgress(0)
        onClose()
      }, 500)
    } catch (error) {
      console.error("Failed to create item:", error)
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed mt-5 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-[400px] z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[100vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Item</h2>
              <p className="text-sm text-gray-600 mt-1">Share something you'd like to barter or donate</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(80vh-150px)]">
          <div className="space-y-6">
            {/* Upload Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading item...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Images */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Images * (up to 5)</Label>
              <div className="mt-2">
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview.url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                          {preview.name.length > 15 ? `${preview.name.substring(0, 15)}...` : preview.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {imagePreviews.length < 5 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload images</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WebP up to 10MB each</p>
                    </label>
                  </div>
                )}

                {errors.images && <p className="text-sm text-red-600 mt-1">{errors.images}</p>}
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="What are you offering?"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
                disabled={isSubmitting}
                maxLength={100}
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`mt-1 resize-none ${errors.description ? "border-red-500" : ""}`}
                rows={4}
                disabled={isSubmitting}
                maxLength={1000}
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barter">Barter (Trade)</SelectItem>
                    <SelectItem value="donate">Donate (Give Away)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Condition and Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => handleInputChange("condition", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedValue" className="text-sm font-medium text-gray-700">
                  Estimated Value ($)
                </Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  placeholder="0.00"
                  value={formData.estimatedValue}
                  onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                  className={`mt-1 ${errors.estimatedValue ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                  min="0"
                  step="0.01"
                />
                {errors.estimatedValue && <p className="text-sm text-red-600 mt-1">{errors.estimatedValue}</p>}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Tags</Label>
              <div className="mt-1 space-y-2">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Add tags (e.g., vintage, rare)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1"
                    disabled={isSubmitting || formData.tags.length >= 10}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag(e)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={isSubmitting || !tagInput.trim() || formData.tags.length >= 10}
                    className="ml-2"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          disabled={isSubmitting}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500">{formData.tags.length}/10 tags (press Enter or click Add)</p>
              </div>
            </div>

            {/* Delivery Notes */}
            <div>
              <Label htmlFor="deliveryNotes" className="text-sm font-medium text-gray-700">
                Delivery Notes (Optional)
              </Label>
              <Textarea
                id="deliveryNotes"
                placeholder="Any special instructions for pickup/delivery..."
                value={formData.deliveryNotes}
                onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                className="mt-1 resize-none"
                rows={2}
                disabled={isSubmitting}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.deliveryNotes.length}/500 characters</p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Item
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateItemModal
