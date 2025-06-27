import React from 'react'

import { Users, Package, Heart, Recycle, Clock, Settings, Plus, Award  } from "lucide-react"


const Overview = () => {

    // Sample data
    const communityStats = {
        totalUsers: 18,
        activeUsers: 14,
        totalItems: 47,
        itemsSwapped: 23,
        donationsGiven: 31,
        karmaPoints: 1247,
        wasteReduced: 12.8,
    }

        const recentActivities = [
        { id: 1, user: "Sarah Chen", action: "donated", item: "Winter Jacket", time: "2 hours ago", karma: 15 },
        { id: 2, user: "Mike Johnson", action: "requested", item: "Study Lamp", time: "4 hours ago", karma: 0 },
        { id: 3, user: "Emma Wilson", action: "swapped", item: "Textbook for Coffee Maker", time: "1 day ago", karma: 8 },
        { id: 4, user: "Alex Rodriguez", action: "joined", item: "Winter Donation Event", time: "2 days ago", karma: 5 },
    ]

    const StatCard = ({ title, value, subtitle, icon, color = "purple" }) => (
        <div
            className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-shadow duration-300`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                    {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
                </div>
                <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
                    {React.cloneElement(icon, { className: `w-6 h-6 text-${color}-600` })}
                </div>
            </div>
        </div>
    )

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Community Members"
                    value={communityStats.totalUsers}
                    subtitle={`${communityStats.activeUsers} active today`}
                    icon={<Users />}
                    color="blue"
                />
                <StatCard
                    title="Total Items"
                    value={communityStats.totalItems}
                    subtitle={`${communityStats.itemsSwapped} swapped`}
                    icon={<Package />}
                    color="green"
                />
                <StatCard
                    title="Karma Points"
                    value={communityStats.karmaPoints.toLocaleString()}
                    subtitle={`${communityStats.donationsGiven} donations`}
                    icon={<Heart />}
                    color="pink"
                />
                <StatCard
                    title="Waste Reduced"
                    value={`${communityStats.wasteReduced}kg`}
                    subtitle="Environmental impact"
                    icon={<Recycle />}
                    color="purple"
                />
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <Clock className="w-6 h-6 text-purple-600 mr-2" />
                            Recent Activity
                        </h2>
                        <button className="text-purple-600 hover:text-purple-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 font-semibold text-sm">
                                            {activity.user
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            <span className="text-purple-600">{activity.user}</span> {activity.action} {activity.item}
                                        </p>
                                        <p className="text-gray-500 text-sm">{activity.time}</p>
                                    </div>
                                </div>
                                {activity.karma > 0 && (
                                    <div className="flex items-center space-x-1 bg-pink-100 px-2 py-1 rounded-full">
                                        <Heart className="w-4 h-4 text-pink-600" />
                                        <span className="text-pink-600 text-sm font-medium">+{activity.karma}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Settings className="w-6 h-6 text-purple-600 mr-2" />
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                            <Plus className="w-5 h-5" />
                            <span>Create Event</span>
                        </button>
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Invite Users</span>
                        </button>
                        <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                            <Package className="w-5 h-5" />
                            <span>Moderate Items</span>
                        </button>
                        <button className="w-full bg-pink-600 text-white py-3 px-4 rounded-xl hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2">
                            <Award className="w-5 h-5" />
                            <span>Manage Badges</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
