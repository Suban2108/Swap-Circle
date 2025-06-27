import React from 'react'
import { Package, Eye, Edit, Trash2 } from 'lucide-react'

const Items = () => {

        const items = [
        {
            id: 1,
            name: "MacBook Pro 2019",
            owner: "Sarah Chen",
            status: "available",
            type: "barter",
            condition: "Good",
            views: 12,
        },
        {
            id: 2,
            name: "Winter Coat",
            owner: "Mike Johnson",
            status: "donated",
            type: "donation",
            condition: "Excellent",
            views: 8,
        },
        {
            id: 3,
            name: "Coffee Machine",
            owner: "Emma Wilson",
            status: "swapped",
            type: "barter",
            condition: "Fair",
            views: 15,
        },
        {
            id: 4,
            name: "Study Desk",
            owner: "Alex Rodriguez",
            status: "requested",
            type: "request",
            condition: "Any",
            views: 6,
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Items Management</h2>
                <div className="flex space-x-3">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        <option>All Types</option>
                        <option>Barter</option>
                        <option>Donation</option>
                        <option>Request</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        <option>All Status</option>
                        <option>Available</option>
                        <option>Swapped</option>
                        <option>Donated</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">Owner: {item.owner}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${item.type === "barter"
                                                ? "bg-blue-100 text-blue-800"
                                                : item.type === "donation"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-purple-100 text-purple-800"
                                                }`}
                                        >
                                            {item.type}
                                        </span>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "available"
                                                ? "bg-green-100 text-green-800"
                                                : item.status === "swapped"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : item.status === "donated"
                                                        ? "bg-pink-100 text-pink-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {item.views} views
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-700 p-2">
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button className="text-yellow-600 hover:text-yellow-700 p-2">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-700 p-2">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Items
