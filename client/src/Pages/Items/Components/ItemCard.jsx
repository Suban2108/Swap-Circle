// ItemCard.jsx
"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  ArrowRightLeft,
  Calendar,
  Star,
  Gift,
  Trash2,
  Edit3,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { itemsAPI } from "../../../lib/api/ItemApi"
import { useAuth } from "@/context/authContext"

const ItemCard = ({ item, onSwapRequest, onContact, onEdit, onDelete, isOwner = false, loading = false }) => {
  const { userId } = useAuth()

  const [isLiked, setIsLiked] = useState(
    item?.likes?.some((like) => like.userId === userId) || false
  )
  const [likeCount, setLikeCount] = useState(item?.likes?.length || 0)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <div className="relative">
          <Skeleton className="w-full h-48" />
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const images = Array.isArray(item.images) ? item.images : []

  const getImageSrc = (index) => {
    const img = images[index]
    return img?.url ? itemsAPI.getImageUrl(img) : "/placeholder.svg?height=200&width=300"
  }

  const goToNext = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const goToPrev = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleLikeClick = async () => {
    try {
      const result = await itemsAPI.toggleLike(item._id)
      setIsLiked(result.liked)
      setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1))
    } catch (error) {
      console.error("Failed to toggle like:", error)
    }
  }

  const handleEditClick = () => {
    onEdit?.(item._id)
  }

  const handleDeleteClick = () => {
    onDelete?.(item._id)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "exchanged":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type) => {
    return type === "barter"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-purple-100 text-purple-800 border-purple-200"
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case "new":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "like-new":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "fair":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-1 border-zinc-300 bg-white/80 backdrop-blur-sm">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative overflow-hidden bg-gray-100 group h-80">
          {imageLoading && <Skeleton className="absolute inset-0 w-full h-48" />}

          {!imageError ? (
            <img
              src={getImageSrc(currentImageIndex)}
              alt={item.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"
                }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <Gift className="w-6 h-6 text-gray-500" />
              <p className="text-sm text-gray-500 ml-2">No image</p>
            </div>
          )}

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Owner Avatar */}
        <div className="absolute top-3 left-3">
          <Avatar className="w-10 h-10 border-2 border-white shadow-lg">
            <AvatarImage src={itemsAPI.getImageUrl(item.ownerId?.profilePic) || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-sm font-semibold">
              {getInitials(item.ownerId?.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <Badge className={`${getStatusColor(item.status)} font-medium`}>{item.status}</Badge>
          <Badge className={`${getTypeColor(item.type)} font-medium`}>
            {item.type === "barter" ? (
              <>
                <ArrowRightLeft className="w-3 h-3 mr-1" />
                Barter
              </>
            ) : (
              <>
                <Gift className="w-3 h-3 mr-1" />
                Donate
              </>
            )}
          </Badge>
          {item.condition && (
            <Badge className={`${getConditionColor(item.condition)} font-medium`}>
              {item.condition.replace("-", " ")}
            </Badge>
          )}
        </div>

        {/* Owner Menu */}
        {isOwner && (
          <div className="absolute bottom-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditClick}>
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Item
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Like Button */}
        <Button
          variant="secondary"
          size="sm"
          className={`absolute bottom-3 left-3 bg-white/90 hover:bg-white ${isLiked ? "text-red-500" : "text-gray-600"
            }`}
          onClick={handleLikeClick}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          {likeCount > 0 && <span className="ml-1 text-xs">{likeCount}</span>}
        </Button>
      </div>

      {/* Content */}
      <CardContent className="px-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
            {item.estimatedValue > 0 && (
              <span className="text-sm font-medium text-green-600">${item.estimatedValue}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <span className="font-medium">{item.category}</span>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{item.views || 0}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Views</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Owner Info */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <Avatar className="w-6 h-6">
            <AvatarImage src={itemsAPI.getImageUrl(item.ownerId?.profilePic) || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">{getInitials(item.ownerId?.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{item.ownerId?.name || "Unknown User"}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
              <span>•</span>
              <span>{item.swapRequestCount || 0} requests</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 bg-transparent"
            onClick={() => onContact?.(item)}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Button>

          {item.type === "barter" && !isOwner && (
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
              onClick={() => onSwapRequest?.(item)}
            >
              <ArrowRightLeft className="w-4 h-4 mr-1" />
              Swap
            </Button>
          )}

          {item.type === "donate" && !isOwner && (
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => onContact?.(item)}
            >
              <Gift className="w-4 h-4 mr-1" />
              Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ItemCard