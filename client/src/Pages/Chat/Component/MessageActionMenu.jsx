"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, MoreVertical, Reply, Copy, Trash2 } from "lucide-react"

const MessageActionsMenu = ({
  messageId,
  senderId,
  senderName,
  content,
  currentUserId,
  onStartDirectChat,
  onReplyToMessage,
  onDeleteMessage,
  isGroupChat,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleStartChat = () => {
    onStartDirectChat(senderId, senderName)
    setIsOpen(false)
  }

  const handleReply = () => {
    if (onReplyToMessage) {
      onReplyToMessage(messageId)
    }
    setIsOpen(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (error) {
      console.error("Failed to copy message:", error)
    }
    setIsOpen(false)
  }

  const handleDelete = () => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId)
    }
    setIsOpen(false)
  }

  const isMyMessage = senderId === currentUserId

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
      >
        <MoreVertical className="w-4 h-4 text-slate-500" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 ${
            isMyMessage ? "right-0" : "left-0"
          }`}
        >
          {isGroupChat && !isMyMessage && (
            <button
              onClick={handleStartChat}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span>Message {senderName}</span>
            </button>
          )}

          {onReplyToMessage && (
            <button
              onClick={handleReply}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-2"
            >
              <Reply className="w-4 h-4 text-slate-500" />
              <span>Reply</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-2"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copy</span>
          </button>

          {isMyMessage && onDeleteMessage && (
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default MessageActionsMenu
