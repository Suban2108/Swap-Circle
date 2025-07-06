"use client"

import { useState, useEffect } from "react"
import { X, Upload, Plus, Trash2, AlertCircle, Tag, Edit } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from "@/Components/ui/label"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Progress } from "@/Components/ui/progress"
import { Badge } from "@/Components/ui/badge"
import { useAuth } from "@/context/authContext"

const UpdateItemModal = ({ item, isOpen, onClose, onSubmit, loading = false }) => {
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
  const [existingImages, setExistingImages] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState({})
  const [tagInput, setTagInput] = useState("")
  const { PORT } = useAuth()

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

  // Initialize form with existing item data
  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        type: item.type || "barter",
        deliveryNotes: item.deliveryNotes || "",
        condition: item.condition || "good",
        estimatedValue: item.estimatedValue ? item.estimatedValue.toString() : "",
        tags: item.tags || [],
      })
      setExistingImages(item.images || [])
      setImageFiles([])
      setImagePreviews([])
      setImagesToDelete([])
      setErrors({})
      setTagInput("")
    }
  }, [item, isOpen])

  

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
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
      setExistingImages([])
      setImagesToDelete([])
      setErrors({})
      setTagInput("")
      setUploadProgress(0)
    }
  }, [isOpen])

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

    // Check if there are any images (existing or new)
    const totalImages = existingImages.length - imagesToDelete.length + imageFiles.length
    if (totalImages === 0) {
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
    
    // Calculate current image count
    const currentImageCount = existingImages.length - imagesToDelete.length + imageFiles.length

    // Validate file count
    if (currentImageCount + files.length > maxFiles) {
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

  const removeNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (imageId) => {
    setImagesToDelete((prev) => [...prev, imageId])
    // Clear image errors when removing
    setErrors((prev) => ({
      ...prev,
      images: undefined,
    }))
  }

  const restoreExistingImage = (imageId) => {
    setImagesToDelete((prev) => prev.filter(id => id !== imageId))
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

      await onSubmit(
        item._id,
        submissionData,
        imageFiles,
        imagesToDelete
      )

      setUploadProgress(100)

      setTimeout(() => {
        setUploadProgress(0)
        onClose()
      }, 500)
    } catch (error) {
      console.error("Failed to update item:", error)
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentImageCount = existingImages.length - imagesToDelete.length + imageFiles.length

  return (
    <div className="fixed mt-5 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-[400px] z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[100vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Update Item</h2>
              <p className="text-sm text-gray-600 mt-1">Edit your item details</p>
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
                  <span>Updating item...</span>
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
              <Label className="text-sm font-medium text-gray-700">
                Images * (up to 5) - {currentImageCount}/5
              </Label>
              <div className="mt-2">
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {existingImages.map((image, index) => {
                        const isMarkedForDeletion = imagesToDelete.includes(image.id)
                        return (
                          <div key={image.id} className="relative group">
                            <img
                              src={`${PORT}${image.url}` || "/placeholder.svg"}
                              alt={`Existing ${index + 1}`}
                              className={`w-full h-24 object-cover rounded-lg border ${
                                isMarkedForDeletion 
                                  ? "border-red-300 opacity-50 grayscale" 
                                  : "border-gray-200"
                              }`}
                            />
                            {isMarkedForDeletion ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute top-1 right-1 w-6 h-6 p-0 bg-white text-green-600 hover:bg-green-50"
                                onClick={() => restoreExistingImage(image.id)}
                                disabled={isSubmitting}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeExistingImage(image.id)}
                                disabled={isSubmitting}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                            {isMarkedForDeletion && (
                              <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 rounded-lg">
                                <span className="text-red-600 text-xs font-medium">Will be deleted</span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* New Images */}
                {imagePreviews.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">New Images:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview.url || "/placeholder.svg"}
                            alt={`New Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-green-200"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeNewImage(index)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                            NEW
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                {currentImageCount < 5 && (
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
                      <p className="text-sm text-gray-600">Click to upload additional images</p>
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Item
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateItemModal