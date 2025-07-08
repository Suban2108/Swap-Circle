import React, { useState } from "react"
import { X, Users, Hash } from "lucide-react"

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup, loading = false }) => {
  const [groupName, setGroupName] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const [error, setError] = useState("")

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setInviteCode(code)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!groupName.trim()) {
      setError("Group name is required")
      return
    }

    if (!inviteCode.trim()) {
      setError("Invite code is required")
      return
    }

    if (inviteCode.length < 4) {
      setError("Invite code must be at least 4 characters")
      return
    }

    try {
      await onCreateGroup({
        name: groupName.trim(),
        inviteCode: inviteCode.trim().toUpperCase(),
      })

      setGroupName("")
      setInviteCode("")
      setError("")
      onClose()
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create group")
    }
  }

  const handleClose = () => {
    setGroupName("")
    setInviteCode("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Create New Group</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Group Name */}
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400"
              maxLength={50}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 mt-1">{groupName.length}/50 characters</p>
          </div>

          {/* Invite Code */}
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Invite Code
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="INVITE123"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400 font-mono"
                  maxLength={20}
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={generateInviteCode}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-xl transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                disabled={loading}
              >
                Generate
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Members will use this code to join your group</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition-colors font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !groupName.trim() || !inviteCode.trim()}
            >
              {loading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroupModal
