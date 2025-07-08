"use client"

import { useState, useEffect } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { EventCard } from "./Component/EventCard"
import { EventFilters } from "./Component/EventFilter"
import { CreateEventModal } from "./Component/CreateEvent"
import { Plus, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api/EventAPi"
import toast from 'react-hot-toast'
import { useAuth } from "@/context/authContext"
import axios from "axios"


export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
    hasNext: false,
    hasPrev: false,
  })
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    sortBy: "startDate",
    sortOrder: "asc",
    upcoming: false,
    page: 1,
    limit: 12,
  })
  const [joinedEvents, setJoinedEvents] = useState(new Set())
  const [userData, setUserData] = useState(null)
  const { userId, user, PORT } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${PORT}/api/users/get-user`,
          {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          }
        )


        setUserData({
          ...data,
          avatar: data.avatar || default_user_image,
          coverImage: data.coverImage,
          socialLinks: data.socialLinks || {
            instagram: "",
            twitter: "",
            facebook: "",
          },

        })

      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [PORT, userId])




  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getAllEvents(filters)
      if (response.success && response.data) {
        setEvents(response.data.events)
        setPagination(response.data.pagination)
      } else {
        toast.error("Failed to fetch events")
      }
    } catch (error) {
      toast.error("Failed to fetch events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [filters])

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      status: "all",
      sortBy: "startDate",
      sortOrder: "asc",
      upcoming: false,
      page: 1,
      limit: 12,
    })
  }

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await apiClient.joinEvent(eventId)
      if (response.success) {
        setJoinedEvents((prev) => new Set([...prev, eventId]))
        toast.success("Successfully joined the event!")
        fetchEvents()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("Failed to join event")
    }
  }

  const handleLeaveEvent = async (eventId) => {
    try {
      const response = await apiClient.leaveEvent(eventId)
      if (response.success) {
        setJoinedEvents((prev) => {
          const newSet = new Set(prev)
          newSet.delete(eventId)
          return newSet
        })
        toast.success("Successfully left the event")
        fetchEvents()
      } else {
        toast.error(response.error || "Failed to leave event")
      }
    } catch (error) {
      toast.error("Failed to leave event")
    }
  }

  const handleEventCreated = () => {
    setIsCreateModalOpen(false)
    fetchEvents()
    toast.success("Event created successfully!")
  }

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      const res = await apiClient.updateEvent(eventId, { status: newStatus });

      console.log("Updating event:", eventId, "with status:", newStatus)

      if (res.success) {
        toast.success("Status updated");
        fetchEvents(); // Refresh list
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (e) {
      toast.error("Error updating status");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await apiClient.deleteEvent(eventId)
      if (res.success) {
        toast.success("Event deleted successfully!")
        fetchEvents()
      } else {
        toast.error(res.message || "Failed to delete event")
      }
    } catch (err) {
      toast.error("Error deleting event")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 mt-15">
      <div className="container mx-auto px-2 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-8 mb-8  text-white">
          <div className="flex justify-between items-center h-30">
            <div>
              <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
              <p className="text-orange-100 text-lg">
                Join amazing community events and make a difference
              </p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-0">
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Filter Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <EventFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </CardContent>
        </Card>

        {/* Events Grid or Empty State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          </div>
        ) : events.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No events found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your filters or be the first to create an amazing event for the community
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl"
              >
                Create First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {events.map((event) => (
                <EventCard
                  key={event._id} // ✅ This fixes the warning
                  event={event}
                  onJoin={handleJoinEvent}
                  onLeave={handleLeaveEvent}
                  isJoined={joinedEvents.has(event._id)}
                  onStatusChange={handleStatusChange}
                  currentUserId={userId}
                  currentUserRole={userData?.role}
                  currentUserAvatar={userData?.avatar}
                  onDelete={handleDeleteEvent}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mb-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={page === pagination.currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={
                          page === pagination.currentPage
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            : "border-orange-200 text-orange-600 hover:bg-orange-50"
                        }
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Showing count */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-orange-700 font-medium">
                  Showing {events.length} of {pagination.totalEvents} events
                </span>
              </div>
            </div>
          </>
        )}

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      </div>
    </div>
  )
}
