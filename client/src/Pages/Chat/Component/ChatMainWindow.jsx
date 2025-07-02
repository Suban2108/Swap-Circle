"use client"

import React,{ useRef, useState, useEffect } from "react"
import {
  MessageCircle,
  Phone,
  Video,
  Paperclip,
  Send,
  ArrowLeft,
  Menu,
  Info,
  ImageIcon,
  Download,
  X,
  Users,
  FileText,
  Film,
  Music,
} from "lucide-react"
import MessageActionsMenu from "./MessageActionMenu"
import GroupInfoModal from "./GroupInfoModal"
import { useAuth } from "../../../context/authContext"
import { chatAPI } from "../../../lib/api/ChatApi.js"
import toast from "react-hot-toast"

const ChatMainWindow = ({
  selectedChat,
  messages,
  onSendMessage,
  onSendFile,
  onShowMobileMenu,
  onShowMobileList,
  onStartDirectChat,
  onGetGroupMembers,
  onUpdateGroupInfo,
  onRefreshChat,
  onDeleteMessage,
  loading = false,
  currentUserId,
}) => {
  const [message, setMessage] = useState("")
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const { PORT } = useAuth()
  const [groupDetails, setGroupDetails] = useState(null)

  // Debug logging for selectedChat
  useEffect(() => {
    console.log("=== ChatMainWindow Debug ===")
    console.log("Selected Chat:", selectedChat)
    console.log("Selected Chat Avatar:", selectedChat?.avatar)
    console.log("Selected Chat Type:", selectedChat?.type)
    console.log("Messages:", messages)
    console.log("===========================")
  }, [selectedChat, messages])

  // Scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }, [messages])

  // Fetch group details when a group chat is selected
  useEffect(() => {
    const fetchGroupDetailsOnSelect = async () => {
      if (selectedChat?.type === "group" && (selectedChat.groupId || selectedChat._id)) {
        const groupId = selectedChat.groupId || selectedChat._id
        await fetchGroupDetails(groupId)
      } else {
        setGroupDetails(null)
      }
    }

    fetchGroupDetailsOnSelect()
  }, [selectedChat])

  const handleSendMessage = async () => {
    if (selectedFile) {
      await handleSendFile()
    } else if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleSendFile = async () => {
    if (!selectedFile || !onSendFile) return

    setIsUploading(true)
    try {
      console.log("Sending file:", selectedFile)
      await onSendFile(selectedFile, message.trim())
      setSelectedFile(null)
      setFilePreview(null)
      setMessage("")
      toast.success("File sent successfully!")
    } catch (error) {
      console.error("Error sending file:", error)
      // toast.error("Failed to send file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("File selected:", file)
    setSelectedFile(file)

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFilePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleStartDirectChat = (userId, userName) => {
    if (onStartDirectChat) {
      onStartDirectChat(userId, userName)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Enhanced file type detection
  const getFileIcon = (messageType, fileName) => {
    if (messageType === "image") {
      return <ImageIcon className="w-4 h-4" />
    } else if (messageType === "video") {
      return <Film className="w-4 h-4" />
    } else if (messageType === "audio") {
      return <Music className="w-4 h-4" />
    } else if (fileName?.endsWith(".pdf")) {
      return <FileText className="w-4 h-4" />
    } else {
      return <FileText className="w-4 h-4" />
    }
  }

  // Enhanced update group info handler
  const handleUpdateGroupInfo = async (groupId, updateData) => {
    try {
      console.log("ChatMainWindow: Updating group info:", groupId, updateData)

      await onUpdateGroupInfo(groupId, updateData)

      if (onRefreshChat) {
        console.log("ChatMainWindow: Refreshing chat data...")
        await onRefreshChat(selectedChat._id || selectedChat.groupId)
      }

      await fetchGroupDetails(groupId)

      toast.success("Group details updated successfully!")
      console.log("ChatMainWindow: Group update completed")
    } catch (error) {
      console.error("ChatMainWindow: Error updating group:", error)
      toast.error("Failed to update group details")
      throw error
    }
  }

  const fetchGroupDetails = async (groupId) => {
    try {
      console.log("Fetching group details for:", groupId)
      const details = await chatAPI.getCircleDetails(groupId)
      console.log("Fetched group details:", details)
      setGroupDetails(details)
      return details
    } catch (error) {
      console.error("Error fetching group details:", error)
      return null
    }
  }

  const handleShowGroupInfo = async () => {
    if (isGroupChat && (selectedChat.groupId || selectedChat._id)) {
      const groupId = selectedChat.groupId || selectedChat._id
      await fetchGroupDetails(groupId)
      setShowGroupInfo(true)
    } else {
      setShowGroupInfo(true)
    }
  }

  // Handle message deletion
  const handleDeleteMessage = (messageId) => {
    console.log("Message deleted:", messageId)

    // Call the parent component's delete handler to update the messages list
    if (onDeleteMessage) {
      onDeleteMessage(messageId)
    }
  }

  // Helper function to get the correct avatar URL
  const getAvatarUrl = () => {
    const isGroupChat = selectedChat?.type === "group"

    if (isGroupChat) {
      const avatar = groupDetails?.avatar || selectedChat?.avatar
      return avatar ? `${PORT}${avatar}` : null
    } else {
      return selectedChat?.avatar ? `${PORT}${selectedChat.avatar}` : null
    }
  }

  // Helper function to get display name
  const getDisplayName = () => {
    const isGroupChat = selectedChat?.type === "group"
    if (isGroupChat) {
      return groupDetails?.name || selectedChat?.name || "Group Chat"
    }
    return selectedChat?.name || "Unknown"
  }

  // Updated message rendering to handle the new API response structure
  const renderMessage = (msg) => {
    console.log("Rendering message:", msg)

    const isMe = msg.senderId._id === currentUserId
    const isGroupChat = selectedChat?.type === "group"

    // Handle file messages based on messageType from API response
    if (msg.messageType && msg.messageType !== "text" && msg.fileUrl) {
      console.log("Rendering file message:", {
        messageType: msg.messageType,
        fileUrl: msg.fileUrl,
        fileName: msg.fileName,
        fileSize: msg.fileSize,
      })

      return (
        <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
          <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${isMe ? "order-2" : "order-1"}`}>
            {isGroupChat && !isMe && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 ml-1">{msg.senderId.name}</div>
            )}
            <div className="flex items-end space-x-2">
              <div
                className={`px-3 sm:px-4 py-2 rounded-2xl shadow-sm relative ${
                  isMe
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                    : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-slate-600"
                }`}
              >
                {msg.messageType === "image" ? (
                  <div className="space-y-2">
                    <div className="relative">
                      <img
                        src={`${PORT}${msg.fileUrl}`}
                        alt={msg.fileName || "Image"}
                        className="max-w-full h-auto rounded-lg max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onLoad={() => console.log("✅ Image loaded successfully:", `${PORT}${msg.fileUrl}`)}
                        onError={(e) => {
                          console.error("❌ Image failed to load:", `${PORT}${msg.fileUrl}`)
                          e.target.style.display = "none"
                          const parent = e.target.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center w-full h-32 bg-slate-200 dark:bg-slate-600 rounded-lg">
                                <div class="text-center">
                                  <svg class="w-8 h-8 mx-auto mb-2 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                  </svg>
                                  <p class="text-xs text-slate-500">Image failed to load</p>
                                </div>
                              </div>
                            `
                          }
                        }}
                        onClick={() => {
                          window.open(`${PORT}${msg.fileUrl}`, "_blank")
                        }}
                      />
                    </div>
                    {msg.content && <p className="text-sm">{msg.content}</p>}
                  </div>
                ) : msg.messageType === "video" ? (
                  <div className="space-y-2">
                    <video
                      controls
                      className="max-w-full h-auto rounded-lg max-h-64"
                      onError={() => console.error("Video failed to load:", `${PORT}${msg.fileUrl}`)}
                    >
                      <source src={`${PORT}${msg.fileUrl}`} />
                      Your browser does not support the video tag.
                    </video>
                    {msg.content && <p className="text-sm">{msg.content}</p>}
                  </div>
                ) : msg.messageType === "audio" ? (
                  <div className="space-y-2">
                    <audio
                      controls
                      className="w-full"
                      onError={() => console.error("Audio failed to load:", `${PORT}${msg.fileUrl}`)}
                    >
                      <source src={`${PORT}${msg.fileUrl}`} />
                      Your browser does not support the audio tag.
                    </audio>
                    {msg.content && <p className="text-sm">{msg.content}</p>}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${isMe ? "bg-blue-400" : "bg-slate-200 dark:bg-slate-600"}`}>
                      {getFileIcon(msg.messageType, msg.fileName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.fileName || "Unknown file"}</p>
                      <p className="text-xs opacity-75">
                        {msg.fileSize ? formatFileSize(msg.fileSize) : "Unknown size"}
                      </p>
                    </div>
                    <a
                      href={`${PORT}${msg.fileUrl}`}
                      download={msg.fileName}
                      className={`p-1 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors`}
                      onClick={() => console.log("Downloading file:", `${PORT}${msg.fileUrl}`)}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                )}
                {msg.content &&
                  msg.messageType !== "image" &&
                  msg.messageType !== "video" &&
                  msg.messageType !== "audio" && <p className="text-sm mt-2">{msg.content}</p>}
              </div>
              <MessageActionsMenu
                messageId={msg._id}
                senderId={msg.senderId._id}
                senderName={msg.senderId.name}
                content={msg.content}
                currentUserId={currentUserId}
                onStartDirectChat={handleStartDirectChat}
                onDeleteMessage={handleDeleteMessage}
                isGroupChat={isGroupChat}
              />
            </div>
            <div className={`text-xs text-slate-400 mt-1 ${isMe ? "text-right" : "text-left"}`}>
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      )
    }

    // Handle regular text messages
    return (
      <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
        <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${isMe ? "order-2" : "order-1"}`}>
          {isGroupChat && !isMe && (
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 ml-1">{msg.senderId.name}</div>
          )}
          <div className="flex items-end space-x-2">
            <div
              className={`px-3 sm:px-4 py-2 rounded-2xl shadow-sm relative ${
                isMe
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                  : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-slate-600"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
            <MessageActionsMenu
              messageId={msg._id}
              senderId={msg.senderId._id}
              senderName={msg.senderId.name}
              content={msg.content}
              currentUserId={currentUserId}
              onStartDirectChat={handleStartDirectChat}
              onDeleteMessage={handleDeleteMessage}
              isGroupChat={isGroupChat}
            />
          </div>
          <div className={`text-xs text-slate-400 mt-1 ${isMe ? "text-right" : "text-left"}`}>
            {formatTime(msg.timestamp)}
          </div>
        </div>
      </div>
    )
  }

  const isGroupChat = selectedChat?.type === "group"

  if (!selectedChat) {
    return (
      <div className="h-full bg-gradient-to-br from-white via-blue-50 to-orange-50 dark:from-slate-900 dark:via-blue-950 dark:to-orange-950 flex flex-col">
        <div className="md:hidden p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <button
              onClick={onShowMobileMenu}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Chat</h1>
            <div className="w-9" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Welcome to Chat
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Select a conversation to start messaging
            </p>
            <button
              onClick={onShowMobileList}
              className="md:hidden mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full font-medium"
            >
              Browse Chats
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onShowMobileList}
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleShowGroupInfo}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base relative overflow-hidden">
                {(() => {
                  const avatarUrl = getAvatarUrl()

                  if (avatarUrl) {
                    return (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt={getDisplayName()}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          console.log("Avatar failed to load:", avatarUrl)
                          e.target.style.display = "none"
                          const parent = e.target.parentElement
                          if (parent) {
                            if (isGroupChat) {
                              parent.innerHTML =
                                '<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38 2.69-2.5 6-2.5.99 0 1.94.14 2.72.39-.83.73-1.72 1.39-1.72 2.61v1H4z"/></svg>'
                            } else {
                              parent.textContent = getInitials(getDisplayName())
                            }
                          }
                        }}
                      />
                    )
                  } else if (isGroupChat) {
                    return <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  } else {
                    return <span>{getInitials(getDisplayName())}</span>
                  }
                })()}

                {selectedChat.online && !isGroupChat && (
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
            </button>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">{getDisplayName()}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {isGroupChat ? "Group chat" : selectedChat.online ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {isGroupChat && (
              <button
                onClick={handleShowGroupInfo}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors"
                title="Group Info"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-slate-500 dark:text-slate-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced File Preview */}
      {selectedFile && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center justify-between bg-white dark:bg-slate-700 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              {filePreview ? (
                <img src={filePreview || "/placeholder.svg"} alt="Preview" className="w-12 h-12 object-cover rounded" />
              ) : (
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                  {getFileIcon(selectedFile.type?.startsWith("image/") ? "image" : "file", selectedFile.name)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950">
        <div className="flex items-end space-x-2 sm:space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 mb-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={selectedFile ? "Add a caption..." : "Type a message..."}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400 text-sm sm:text-base"
              rows={1}
              style={{ maxHeight: "100px" }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={(!message.trim() && !selectedFile) || isUploading}
            className="p-2 sm:p-3 mb-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-full transition-all duration-200 hover:scale-105 disabled:scale-100 shadow-lg flex-shrink-0"
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isGroupChat && selectedChat && (
        <GroupInfoModal
          isOpen={showGroupInfo}
          onClose={() => {
            setShowGroupInfo(false)
          }}
          groupId={selectedChat.groupId || selectedChat._id}
          groupName={groupDetails?.name || selectedChat.name}
          groupAvatar={groupDetails?.avatar || selectedChat.avatar}
          inviteCode={groupDetails?.inviteCode || selectedChat.inviteCode || ""}
          createdBy={groupDetails?.createdBy || selectedChat.createdBy || ""}
          currentUserId={currentUserId}
          onStartDirectChat={handleStartDirectChat}
          onGetGroupMembers={onGetGroupMembers || (() => Promise.resolve([]))}
          onUpdateGroupInfo={handleUpdateGroupInfo}
        />
      )}
    </div>
  )
}

export default ChatMainWindow
