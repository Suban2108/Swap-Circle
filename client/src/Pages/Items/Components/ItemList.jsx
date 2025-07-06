"use client"

import { useState } from "react"
import {
  Heart,
  ArrowRightLeft,
  Gift,
  MessageCircle,
  Edit3,
  Trash2,
  Calendar,
  Eye,
  Star,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Skeleton } from "@/Components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { itemsAPI } from "../../../lib/api/ItemApi"
import { useAuth } from "@/context/authContext"

const ItemList = ({ item, onEdit, onDelete, onSwapRequest, onContact, isOwner = false, loading = false, setConfirmOpen }) => {
  const { userId } = useAuth()

  const [isLiked, setIsLiked] = useState(
    item?.likes?.some((like) => like.userId === userId) || false
  )
  const [likeCount, setLikeCount] = useState(item?.likes?.length || 0)

  const handleLikeClick = async () => {
    try {
      const result = await itemsAPI.toggleLike(item._id)
      setIsLiked(result.liked)
      setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1))
    } catch (err) {
      console.error("Like toggle failed:", err)
    }
  }

  const getImage = () => {
    const firstImage = item?.images?.[0]
    return firstImage?.url ? itemsAPI.getImageUrl(firstImage) : "/placeholder.svg"
  }

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

  if (loading || !item) {
    return (
      <div className="flex gap-4 p-4 border rounded-xl shadow bg-white">
        <Skeleton className="w-32 h-32 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex p-4 border rounded-xl shadow hover:shadow-md bg-white transition-all duration-200 mb-4">
      {/* Image */}
      <div className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden bg-gray-100">
        <img
          src={getImage()}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {/* Like */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleLikeClick}
          className={`absolute bottom-1 left-1 bg-white/90 p-1 rounded-full ${isLiked ? "text-red-500" : "text-gray-500"
            }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          {likeCount > 0 && <span className="ml-1 text-xs">{likeCount}</span>}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-800">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(item._id)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(item._id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Badge variant="outline">{item.category}</Badge>
          <Badge variant="outline" className="capitalize">{item.condition}</Badge>
          <Badge variant="outline">{item.type}</Badge>
          <Badge variant="outline">{item.status}</Badge>
          {item.estimatedValue > 0 && (
            <span className="text-green-600 font-semibold">${item.estimatedValue}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-zinc-200 p-[5px] rounded-[10px]">
            <Avatar className="w-6 h-6">
              <AvatarImage src={itemsAPI.getImageUrl(item.ownerId?.profilePic)} />
              <AvatarFallback>{getInitials(item.ownerId?.name)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-gray-700">{item.ownerId?.name || "Unknown"}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.views || 0}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Views</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex flex-col gap-2 items-end justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onContact?.(item)}
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Contact
        </Button>

        {item.type === "barter" && !isOwner && (
          <Button
            size="sm"
            onClick={() => onSwapRequest?.(item)}
            className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
          >
            <ArrowRightLeft className="w-4 h-4 mr-1" />
            Swap
          </Button>
        )}

        {item.type === "donate" && !isOwner && (
          <Button
            size="sm"
            onClick={() => onContact?.(item)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
          >
            <Gift className="w-4 h-4 mr-1" />
            Request
          </Button>
        )}
      </div>
    </div>
  )
}

export default ItemList
