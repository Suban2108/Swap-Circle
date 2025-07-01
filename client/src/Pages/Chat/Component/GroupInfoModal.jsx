"use client"

import React, { useState, useEffect } from "react"
import { X, Users, Hash, Copy, MessageCircle, Crown, User } from "lucide-react"

const GroupInfoModal = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  inviteCode,
  createdBy,
  currentUserId,
  onStartDirectChat,
  onGetGroupMembers,
}) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen && groupId) {
      fetchMembers()
    }
  }, [isOpen, groupId])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError("")
      const membersData = await onGetGroupMembers(groupId)
      setMembers(membersData)
    } catch (error) {
      console.error("Failed to fetch group members:", error)
      setError("Failed to load group members")
    } finally {
      setLoading(false)
    }
  }

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Failed to copy invite code:", error)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleStartChat = (member) => {
    if (member._id !== currentUserId) {
      onStartDirectChat(member._id, member.name)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{groupName}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{members.length} members</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

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
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-200 ${
                  copySuccess
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
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    member._id === currentUserId
                      ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                  }`}
                  onClick={() => handleStartChat(member)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-blue-500 to-orange-500 text-white relative">
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
                        {member._id === createdBy && (
                          <Crown className="w-4 h-4 text-yellow-500" title="Group Admin" />
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {member._id === currentUserId ? "Tap to view profile" : "Tap to start chat"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {member._id === createdBy && <Crown className="w-4 h-4 text-yellow-500" />}
                    {member._id !== currentUserId && <MessageCircle className="w-4 h-4 text-blue-500 opacity-60" />}
                    {member._id === currentUserId && <User className="w-4 h-4 text-blue-500 opacity-60" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupInfoModal
