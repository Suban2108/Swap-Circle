import React from 'react'
import { Recycle, Heart, TrendingUp, BarChart3, Package } from 'lucide-react' 

const Analytics = () => {

         const communityStats = {
        totalUsers: 18,
        activeUsers: 14,
        totalItems: 47,
        itemsSwapped: 23,
        donationsGiven: 31,
        karmaPoints: 1247,
        wasteReduced: 12.8,
    }


  return (
    <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Impact Analytics</h2>

            {/* Impact Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Environmental Impact</h3>
                        <Recycle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Waste Diverted</span>
                            <span className="font-semibold">12.8 kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">CO2 Saved</span>
                            <span className="font-semibold">38.4 kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Items Reused</span>
                            <span className="font-semibold">{communityStats.itemsSwapped + communityStats.donationsGiven}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Community Health</h3>
                        <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Active Rate</span>
                            <span className="font-semibold">
                                {Math.round((communityStats.activeUsers / communityStats.totalUsers) * 100)}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Avg. Karma</span>
                            <span className="font-semibold">
                                {Math.round(communityStats.karmaPoints / communityStats.totalUsers)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Completion Rate</span>
                            <span className="font-semibold">89%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Growth Metrics</h3>
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">New Users (30d)</span>
                            <span className="font-semibold text-green-600">+6</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Items Added (30d)</span>
                            <span className="font-semibold text-green-600">+23</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Engagement</span>
                            <span className="font-semibold">↗ 24%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts placeholder */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Over Time</h3>
                    <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                            <p className="text-gray-600">Activity chart visualization</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Categories</h3>
                    <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                            <Package className="w-12 h-12 text-green-400 mx-auto mb-2" />
                            <p className="text-gray-600">Category distribution chart</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Analytics
