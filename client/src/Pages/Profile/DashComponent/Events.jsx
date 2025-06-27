import React, { useState } from 'react'
import { Plus, Calendar, Users, Gift, Award, Eye, Edit, X } from 'lucide-react'

const Events = () => {

        const [selectedEvent, setSelectedEvent] = useState(null)
        const [showEventModal, setShowEventModal] = useState(false)

        const events = [
            {
                id: 1,
                name: "Winter Donation Week",
                description: "Donate winter clothes and earn special badges",
                startDate: "2024-12-01",
                endDate: "2024-12-07",
                participants: 12,
                itemsDonated: 28,
                status: "active",
                badge: "Winter Helper",
            },
            {
                id: 2,
                name: "Spring Cleaning Swap",
                description: "Trade items you no longer need",
                startDate: "2024-03-15",
                endDate: "2024-03-22",
                participants: 15,
                itemsDonated: 34,
                status: "completed",
                badge: "Spring Cleaner",
            },
        ]

            const handleCreateEvent = () => {
        setSelectedEvent(null)
        setShowEventModal(true)
    }

  return (
       <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Community Events</h2>
                <button
                    onClick={handleCreateEvent}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                                <p className="text-gray-600 mb-3">{event.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {event.startDate} - {event.endDate}
                                    </span>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${event.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {event.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-600 text-sm font-medium">Participants</span>
                                    <Users className="w-4 h-4 text-blue-600" />
                                </div>
                                <p className="text-2xl font-bold text-blue-800">{event.participants}</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-600 text-sm font-medium">Items Donated</span>
                                    <Gift className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-green-800">{event.itemsDonated}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Award className="w-4 h-4 text-purple-600" />
                                <span className="text-sm text-purple-600 font-medium">Badge: {event.badge}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-700 p-1">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-yellow-600 hover:text-yellow-700 p-1">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             {/* Event Modal */}
            {showEventModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Create New Event</h3>
                            <button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Enter event name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    rows={3}
                                    placeholder="Enter event description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Create Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

export default Events
