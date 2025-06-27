import React from 'react'
import { Plus, Eye, Heart, Edit, Trash2 } from 'lucide-react'

const Items = () => {

      const userItems = [
    {
      id: 1,
      name: "MacBook Pro 2019",
      description: "Excellent condition, barely used",
      category: "Electronics",
      condition: "Excellent",
      type: "barter",
      status: "available",
      views: 45,
      likes: 12,
      image: "https://i.ytimg.com/vi/aGckv9T5dBg/hqdefault.jpg",
      datePosted: "2024-12-20",
    },
    {
      id: 2,
      name: "Winter Jacket",
      description: "Warm and cozy, perfect for cold weather",
      category: "Clothing",
      condition: "Good",
      type: "donation",
      status: "donated",
      views: 23,
      likes: 8,
      image: "https://www.alamodelabel.in/cdn/shop/products/WhatsAppImage2022-10-06at6.06.48PM.jpg?v=1749208806",
      datePosted: "2024-12-15",
    },
    {
      id: 3,
      name: "Coffee Machine",
      description: "Makes great espresso, includes accessories",
      category: "Appliances",
      condition: "Good",
      type: "barter",
      status: "swapped",
      views: 67,
      likes: 19,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXP82Lyo_XgnLaVeYMZ1l8SjiIMdjDKZ0Dw&s",
      datePosted: "2024-12-10",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">My Items ({userItems.length})</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 flex space-x-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.type === "barter"
                      ? "bg-blue-100 text-blue-800"
                      : item.type === "donation"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {item.type}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.status === "available"
                      ? "bg-green-100 text-green-800"
                      : item.status === "swapped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{item.category}</span>
                <span>Condition: {item.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {item.views}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {item.likes}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button className="text-blue-600 hover:text-blue-700 p-1">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-700 p-1">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
