import React from 'react'
import { Star, } from 'lucide-react'

const Reviews = () => {

      const reviews = [
    {
      id: 1,
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Amazing person to work with! Very responsive and item was exactly as described.",
      item: "MacBook Pro",
      date: "2024-12-18",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      reviewer: "Emma Wilson",
      rating: 5,
      comment: "Super friendly and the swap process was smooth. Highly recommended!",
      item: "Coffee Machine",
      date: "2024-12-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      reviewer: "Alex Rodriguez",
      rating: 4,
      comment: "Great communication and fast delivery. Would definitely swap again!",
      item: "Study Books",
      date: "2024-12-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

    const userStats = {
    karmaPoints: 1247,
    totalItems: 23,
    itemsDonated: 15,
    itemsSwapped: 8,
    itemsReceived: 12,
    eventsJoined: 5,
    reviews: 4.8,
    reviewCount: 24,
    wasteReduced: 8.5,
    co2Saved: 25.6,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Reviews & Ratings</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(userStats.reviews) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-800">{userStats.reviews}</span>
          <span className="text-sm text-gray-500">({userStats.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <img src={review.avatar || "/placeholder.svg"} alt={review.reviewer} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{review.reviewer}</p>
                    <p className="text-sm text-gray-500">Reviewed {review.item}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">{review.date}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
