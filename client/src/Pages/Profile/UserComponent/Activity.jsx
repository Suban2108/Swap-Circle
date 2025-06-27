import React from 'react'
import { Gift, Heart, Package, Calendar, Star} from 'lucide-react'

const Activity = () => {

      const recentActivity = [
    {
      id: 1,
      type: "donation",
      action: "donated",
      item: "Winter Jacket",
      recipient: "Mike Johnson",
      karma: 15,
      date: "2024-12-20",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "swap",
      action: "swapped",
      item: "Coffee Machine for Study Lamp",
      recipient: "Emma Wilson",
      karma: 8,
      date: "2024-12-18",
      time: "2 days ago",
    },
    {
      id: 3,
      type: "event",
      action: "joined",
      item: "Winter Donation Week",
      karma: 5,
      date: "2024-12-15",
      time: "5 days ago",
    },
    {
      id: 4,
      type: "review",
      action: "received review",
      item: "5-star rating from Alex Rodriguez",
      karma: 3,
      date: "2024-12-14",
      time: "6 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Activity History</h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  {activity.type === "donation" && <Gift className="w-6 h-6 text-purple-600" />}
                  {activity.type === "swap" && <Package className="w-6 h-6 text-purple-600" />}
                  {activity.type === "event" && <Calendar className="w-6 h-6 text-purple-600" />}
                  {activity.type === "review" && <Star className="w-6 h-6 text-purple-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    You {activity.action} {activity.item}
                  </p>
                  {activity.recipient && <p className="text-sm text-gray-600">with {activity.recipient}</p>}
                  <p className="text-sm text-gray-500">
                    {activity.date} • {activity.time}
                  </p>
                </div>
              </div>
              {activity.karma > 0 && (
                <div className="flex items-center space-x-1 bg-pink-100 px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span className="text-pink-600 font-medium">+{activity.karma}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity
