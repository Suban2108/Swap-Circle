"use client"

import { useState, useEffect, useCallback } from "react"
import { chatAPI } from "../lib/api/ChatApi.js"

export const useChat = (userId) => {
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [directConversations, setDirectConversations] = useState([])
  const [groupConversations, setGroupConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchConversations = useCallback(async (type) => {
    if (!userId) return

    try {
      setLoading(true)
      const conversationsData = await chatAPI.getUserConversations(userId, type)

      if (type === "direct") {
        setDirectConversations(conversationsData)
      } else if (type === "group") {
        setGroupConversations(conversationsData)
      } else {
        setConversations(conversationsData)
        const direct = conversationsData.filter((conv) => conv.type === "direct")
        const group = conversationsData.filter((conv) => conv.type === "group")
        setDirectConversations(direct)
        setGroupConversations(group)
      }
    } catch (err) {
      setError("Failed to fetch conversations")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const fetchConversationMessages = useCallback(async (conversationId, page = 1) => {
    if (!conversationId) return

    try {
      setLoading(true)
      const { messages: messagesData } = await chatAPI.getConversationMessages(conversationId, page)

      if (page === 1) {
        setMessages(messagesData)
      } else {
        setMessages((prev) => [...messagesData, ...prev])
      }
    } catch (err) {
      setError("Failed to fetch messages")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const sendMessage = useCallback(async (messageData) => {
    if (!userId) return

    try {
      const newMessage = await chatAPI.sendMessage({
        senderId: userId,
        ...messageData,
      })

      setMessages((prev) => [...prev, newMessage])

      const updateConversations = (list) =>
        list.map((conv) =>
          conv._id === messageData.conversationId
            ? {
                ...conv,
                lastMessage: {
                  content: messageData.content,
                  senderId: { _id: userId, name: "You" },
                  timestamp: newMessage.timestamp,
                },
                updatedAt: newMessage.timestamp,
              }
            : conv
        )

      setConversations((prev) => updateConversations(prev))
      setDirectConversations((prev) => updateConversations(prev))
      setGroupConversations((prev) => updateConversations(prev))

      return newMessage
    } catch (err) {
      setError("Failed to send message")
      console.error(err)
      throw err
    }
  }, [userId])

  const createDirectConversation = useCallback(async (otherUserId) => {
    if (!userId) return

    try {
      const conversation = await chatAPI.getOrCreateDirectConversation(userId, otherUserId)

      setDirectConversations((prev) => {
        const exists = prev.find((conv) => conv._id === conversation._id)
        return exists ? prev : [conversation, ...prev]
      })

      return conversation
    } catch (err) {
      setError("Failed to create conversation")
      console.error(err)
      throw err
    }
  }, [userId])

  const createGroupConversation = useCallback(async (groupId) => {
    if (!userId) return

    try {
      const conversation = await chatAPI.getOrCreateGroupConversation(groupId)

      setGroupConversations((prev) => {
        const exists = prev.find((conv) => conv._id === conversation._id)
        return exists ? prev : [conversation, ...prev]
      })

      return conversation
    } catch (err) {
      setError("Failed to create group conversation")
      console.error(err)
      throw err
    }
  }, [userId])

  const createGroup = useCallback(async (groupData) => {
    if (!userId) return

    try {
      const newGroup = await chatAPI.createCircle({
        ...groupData,
        createdBy: userId,
      })

      await createGroupConversation(newGroup._id)
      await fetchConversations("group")

      return newGroup
    } catch (err) {
      setError("Failed to create group")
      console.error(err)
      throw err
    }
  }, [userId, createGroupConversation, fetchConversations])

  const joinGroup = useCallback(async (inviteCode) => {
    if (!userId) return

    try {
      const result = await chatAPI.joinCircle({
        userId,
        inviteCode,
      })

      if (result.circle) {
        await createGroupConversation(result.circle._id)
      }

      await fetchConversations("group")
      return result
    } catch (err) {
      setError("Failed to join group")
      console.error(err)
      throw err
    }
  }, [userId, createGroupConversation, fetchConversations])

  const markAsRead = useCallback(async (conversationId) => {
    if (!userId) return

    try {
      await chatAPI.markMessagesAsRead(conversationId, userId)

      const updateUnread = (list) =>
        list.map((conv) => conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv)

      setConversations((prev) => updateUnread(prev))
      setDirectConversations((prev) => updateUnread(prev))
      setGroupConversations((prev) => updateUnread(prev))
    } catch (err) {
      console.error("Failed to mark messages as read:", err)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchConversations("all")
    }
  }, [userId, fetchConversations])

  return {
    messages,
    conversations,
    directConversations,
    groupConversations,
    loading,
    error,
    sendMessage,
    fetchConversationMessages,
    createDirectConversation,
    createGroupConversation,
    createGroup,
    joinGroup,
    markAsRead,
    refreshConversations: () => fetchConversations("all"),
  }
}
