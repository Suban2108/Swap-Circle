"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { CalendarDays, Clock, MapPin, Users, Award, Mail, Phone, Globe, X } from "lucide-react"

export default function EventDetailModal({ event, isOpen, onClose }) {
  if (!event) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const participantCount = event?.participants?.filter(p => p.status === "joined")?.length || 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl mt-7">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-800">Event Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">{event.name}</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>

            <div className="space-y-3 text-sm text-gray-700">
              <DetailRow icon={<CalendarDays className="w-4 h-4 text-orange-500" />} label={formatDate(event.startDate)} />
              <DetailRow icon={<Clock className="w-4 h-4 text-blue-500" />} label={`Ends: ${formatDate(event.endDate)}`} />
              {event.location?.type && (
                <DetailRow
                  icon={<MapPin className="w-4 h-4 text-purple-500" />}
                  label={event.location.type === "offline" ? event.location.address || "TBA" : "Online"}
                />
              )}
              <DetailRow
                icon={<Users className="w-4 h-4 text-green-600" />}
                label={`${participantCount}${event.maxParticipants ? ` / ${event.maxParticipants}` : ""} participant${participantCount !== 1 ? "s" : ""}`}
              />
              {event.badgeReward && (
                <DetailRow
                  icon={<Award className="w-4 h-4 text-yellow-500" />}
                  label={`Reward: ${event.badgeReward}`}
                />
              )}
            </div>

            {event.requirements?.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mt-4 mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {event.requirements.filter(r => r.trim()).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {event.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {event.tags.map((tag, i) => (
                  <Badge key={i} className="bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-orange-700">Contact Information</h4>
            <div className="space-y-3 text-sm text-gray-700">
              {event.contactInfo?.email && (
                <DetailRow icon={<Mail className="w-4 h-4 text-red-500" />} label={event.contactInfo.email} />
              )}
              {event.contactInfo?.phone && (
                <DetailRow icon={<Phone className="w-4 h-4 text-green-500" />} label={event.contactInfo.phone} />
              )}
              {event.contactInfo?.website && (
                <DetailRow icon={<Globe className="w-4 h-4 text-blue-600" />} label={event.contactInfo.website} />
              )}
            </div>

            <div className="pt-6">
              <Button variant="outline" onClick={onClose} className="w-full border-orange-200 text-orange-700">
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DetailRow({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-800 font-medium break-all">{label}</span>
    </div>
  )
}
