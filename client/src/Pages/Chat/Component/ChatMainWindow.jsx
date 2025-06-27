"use client"

import React, { useRef, useState } from "react"
import { MessageCircle, Phone, Video, MoreVertical, Paperclip, Send, FileText, ArrowLeft, Menu } from "lucide-react"

const ChatMainWindow = ({ selectedChat, onShowMobileMenu, onShowMobileList }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice Chen",
      content: "Hey everyone! How's the project going?",
      time: "2:30 PM",
      isMe: false,
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      content: "Going well! Just finished the authentication module.",
      time: "2:32 PM",
      isMe: true,
      type: "text",
    },
  ])
  const fileInputRef = useRef(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        type: "text",
      }
      setMessages([...messages, newMessage])
      setMessage("")
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

    const fileType = file.type
    const isImage = fileType.startsWith("image/")
    const reader = new FileReader()

    reader.onloadend = () => {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: reader.result,
        fileName: file.name,
        fileType: file.type,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        type: isImage ? "image" : "file",
      }
      setMessages([...messages, newMessage])
    }

    reader.readAsDataURL(file)
  }

  if (!selectedChat) {
    return (
      <div className="h-full bg-gradient-to-br from-white via-blue-50 to-orange-50 dark:from-slate-900 dark:via-blue-950 dark:to-orange-950 flex flex-col">
        {/* Mobile Header */}
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

        {/* Welcome Content */}
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
      <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onShowMobileList}
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base relative">
              {selectedChat.avatar}
              {selectedChat.online && (
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">{selectedChat.name}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {selectedChat.online ? "Online" : "Last seen 2h ago"}
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
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${msg.isMe ? "order-2" : "order-1"}`}>
              {!msg.isMe && <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{msg.sender}</div>}
              <div
                className={`px-3 sm:px-4 py-2 rounded-2xl shadow-sm ${
                  msg.isMe
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                    : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-slate-600"
                }`}
              >
                {msg.type === "text" && <p className="text-sm">{msg.content}</p>}
                {msg.type === "image" && (
                  <img
                    src={msg.content || "/placeholder.svg"}
                    alt={msg.fileName}
                    className="rounded-lg max-h-48 object-cover w-full"
                  />
                )}
                {msg.type === "file" && (
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                    <a href={msg.content} download={msg.fileName} className="underline text-sm break-all">
                      {msg.fileName}
                    </a>
                  </div>
                )}
              </div>
              <div className={`text-xs text-slate-400 mt-1 ${msg.isMe ? "text-right" : "text-left"}`}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input (Placed above Footer) */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950">
        <div className="flex items-end space-x-2 sm:space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 mb-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400 text-sm sm:text-base"
              rows={1}
              style={{ maxHeight: "100px" }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 sm:p-3 mb-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-full transition-all duration-200 hover:scale-105 disabled:scale-100 shadow-lg flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMainWindow
