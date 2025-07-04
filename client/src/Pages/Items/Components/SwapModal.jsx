"use client"

import { useState } from "react"
import { X, ArrowRightLeft, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useUserItems } from "../../../hooks/UseItem"
import { itemsAPI } from "../../../lib/api/ItemApi"

const SwapModal = ({ isOpen, onClose, selectedItem, currentUserId, onSwapRequest }) => {
  const [selectedUserItem, setSelectedUserItem] = useState(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { userItems, loading, pagination, refetch } = useUserItems(currentUserId)

  if (!isOpen || !selectedItem) return null

  const handleSwapRequest = async () => {
    if (!selectedUserItem) return

    setIsSubmitting(true)
    try {
      await onSwapRequest({
        requestedItemId: selectedItem._id,
        offeredItemId: selectedUserItem._id,
        message: message.trim(),
      })
      onClose()
      setSelectedUserItem(null)
      setMessage("")
    } catch (error) {
      console.error("Swap request failed:", error)
    } finally {
      setIsSubmitting(false)
    }
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

  const getMainImage = (item) => {
    if (!item.images || item.images.length === 0) return null

    // Handle new image object structure
    if (typeof item.images[0] === "object" && item.images[0].url) {
      return itemsAPI.getImageUrl(item.images[0])
    }

    // Handle legacy string format
    return itemsAPI.getImageUrl(item.images[0])
  }

  const loadMoreItems = () => {
    if (pagination.current < pagination.pages) {
      refetch(false, pagination.current + 1)
    }
  }

  return (
    <div className="fixed inset-0 mt-16 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Propose a Swap</h2>
              <p className="text-sm text-gray-600 mt-1">Select one of your items to exchange</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-160px)]">
          {/* Swap Preview */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-xl">
              {/* Selected User Item */}
              <div className="flex-1">
                {selectedUserItem ? (
                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getMainImage(selectedUserItem) || "/placeholder.svg"}
                          alt={selectedUserItem.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{selectedUserItem.title}</h4>
                          <p className="text-xs text-gray-600">Your item</p>
                          {selectedUserItem.estimatedValue > 0 && (
                            <p className="text-xs text-green-600">${selectedUserItem.estimatedValue}</p>
                          )}
                        </div>
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500">Select your item to offer</p>
                  </div>
                )}
              </div>

              {/* Swap Arrow */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Target Item */}
              <div className="flex-1">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={getMainImage(selectedItem) || "/placeholder.svg"}
                        alt={selectedItem.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{selectedItem.title}</h4>
                        <p className="text-xs text-gray-600">{selectedItem.ownerId?.name}'s item</p>
                        {selectedItem.estimatedValue > 0 && (
                          <p className="text-xs text-green-600">${selectedItem.estimatedValue}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Your Items */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Choose from your items:</h3>

            {loading && userItems.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : userItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-3">You don't have any items to swap yet</p>
                <Button variant="outline" size="sm" onClick={onClose}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Item
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {userItems
                    .filter((item) => item.status === "available" && item._id !== selectedItem._id)
                    .map((item) => (
                      <Card
                        key={item._id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedUserItem?._id === item._id
                            ? "border-2 border-purple-500 bg-purple-50"
                            : "border border-gray-200 hover:border-purple-300"
                        }`}
                        onClick={() => setSelectedUserItem(item)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={getMainImage(item) || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm truncate">{item.title}</h4>
                              <p className="text-xs text-gray-600 truncate">{item.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {item.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    item.condition === "new" || item.condition === "like-new"
                                      ? "text-green-600 border-green-200"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item.condition?.replace("-", " ") || "good"}
                                </Badge>
                                {item.estimatedValue > 0 && (
                                  <span className="text-xs text-green-600">${item.estimatedValue}</span>
                                )}
                              </div>
                            </div>
                            {selectedUserItem?._id === item._id && (
                              <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {pagination.current < pagination.pages && (
                  <div className="text-center mt-3">
                    <Button variant="outline" size="sm" onClick={loadMoreItems} disabled={loading}>
                      {loading ? "Loading..." : "Load More Items"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Message */}
          {selectedUserItem && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a message (optional)</label>
              <Textarea
                placeholder="Tell them why you'd like to make this swap..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none"
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/500 characters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSwapRequest}
              disabled={!selectedUserItem || isSubmitting}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending Request...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Send Swap Request
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SwapModal
