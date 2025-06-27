import React from 'react'
import { Search, Plus, Heart, Eye, Edit, Trash2 } from 'lucide-react'

const User = () => {


    const users = [
        {
            id: 1,
            name: "Sarah Chen",
            email: "sarah@email.com",
            karma: 245,
            items: 5,
            joined: "2024-01-15",
            status: "active",
        },
        {
            id: 2,
            name: "Mike Johnson",
            email: "mike@email.com",
            karma: 189,
            items: 3,
            joined: "2024-02-01",
            status: "active",
        },
        {
            id: 3,
            name: "Emma Wilson",
            email: "emma@email.com",
            karma: 167,
            items: 4,
            joined: "2024-01-20",
            status: "inactive",
        },
        {
            id: 4,
            name: "Alex Rodriguez",
            email: "alex@email.com",
            karma: 223,
            items: 6,
            joined: "2024-01-10",
            status: "active",
        },
    ]


  return (
    <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Community Members</h2>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Invite User</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Karma Points
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold text-sm">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1">
                                            <Heart className="w-4 h-4 text-pink-500" />
                                            <span className="text-sm text-gray-900 font-medium">{user.karma}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-700">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-yellow-600 hover:text-yellow-700">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default User
