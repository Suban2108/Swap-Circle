"use client"

import React,{ useState } from "react"
import ChatSidebar from "./ChatSidebar"
import ChatList from "./ChatsList"
import ChatMainWindow from "./ChatMainWindow"
import { useChat } from "../../../hooks/UserChat.js"
import { chatAPI } from "../../../lib/api/ChatApi.js"

const ChatContainer = ({ userId, apiUrl, token }) => {
  const [mode, setMode] = useState("groups")
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)

  const {
    messages,
    directConversations,
    groupConversations,
    loading,
    error,
    sendMessage,
    fetchConversationMessages,
    markAsRead,
    createGroup,
    joinGroup,
    createDirectConversation,
  } = useChat(userId)

  const handleShowMobileMenu = () => {
    setIsMobileMenuOpen(true)
    setIsMobileListOpen(false)
  }

  const handleShowMobileList = () => {
    setIsMobileListOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleBackToToggle = () => {
    setIsMobileListOpen(false)
    setIsMobileMenuOpen(true)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCloseMobileList = () => {
    setIsMobileListOpen(false)
  }

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation)

    await fetchConversationMessages(conversation._id)

    if (conversation.unreadCount && conversation.unreadCount > 0) {
      await markAsRead(conversation._id)
    }
  }

  const handleSendMessage = async (content) => {
    if (!selectedConversation) return

    try {
      await sendMessage({
        conversationId: selectedConversation._id,
        content,
      })
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleCreateGroup = async (groupData) => {
    try {
      await createGroup(groupData)
    } catch (error) {
      console.error("Failed to create group:", error)
      throw error
    }
  }

  const handleJoinGroup = async (inviteCode) => {
    try {
      await joinGroup(inviteCode)
    } catch (error) {
      console.error("Failed to join group:", error)
      throw error
    }
  }

  const handleStartDirectChat = async (otherUserId, userName) => {
    try {
      const conversation = await createDirectConversation(otherUserId)

      if (conversation) {
        setMode("individuals")
        await handleSelectConversation(conversation)
        setIsMobileMenuOpen(false)
        setIsMobileListOpen(false)
      }
    } catch (error) {
      console.error("Failed to start direct chat:", error)
    }
  }

  const handleGetGroupMembers = async (groupId) => {
    try {
      // Make sure we're using the actual group/circle ID, not the conversation ID
      return await chatAPI.getCircleMembers(groupId)
    } catch (error) {
      console.error("Failed to get group members:", error)
      return []
    }
  }

  const transformConversationForUI = (conversation) => {
    let name = ""
    let avatar = ""
    let groupId = null // Add this to track the actual group ID

    if (conversation.type === "direct") {
      const otherParticipant = conversation.participants?.find((p) => p._id !== userId)
      name = otherParticipant?.name || "Unknown User"
      avatar = otherParticipant?.avatar || ""
    } else {
      name = conversation.groupId?.name || "Unknown Group"
      avatar = ""
      groupId = conversation.groupId?._id || conversation.groupId // Store the actual group ID
    }

    return {
      _id: conversation._id,
      groupId, // Add the actual group ID for group conversations
      name,
      avatar,
      lastMessage: conversation.lastMessage?.content || "",
      timestamp: conversation.lastMessage?.timestamp || conversation.updatedAt,
      unread: conversation.unreadCount || 0,
      online: false,
      type: conversation.type,
      inviteCode: conversation.groupId?.inviteCode,
      createdBy: conversation.groupId?.createdBy,
    }
  }

  const currentList =
    mode === "groups"
      ? groupConversations.map(transformConversationForUI)
      : directConversations.map(transformConversationForUI)

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen md:h-[700px] md:mt-16 mt-16 flex bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-orange-950 dark:via-slate-900 dark:to-blue-950 overflow-hidden">
      <ChatSidebar
        selected={mode}
        onSelect={setMode}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={handleCloseMobileMenu}
        userId={userId}
        apiUrl={apiUrl}
        token={token}
      />

      <ChatList
        list={currentList}
        selectedId={selectedConversation?._id}
        onSelect={(item) => {
          const conversation =
            mode === "groups"
              ? groupConversations.find((c) => c._id === item._id)
              : directConversations.find((c) => c._id === item._id)

          if (conversation) {
            handleSelectConversation(conversation)
          }
        }}
        mode={mode}
        isMobileListOpen={isMobileListOpen}
        onCloseMobileList={handleCloseMobileList}
        onBackToToggle={handleBackToToggle}
        onCreateGroup={handleCreateGroup}
        onJoinGroup={handleJoinGroup}
        loading={loading}
      />

      <div className="flex-1 min-w-0">
        <ChatMainWindow
          selectedChat={selectedConversation ? transformConversationForUI(selectedConversation) : null}
          messages={messages}
          onSendMessage={handleSendMessage}
          onShowMobileMenu={handleShowMobileMenu}
          onShowMobileList={handleShowMobileList}
          onStartDirectChat={handleStartDirectChat}
          onGetGroupMembers={handleGetGroupMembers}
          loading={loading}
          currentUserId={userId}
        />
      </div>
    </div>
  )
}

export default ChatContainer
