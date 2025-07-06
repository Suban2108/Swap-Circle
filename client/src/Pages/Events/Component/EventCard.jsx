"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/Components/ui/card"
import {
    CalendarDays, MapPin, Users, Clock, Award, Eye, UserPlus, UserMinus,
    Trash, ChevronDown, MoreVertical
} from "lucide-react"
import EventDetailModal from "./EventDetails"

import defaultUserimg from "../../../assets/Default_user_image.jpeg"
import { useAuth } from "@/context/authContext"
import ConfirmDialog from "../../../Components/shared/ConfirmDialog";


export function EventCard({
    event,
    onJoin,
    onLeave,
    isJoined,
    showActions = true,
    onStatusChange,
    currentUserId,
    currentUserRole,
    onDelete,
}) {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [userData, setUserData] = useState(null)
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [showActionsMenu, setShowActionsMenu] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)


    const { PORT } = useAuth()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getCategoryColor = (category) => {
        const colors = {
            donation: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25",
            volunteer: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25",
            awareness: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25",
            fundraising: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25",
            community: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25",
            other: "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/25",
        }
        return colors[category] || colors.other
    }

    const getStatusColor = (status) => {
        const colors = {
            draft: "bg-gray-100 text-gray-700 border-2 border-gray-200",
            active: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-2 border-emerald-200 shadow-sm",
            completed: "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-2 border-cyan-200 shadow-sm",
            cancelled: "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-2 border-red-200 shadow-sm",
        }
        return colors[status] || colors.draft
    }

    const participantCount = event?.participants?.filter(p => p.status === "joined")?.length || 0
    const isCreator = event?.createdBy?._id === currentUserId
    const isAdmin = currentUserRole === "admin"

    return (
        <Card className="group h-full flex flex-col border-0 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-amber-200/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-3 sm:pb-4 relative z-10 px-4 sm:px-6">
                <div className="flex justify-between items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1 min-w-0">
                        <Badge className={`${getCategoryColor(event.category)} border-0 font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs capitalize tracking-wide rounded-full whitespace-nowrap`}>
                            {event.category || "Other"}
                        </Badge>
                        <Badge className={`${getStatusColor(event.status)} font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs capitalize tracking-wide rounded-full whitespace-nowrap`}>
                            {event.status}
                        </Badge>
                    </div>

                    {/* Mobile Actions Menu */}
                    <div className="relative sm:hidden">
                        {(isCreator || isAdmin) && (
                            <button
                                onClick={() => setShowActionsMenu(!showActionsMenu)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                        )}

                        {showActionsMenu && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]">
                                <button
                                    onClick={() => {
                                        setShowStatusDropdown(!showStatusDropdown)
                                        setShowActionsMenu(false)
                                    }}
                                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
                                >
                                    Change Status
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop Status Dropdown */}
                    <div className="hidden sm:block relative">
                        {(isCreator || isAdmin) && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className="flex items-center gap-1 text-sm rounded-lg px-3 py-2 border border-orange-300 hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-700 transition-colors"
                                >
                                    <span className="capitalize">{event.status}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[120px]">
                                        {['draft', 'active', 'completed', 'cancelled'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    onStatusChange?.(event._id, status)
                                                    setShowStatusDropdown(false)
                                                }}
                                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors capitalize ${event.status === status ? 'bg-orange-50 text-orange-700' : ''
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Status Dropdown */}
                {showStatusDropdown && (
                    <div className="sm:hidden mb-3 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                        {['draft', 'active', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => {
                                    onStatusChange?.(event._id, status)
                                    setShowStatusDropdown(false)
                                }}
                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors capitalize ${event.status === status ? 'bg-orange-50 text-orange-700' : ''
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                )}

                {event.createdBy && (
                    <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">Created by</p>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img
                                src={event.createdBy.avatar || defaultUserimg}
                                alt="Creator"
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-orange-100"
                            />
                            <span className="font-medium text-sm sm:text-base text-gray-700 truncate">
                                {event.createdBy.name}
                            </span>
                        </div>
                    </div>
                )}

                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {event.name}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 text-sm text-gray-600 relative z-10 px-4 sm:px-6">
                <p className="line-clamp-3 mb-4 sm:mb-5 text-gray-700 leading-relaxed text-sm sm:text-base">
                    {event.description}
                </p>

                <div className="space-y-3 sm:space-y-4 text-gray-700">
                    <EventDetail
                        icon={<CalendarDays className="text-orange-600 w-4 h-4" />}
                        label={`Start: ${formatDate(event.startDate)}`}
                        bgColor="from-orange-100 to-amber-100"
                    />
                    <EventDetail
                        icon={<Clock className="text-blue-600 w-4 h-4" />}
                        label={`Ends: ${formatDate(event.endDate)}`}
                        bgColor="from-blue-100 to-cyan-100"
                    />
                    {event.location?.type && (
                        <EventDetail
                            icon={<MapPin className="text-purple-600 w-4 h-4" />}
                            label={`${event.location.type === "offline" ? event.location.address || "TBA" : "Online"}`}
                            bgColor="from-purple-100 to-violet-100"
                        />
                    )}
                    <EventDetail
                        icon={<Users className="text-emerald-600 w-4 h-4" />}
                        label={`${participantCount}${event.maxParticipants ? ` / ${event.maxParticipants}` : ""} participant${participantCount !== 1 ? "s" : ""}`}
                        bgColor="from-emerald-100 to-green-100"
                    />
                    {event.badgeReward && (
                        <EventDetail
                            icon={<Award className="text-yellow-600 w-4 h-4" />}
                            label={event.badgeReward}
                            highlight
                            bgColor="from-yellow-100 to-amber-100"
                        />
                    )}
                </div>

                {event.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                        {event.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200 text-xs px-2 sm:px-3 py-1 rounded-full font-medium hover:shadow-md transition-all duration-200"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {event.tags.length > 3 && (
                            <Badge
                                variant="outline"
                                className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200 text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
                            >
                                +{event.tags.length - 3}
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-5 mt-auto relative z-10 px-4 sm:px-6">
                {/* Mobile Layout - Stacked buttons */}
                <div className="flex flex-col sm:hidden w-full gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setTimeout(() => {
                                setSelectedEvent(event)
                            }, 500)
                        }}
                        className="w-full border-2 border-orange-200 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 bg-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-orange-300 group/btn"
                    >
                        <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        View Details
                    </Button>

                    <div className="flex gap-2">
                        {showActions && event.status === "active" && !event.isExpired && (
                            isJoined ? (
                                <Button
                                    variant="destructive"
                                    onClick={() => onLeave?.(event._id)}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md group/btn"
                                >
                                    <UserMinus className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                    Leave
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => onJoin?.(event._id)}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 group/btn"
                                    disabled={event.maxParticipants && participantCount >= event.maxParticipants}
                                >
                                    {event.maxParticipants && participantCount >= event.maxParticipants ? (
                                        <>
                                            <Users className="w-4 h-4 mr-2" />
                                            Full
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                            Join
                                        </>
                                    )}
                                </Button>
                            )
                        )}
                        {(isCreator || isAdmin) && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setConfirmOpen(true)
                                }}
                                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md group/btn"
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Desktop Layout - Horizontal buttons */}
                <div className="hidden sm:flex w-full gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setTimeout(() => {
                                setSelectedEvent(event)
                            }, 500)
                        }}
                        className="flex-1 border-2 border-orange-200 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 bg-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-orange-300 group/btn"
                    >
                        <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        View Details
                    </Button>

                    {showActions && event.status === "active" && !event.isExpired && (
                        isJoined ? (
                            <Button
                                variant="destructive"
                                onClick={() => onLeave?.(event._id)}
                                className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md group/btn"
                            >
                                <UserMinus className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                Leave Event
                            </Button>
                        ) : (
                            <Button
                                onClick={() => onJoin?.(event._id)}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 group/btn"
                                disabled={event.maxParticipants && participantCount >= event.maxParticipants}
                            >
                                {event.maxParticipants && participantCount >= event.maxParticipants ? (
                                    <>
                                        <Users className="w-4 h-4 mr-2" />
                                        Full
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                        Join Event
                                    </>
                                )}
                            </Button>
                        )
                    )}
                    {(isCreator || isAdmin) && (
                        <Button
                            variant="destructive"
                            onClick={() => setConfirmOpen(true)}
                            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md group/btn"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>

            <EventDetailModal
                isOpen={!!selectedEvent}
                event={event}
                onClose={() => setSelectedEvent(null)}
            />
            <ConfirmDialog
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => {
                    onDelete?.(event._id)
                    setConfirmOpen(false)
                }}
                message="Are you sure you want to delete this event? This action cannot be undone."
            />
        </Card>
    )
}

function EventDetail({ icon, label, highlight = false, bgColor = "from-gray-100 to-slate-100" }) {
    return (
        <div className={`flex items-center gap-2 sm:gap-3 group/detail ${highlight ? "text-orange-700 font-semibold" : "text-gray-700"} transition-all duration-200`}>
            <div className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br ${bgColor} rounded-xl flex items-center justify-center shadow-sm group-hover/detail:shadow-md group-hover/detail:scale-105 transition-all duration-200 flex-shrink-0`}>
                {icon}
            </div>
            <span className="text-xs sm:text-sm font-medium leading-tight">{label}</span>
        </div>
    )
}

// Demo component to showcase the responsive design
function Demo() {
    const sampleEvent = {
        _id: "1",
        name: "Community Garden Cleanup & Planting Drive",
        description: "Join us for a fun-filled day of beautifying our neighborhood! We'll be cleaning up the community garden and planting new flowers and vegetables for everyone to enjoy.",
        category: "volunteer",
        status: "active",
        startDate: "2024-07-15T09:00:00Z",
        endDate: "2024-07-15T15:00:00Z",
        location: {
            type: "offline",
            address: "Central Park Community Garden, 123 Green Street"
        },
        maxParticipants: 25,
        participants: [
            { status: "joined" },
            { status: "joined" },
            { status: "joined" },
            { status: "joined" },
            { status: "joined" }
        ],
        badgeReward: "Green Thumb Hero",
        tags: ["environment", "community", "outdoor", "gardening", "sustainability"],
        isExpired: false,
        createdBy: {
            _id: "creator1",
            name: "Jane Smith",
            avatar: null
        }
    }

    return (
        <div className="p-4 sm:p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
            <div className="max-w-sm sm:max-w-md mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                    Mobile-First Event Card
                </h1>
                <EventCard
                    event={sampleEvent}
                    onJoin={(id) => console.log("Joining event:", id)}
                    onLeave={(id) => console.log("Leaving event:", id)}
                    onStatusChange={(id, status) => console.log("Status change:", id, status)}
                    onDelete={(id) => console.log("Deleting event:", id)}
                    isJoined={false}
                    showActions={true}
                    currentUserId="user123"
                    currentUserRole="admin"
                />
            </div>
        </div>
    )
}

export default Demo