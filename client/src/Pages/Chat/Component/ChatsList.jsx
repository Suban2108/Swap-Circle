"use client"

import React, { useEffect, useState } from "react"
import { Search, ArrowLeft, Plus, UserPlus, Users } from "lucide-react"
import CreateGroupModal from "../Component/CreateGroupModal"
import JoinGroupModal from "../Component/JoinGroupModal"
import { useAuth } from "../../../context/authContext"
import { chatAPI } from "../../../lib/api/ChatApi.js"

const ChatList = ({
  list = [],
  onSelect,
  selectedId,
  selectedChat,
  mode,
  isMobileListOpen = false,
  onCloseMobileList,
  onBackToToggle,
  onCreateGroup,
  onJoinGroup,
  onShowGroupInfo,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const { PORT } = useAuth()
  const [groupDetailsMap, setGroupDetailsMap] = useState({})

  // Prefetch group details and cache them
  useEffect(() => {
    const fetchAllGroupDetails = async () => {
      const newMap = { ...groupDetailsMap }
      const groupItems = list.filter(item => item?.type === "group")

      for (const item of groupItems) {
        const groupId = item.groupId || item._id
        if (!newMap[groupId]) {
          try {
            const details = await chatAPI.getCircleDetails(groupId)
            newMap[groupId] = details
          } catch (error) {
            console.error("Failed to fetch group details for", groupId, error)
          }
        }
      }

      setGroupDetailsMap(newMap)
    }

    if (list.length > 0) {
      fetchAllGroupDetails()
    }
  }, [list])

  // Helper function to get avatar URL
  const getItemAvatarUrl = (item) => {
    const isGroupChat = item?.type === "group"
    let avatar = item?.avatar

    if (isGroupChat) {
      const groupId = item.groupId || item._id
      const groupDetails = groupDetailsMap[groupId]
      avatar = groupDetails?.avatar
    }

    if (avatar) {
      if (avatar.startsWith("http://") || avatar.startsWith("https://") || avatar.startsWith(PORT)) {
        return avatar
      } else {
        return `${PORT}${avatar.startsWith("/") ? avatar : "/" + avatar}`
      }
    }

    return null
  }

  const getItemDisplayName = (item) => item?.name || "Unknown"

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    return diffInHours < 24
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString()
  }

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderAvatar = (item, isSelected) => {
    const isGroup = item?.type === "group"
    const avatarUrl = getItemAvatarUrl(item)
    const displayName = getItemDisplayName(item)

    return (
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${isSelected ? "bg-white/20 text-white" : "bg-gradient-to-br from-blue-500 to-orange-500 text-white"
          } relative flex-shrink-0 overflow-hidden`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full rounded-full object-cover border-2 border-orange-500"
            onError={(e) => {
              e.target.style.display = "none"
              const parent = e.target.parentElement
              if (parent && !parent.querySelector('.avatar-fallback')) {
                const fallbackDiv = document.createElement("div")
                fallbackDiv.className = "avatar-fallback w-full h-full flex items-center justify-center"
                fallbackDiv.innerHTML = isGroup
                  ? `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38 2.69-2.5 6-2.5.99 0 1.94.14 2.72.39-.83.73-1.72 1.39-1.72 2.61v1H4z"/>
                      <path d="M12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
                      <path d="M12.5 13c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>`
                  : `<span class="text-sm font-bold">${getInitials(displayName)}</span>`
                parent.appendChild(fallbackDiv)
              }
            }}
          />
        ) : (
          <div className="avatar-fallback w-full h-full flex items-center justify-center">
            {isGroup ? <Users className="w-6 h-6" /> : <span>{getInitials(displayName)}</span>}
          </div>
        )}
        {item.online && !isGroup && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
    )
  }

  const handleCreateGroup = async (groupData) => {
    if (!onCreateGroup) return
    setActionLoading(true)
    try {
      await onCreateGroup(groupData)
    } finally {
      setActionLoading(false)
    }
  }

  const handleJoinGroup = async (inviteCode) => {
    if (!onJoinGroup) return
    setActionLoading(true)
    try {
      await onJoinGroup(inviteCode)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <>
            {isMobileListOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 mt-20 z-40 md:hidden" onClick={onCloseMobileList} />
      )}

      <div
        className={`fixed md:relative top-0 left-0 z-50 md:z-auto h-full w-full sm:w-80 md:w-80 flex-shrink-0 flex flex-col bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900 border-r border-blue-200 dark:border-blue-800 transform transition-transform duration-300 ease-in-out ${isMobileListOpen ? "translate-x-0 mt-15" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="p-4 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBackToToggle}
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex-1 md:flex-none">
              {mode === "groups" ? "Groups" : "Messages"}
            </h2>

            {mode === "groups" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg"
                  title="Join Group"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white transition-colors shadow-lg"
                  title="Create Group"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        {mode === "groups" && (
          <div className="p-3 border-b border-blue-200 dark:border-blue-800 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Create</span>
              </button>
              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Join</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              {searchTerm ? (
                "No results found"
              ) : (
                <div className="space-y-2">
                  <p>No {mode} available</p>
                  {mode === "groups" && (
                    <>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="text-blue-500 hover:text-blue-600 text-sm underline"
                      >
                        Create your first group
                      </button>
                      <p className="text-xs">or</p>
                      <button
                        onClick={() => setShowJoinModal(true)}
                        className="text-orange-500 hover:text-orange-600 text-sm underline"
                      >
                        Join an existing group
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            filteredList.map((item, index) => {
              console.log(`=== Rendering list item ${index} ===`)
              console.log("Item:", item)

              const isSelected = selectedId === item._id
              console.log("Is selected:", isSelected)

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    console.log("Clicked on item:", item)
                    onSelect(item)
                    if (onCloseMobileList) onCloseMobileList()
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] touch-manipulation ${isSelected
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                      : "hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white hover:shadow-md bg-white/50 dark:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {renderAvatar(item, isSelected)}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold truncate text-sm sm:text-base">{item.name}</div>
                        <div className="text-xs opacity-70 flex-shrink-0 ml-2">{formatTime(item.timestamp)}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm opacity-70 truncate pr-2">{item.lastMessage || "No messages yet"}</div>
                        {item.unread > 0 && (
                          <div
                            className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-bold ${isSelected ? "bg-white/20 text-white" : "bg-red-500 text-white"
                              }`}
                          >
                            {item.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateGroup={handleCreateGroup}
        loading={actionLoading}
      />

      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoinGroup={handleJoinGroup}
        loading={actionLoading}
      />
    </>
  )
}

export default ChatList
