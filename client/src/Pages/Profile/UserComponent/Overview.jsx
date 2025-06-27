import React from 'react'
import { Heart, Package, Gift, Star, TrendingUp, Clock, Calendar } from 'lucide-react'

const Overview = () => {

     

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

   const StatCard = ({ title, value, subtitle, icon, color = "purple" }) => (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
              {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
            </div>
            <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
              {React.cloneElement(icon, { className: `w-5 h-5 text-${color}-600` })}
            </div>
          </div>
        </div>
      )

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Karma Points" value={userStats.karmaPoints} icon={<Heart />} color="pink" />
        <StatCard title="Total Items" value={userStats.totalItems} icon={<Package />} color="blue" />
        <StatCard title="Items Donated" value={userStats.itemsDonated} icon={<Gift />} color="green" />
        <StatCard
          title="Rating"
          value={userStats.reviews}
          subtitle={`${userStats.reviewCount} reviews`}
          icon={<Star />}
          color="yellow"
        />
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
          Environmental Impact
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{userStats.wasteReduced}kg</p>
            <p className="text-sm text-gray-600">Waste Reduced</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{userStats.co2Saved}kg</p>
            <p className="text-sm text-gray-600">CO2 Saved</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{userStats.itemsReceived + userStats.itemsDonated}</p>
            <p className="text-sm text-gray-600">Items Circulated</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Clock className="w-5 h-5 text-purple-600 mr-2" />
            Recent Activity
          </h3>
          <button
            onClick={() => setActiveTab("activity")}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.slice(0, 3).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  {activity.type === "donation" && <Gift className="w-4 h-4 text-purple-600" />}
                  {activity.type === "swap" && <Package className="w-4 h-4 text-purple-600" />}
                  {activity.type === "event" && <Calendar className="w-4 h-4 text-purple-600" />}
                  {activity.type === "review" && <Star className="w-4 h-4 text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    You {activity.action} {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              {activity.karma > 0 && (
                <div className="flex items-center space-x-1 bg-pink-100 px-2 py-1 rounded-full">
                  <Heart className="w-3 h-3 text-pink-600" />
                  <span className="text-pink-600 text-xs font-medium">+{activity.karma}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview
