"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Users, Clock, Award, Eye, UserPlus, UserMinus } from "lucide-react"
import EventDetailModal from "./EventDetails"
import { useState } from "react"

export function EventCard({ event, onJoin, onLeave, isJoined, showActions = true }) {

    const [selectedEvent, setSelectedEvent] = useState(null)


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

    return (
        <Card className="group h-full flex flex-col border-0 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-amber-200/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between flex-wrap items-start gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                        <Badge className={`${getCategoryColor(event.category)} border-0 font-semibold px-3 py-1.5 text-xs capitalize tracking-wide rounded-full`}>
                            {event.category || "Other"}
                        </Badge>
                        <Badge className={`${getStatusColor(event.status)} font-semibold px-3 py-1.5 text-xs capitalize tracking-wide rounded-full`}>
                            {event.status}
                        </Badge>
                    </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {event.name}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 text-sm text-gray-600 relative z-10">
                <p className="line-clamp-3 mb-5 text-gray-700 leading-relaxed">{event.description}</p>

                <div className="space-y-4 text-gray-700">
                    <EventDetail
                        icon={<CalendarDays className="text-orange-600 w-4 h-4" />}
                        label={formatDate(event.startDate)}
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
                    <div className="flex flex-wrap gap-2 mt-5">
                        {event.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200 text-xs px-3 py-1 rounded-full font-medium hover:shadow-md transition-all duration-200"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {event.tags.length > 3 && (
                            <Badge
                                variant="outline"
                                className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200 text-xs px-3 py-1 rounded-full font-medium"
                            >
                                +{event.tags.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex gap-3 pt-5 mt-auto relative z-10">
                <Button
                    variant="outline"
                    onClick={() => {
                        setTimeout(() => {
                            setSelectedEvent(event)
                        }, 500) // delay in milliseconds (e.g., 100ms)
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
            </CardFooter>
            <EventDetailModal
                isOpen={!!selectedEvent}
                event={event}
                onClose={() => setSelectedEvent(null)}
            />
        </Card>
    )
}

function EventDetail({ icon, label, highlight = false, bgColor = "from-gray-100 to-slate-100" }) {
    return (
        <div className={`flex items-center gap-3 group/detail ${highlight ? "text-orange-700 font-semibold" : "text-gray-700"} transition-all duration-200`}>
            <div className={`w-9 h-9 bg-gradient-to-br ${bgColor} rounded-xl flex items-center justify-center shadow-sm group-hover/detail:shadow-md group-hover/detail:scale-105 transition-all duration-200`}>
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}

// Demo component to show the enhanced design
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
        isExpired: false
    }

    return (
        <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enhanced Event Card</h1>
                <EventCard
                    event={sampleEvent}
                    onJoin={(id) => console.log("Joining event:", id)}
                    onLeave={(id) => console.log("Leaving event:", id)}
                    isJoined={false}
                    showActions={true}
                />
            </div>
        </div>
    )
}

export default Demo