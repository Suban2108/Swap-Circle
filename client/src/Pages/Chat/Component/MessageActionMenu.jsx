"use client"

import React, { useState } from "react"
import { MoreVertical, Copy, MessageSquare, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../../../context/authContext"
import ConfirmDialog from "../../../Components/shared/ConfirmDialog"

const MessageActionsMenu = ({
  messageId,
  senderId,
  senderName,
  content,
  currentUserId,
  onStartDirectChat,
  isGroupChat,
  onDeleteMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { PORT } = useAuth()

  const handleCopyText = () => {
    if (content) {
      navigator.clipboard.writeText(content)
      toast.success("Message copied to clipboard")
    }
    setIsOpen(false)
  }

  const handleStartDirectChat = () => {
    if (onStartDirectChat && senderId !== currentUserId) {
      onStartDirectChat(senderId, senderName)
    }
    setIsOpen(false)
  }

  const handleDeleteMessage = () => {
    if (!messageId || senderId !== currentUserId) {
      toast.error("You can only delete your own messages")
      return
    }

    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    setIsDeleting(true)
    setConfirmOpen(false)

    try {
      const response = await axios.delete(`${PORT}/api/messages/${messageId}`, {
        data: { userId: currentUserId },
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
      });


      if (response.status === 200) {
        toast.success("Message deleted successfully")
        onDeleteMessage?.(messageId)
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      const errorMessage = error.response?.data?.error || "Failed to delete message"
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  // Don't show menu if no actions are available
  const canCopy = content && content.trim()
  const canStartDirectChat = isGroupChat && senderId !== currentUserId
  const canDelete = senderId === currentUserId

  if (!canCopy && !canStartDirectChat && !canDelete) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
        title="Message options"
      >
        <MoreVertical className="w-4 h-4 text-slate-500" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 py-1 z-20 min-w-[160px]">
            {canCopy && (
              <button
                onClick={handleCopyText}
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center space-x-2 text-slate-700 dark:text-slate-200"
              >
                <Copy className="w-4 h-4" />
                <span>Copy text</span>
              </button>
            )}

            {canStartDirectChat && (
              <button
                onClick={handleStartDirectChat}
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center space-x-2 text-slate-700 dark:text-slate-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message {senderName}</span>
              </button>
            )}

            {canDelete && (
              <button
                onClick={handleDeleteMessage}
                disabled={isDeleting}
                className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 text-red-600 dark:text-red-400 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? "Deleting..." : "Delete message"}</span>
              </button>
            )}
          </div>
        </>
      )}
      <ConfirmDialog
        open={confirmOpen}
        message="Are you sure you want to delete this message? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default MessageActionsMenu
