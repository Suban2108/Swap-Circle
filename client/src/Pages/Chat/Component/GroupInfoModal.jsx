import React, { useState, useEffect } from "react"
import {
  X,
  Users,
  Hash,
  Copy,
  MessageCircle,
  Crown,
  User,
  Edit3,
  Save,
} from "lucide-react"
import AvatarUpload from "./UploadAvatar"
import { chatAPI } from "../../../lib/api/ChatApi.js"
import { useAuth } from "../../../context/authContext"

const GroupInfoModal = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  groupAvatar,
  inviteCode,
  createdBy,
  currentUserId,
  onStartDirectChat,
  onGetGroupMembers,
  onUpdateGroupInfo,
}) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(groupName)
  const [avatarFile, setAvatarFile] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [groupDetails, setGroupDetails] = useState(null)
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const { PORT: CONTEXT_PORT } = useAuth()

  const getCreatedById = (createdBy) => {
    if (!createdBy) return null
    if (typeof createdBy === "string") return createdBy
    if (typeof createdBy === "object" && createdBy._id) {
      return typeof createdBy._id === "string"
        ? createdBy._id
        : createdBy._id.toString()
    }
    if (typeof createdBy === "object" && createdBy.toString) {
      return createdBy.toString()
    }
    return null
  }

  const createdById = getCreatedById(createdBy)
  const isAdmin = createdById === currentUserId

  const fetchGroupDetails = async () => {
    if (!groupId) return
    try {
      setFetchingDetails(true)
      const details = await chatAPI.getCircleDetails(groupId)
      setGroupDetails(details)
    } catch (err) {
      console.error("Failed to fetch group details:", err)
    } finally {
      setFetchingDetails(false)
    }
  }

  useEffect(() => {
    if (isOpen && groupId) {
      fetchMembers()
      fetchGroupDetails()
      setEditedName(groupName)
    }
  }, [isOpen, groupId, groupName])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError("")
      const membersData = await onGetGroupMembers(groupId)
      setMembers(membersData)
    } catch (err) {
      console.error("Failed to fetch group members:", err)
      setError("Failed to load group members")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateGroup = async () => {
    if (!onUpdateGroupInfo) return

    try {
      setIsUpdating(true)
      const updateData = {
        name: editedName,
        avatar: avatarFile,
      }

      await onUpdateGroupInfo(groupId, updateData)
      await fetchGroupDetails()
      setIsEditing(false)
      setAvatarFile(null)
    } catch (err) {
      console.error("Failed to update group:", err)
      setError("Failed to update group information")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedName(groupName)
    setAvatarFile(null)
  }

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy invite code:", err)
    }
  }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const handleStartChat = (member) => {
    if (member._id !== currentUserId) {
      onStartDirectChat(member._id, member.name)
      onClose()
    }
  }

  const isMemberCreator = (memberId) => memberId === createdById

  const PORT = CONTEXT_PORT || process.env.NEXT_PUBLIC_PORT || ""

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              {isEditing && isAdmin ? (
                <AvatarUpload
                  currentAvatar={groupDetails?.avatar || groupAvatar}
                  onAvatarChange={setAvatarFile}
                  size="lg"
                  isUploading={isUpdating}
                  canEdit={true}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                  {groupDetails?.avatar || groupAvatar ? (
                    <img
                      src={`${PORT}${groupDetails?.avatar || groupAvatar}`}
                      alt={groupDetails?.name || groupName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log(
                          "GroupInfoModal: Avatar failed to load:",
                          `${PORT}${groupDetails?.avatar || groupAvatar}`,
                        )
                        e.target.style.display = "none"
                        const parent = e.target.parentElement
                        if (parent) {
                          parent.innerHTML =
                            '<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38 2.69-2.5 6-2.5.99 0 1.94.14 2.72.39-.83.73-1.72 1.39-1.72 2.61v1H4z"/></svg>'
                        }
                      }}
                    />
                  ) : (
                    <Users className="w-8 h-8 text-white" />
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {isEditing && isAdmin ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-xl font-bold text-slate-800 dark:text-white bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                  maxLength={50}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white truncate">{groupName}</h2>
                  {isAdmin && <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0" title="You are the admin" />}
                </div>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">{members.length} members</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateGroup}
                      disabled={isUpdating || !editedName.trim()}
                      className="p-2 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white transition-colors"
                      title="Save changes"
                    >
                      {isUpdating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
                      title="Cancel editing"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Edit Group"
                  >
                    <Edit3 className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Admin Status Indicator */}
        {isAdmin && (
          <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                You are the group administrator
              </span>
            </div>
          </div>
        )}

        {fetchingDetails && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm text-blue-600 dark:text-blue-400">Loading group details...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 border-b border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Invite Code */}
        {inviteCode && (
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Invite Code</span>
              </div>
              <button
                onClick={copyInviteCode}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-200 ${copySuccess
                    ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                    : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">{copySuccess ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
              <code className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{inviteCode}</code>
            </div>
          </div>
        )}

        {/* Members */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Members</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1 max-h-[300px]">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-center">
                <p className="text-red-500 text-sm">{error}</p>
                <button
                  onClick={fetchMembers}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : (
              members.map((member) => (
                <div
                  key={member._id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${member._id === currentUserId
                      ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    }`}
                  onClick={() => handleStartChat(member)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-blue-500 to-orange-500 text-white relative overflow-hidden">
                      {member.avatar ? (
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none"
                            const parent = e.target.parentElement
                            if (parent) parent.textContent = getInitials(member.name)
                          }}
                        />
                      ) : (
                        getInitials(member.name)
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-800 dark:text-white">
                          {member.name}
                          {member._id === currentUserId && (
                            <span className="text-blue-600 dark:text-blue-400 text-sm ml-1">(You)</span>
                          )}
                        </span>
                        {isMemberCreator(member._id) && (
                          <Crown className="w-4 h-4 text-yellow-500" title="Group Admin" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500">
                          {member._id === currentUserId ? "Tap to view profile" : "Tap to start chat"}
                        </span>
                        {isMemberCreator(member._id) && (
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Admin</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isMemberCreator(member._id) && <Crown className="w-4 h-4 text-yellow-500" />}
                    {member._id !== currentUserId && <MessageCircle className="w-4 h-4 text-blue-500 opacity-60" />}
                    {member._id === currentUserId && <User className="w-4 h-4 text-blue-500 opacity-60" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="p-2 bg-gray-100 dark:bg-gray-800 text-xs">
            <details>
              <summary className="cursor-pointer text-gray-600 dark:text-gray-400">Debug Info</summary>
              <div className="mt-2 space-y-1 text-gray-500 dark:text-gray-400">
                <div>Current User: {currentUserId}</div>
                <div>Created By (raw): {JSON.stringify(createdBy)}</div>
                <div>Created By (processed): {createdById}</div>
                <div>Is Admin: {isAdmin ? "Yes" : "No"}</div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupInfoModal
