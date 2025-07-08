"use client"

import React, { useState } from "react"
import ChatSidebar from "./ChatSidebar"
import ChatList from "./ChatsList"
import ChatMainWindow from "./ChatMainWindow"
import { useChat } from "../../../hooks/UserChat.js"
import { chatAPI } from "../../../lib/api/ChatApi.js"
import axios from "axios"
import { useAuth } from "../../../context/authContext"
import toast from "react-hot-toast"

const ChatContainer = ({ userId, apiUrl, Userdata }) => {
  const [mode, setMode] = useState("groups")
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)
  const { PORT } = useAuth()

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
    refreshConversations,
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
      return await chatAPI.getCircleMembers(groupId)
    } catch (error) {
      console.error("Failed to get group members:", error)
      return []
    }
  }

  const handleGetCircleDetails = async (groupId) => {
    try {
      return await chatAPI.getCircleDetails(groupId)
    } catch (error) {
      console.error("Failed to get group details:", error)
      return []
    }
  }

  const transformConversationForUI = (conversation) => {
    let name = ""
    let avatar = ""
    let groupId = null


    if (conversation.type === "direct") {
      const otherParticipant = conversation.participants?.find((p) => p._id !== userId)
      name = otherParticipant?.name || "Unknown User"
      avatar = otherParticipant?.avatar || ""
    } else {
      name = conversation.groupId?.name || "Unknown Group"
      avatar = conversation.groupId?.avatar || ""
      groupId = conversation.groupId?._id || conversation.groupId
    }

    const transformedConversation = {
      _id: conversation._id,
      groupId,
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

    return transformedConversation
  }

  const handleSendFile = async (file, caption = "") => {
    if (!selectedConversation || !file) {
      console.error("Missing conversation or file")
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("senderId", userId)
      formData.append("conversationId", selectedConversation._id)

      if (caption && caption.trim()) {
        formData.append("content", caption.trim())
      }

      const response = await axios.post(
        `${PORT}/api/messages/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );


      if (response.status === 201) {
        await fetchConversationMessages(selectedConversation._id)
      } else {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error sending file:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      })

      const errorMessage = error.response?.data?.error
      toast.error(errorMessage)
      throw error
    }
  }

  const handleUpdateGroupInfo = async (groupId, updateData) => {
    try {

      const result = await chatAPI.updateCircle(groupId, { ...updateData, userId })


      if (refreshConversations) {
        await refreshConversations()
      }

      return result
    } catch (error) {
      console.error("Failed to update group info:", error)
      throw error
    }
  }

  const handleRefreshChat = async (conversationId) => {
    try {

      if (refreshConversations) {
        await refreshConversations()
      }

      const updatedGroupConversations = groupConversations
      const updatedDirectConversations = directConversations

      const updatedConversation =
        updatedGroupConversations.find((c) => c._id === conversationId) ||
        updatedDirectConversations.find((c) => c._id === conversationId)

      if (updatedConversation && selectedConversation?._id === conversationId) {
        setSelectedConversation(updatedConversation)
      }
    } catch (error) {
      console.error("Error refreshing chat:", error)
    }
  }

  const handleDeleteMessage = (messageId) => {

    if (selectedConversation) {
      fetchConversationMessages(selectedConversation._id)
    }
  }

  const currentList =
    mode === "groups"
      ? groupConversations.map(transformConversationForUI)
      : directConversations.map(transformConversationForUI)

  return (
    <div className="h-screen md:h-[700px] md:mt-16 mt-16 flex bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-orange-950 dark:via-slate-900 dark:to-blue-950 overflow-hidden">
      <ChatSidebar
        selected={mode}
        onSelect={setMode}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={handleCloseMobileMenu}
        userId={userId}
        apiUrl={apiUrl}
        Userdata={Userdata}
      />

      <ChatList
        list={currentList}
        selectedChat={selectedConversation ? transformConversationForUI(selectedConversation) : null}
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
        onShowGroupInfo={handleGetCircleDetails}
      />

      <div className="flex-1 min-w-0">
        <ChatMainWindow
          selectedChat={selectedConversation ? transformConversationForUI(selectedConversation) : null}
          messages={messages}
          onSendMessage={handleSendMessage}
          onSendFile={handleSendFile}
          onShowMobileMenu={handleShowMobileMenu}
          onShowMobileList={handleShowMobileList}
          onStartDirectChat={handleStartDirectChat}
          onGetGroupMembers={handleGetGroupMembers}
          onUpdateGroupInfo={handleUpdateGroupInfo}
          onRefreshChat={handleRefreshChat}
          onDeleteMessage={handleDeleteMessage}
          loading={loading}
          onShowGroupDetails={handleGetCircleDetails}
          currentUserId={userId}
        />
      </div>
    </div>
  )
}

export default ChatContainer
